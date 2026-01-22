import { motion } from "framer-motion";
import { ProfileSection, SocialGrid, FeaturedLinks } from "@/components/home";
import { ThemeToggle, LanguageToggle } from "@/components/shared";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import translate from "@/i18n/translate";
import { cn } from "@/lib/utils";

interface HomePageProps {
  locale: string;
  onLocaleChange: (locale: string) => void;
}

export const HomePage = ({ locale, onLocaleChange }: HomePageProps) => {
  useDocumentTitle("Portfolio");

  return (
    <div
      className={cn(
        "min-h-screen min-h-dvh w-full",
        "flex flex-col",
        "px-5 sm:px-6 py-6 sm:py-8",
        "bg-sand [html[data-theme='dark']_&]:bg-warm-black"
      )}
    >
      {/* Container with max-width */}
      <div className="w-full max-w-md mx-auto flex flex-col flex-1">
        {/* Top controls */}
        <motion.div
          className="flex justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <LanguageToggle locale={locale} onChange={onLocaleChange} />
          <ThemeToggle />
        </motion.div>

        {/* Main content - centered vertically */}
        <div className="flex-1 flex flex-col justify-center py-8 sm:py-12">
          <ProfileSection />
          <SocialGrid />
          <FeaturedLinks />
        </div>

        {/* Footer */}
        <motion.footer
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <p
            className={cn(
              "text-[11px] tracking-wide mb-1",
              "text-charcoal/60 [html[data-theme='dark']_&]:text-sand/60",
              "flex items-center justify-center gap-1.5"
            )}
          >
            {translate("app.footer.madeInCanada")} <span className="text-sm">🇨🇦</span>
          </p>
          <a
            href="https://m19.ca"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "text-[10px] tracking-wide",
              "text-charcoal/30 [html[data-theme='dark']_&]:text-sand/30",
              "hover:text-charcoal/50 [html[data-theme='dark']_&]:hover:text-sand/50",
              "transition-colors"
            )}
          >
            {translate("app.footer.designedBy")}
          </a>
        </motion.footer>
      </div>
    </div>
  );
};

export default HomePage;
