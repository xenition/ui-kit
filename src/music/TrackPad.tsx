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
  type PadCell,
} from './types';

export type TrackPadVariant = 'grid' | 'compact';

export interface TrackPadProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The pads to render (drum / sample cells). */
  pads: PadCell[];
  /** Grid columns (default `4`). Clamped to `>= 1`. */
  columns?: number;
  /**
   * - `grid` — square, labelled pads with a glyph (default).
   * - `compact` — shorter pads for a tight strip.
   */
  variant?: TrackPadVariant;
  /** Ids of pads currently triggered/lit (playing state). */
  activePadIds?: string[];
  /** Optional header label above the grid. */
  label?: string;
  /** Message shown when there are no pads. */
  emptyLabel?: string;
  /** Fires when a (non-empty) pad is hit, with the pad and its index. */
  onPadPress?: (pad: PadCell, index: number) => void;
}

/**
 * A drum / sample pad grid — a UI shell only, it triggers no audio. The DOM
 * parity of `native/music`'s `TrackPad`: renders `pads` as a wrapped grid of
 * real `<button>` cells; `activePadIds` lights a pad's "playing" state via a
 * heavier border + a filled corner dot + bold label (never color alone), and
 * `empty` pads render dimmed and non-triggering. Hitting a live pad fires
 * `onPadPress(pad, index)`. Renders an `EmptyState` when there are no pads. Pad
 * accents come from semantic token classes (position-derived or `pad.color`);
 * no literal colors.
 */
export const TrackPad = React.forwardRef<HTMLDivElement, TrackPadProps>(function TrackPad(
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
          const accent = pad.color ?? padAccentKey(i);
          const isEmpty = pad.empty === true;
          const isActive = active.has(pad.id);
          const name = pad.label ?? pad.note ?? `Pad ${i + 1}`;

          return (
            <div
              key={pad.id}
              className="p-0.5"
              style={{ width: `${100 / cols}%` }}
            >
              <button
                type="button"
                disabled={isEmpty || !onPadPress}
                aria-pressed={isActive}
                aria-label={isEmpty ? `${name}, empty` : name}
                onClick={() => onPadPress?.(pad, i)}
                className={cn(
                  'relative flex w-full flex-col items-center justify-center gap-0.5',
                  minH,
                  'rounded-[var(--xen-radius-md)] border transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
                  isEmpty
                    ? 'border-border bg-surface opacity-45'
                    : cn(
                        isActive
                          ? cn('border-2', ACCENT_BORDER_CLASS[accent], ACCENT_STRONG_BG_CLASS[accent])
                          : cn('border-border', ACCENT_SOFT_BG_CLASS[accent]),
                        'hover:opacity-90'
                      )
                )}
              >
                {isActive ? (
                  // Non-color "playing" affordance: a filled corner dot.
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute right-1 top-1 h-1.5 w-1.5 rounded-full',
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
                    isActive ? 'font-bold' : 'font-medium',
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
