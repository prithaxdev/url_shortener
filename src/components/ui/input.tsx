import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-2 border-[#CBD5E1] bg-white rounded-lg px-4 h-12 w-full text-base font-medium text-[#1E293B] placeholder:text-[#94A3B8]",
        "shadow-[4px_4px_0px_0px_transparent] focus:outline-none focus:border-[#8B5CF6] focus:shadow-[4px_4px_0px_0px_#8B5CF6]",
        "transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
