import * as React from 'react';
import { cn } from '../primitives/cn';

export interface ShareTarget {
  id: string;
  /** Target name (e.g. `Messages`, `Copy link`). */
  label: string;
  /** Emoji/glyph icon. */
  icon?: string;
}

export interface ShareSheetProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Controls mount — the sheet renders nothing when `false`. */
  visible: boolean;
  /** Sheet heading. Default `Share`. */
  title?: string;
  /** Optional subtitle (e.g. the URL/permalink being shared). */
  subtitle?: string;
  /** Share destinations shown in a wrapping grid. */
  targets: ReadonlyArray<ShareTarget>;
  /** Fires with the chosen target id. */
  onSelect?: (id: string) => void;
  /** Dismiss (backdrop click or Cancel). */
  onClose?: () => void;
  /** Message shown when `targets` is empty. */
  emptyLabel?: string;
}

/**
 * A bottom share sheet: a dimmed backdrop and a rounded panel holding a grid of
 * share destinations plus a Cancel action. Self-contained overlay (renders
 * `null` while hidden) — the parent owns `visible`. Handles an empty target
 * list. Web parity of the native `ShareSheet`; token-only, `role="dialog"`.
 */
export const ShareSheet = React.forwardRef<HTMLDivElement, ShareSheetProps>(function ShareSheet(
  {
    visible,
    title = 'Share',
    subtitle,
    targets,
    onSelect,
    onClose,
    emptyLabel = 'No share options available',
    className,
    ...rest
  },
  ref
) {
  if (!visible) return null;

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className={cn('fixed inset-0 z-50 flex items-end justify-center', className)}
      {...rest}
    >
      {/* Backdrop — click to dismiss. Uses the on-surface token dimmed. */}
      <button
        type="button"
        aria-label="Dismiss"
        onClick={onClose}
        className="absolute inset-0 bg-on-surface opacity-40"
      />
      <div
        role="menu"
        className="relative flex w-full max-w-md flex-col gap-md rounded-t-lg border border-border bg-surface p-lg"
      >
        <div className="flex flex-col gap-0.5">
          <p className="text-lg font-bold text-on-surface">{title}</p>
          {subtitle ? <p className="truncate text-sm text-muted">{subtitle}</p> : null}
        </div>

        {targets.length === 0 ? (
          <p className="py-md text-sm text-muted">{emptyLabel}</p>
        ) : (
          <div className="flex flex-wrap gap-md">
            {targets.map((t) => (
              <button
                key={t.id}
                type="button"
                role="menuitem"
                aria-label={t.label}
                onClick={onSelect ? () => onSelect(t.id) : undefined}
                className="flex w-[4.5rem] flex-col items-center gap-xs transition-opacity hover:opacity-70"
              >
                <span
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-xl"
                  aria-hidden="true"
                >
                  {t.icon ?? '↗'}
                </span>
                <span className="w-full truncate text-center text-xs text-on-surface">{t.label}</span>
              </button>
            ))}
          </div>
        )}

        <button
          type="button"
          aria-label="Cancel"
          onClick={onClose}
          className="rounded-md border border-border py-md text-center text-base font-semibold text-on-surface transition-opacity hover:opacity-80"
        >
          Cancel
        </button>
      </div>
    </div>
  );
});
