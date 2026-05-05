import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useIntl } from "react-intl";
import { FiArrowLeft, FiSearch, FiX } from "react-icons/fi";
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
  const intl = useIntl();

  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState("");

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

  const TOP_TAGS_COUNT = 5;

  const topTags = useMemo(() => {
    const counts = new Map<string, number>();
    projects.forEach((p: { technologies?: Tech[] }) => {
      p.technologies?.forEach((t) => {
        counts.set(t.name, (counts.get(t.name) ?? 0) + 1);
      });
    });
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, TOP_TAGS_COUNT)
      .map(([name]) => name);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p: { name?: string; description?: string; technologies?: Tech[] }) => {
      if (activeTags.size > 0 && !p.technologies?.some((t) => activeTags.has(t.name))) {
        return false;
      }
      if (q) {
        const haystack = [
          p.name ?? "",
          p.description ?? "",
          ...(p.technologies ?? []).map((t) => t.name),
        ].join(" ").toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [projects, activeTags, query]);

  const hasFilters = query.length > 0 || activeTags.size > 0;
  const clearAll = () => {
    haptic.trigger("light");
    setQuery("");
    setActiveTags(new Set());
  };

  const toggleTag = (tag: string) => {
    haptic.trigger("light");
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
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

        {/* Search + top tag chips */}
        <div className="mb-8 max-w-md mx-auto space-y-3">
          {/* Search input */}
          <div className="relative">
            <FiSearch
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4",
                "text-charcoal/40 [html[data-theme='dark']_&]:text-sand/40"
              )}
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={intl.formatMessage({ id: "app.projects.searchPlaceholder" })}
              aria-label={intl.formatMessage({ id: "app.projects.searchPlaceholder" })}
              className={cn(
                "w-full pl-9 pr-9 py-2 rounded-full text-sm",
                "bg-white/40 [html[data-theme='dark']_&]:bg-white/5",
                "border border-sand-dark/40 [html[data-theme='dark']_&]:border-white/10",
                "text-charcoal placeholder:text-charcoal/40",
                "[html[data-theme='dark']_&]:text-sand [html[data-theme='dark']_&]:placeholder:text-sand/40",
                "focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/40",
                "transition-colors"
              )}
            />
            {hasFilters && (
              <button
                onClick={clearAll}
                aria-label={intl.formatMessage({ id: "app.projects.clearFilters" })}
                className={cn(
                  "absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full",
                  "text-charcoal/50 hover:text-charcoal hover:bg-charcoal/5",
                  "[html[data-theme='dark']_&]:text-sand/50 [html[data-theme='dark']_&]:hover:text-sand [html[data-theme='dark']_&]:hover:bg-sand/5",
                  "transition-colors"
                )}
              >
                <FiX className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Top tag chips (skeleton during load to avoid layout shift) */}
          <div className="flex flex-wrap items-center gap-1.5 justify-center min-h-[26px]">
            {loading ? (
              [14, 20, 16, 24, 18].map((w, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-[22px] rounded-full",
                    "bg-charcoal/5 [html[data-theme='dark']_&]:bg-sand/5",
                    "relative overflow-hidden",
                    "after:absolute after:inset-0 after:-translate-x-full after:animate-[shimmer_1.6s_infinite]",
                    "after:bg-gradient-to-r after:from-transparent after:via-charcoal/5 after:to-transparent",
                    "[html[data-theme='dark']_&]:after:via-sand/10"
                  )}
                  style={{ width: `${w * 4}px` }}
                />
              ))
            ) : (
              topTags.map((tag) => {
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
              })
            )}
          </div>
        </div>

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
