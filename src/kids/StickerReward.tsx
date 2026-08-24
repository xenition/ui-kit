import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Icon } from '../primitives';
import { EmptyState } from '../commerce';

export interface Sticker {
  id?: string | number;
  /** The sticker emoji/glyph. */
  glyph: string;
  /** Optional caption under the sticker. */
  label?: string;
  /** Whether the child has earned/unlocked it. */
  earned?: boolean;
}

export interface StickerRewardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Stickers to display in the grid. */
  stickers: Sticker[];
  /** Section title. */
  title?: string;
  /** Columns in the grid. */
  columns?: number;
  /** Loading placeholder state. */
  loading?: boolean;
  /** Copy shown when there are no stickers. */
  emptyLabel?: string;
  /** Fires with the tapped sticker's index (e.g. to collect / redeem it). */
  onCollect?: (index: number) => void;
}

/**
 * A sticker-collection reward board: a grid of earned + locked stickers with an
 * earned/total summary. Locked stickers are dimmed and marked with a lock glyph
 * (state, not color alone). Tapping a sticker fires `onCollect(index)`. Renders
 * the shared {@link EmptyState} when there are none. Token-bound throughout — no
 * literal colors.
 */
export const StickerReward = React.forwardRef<HTMLDivElement, StickerRewardProps>(
  function StickerReward(
    { stickers, title = 'Sticker rewards', columns = 4, loading = false, emptyLabel = 'No stickers yet', onCollect, className, ...rest },
    ref
  ) {
    const cols = Math.max(1, Math.floor(columns));

    if (loading) {
      return (
        <Card ref={ref} data-xen-sticker-reward="" aria-label="Loading stickers" className={className} {...rest}>
          <div className="space-y-2">
            <div className="h-3 w-2/5 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" />
            <div className="h-12 w-full animate-pulse rounded-[var(--xen-radius-md)] bg-neutral-200" />
          </div>
        </Card>
      );
    }

    if (stickers.length === 0) {
      return (
        <EmptyState
          ref={ref}
          data-xen-sticker-reward=""
          aria-label={emptyLabel}
          className={className}
          icon={<span className="text-3xl">✨</span>}
          title={title}
          description={emptyLabel}
          {...rest}
        />
      );
    }

    const earnedCount = stickers.filter((s) => s.earned).length;

    return (
      <Card ref={ref} data-xen-sticker-reward="" className={className} {...rest}>
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-on-surface">{title}</span>
          <span className="text-sm font-semibold text-muted">
            {earnedCount}/{stickers.length}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {stickers.map((sticker, i) => {
            const earned = sticker.earned ?? false;
            const a11y = `${sticker.label ?? 'Sticker'}, ${earned ? 'earned' : 'locked'}`;
            const cell = (
              <span className="flex flex-col items-center gap-0.5 py-2">
                <span
                  className={cn(
                    'flex h-11 w-11 items-center justify-center rounded-full border',
                    earned ? 'border-primary opacity-100' : 'border-border opacity-45'
                  )}
                >
                  <Icon glyph={earned ? sticker.glyph : '🔒'} size="xl" />
                </span>
                {sticker.label ? (
                  <span className="block max-w-full truncate text-xs text-muted">{sticker.label}</span>
                ) : null}
              </span>
            );

            const cellStyle: React.CSSProperties = { width: `${100 / cols}%` };
            if (!onCollect) {
              return (
                <div key={sticker.id ?? i} aria-label={a11y} style={cellStyle}>
                  {cell}
                </div>
              );
            }
            return (
              <button
                key={sticker.id ?? i}
                type="button"
                aria-label={a11y}
                onClick={() => onCollect(i)}
                style={cellStyle}
                className="transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {cell}
              </button>
            );
          })}
        </div>
      </Card>
    );
  }
);
