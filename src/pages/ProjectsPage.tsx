import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useWebHaptics } from "web-haptics/react";
import { PageLayout } from "@/components/layout";
import { ProjectCard, ProjectCardSkeleton } from "@/components/projects";
import { ThemeToggle, LanguageToggle } from "@/components/shared";
import { Badge } from "@/components/ui";
import { getProjectsCache } from "@/lib/projectsCache";
import translate from "@/i18n/translate";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { cn } from "@/lib/utils";

interface ProjectsPageProps {
  locale: string;
  onLocaleChange: (locale: string) => void;
}

interface Tech {
  id: string | number;
  name: string;
}

export const ProjectsPage = ({ locale, onLocaleChange }: ProjectsPageProps) => {
  useDocumentTitle("Projects");
  const haptic = useWebHaptics();

  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const loadProjects = async () => {
      setError(false);
      setLoading(true);

      const cache = getProjectsCache(locale);

      if (cache.data) {
        setProjects(cache.data);
        setLoading(false);
        return;
      }

      try {
        const data = await cache.fetch();
        setProjects(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [locale]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const allTags = useMemo(() => {
    const counts = new Map<string, number>();
    projects.forEach((p: { technologies?: Tech[] }) => {
      p.technologies?.forEach((t) => {
        counts.set(t.name, (counts.get(t.name) ?? 0) + 1);
      });
    });
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([name]) => name);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeTags.size === 0) return projects;
    return projects.filter((p: { technologies?: Tech[] }) =>
      p.technologies?.some((t) => activeTags.has(t.name))
    );
  }, [projects, activeTags]);

  const toggleTag = (tag: string) => {
    haptic.trigger("light");
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const clearTags = () => {
    haptic.trigger("light");
    setActiveTags(new Set());
  };

  return (
    <>
      {/* Fixed Header */}
      <motion.div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 px-5 sm:px-6 pb-4 transition-all duration-200",
          "pt-[calc(env(safe-area-inset-top)+1rem)]",
          "border-b border-transparent",
          scrolled
            ? "backdrop-blur-md bg-sand/80 border-sand-dark/30 [html[data-theme='dark']_&]:bg-warm-black/80 [html[data-theme='dark']_&]:border-charcoal-light/20"
            : "bg-transparent"
        )}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <Link
            to="/"
            onClick={() => haptic.trigger("medium")}
            className={cn(
              "inline-flex items-center gap-2 text-sm font-medium transition-colors",
              "-ml-3 px-3 py-3 rounded-lg min-h-[44px] min-w-[44px]",
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
          className="text-center mb-6"
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

        {/* Filter chips */}
        {!loading && !error && allTags.length > 0 && (
          <motion.div
            className="flex flex-wrap items-center gap-1.5 justify-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {activeTags.size > 0 && (
              <button
                onClick={clearTags}
                className={cn(
                  "text-xs font-medium px-2.5 py-1 rounded-full",
                  "text-charcoal-light hover:text-charcoal transition-colors",
                  "[html[data-theme='dark']_&]:text-sand/60 [html[data-theme='dark']_&]:hover:text-sand"
                )}
              >
                {translate("app.projects.clearFilters")}
              </button>
            )}
            {allTags.map((tag) => {
              const active = activeTags.has(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className="transition-transform active:scale-95"
                  aria-pressed={active}
                >
                  <Badge variant={active ? "accent" : "default"} size="sm">
                    {tag}
                  </Badge>
                </button>
              );
            })}
          </motion.div>
        )}

        {/* Content */}
        {loading ? (
          <div className="space-y-6">
            {[0, 1, 2].map((i) => (
              <ProjectCardSkeleton key={i} />
            ))}
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
        ) : filteredProjects.length === 0 ? (
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
              {translate("app.projects.noResults")}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {filteredProjects.map((project, index) => (
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
