import { cn } from "@/lib/utils"; // Utility to merge class names

export function IconWrapper({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "flex aspect-square items-center justify-center rounded-sm bg-primary dark:bg-blue-600 text-primary-foreground dark:text-primary p-1",
        className
      )}
    >
      {children}
    </div>
  );
}