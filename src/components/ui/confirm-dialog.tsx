import React from "react";
import { Button } from "./button";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  /** Shown above the title, e.g. the thing being deleted */
  preview?: React.ReactNode;
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
  preview,
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
    // Native modal dialog: top layer, focus trap and Escape for free
    <dialog
      ref={(el) => {
        if (el && !el.open) el.showModal();
      }}
      data-slot="confirm-dialog"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
      onCancel={(e) => {
        e.preventDefault();
        onOpenChange(false);
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onOpenChange(false);
      }}
      className="m-auto w-[calc(100%-32px)] max-w-sm animate-dialog-in rounded-[20px] border border-border bg-card p-0 text-foreground shadow-dialog backdrop:animate-fade-in backdrop:bg-foreground/30"
    >
      <div className="p-6">
        {preview && <div className="mb-5 flex">{preview}</div>}
        <h2 id="confirm-dialog-title" className="text-lg font-medium text-foreground">
          {title}
        </h2>
        <p id="confirm-dialog-description" className="mt-2 text-sm leading-5 text-subtle">
          {description}
        </p>
        <div className="mt-6 grid grid-cols-2 gap-2">
          <Button autoFocus variant="secondary" onClick={() => onOpenChange(false)}>
            {cancelText}
          </Button>
          <Button data-slot="confirm" variant={confirmVariant} onClick={handleConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </dialog>
  );
};

export { ConfirmDialog };
