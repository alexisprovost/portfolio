import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { PageLayout, PageTransition } from "@/components/layout";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import translate from "@/i18n/translate";
import { cn } from "@/lib/utils";

interface NotFoundPageProps {
  locale: string;
  onLocaleChange: (locale: string) => void;
}

export const NotFoundPage = (_props: NotFoundPageProps) => {
  useDocumentTitle("404");

  return (
    <PageTransition>
      <PageLayout>
        <div className="flex-1 flex flex-col items-center justify-center text-center px-5 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h1
              className={cn(
                "text-8xl sm:text-9xl font-display font-bold mb-4",
                "text-charcoal/20 [html[data-theme='dark']_&]:text-sand/20"
              )}
            >
              404
            </h1>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className={cn(
              "text-xl sm:text-2xl font-display font-semibold mb-2",
              "text-charcoal [html[data-theme='dark']_&]:text-sand"
            )}
          >
            {translate("app.notFound.title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className={cn(
              "text-base mb-8 max-w-sm",
              "text-charcoal-light [html[data-theme='dark']_&]:text-sand/60"
            )}
          >
            {translate("app.notFound.description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex gap-3"
          >
            <Link
              to="/"
              className={cn(
                "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl",
                "text-sm font-medium",
                "bg-charcoal text-sand",
                "active:opacity-80 transition-opacity",
                "[html[data-theme='dark']_&]:bg-sand [html[data-theme='dark']_&]:text-charcoal"
              )}
            >
              <FiHome className="w-4 h-4" />
              {translate("app.notFound.backHome")}
            </Link>
          </motion.div>
        </div>
      </PageLayout>
    </PageTransition>
  );
};

export default NotFoundPage;
