import { cn } from "@/lib/utils";

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
}

const maxWidths = {
  sm: "max-w-md",
  md: "max-w-2xl",
  lg: "max-w-4xl",
  xl: "max-w-6xl",
  full: "max-w-full",
};

export const PageLayout = ({
  children,
  className,
  centered = true,
  maxWidth = "md",
}: PageLayoutProps) => {
  return (
    <div
      className={cn(
        "min-h-screen min-h-dvh w-full px-4 py-8 sm:px-6 lg:px-8",
        "bg-sand transition-colors duration-300",
        "[html[data-theme='dark']_&]:bg-warm-black",
        centered && "flex flex-col items-center",
        className
      )}
      style={{ minHeight: '-webkit-fill-available' }}
    >
      <div className={cn("w-full", maxWidths[maxWidth])}>{children}</div>
    </div>
  );
};

export default PageLayout;
