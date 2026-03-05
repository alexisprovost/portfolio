import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useIntl } from "react-intl";
import { toast } from "sonner";
import { FiArrowLeft, FiSend, FiCheck, FiAlertCircle } from "react-icons/fi";
import { useWebHaptics } from "web-haptics/react";
import { PageLayout } from "@/components/layout";
import { GlassCard } from "@/components/ui";
import { ThemeToggle, LanguageToggle } from "@/components/shared";
import translate from "@/i18n/translate";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { cn } from "@/lib/utils";

interface ContactPageProps {
  locale: string;
  onLocaleChange: (locale: string) => void;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export const ContactPage = ({ locale, onLocaleChange }: ContactPageProps) => {
  useDocumentTitle("Contact");

  const intl = useIntl();
  const haptic = useWebHaptics();
  const [status, setStatus] = useState<FormStatus>("idle");
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

  const renderTurnstile = useCallback(() => {
    const w = window as Window & { turnstile?: any };
    if (!w.turnstile || !turnstileRef.current) return;
    if (turnstileWidgetId.current !== null) {
      w.turnstile.remove(turnstileWidgetId.current);
    }
    turnstileWidgetId.current = w.turnstile.render(turnstileRef.current, {
      sitekey: siteKey,
      theme:
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "dark"
          : "light",
      size: "flexible",
    });
  }, [siteKey]);

  useEffect(() => {
    if (!siteKey) return;

    const w = window as Window & { turnstile?: any };
    if (w.turnstile) {
      renderTurnstile();
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad&render=explicit";
    script.async = true;
    (window as any).onTurnstileLoad = renderTurnstile;
    document.head.appendChild(script);

    return () => {
      (window as any).onTurnstileLoad = undefined;
    };
  }, [siteKey, renderTurnstile]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const w = window as Window & { turnstile?: any };
    const token = w.turnstile?.getResponse(turnstileWidgetId.current) || "";

    if (!token && import.meta.env.PROD) {
      haptic.trigger("warning");
      toast.error(intl.formatMessage({ id: "app.contact.error.title" }), {
        description: intl.formatMessage({
          id: "app.contact.error.verification",
        }),
      });
      return;
    }

    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          token,
        }),
      });

      if (!res.ok) throw new Error();

      setStatus("success");
      haptic.trigger("success");
      toast.success(
        intl.formatMessage({ id: "app.contact.success.title" }),
        {
          description: intl.formatMessage({
            id: "app.contact.success.message",
          }),
        }
      );

      form.reset();
      w.turnstile?.reset(turnstileWidgetId.current);

      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      haptic.trigger("error");
      toast.error(intl.formatMessage({ id: "app.contact.error.title" }), {
        description: intl.formatMessage({ id: "app.contact.error.message" }),
      });

      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const inputClasses = cn(
    "w-full px-4 py-3.5 rounded-xl transition-all duration-200",
    "bg-black/[0.03] border border-black/10",
    "text-charcoal placeholder:text-charcoal/35",
    "focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40",
    "[html[data-theme='dark']_&]:bg-white/[0.05] [html[data-theme='dark']_&]:border-white/10",
    "[html[data-theme='dark']_&]:text-sand [html[data-theme='dark']_&]:placeholder:text-sand/35",
    "[html[data-theme='dark']_&]:focus:ring-accent/30 [html[data-theme='dark']_&]:focus:border-accent/40"
  );

  const labelClasses = cn(
    "block text-sm font-medium mb-1.5",
    "text-charcoal/80 [html[data-theme='dark']_&]:text-sand/80"
  );

  const isDisabled = status === "submitting";

  return (
    <PageLayout maxWidth="sm">
      {/* Header */}
      <motion.div
        className="flex justify-between items-center mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link
          to="/"
          onClick={() => haptic.trigger("medium")}
          className={cn(
            "flex items-center gap-2 text-sm font-medium transition-colors",
            "-ml-2 px-2 py-2 rounded-lg",
            "text-charcoal hover:text-coral",
            "[html[data-theme='dark']_&]:text-sand [html[data-theme='dark']_&]:hover:text-warm-peach"
          )}
        >
          <FiArrowLeft />
          {translate("app.nav.home")}
        </Link>

        <div className="flex items-center gap-2">
          <LanguageToggle locale={locale} onChange={onLocaleChange} />
          <ThemeToggle />
        </div>
      </motion.div>

      {/* Title */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h1
          className={cn(
            "text-2xl sm:text-3xl font-display font-bold mb-1.5",
            "text-charcoal [html[data-theme='dark']_&]:text-sand"
          )}
        >
          {translate("app.contact.title")}
        </h1>
        <p
          className={cn(
            "text-sm",
            "text-charcoal-light [html[data-theme='dark']_&]:text-sand/55"
          )}
        >
          {translate("app.contact.subtitle")}
        </p>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <GlassCard className="p-5 sm:p-7" hover={false}>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className={labelClasses}>
                  {translate("app.contact.name")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder={intl.formatMessage({
                    id: "app.contact.namePlaceholder",
                  })}
                  className={inputClasses}
                  required
                  disabled={isDisabled}
                />
              </div>

              <div>
                <label htmlFor="email" className={labelClasses}>
                  {translate("app.contact.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={intl.formatMessage({
                    id: "app.contact.emailPlaceholder",
                  })}
                  className={inputClasses}
                  required
                  disabled={isDisabled}
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className={labelClasses}>
                {translate("app.contact.message")}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder={intl.formatMessage({
                  id: "app.contact.messagePlaceholder",
                })}
                className={cn(inputClasses, "resize-none")}
                required
                disabled={isDisabled}
              />
            </div>

            {siteKey && <div ref={turnstileRef} className="flex justify-center" />}

            <motion.button
              type="submit"
              disabled={isDisabled}
              className={cn(
                "w-full flex items-center justify-center gap-2",
                "px-6 py-3.5 rounded-xl",
                "text-sm font-semibold transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-accent/50",
                "disabled:opacity-60 disabled:cursor-not-allowed",
                status === "success"
                  ? "bg-emerald-500 text-white [html[data-theme='dark']_&]:bg-emerald-500"
                  : status === "error"
                    ? "bg-red-500 text-white [html[data-theme='dark']_&]:bg-red-500"
                    : cn(
                        "bg-charcoal text-sand shadow-md",
                        "hover:bg-charcoal/90 hover:shadow-lg",
                        "[html[data-theme='dark']_&]:bg-sand [html[data-theme='dark']_&]:text-charcoal",
                        "[html[data-theme='dark']_&]:hover:bg-sand/90"
                      )
              )}
              whileTap={
                !isDisabled && status === "idle" ? { scale: 0.98 } : undefined
              }
            >
              <AnimatePresence mode="wait">
                {status === "submitting" ? (
                  <motion.span
                    key="sending"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2"
                  >
                    <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    {translate("app.contact.sending")}
                  </motion.span>
                ) : status === "success" ? (
                  <motion.span
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2"
                  >
                    <FiCheck className="w-4 h-4" />
                    {translate("app.contact.success.title")}
                  </motion.span>
                ) : status === "error" ? (
                  <motion.span
                    key="error"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2"
                  >
                    <FiAlertCircle className="w-4 h-4" />
                    {translate("app.contact.error.title")}
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2"
                  >
                    <FiSend className="w-4 h-4" />
                    {translate("app.contact.submit")}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </form>
        </GlassCard>
      </motion.div>
    </PageLayout>
  );
};

export default ContactPage;
