import { motion } from "framer-motion";
import { format, parseISO, isBefore } from "date-fns";
import { fr, enUS } from "date-fns/locale";
import { FiExternalLink, FiGithub, FiYoutube, FiImage } from "react-icons/fi";
import { GlassCard, Badge, Button } from "@/components/ui";
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
        <div className="flex flex-col md:flex-row">
          {/* Media Section */}
          <div className="md:w-2/5 relative">
            {isVimeo && videoUrl ? (
              <iframe
                src={videoUrl}
                allow="autoplay; fullscreen; picture-in-picture"
                title={name}
                className="w-full h-48 md:h-full min-h-[200px] border-0"
              />
            ) : img ? (
              <div
                className="w-full h-48 md:h-full min-h-[200px] bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${img})` }}
              />
            ) : (
              <div
                className={cn(
                  "w-full h-48 md:h-full min-h-[200px] flex items-center justify-center",
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

          {/* Content Section */}
          <div className="md:w-3/5 p-5 md:p-6 flex flex-col">
            <h3
              className={cn(
                "text-xl font-display font-bold mb-2",
                "text-charcoal [html[data-theme='dark']_&]:text-sand"
              )}
            >
              {name}
            </h3>

            <p
              className={cn(
                "text-sm mb-3 capitalize",
                "text-charcoal-light [html[data-theme='dark']_&]:text-sand/60"
              )}
            >
              {formattedDate}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {technologies.map((tech) => (
                <Badge key={tech.id} variant="accent" size="sm">
                  {tech.name}
                </Badge>
              ))}
            </div>

            {/* Description */}
            <p
              className={cn(
                "text-sm leading-relaxed mb-4 flex-grow line-clamp-4",
                "text-charcoal/80 [html[data-theme='dark']_&]:text-sand/70"
              )}
            >
              {description}
            </p>

            {/* Action Button */}
            {url && linkProps && (
              <div className="mt-auto">
                {isReleased ? (
                  <Button
                    as="a"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="sm"
                    showArrow
                    className="w-full sm:w-auto"
                  >
                    {LinkIcon && <LinkIcon className="w-4 h-4" />}
                    {translate(linkProps.text)}
                  </Button>
                ) : (
                  <span
                    className={cn(
                      "text-sm italic",
                      "text-charcoal-light [html[data-theme='dark']_&]:text-sand/60"
                    )}
                  >
                    {translate("app.project.projectNotReleased", {
                      date: format(parsedDate, "PPP", { locale: dateLocale }),
                    })}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default ProjectCard;
