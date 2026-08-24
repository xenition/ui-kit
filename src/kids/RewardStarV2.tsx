import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';
import type { RewardStarProps } from './RewardStar';

/** Same public contract as {@link RewardStar} — a drop-in alternate design. */
export type RewardStarV2Props = RewardStarProps;

/**
 * RewardStar, redesigned (v2): a **big star-burst tile**. One oversized filled
 * star sits in a tinted circular burst with the count set large as "value / max"
 * beneath, and the optional caption below that. Tapping the tile awards the next
 * star — `onReward(value + 1)`, wrapping to 1 once full — the reward gesture as a
 * single celebratory press. Distinct from v1's inline star row. Same props,
 * token-only.
 */
export const RewardStarV2 = React.forwardRef<HTMLDivElement, RewardStarV2Props>(function RewardStarV2(
  { value, max = 5, size = 'md', label, color = 'warn', readOnly = false, onReward, className, ...rest },
  ref
) {
  const total = Math.max(0, Math.floor(max));
  const filled = Math.max(0, Math.min(total, Math.floor(value)));
  const interactive = !readOnly && typeof onReward === 'function';
  const burst = size === 'lg' ? 'h-24 w-24' : size === 'sm' ? 'h-16 w-16' : 'h-20 w-20';

  const award = (): void => onReward?.(filled >= total ? 1 : filled + 1);

  const inner = (
    <>
      <div className={cn('flex items-center justify-center rounded-full bg-warn/10', burst)}>
        <Icon glyph={filled > 0 ? '★' : '☆'} size="3xl" color={filled > 0 ? color : 'muted'} />
      </div>
      <p className="text-lg font-bold text-on-surface">
        {filled}
        <span className="text-muted"> / {total}</span>
      </p>
      {label ? <span className="text-sm text-muted">{label}</span> : null}
    </>
  );

  const a11y = `Reward: ${filled} of ${total} stars${label ? `, ${label}` : ''}`;

  if (!interactive) {
    return (
      <div
        ref={ref}
        data-xen-reward-star=""
        role="img"
        aria-label={a11y}
        className={cn('flex flex-col items-center gap-1.5', className)}
        {...rest}
      >
        {inner}
      </div>
    );
  }

  return (
    <div ref={ref} data-xen-reward-star="" className={cn('inline-flex', className)} {...rest}>
      <button
        type="button"
        aria-label={`${a11y}. Give a star`}
        onClick={award}
        className="flex flex-col items-center gap-1.5 rounded-lg p-1 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-reduce:transition-none motion-reduce:hover:scale-100"
      >
        {inner}
      </button>
    </div>
  );
});
