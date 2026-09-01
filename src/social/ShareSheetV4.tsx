import * as React from 'react';
import { cn } from '../primitives/cn';
import type { ShareSheetProps } from './ShareSheet';

/** Drop-in for {@link ShareSheetProps} — same props, the V4 "feed" design. */
export type ShareSheetV4Props = ShareSheetProps;

/**
 * ShareSheet — **V4** "feed" design (web parity of the native V4). A clean,
 * airy bottom share surface: a dimmed backdrop and a rounded panel holding a
 * wrapping grid of share targets — each a soft-primary tinted glyph disc with a
 * ≥44px tap target and a label — plus a full-width copy-link/Cancel row. Same
 * props/behavior as {@link ShareSheetProps} (self-contained overlay, empty-list
 * handling, `onSelect`/`onClose`); all colors from `--xen-*` token classes (no
 * literals). `role="dialog"`.
 */
export const ShareSheetV4 = React.forwardRef<HTMLDivElement, ShareSheetV4Props>(function ShareSheetV4(
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
        className="relative flex w-full max-w-md flex-col gap-lg rounded-t-lg border border-border bg-surface p-lg"
      >
        <div className="flex flex-col gap-0.5">
          <p className="text-lg font-extrabold text-on-surface">{title}</p>
          {subtitle ? <p className="truncate text-sm text-muted">{subtitle}</p> : null}
        </div>

        {targets.length === 0 ? (
          <p className="py-md text-sm text-muted">{emptyLabel}</p>
        ) : (
          <div className="flex flex-wrap gap-lg">
            {targets.map((t) => (
              <button
                key={t.id}
                type="button"
                role="menuitem"
                aria-label={t.label}
                onClick={onSelect ? () => onSelect(t.id) : undefined}
                className="group flex w-[4.5rem] flex-col items-center gap-xs transition-opacity hover:opacity-90"
              >
                <span
                  className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-2xl text-primary transition-colors group-hover:bg-primary/20 group-active:bg-primary/20"
                  aria-hidden="true"
                >
                  {t.icon ?? '↗'}
                </span>
                <span className="w-full truncate text-center text-xs font-medium text-on-surface">{t.label}</span>
              </button>
            ))}
          </div>
        )}

        <button
          type="button"
          aria-label="Cancel"
          onClick={onClose}
          className="min-h-[44px] rounded-md bg-primary/10 py-md text-center text-base font-semibold text-primary transition-colors hover:bg-primary/20 active:bg-primary/20"
        >
          Cancel
        </button>
      </div>
    </div>
  );
});
