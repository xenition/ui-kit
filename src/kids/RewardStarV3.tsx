import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';
import type { IconSize } from '../primitives';
import type { RewardStarProps, RewardStarSize } from './RewardStar';

/** Same public contract as {@link RewardStar} — a drop-in alternate design. */
export type RewardStarV3Props = RewardStarProps;

const SIZE_KEY: Record<RewardStarSize, IconSize> = { sm: 'sm', md: 'base', lg: 'lg' };

/**
 * RewardStar, redesigned (v3): a **tight inline star strip**. The stars pack on
 * one line with a small gap and the caption trails inline to the right rather
 * than stacking beneath — a compact readout for list rows and headers. Filled
 * state stays glyph + a11y (never color alone). Same props, token-only.
 */
export const RewardStarV3 = React.forwardRef<HTMLDivElement, RewardStarV3Props>(function RewardStarV3(
  { value, max = 5, size = 'md', label, color = 'warn', readOnly = false, onReward, className, ...rest },
  ref
) {
  const total = Math.max(0, Math.floor(max));
  const filled = Math.max(0, Math.min(total, Math.floor(value)));
  const iconSize = SIZE_KEY[size] ?? 'base';
  const interactive = !readOnly && typeof onReward === 'function';

  return (
    <div
      ref={ref}
      data-xen-reward-star=""
      role={interactive ? 'group' : 'img'}
      aria-label={`Reward: ${filled} of ${total} stars${label ? `, ${label}` : ''}`}
      className={cn('inline-flex items-center gap-2', className)}
      {...rest}
    >
      <div className="flex items-center gap-0.5">
        {Array.from({ length: total }).map((_, i) => {
          const isFilled = i < filled;
          const glyph = <Icon glyph={isFilled ? '★' : '☆'} size={iconSize} color={isFilled ? color : 'muted'} />;
          if (!interactive) return <span key={i}>{glyph}</span>;
          return (
            <button
              key={i}
              type="button"
              aria-label={`Give ${i + 1} star${i === 0 ? '' : 's'}`}
              onClick={() => onReward?.(i + 1)}
              className="rounded-sm transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {glyph}
            </button>
          );
        })}
      </div>
      {label ? <span className="text-xs text-muted">{label}</span> : null}
    </div>
  );
});
