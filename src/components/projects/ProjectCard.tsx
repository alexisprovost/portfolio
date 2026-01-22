import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, parseISO, isBefore } from "date-fns";
import { fr, enUS } from "date-fns/locale";
import { FiExternalLink, FiGithub, FiYoutube, FiImage, FiChevronDown, FiArrowRight } from "react-icons/fi";
import { GlassCard, Badge } from "@/components/ui";
import translate from "@/i18n/translate";
import { cn } from "@/lib/utils";

interface Technology {
  id: string | number;
  name: string;
}

interface Project {
  id: string | number;
  img?: string;
  name: string;
  date: string;
  technologies: Technology[];
  description: string;
  url?: string;
}

interface ProjectCardProps {
  project: Project;
  locale: string;
  index: number;
}

const getDateLocale = (locale: string) => {
  return locale.startsWith("fr") ? fr : enUS;
};

const getLinkProperties = (url: string) => {
  if (/youtu\.be|youtube\.com/.test(url)) {
    return {
      icon: FiYoutube,
      text: "app.project.viewProjectVideo",
      className: "from-red-500 to-red-600",
    };
  }
  if (url.includes("github")) {
    return {
      icon: FiGithub,
      text: "app.project.viewProjectGithub",
      className: "from-charcoal to-charcoal-light [html[data-theme='dark']_&]:from-sand [html[data-theme='dark']_&]:to-sand/80",
    };
  }
  if (/\.(png|gif|webp|jpeg|jpg)\??.*$/i.test(url)) {
    return {
      icon: FiImage,
      text: "app.project.viewProjectImage",
      className: "from-peach to-coral",
    };
  }
  return {
    icon: FiExternalLink,
    text: "app.project.viewProject",
    className: "from-peach to-coral",
  };
};

export const ProjectCard = ({ project, locale, index }: ProjectCardProps) => {
  const { img, name, date, technologies, description, url } = project;
  const [isExpanded, setIsExpanded] = useState(false);

  const dateLocale = getDateLocale(locale);
  const parsedDate = parseISO(date);
  const isReleased = isBefore(parsedDate, new Date());
  const formattedDate = format(parsedDate, "MMMM yyyy", { locale: dateLocale });

  const isVimeo = img && /vimeo\.com/.test(img);
  const videoUrl = isVimeo
    ? `${img}?autoplay=1&loop=1&autopause=0&muted=1&background=1`
    : null;

  const linkProps = url ? getLinkProperties(url) : null;
  const LinkIcon = linkProps?.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <GlassCard className="overflow-hidden" hover={false}>
        {/* Main row - fixed height */}
        <div className="flex flex-col sm:flex-row sm:h-56">
          {/* Media Section - Fixed height */}
          <div className="sm:w-2/5 shrink-0 h-48 sm:h-full">
            {isVimeo && videoUrl ? (
              <iframe
                src={videoUrl}
                allow="autoplay; fullscreen; picture-in-picture"
                title={name}
                className="w-full h-full border-0"
              />
            ) : img ? (
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${img})` }}
              />
            ) : (
              <div
                className={cn(
                  "w-full h-full flex items-center justify-center",
                  "bg-gradient-to-br from-peach/20 to-coral/20",
                  "[html[data-theme='dark']_&]:from-warm-peach/20 [html[data-theme='dark']_&]:to-peach/20"
                )}
              >
                <span className="text-4xl font-display text-charcoal/30 [html[data-theme='dark']_&]:text-sand/30">
                  {name.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Content Section - Fixed height with overflow hidden */}
          <div className="sm:w-3/5 p-5 flex flex-col overflow-hidden">
            <h3
              className={cn(
                "text-lg font-display font-bold mb-1",
                "text-charcoal [html[data-theme='dark']_&]:text-sand"
              )}
            >
              {name}
            </h3>

            <p
              className={cn(
                "text-xs mb-3 capitalize",
                "text-charcoal-light [html[data-theme='dark']_&]:text-sand/50"
              )}
            >
              {formattedDate}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-1.5 mb-auto">
              {technologies.map((tech) => (
                <Badge key={tech.id} variant="accent" size="sm">
                  {tech.name}
                </Badge>
              ))}
            </div>

            {/* Footer row */}
            <div className="flex items-center justify-between mt-auto pt-2">
              {/* Action Link */}
              {url && linkProps && isReleased ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center gap-1.5 text-sm font-medium",
                    "text-accent active:opacity-70 transition-opacity",
                    "[html[data-theme='dark']_&]:text-warm-peach"
                  )}
                >
                  {LinkIcon && <LinkIcon className="w-4 h-4" />}
                  {translate(linkProps.text)}
                  <FiArrowRight className="w-3.5 h-3.5" />
                </a>
              ) : url && linkProps && !isReleased ? (
                <span
                  className={cn(
                    "text-xs italic",
                    "text-charcoal-light [html[data-theme='dark']_&]:text-sand/60"
                  )}
                >
                  {translate("app.project.projectNotReleased", {
                    date: format(parsedDate, "PPP", { locale: dateLocale }),
                  })}
                </span>
              ) : <span />}

              {/* Show description toggle */}
              {description && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className={cn(
                    "flex items-center gap-1 text-xs font-medium",
                    "text-charcoal/50 active:opacity-70 transition-opacity",
                    "[html[data-theme='dark']_&]:text-sand/50"
                  )}
                >
                  {translate(isExpanded ? "app.project.hideDescription" : "app.project.showDescription")}
                  <motion.span
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiChevronDown className="w-3 h-3" />
                  </motion.span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Expanded description - below main card */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div
                className={cn(
                  "px-5 pb-5 pt-3 text-sm leading-relaxed",
                  "border-t border-sand-dark/20 [html[data-theme='dark']_&]:border-charcoal-light/20",
                  "text-charcoal/80 [html[data-theme='dark']_&]:text-sand/70"
                )}
              >
                {description}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </motion.div>
  );
};

export default ProjectCard;
