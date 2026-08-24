import * as React from 'react';
import { createPortal } from 'react-dom';
import { cn } from './cn';

export interface ActionSheetAction {
  label: string;
  onSelect?: () => void;
  /** Render in the danger tone (destructive action). */
  destructive?: boolean;
  disabled?: boolean;
}

export interface ActionSheetProps {
  open: boolean;
  onClose: () => void;
  /** Optional heading above the action list. */
  title?: string;
  actions: ActionSheetAction[];
  /** Cancel-button label (default `Cancel`). */
  cancelLabel?: string;
  className?: string;
}

/**
 * iOS-style action sheet — a bottom-anchored dialog presenting a token-bound
 * list of choices plus a separated Cancel affordance, over a scrim. Portals to
 * `<body>`; closes on scrim click or Escape. Distinct from `Drawer(side="bottom")`
 * (arbitrary content) by the grouped list + destructive/cancel convention.
 * Destructive actions use the `danger` token. No literal colors.
 */
export function ActionSheet({
  open,
  onClose,
  title,
  actions,
  cancelLabel = 'Cancel',
  className,
}: ActionSheetProps): React.ReactElement | null {
  const panelRef = React.useRef<HTMLDivElement>(null);

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
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end"
      role="dialog"
      aria-modal="true"
      aria-label={title ?? 'Actions'}
    >
      <div className="absolute inset-0 bg-neutral-950/50" onClick={onClose} />
      <div
        ref={panelRef}
        tabIndex={-1}
        className={cn('relative flex flex-col gap-2 p-3 outline-none', className)}
      >
        <div
          role="menu"
          className="overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface"
        >
          {title && (
            <div className="border-b border-border px-4 py-3 text-center text-sm text-muted">
              {title}
            </div>
          )}
          {actions.map((action, i) => (
            <button
              key={i}
              type="button"
              role="menuitem"
              disabled={action.disabled}
              onClick={() => {
                action.onSelect?.();
                onClose();
              }}
              className={cn(
                'w-full px-4 py-3 text-center text-base font-medium transition-colors',
                'hover:bg-neutral-100 disabled:pointer-events-none disabled:opacity-50',
                i === 0 && !title ? '' : 'border-t border-border',
                action.destructive ? 'text-danger' : 'text-primary'
              )}
            >
              {action.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={onClose}
          className={cn(
            'w-full rounded-[var(--xen-radius-lg)] border border-border bg-surface px-4 py-3',
            'text-base font-semibold text-on-surface transition-colors hover:bg-neutral-100'
          )}
        >
          {cancelLabel}
        </button>
      </div>
    </div>,
    document.body
  );
}
