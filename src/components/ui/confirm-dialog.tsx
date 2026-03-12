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
      {/* Soft backdrop */}
      <div
        className="fixed inset-0 bg-[#1E293B]/50 backdrop-blur-sm rounded-4xl"
        onClick={() => onOpenChange(false)}
      />

      {/* Dialog — pops in with animation */}
      <div className="relative z-10 w-full max-w-md bg-white border-2 border-[#1E293B] rounded-2xl shadow-[8px_8px_0px_0px_#1E293B] animate-pop-in">
        {/* Decorative corner accent */}
        <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-[#F472B6] border-2 border-[#1E293B]" />

        <div className="p-6">
          <h2 className="font-display text-xl font-bold text-[#1E293B]">
            {title}
          </h2>
          <p className="text-sm text-[#64748B] mt-2 font-medium">
            {description}
          </p>
        </div>
        <div className="flex items-center justify-end gap-3 border-t-2 border-[#E2E8F0] p-4">
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
