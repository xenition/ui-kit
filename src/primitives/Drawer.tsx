import * as React from 'react';
import { createPortal } from 'react-dom';
import { cn } from './cn';

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: DrawerSide;
  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const POS: Record<DrawerSide, string> = {
  left: 'inset-y-0 left-0 h-full w-80 max-w-[85vw]',
  right: 'inset-y-0 right-0 h-full w-80 max-w-[85vw]',
  top: 'inset-x-0 top-0 w-full max-h-[85vh]',
  bottom: 'inset-x-0 bottom-0 w-full max-h-[85vh]',
};

/** Side sheet / drawer bound to the theme tokens. Portals to <body>; closes on backdrop / Escape. */
export function Drawer({
  open,
  onClose,
  side = 'right',
  title,
  children,
  className,
}: DrawerProps): React.ReactElement | null {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') return null;
  return createPortal(
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-neutral-950/50" onClick={onClose} />
      <div className={cn('absolute overflow-auto bg-surface p-4 text-on-surface shadow-xl', POS[side], className)}>
        {title != null && <h2 className="mb-3 text-lg font-semibold text-on-surface">{title}</h2>}
        {children}
      </div>
    </div>,
    document.body
  );
}
