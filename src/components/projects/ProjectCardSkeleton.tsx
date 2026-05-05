import { GlassCard } from "@/components/ui";
import { cn } from "@/lib/utils";

const shimmer = cn(
  "relative overflow-hidden",
  "bg-charcoal/5 [html[data-theme='dark']_&]:bg-sand/5",
  "after:absolute after:inset-0 after:-translate-x-full after:animate-[shimmer_1.6s_infinite]",
  "after:bg-gradient-to-r after:from-transparent after:via-charcoal/5 after:to-transparent",
  "[html[data-theme='dark']_&]:after:via-sand/10"
);

export const ProjectCardSkeleton = () => {
  return (
    <GlassCard className="overflow-hidden" hover={false}>
      <div className="flex flex-col sm:flex-row sm:h-56">
        <div className={cn("sm:w-2/5 shrink-0 h-48 sm:h-full", shimmer)} />
        <div className="sm:w-3/5 p-5 flex flex-col overflow-hidden">
          <div className={cn("h-5 w-2/3 rounded mb-2", shimmer)} />
          <div className={cn("h-3 w-1/3 rounded mb-3", shimmer)} />
          <div className="flex flex-wrap gap-1.5 mb-auto">
            <div className={cn("h-5 w-14 rounded-full", shimmer)} />
            <div className={cn("h-5 w-20 rounded-full", shimmer)} />
            <div className={cn("h-5 w-16 rounded-full", shimmer)} />
          </div>
          <div className="flex items-center justify-between mt-auto pt-2">
            <div className={cn("h-4 w-32 rounded", shimmer)} />
            <div className={cn("h-3 w-24 rounded", shimmer)} />
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default ProjectCardSkeleton;
