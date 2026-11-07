import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// A short link printed as die-cut vinyl: white kiss-cut border, peeled corner
const LinkSticker = ({
  children,
  size = "lg",
  faded = false,
  className,
}: {
  children: ReactNode;
  size?: "sm" | "lg";
  faded?: boolean;
  className?: string;
}) => (
  <span
    className={cn(
      "sticker",
      size === "sm" && "sticker-sm",
      faded && "sticker-faded",
      className,
    )}
  >
    <span className="sticker-face">{children}</span>
    <span aria-hidden className="sticker-peel" />
  </span>
);

export default LinkSticker;
