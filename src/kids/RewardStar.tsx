import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';
import type { IconColor, IconSize } from '../primitives';

export type RewardStarSize = 'sm' | 'md' | 'lg';

const SIZE_KEY: Record<RewardStarSize, IconSize> = {
  sm: 'lg',
  md: 'xl',
  lg: '2xl',
};

export interface RewardStarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  /** Number of filled stars. */
  value: number;
  /** Total stars. */
  max?: number;
  /** Star glyph size from the type scale. */
  size?: RewardStarSize;
  /** Optional caption below the stars, e.g. "Great job!". */
  label?: string;
  /** Theme color slot for filled stars. */
  color?: IconColor;
  /** When true the stars are display-only (no press handling). */
  readOnly?: boolean;
  /** Fires with the new star count (1..max) when a star is tapped. */
  onReward?: (next: number) => void;
}

/**
 * A tappable star-reward control: a row of star glyphs where the first `value`
 * are filled. Tapping the Nth star fires `onReward(N)` — the reward gesture.
 * Filled state is conveyed by a solid vs. outline glyph plus the a11y label
 * (never color alone). Filled color resolves to an {@link Icon} token slot; no
 * literal colors.
 */
export const RewardStar = React.forwardRef<HTMLDivElement, RewardStarProps>(function RewardStar(
  { value, max = 5, size = 'md', label, color = 'warn', readOnly = false, onReward, className, ...rest },
  ref
) {
  const total = Math.max(0, Math.floor(max));
  const filled = Math.max(0, Math.min(total, Math.floor(value)));
  const iconSize = SIZE_KEY[size] ?? 'xl';
  const interactive = !readOnly && typeof onReward === 'function';

  return (
    <div
      ref={ref}
      data-xen-reward-star=""
      role={interactive ? 'group' : 'img'}
      aria-label={`Reward: ${filled} of ${total} stars${label ? `, ${label}` : ''}`}
      className={cn('flex flex-col items-start gap-1', className)}
      {...rest}
    >
      <div className="flex gap-1">
        {Array.from({ length: total }).map((_, i) => {
          const isFilled = i < filled;
          const glyph = (
            <Icon glyph={isFilled ? '★' : '☆'} size={iconSize} color={isFilled ? color : 'muted'} />
          );
          if (!interactive) {
            return <span key={i}>{glyph}</span>;
          }
          return (
            <button
              key={i}
              type="button"
              aria-label={`Give ${i + 1} star${i === 0 ? '' : 's'}`}
              onClick={() => onReward?.(i + 1)}
              className="rounded-[var(--xen-radius-sm)] transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {glyph}
            </button>
          );
        })}
      </div>
      {label ? <span className="text-sm text-muted">{label}</span> : null}
    </div>
  );
});
