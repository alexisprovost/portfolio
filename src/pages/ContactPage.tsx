import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { FiArrowLeft, FiSend } from "react-icons/fi";
import { PageLayout } from "@/components/layout";
import { GlassCard, Button } from "@/components/ui";
import { ThemeToggle, LanguageToggle } from "@/components/shared";
import { API_URLS } from "@/lib/constants";
import translate from "@/i18n/translate";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { cn } from "@/lib/utils";

interface ContactPageProps {
  locale: string;
  onLocaleChange: (locale: string) => void;
}

export const ContactPage = ({ locale, onLocaleChange }: ContactPageProps) => {
  useDocumentTitle("Contact");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      await axios.post(API_URLS.contact, data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      toast.success(
        locale.startsWith("fr") ? "Message envoyé!" : "Message sent!",
        {
          description: locale.startsWith("fr")
            ? "Votre message a bien été envoyé"
            : "Your message has been sent successfully",
        }
      );

      form.reset();
    } catch {
      toast.error(locale.startsWith("fr") ? "Erreur" : "Error", {
        description: locale.startsWith("fr")
          ? "Une erreur est survenue. Veuillez réessayer."
          : "An error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = cn(
    "w-full px-4 py-3 rounded-xl transition-all duration-300",
    "bg-linen border border-sand-dark/30",
    "text-charcoal placeholder:text-charcoal/40",
    "focus:outline-none focus:ring-2 focus:ring-peach/50 focus:border-peach",
    "[html[data-theme='dark']_&]:bg-dark-linen [html[data-theme='dark']_&]:border-warm-black/30",
    "[html[data-theme='dark']_&]:text-sand [html[data-theme='dark']_&]:placeholder:text-sand/40",
    "[html[data-theme='dark']_&]:focus:ring-warm-peach/50 [html[data-theme='dark']_&]:focus:border-warm-peach"
  );

  const labelClasses = cn(
    "block text-sm font-medium mb-2",
    "text-charcoal [html[data-theme='dark']_&]:text-sand"
  );

  return (
    <PageLayout maxWidth="sm">
      {/* Header */}
      <motion.div
        className="flex justify-between items-center mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link
          to="/"
          className={cn(
            "flex items-center gap-2 text-sm font-medium transition-colors",
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
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h1
          className={cn(
            "text-3xl sm:text-4xl font-display font-bold mb-3",
            "text-charcoal [html[data-theme='dark']_&]:text-sand"
          )}
        >
          {translate("app.contact.title")}
        </h1>
        <p
          className={cn(
            "text-charcoal-light [html[data-theme='dark']_&]:text-sand/60"
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
        <GlassCard className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className={labelClasses}>
                {translate("app.contact.name")}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={inputClasses}
                required
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
                className={inputClasses}
                required
              />
            </div>

            <div>
              <label htmlFor="message" className={labelClasses}>
                {translate("app.contact.message")}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className={cn(inputClasses, "resize-none")}
                required
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="animate-pulse">...</span>
              ) : (
                <>
                  <FiSend className="w-4 h-4" />
                  {translate("app.contact.submit")}
                </>
              )}
            </Button>
          </form>
        </GlassCard>
      </motion.div>
    </PageLayout>
  );
};

export default ContactPage;
