import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { EmptyState } from '../commerce/EmptyState';
import {
  ACCENT_BG_CLASS,
  ACCENT_BORDER_CLASS,
  ACCENT_ICON_COLOR,
  ACCENT_SOFT_BG_CLASS,
  ACCENT_STRONG_BG_CLASS,
  ACCENT_TEXT_CLASS,
  padAccentKey,
} from './types';
import type { TrackPadProps } from './TrackPad';

/** Drop-in for {@link TrackPadProps} — same props, the V4 "session" design. */
export type TrackPadV4Props = TrackPadProps;

/**
 * TrackPad — **V4** "session" design (web parity of the native V4). The tactile
 * take on a drum / sample pad grid: pads are rounded token tiles carrying their
 * per-cell accent (position-derived or `pad.color`) as a soft tint, and an
 * `activePadIds` pad lights with a stronger accent fill + a heavier accent ring
 * + a filled corner dot + bold label (never color alone). No gradient —
 * performance surfaces stay clean and tactile; ≥44px tap targets. Honors both
 * `variant`s (`grid` / `compact`), the empty-cell state and
 * `onPadPress(pad, index)` behavior identical to {@link TrackPadProps}. Renders
 * an `EmptyState` when there are no pads. Every accent traces to a `--xen-*`
 * token class (no literals).
 */
export const TrackPadV4 = React.forwardRef<HTMLDivElement, TrackPadV4Props>(function TrackPadV4(
  {
    pads,
    columns = 4,
    variant = 'grid',
    activePadIds,
    label,
    emptyLabel = 'No pads assigned',
    onPadPress,
    className,
    ...rest
  },
  ref
) {
  if (pads.length === 0) {
    return (
      <EmptyState
        ref={ref}
        icon={<Icon glyph="🥁" size="2xl" color="muted" aria-label="Pads" />}
        title={emptyLabel}
        className={className}
        {...rest}
      />
    );
  }

  const cols = Math.max(1, Math.trunc(Number.isFinite(columns) ? columns : 4));
  const active = new Set(activePadIds ?? []);
  const minH = variant === 'compact' ? 'min-h-[44px]' : 'min-h-[64px]';

  return (
    <div ref={ref} className={cn('flex flex-col gap-[var(--xen-space-sm)]', className)} {...rest}>
      {label ? (
        <p role="heading" aria-level={3} className="text-base font-bold text-on-surface">
          {label}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-[var(--xen-space-xs)]">
        {pads.map((pad, i) => {
          // Preserve the per-cell accent exactly as the base: explicit
          // `pad.color`, else position-derived, resolved through token classes.
          const accent = pad.color ?? padAccentKey(i);
          const isEmpty = pad.empty === true;
          const isActive = active.has(pad.id);
          const name = pad.label ?? pad.note ?? `Pad ${i + 1}`;

          return (
            <div key={pad.id} className="p-0.5" style={{ width: `${100 / cols}%` }}>
              <button
                type="button"
                disabled={isEmpty || !onPadPress}
                aria-pressed={isActive}
                aria-label={isEmpty ? `${name}, empty` : name}
                onClick={() => onPadPress?.(pad, i)}
                className={cn(
                  'relative flex w-full flex-col items-center justify-center gap-1',
                  minH,
                  'rounded-[var(--xen-radius-md)] border transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
                  isEmpty
                    ? 'border-dashed border-border bg-surface opacity-45'
                    : cn(
                        isActive
                          ? cn(
                              'border-2 shadow-sm',
                              ACCENT_BORDER_CLASS[accent],
                              ACCENT_STRONG_BG_CLASS[accent]
                            )
                          : cn('border-border', ACCENT_SOFT_BG_CLASS[accent]),
                        'hover:opacity-90'
                      )
                )}
              >
                {isActive ? (
                  // Non-color "playing" affordance: a filled accent corner dot.
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute right-1 top-1 h-2 w-2 rounded-full',
                      ACCENT_BG_CLASS[accent]
                    )}
                  />
                ) : null}
                {pad.glyph ? (
                  <Icon glyph={pad.glyph} size="lg" color={isEmpty ? 'muted' : ACCENT_ICON_COLOR[accent]} />
                ) : null}
                <span
                  className={cn(
                    'max-w-full truncate text-xs',
                    isEmpty ? 'text-muted' : 'text-on-surface',
                    isActive ? 'font-bold' : 'font-semibold',
                    !isEmpty && ACCENT_TEXT_CLASS[accent]
                  )}
                >
                  {isEmpty ? '—' : name}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
});
