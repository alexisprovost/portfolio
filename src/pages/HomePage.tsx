import { motion } from "framer-motion";
import { ProfileSection, SocialGrid, FeaturedLinks } from "@/components/home";
import { ThemeToggle, LanguageToggle, LastShipped } from "@/components/shared";
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
    <main
      className={cn(
        "min-h-screen min-h-svh w-full",
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
        <div className="flex-1 flex flex-col justify-center py-4 sm:py-8">
          <ProfileSection />
          <SocialGrid />
          <FeaturedLinks locale={locale} />
        </div>

        {/* Footer */}
        <motion.footer
          className="text-center py-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <p
            className={cn(
              "text-[10px] tracking-wide",
              "text-charcoal/55 [html[data-theme='dark']_&]:text-sand/55",
              "flex items-center justify-center gap-1.5 flex-wrap"
            )}
          >
            <LastShipped />
            <span className="mx-0.5">·</span>
            <span className="inline-flex items-center gap-1">
              {translate("app.footer.madeInCanada")} <span>🇨🇦</span>
            </span>
            <span className="mx-0.5">·</span>
            <a
              href="https://m19.ca"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "hover:text-charcoal/70 [html[data-theme='dark']_&]:hover:text-sand/70",
                "transition-colors"
              )}
            >
              {translate("app.footer.designedBy")}
            </a>
          </p>
        </motion.footer>
      </div>
    </main>
  );
};

export default HomePage;
