import type { ReactNode } from "react";
import { Check, Info, TriangleAlert, X } from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import { cn } from "@/lib/utils";

// Status mark: a tiny die-cut sticker, same cut as the logo and short links
const Mark = ({ className, children }: { className: string; children: ReactNode }) => (
  <span
    className={cn(
      "flex size-6 -rotate-6 items-center justify-center rounded-md border-2 border-white text-white shadow-[0_1px_1px_rgb(28_27_31/0.18),0_2px_4px_rgb(28_27_31/0.1)] [&_svg]:size-3.5",
      className,
    )}
  >
    {children}
  </span>
);

const Toaster = (props: ToasterProps) => (
  <Sonner
    position="bottom-center"
    gap={8}
    icons={{
      success: (
        <Mark className="bg-vinyl">
          <Check strokeWidth={2} />
        </Mark>
      ),
      info: (
        <Mark className="bg-primary">
          <Info strokeWidth={2} />
        </Mark>
      ),
      warning: (
        <Mark className="bg-warning">
          <TriangleAlert strokeWidth={2} />
        </Mark>
      ),
      error: (
        <Mark className="bg-destructive">
          <X strokeWidth={2} />
        </Mark>
      ),
    }}
    toastOptions={{
      unstyled: true,
      classNames: {
        toast:
          "flex w-full items-start gap-3 rounded-2xl border border-border bg-card p-4 font-sans shadow-float",
        icon: "shrink-0",
        content: "min-w-0 flex-1 pt-0.5",
        title: "text-sm font-medium text-foreground",
        description: "mt-0.5 text-[13px] leading-5 break-words text-subtle",
      },
    }}
    {...props}
  />
);

export { Toaster };
