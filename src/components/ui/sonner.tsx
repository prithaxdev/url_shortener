import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => (
  <Sonner
    theme="light"
    className="toaster group"
    style={{
      "--normal-bg": "#FFFFFF",
      "--normal-text": "#1E293B",
      "--normal-border": "#E2E8F0",
      "--success-bg": "#FFFFFF",
      "--success-border": "#34D399",
      "--error-bg": "#FFFFFF",
      "--error-border": "#F472B6",
    } as React.CSSProperties}
    {...props}
  />
);

export { Toaster };
