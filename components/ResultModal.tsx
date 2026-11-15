"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface ResultModalProps {
  labelledBy: string;
  children: ReactNode;
  /** Decorative layer drawn behind the panel (confetti). */
  backdrop?: ReactNode;
  /** Decorative layer drawn over the panel (confetti burst). */
  overlay?: ReactNode;
}

/** Full-screen modal shell. Esc is ignored: the two buttons are the way out of a finished round. */
export function ResultModal({ labelledBy, children, backdrop, overlay }: ResultModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    return () => {
      if (dialog?.open) dialog.close();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={labelledBy}
      onCancel={(event) => event.preventDefault()}
      className="on-paper fixed inset-0 m-0 h-full max-h-none w-full max-w-none overflow-hidden bg-transparent p-0 text-ink"
    >
      {backdrop}
      <div className="relative z-10 h-full overflow-y-auto">
        <div className="mx-auto grid min-h-full w-full max-w-[480px] place-items-center px-4 py-6">
          {children}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 z-20">{overlay}</div>
    </dialog>
  );
}
