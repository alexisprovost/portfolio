import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiArrowLeft } from "react-icons/fi";
import { PageLayout } from "@/components/layout";
import { ProjectCard } from "@/components/projects";
import { LoadingSpinner, ThemeToggle, LanguageToggle } from "@/components/shared";
import { API_URLS } from "@/lib/constants";
import translate from "@/i18n/translate";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { cn } from "@/lib/utils";

interface ProjectsPageProps {
  locale: string;
  onLocaleChange: (locale: string) => void;
}

export const ProjectsPage = ({ locale, onLocaleChange }: ProjectsPageProps) => {
  useDocumentTitle("Projects");

  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setError(false);
      setLoading(true);

      const lang = locale.split("-")[0];

      try {
        const response = await axios.get(`${API_URLS.projects}${lang}/projects`, {
          headers: { "Content-Type": "application/json" },
          timeout: 5000,
        });
        setProjects(response.data);
      } catch {
        try {
          const fallbackResponse = await axios.get(
            `${API_URLS.fallback}${lang}/projects`,
            { headers: { "Content-Type": "application/json" } }
          );
          setProjects(fallbackResponse.data);
        } catch {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [locale]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      {/* Fixed Header */}
      <motion.div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 px-5 sm:px-6 py-4",
          "backdrop-blur-md border-b",
          "bg-sand/80 border-sand-dark/30",
          "[html[data-theme='dark']_&]:bg-warm-black/80 [html[data-theme='dark']_&]:border-charcoal-light/20"
        )}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center max-w-4xl mx-auto">
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
        </div>
      </motion.div>

      <PageLayout maxWidth="lg">
        {/* Spacer for fixed header */}
        <div className="h-14" />

      {/* Title */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h1
          className={cn(
            "text-3xl sm:text-4xl font-display font-bold mb-2",
            "text-charcoal [html[data-theme='dark']_&]:text-sand"
          )}
        >
          {translate("app.nav.projects")}
        </h1>
      </motion.div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <LoadingSpinner size="lg" />
          <p
            className={cn(
              "mt-4 text-sm",
              "text-charcoal-light [html[data-theme='dark']_&]:text-sand/60"
            )}
          >
            {translate("app.loading")}
          </p>
        </div>
      ) : error ? (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p
            className={cn(
              "text-charcoal-light [html[data-theme='dark']_&]:text-sand/60"
            )}
          >
            {translate("app.loading.error", { br: <br /> })}
          </p>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              locale={locale}
              index={index}
            />
          ))}
        </div>
      )}
    </PageLayout>
    </>
  );
};

export default ProjectsPage;
