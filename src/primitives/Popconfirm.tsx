import * as React from 'react';
import { useDismiss } from './useDismiss';

export interface PopconfirmProps {
  /** Clickable trigger (e.g. a Delete button). */
  trigger: React.ReactNode;
  message: React.ReactNode;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
}

/** Inline confirmation popover bound to the theme tokens — for destructive actions. */
export function Popconfirm({
  trigger,
  message,
  onConfirm,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
}: PopconfirmProps): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const ref = useDismiss<HTMLDivElement>(open, () => setOpen(false));
  return (
    <div ref={ref} className="relative inline-block">
      <span onClick={() => setOpen((o) => !o)}>{trigger}</span>
      {open && (
        <div
          role="dialog"
          className="absolute z-50 mt-1 w-56 rounded-[var(--xen-radius-md)] border border-border bg-surface p-3 shadow-lg"
        >
          <p className="mb-3 text-sm text-on-surface">{message}</p>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-[var(--xen-radius-sm)] px-2 py-1 text-xs text-muted transition-colors hover:text-on-surface"
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirm();
                setOpen(false);
              }}
              className="rounded-[var(--xen-radius-sm)] bg-danger px-2 py-1 text-xs text-on-danger"
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
