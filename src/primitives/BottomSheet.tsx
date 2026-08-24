import * as React from 'react';
import { createPortal } from 'react-dom';
import { cn } from './cn';

export interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  /** Sheet height as a fraction of the viewport (0–1). Default `0.5`. */
  snap?: number;
  className?: string;
}

/**
 * Bottom sheet — a bottom-anchored dialog panel with a top grabber handle,
 * sliding up over a scrim. Portals to `<body>`; closes on scrim click, the
 * grabber, or Escape. Distinct from the side `Drawer` by its bottom anchor +
 * grabber and `snap` height. Panel is `surface`, grabber the `border` token.
 * No literal colors.
 */
export function BottomSheet({
  open,
  onClose,
  title,
  children,
  snap = 0.5,
  className,
}: BottomSheetProps): React.ReactElement | null {
  const panelRef = React.useRef<HTMLDivElement>(null);
  const height = `${Math.round(Math.max(0.1, Math.min(1, snap)) * 100)}vh`;

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    panelRef.current?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex flex-col justify-end" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-neutral-950/50" onClick={onClose} />
      <div
        ref={panelRef}
        tabIndex={-1}
        style={{ height }}
        className={cn(
          'relative flex w-full flex-col overflow-hidden bg-surface text-on-surface shadow-xl outline-none',
          'rounded-t-[var(--xen-radius-lg)]',
          className
        )}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="flex shrink-0 items-center justify-center py-3"
        >
          <span className="h-1 w-10 rounded-full bg-border" />
        </button>
        {title != null && (
          <h2 className="mb-2 shrink-0 px-4 text-lg font-semibold text-on-surface">{title}</h2>
        )}
        <div className="min-h-0 flex-1 overflow-auto px-4 pb-4">{children}</div>
      </div>
    </div>,
    document.body
  );
}
