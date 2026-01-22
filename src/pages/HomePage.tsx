import { motion } from "framer-motion";
import { ProfileSection, SocialGrid, FeaturedLinks } from "@/components/home";
import { ThemeToggle, LanguageToggle } from "@/components/shared";
import useDocumentTitle from "@/hooks/useDocumentTitle";
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
          className="text-center pb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <p
            className={cn(
              "text-[11px] tracking-wider uppercase",
              "text-charcoal/25 [html[data-theme='dark']_&]:text-sand/20"
            )}
          >
            {new Date().getFullYear()} · QC
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default HomePage;
