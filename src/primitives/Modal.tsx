import * as React from 'react';
import { cn } from './cn';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

/** Themed modal dialog. Controlled via `open`/`onClose`; closes on backdrop click or Escape. */
export function Modal({
  open,
  onClose,
  title,
  children,
  className,
}: ModalProps): React.ReactElement | null {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={cn(
          'w-full max-w-lg rounded-[var(--xen-radius-lg)] bg-surface p-6 shadow-xl',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {title != null && (
          <h2 className="mb-4 text-lg font-semibold text-on-surface">{title}</h2>
        )}
        {children}
      </div>
    </div>
  );
}
