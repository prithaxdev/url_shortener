import React from "react";
import { Button } from "./button";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  confirmVariant?:
    | "default"
    | "destructive"
    | "secondary"
    | "ghost"
    | "outline"
    | null
    | undefined;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onOpenChange,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  confirmVariant = "destructive",
}) => {
  if (!open) return null;

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="fixed inset-0 bg-foreground/40 animate-fade-in"
        onClick={() => onOpenChange(false)}
      />

      <div className="relative z-10 w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-dialog animate-dialog-in">
        <h2 className="text-lg font-medium text-foreground">{title}</h2>
        <p className="mt-2 text-sm leading-5 text-subtle">{description}</p>
        <div className="mt-6 flex items-center justify-end gap-2">
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            {cancelText}
          </Button>
          <Button variant={confirmVariant} onClick={handleConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export { ConfirmDialog };
