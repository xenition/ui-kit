import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import type { StickerRewardProps } from './StickerReward';
import {
  cardStateVars,
  FOCUS_RING_CLASS,
  GLYPH_SLOT_CLASS,
  KIDS_CARD_CLASS,
  KIDS_CARD_GROUND_CLASS,
  spokenLine,
} from './internal/tone-v4';

export interface StickerRewardV4Props extends StickerRewardProps {
  /** Build the earned/total summary. Default `'3 of 8 earned'`. */
  formatCount?: (earned: number, total: number) => string;
  /** The word an unlocked sticker carries. Default `'earned'`. */
  earnedLabel?: string;
  /** The word a locked one carries. Default `'locked'`. */
  lockedLabel?: string;
}

/** How many placeholder cells a loading board draws. */
const SKELETON_CELLS = 8;

/**
 * **V4 sticker reward** — same props as {@link StickerReward} plus
 * `formatCount`, `earnedLabel` and `lockedLabel`.
 *
 * ## Six changes
 *
 * 1. **`columns={4}` renders four columns.** It rendered three. The cells were
 *    `width: 100/cols%` in a `flex-wrap` container with a gap, so four 25%
 *    cells plus three gaps exceeded the line and the fourth wrapped — on both
 *    twins. The board is a CSS grid of `repeat(n, minmax(0, 1fr))` now, where
 *    the gap is subtracted from the tracks rather than added to them, so the
 *    prop means what it says at any column count.
 * 2. **A locked sticker is locked, not disabled.** It was drawn at
 *    `opacity-45` — inside M3's *disabled* band — so an unearned sticker and a
 *    dead control looked identical. Locked is now a glyph and a word, at full
 *    strength, which is also the only form a colour-blind child can read.
 * 3. **Every cell clears 44.** A sticker is the most-tapped thing on the
 *    screen, by the youngest users in the product.
 * 4. **The summary is a string a caller owns.** `3/8` was assembled inline, as
 *    were "earned" and "locked" in every cell's accessible name.
 * 5. **The grid is a list.** Each cell was a bare `div` carrying an
 *    `aria-label`, which browsers ignore outright — so the earned/locked state
 *    of every sticker on a read-only board was silent. Cells are list items now
 *    and their state is real text.
 * 6. **Tokens and press.** The skeleton was `bg-neutral-200`, a ramp step that
 *    inverts under `[data-theme="dark"]`; the earned ring is `accent`, matching
 *    the native twin; press is the M3 state layer rather than
 *    `hover:opacity-70`, which is the band M3 spends on unavailable.
 */
export const StickerRewardV4 = React.forwardRef<HTMLDivElement, StickerRewardV4Props>(
  function StickerRewardV4(
    {
      stickers,
      title = 'Sticker rewards',
      columns = 4,
      loading = false,
      emptyLabel = 'No stickers yet',
      formatCount,
      earnedLabel = 'earned',
      lockedLabel = 'locked',
      onCollect,
      className,
      ...rest
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    }, []);

    const cols = Math.max(1, Math.floor(Number.isFinite(columns) ? columns : 1));
    // The gap comes out of the tracks, not off the end of the line — which is
    // the whole reason the base lost a column.
    const gridStyle: React.CSSProperties = {
      gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
    };
    const shell = cn('flex flex-col gap-md', KIDS_CARD_CLASS, KIDS_CARD_GROUND_CLASS, className);

    if (loading) {
      return (
        <div
          {...rest}
          ref={ref}
          data-xen-sticker-reward=""
          role="status"
          aria-live="polite"
          aria-label={title}
          className={shell}
        >
          <SkeletonV4 className="h-3 w-2/5" />
          <div className="grid gap-sm" style={gridStyle}>
            {Array.from({ length: SKELETON_CELLS }).map((_, index) => (
              <SkeletonV4 key={index} className={cn(GLYPH_SLOT_CLASS, 'rounded-full')} />
            ))}
          </div>
        </div>
      );
    }

    const list = Array.isArray(stickers) ? stickers : [];

    if (list.length === 0) {
      return (
        <EmptyStateV4
          {...rest}
          ref={ref}
          data-xen-sticker-reward=""
          className={className}
          icon={<span className="text-3xl">✨</span>}
          title={title}
          description={emptyLabel}
        />
      );
    }

    const earnedCount = list.filter((sticker) => sticker.earned).length;
    const summary = (formatCount ?? ((earned: number, total: number) => `${earned} of ${total} earned`))(
      earnedCount,
      list.length
    );

    return (
      <div {...rest} ref={ref} data-xen-sticker-reward="" className={shell}>
        <div className="flex items-center justify-between gap-sm">
          <span className="text-base font-semibold text-on-card">{title}</span>
          <span className="text-sm font-semibold text-muted-text">{summary}</span>
        </div>

        <ul className="grid gap-sm" style={gridStyle} aria-label={summary}>
          {list.map((sticker, index) => {
            const earned = sticker.earned ?? false;
            const stateWord = earned ? earnedLabel : lockedLabel;
            const name = spokenLine([sticker.label, stateWord]);

            const face = (
              <>
                <span
                  aria-hidden="true"
                  className={cn(
                    GLYPH_SLOT_CLASS,
                    'rounded-full border text-xl leading-none',
                    earned ? 'border-accent' : 'border-border'
                  )}
                >
                  {earned ? sticker.glyph : '🔒'}
                </span>
                {sticker.label ? (
                  <span className="block max-w-full truncate text-xs text-muted-text">
                    {sticker.label}
                  </span>
                ) : null}
              </>
            );

            return (
              <li key={sticker.id ?? index} className="flex">
                {onCollect ? (
                  <button
                    type="button"
                    aria-label={name}
                    onClick={() => onCollect(index)}
                    data-xen-v4-state=""
                    style={cardStateVars()}
                    className={cn(
                      'flex w-full flex-col items-center gap-xs rounded-[var(--xen-radius-md)]',
                      'bg-transparent py-sm',
                      MIN_TAP_CLASS,
                      FOCUS_RING_CLASS
                    )}
                  >
                    {face}
                  </button>
                ) : (
                  <span className="flex w-full flex-col items-center gap-xs py-sm">
                    {face}
                    {/*
                      The base put this on a bare `div` as an `aria-label`,
                      which browsers ignore — so on a read-only board no
                      sticker's state was announced at all.
                    */}
                    <span className="sr-only">{name}</span>
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);
