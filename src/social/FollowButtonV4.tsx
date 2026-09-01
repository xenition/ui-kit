import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives/Button';
import { Spinner } from '../primitives/Spinner';
import type { FollowButtonProps, FollowState } from './FollowButton';

/** Drop-in for {@link FollowButtonProps} — same props, the V4 "feed" design. */
export type FollowButtonV4Props = FollowButtonProps;

const DEFAULT_LABELS: Record<FollowState, string> = {
  follow: 'Follow',
  following: 'Following',
  requested: 'Requested',
};

// V4 "feed" identity: one accent = primary. `follow` is the solid-primary CTA;
// `following` de-emphasizes to a soft-primary tint (a deliberate second tap to
// unfollow); `requested` reads muted while a private request is pending.
const VARIANT: Record<FollowState, 'primary' | 'soft' | 'ghost'> = {
  follow: 'primary',
  following: 'soft',
  requested: 'ghost',
};

/**
 * FollowButton — **V4** "feed" design (web parity of the native V4). The clean
 * pill toggle over Follow / Following / Requested: `follow` is a solid-**primary**
 * pill, `following` a soft-primary tint, `requested` a muted state — one accent,
 * big ≥44px tap target, fully rounded. Stateless: the parent owns `state` and
 * flips it in `onClick`. Same props/behavior as {@link FollowButtonProps}; all
 * colors from `--xen-*` token classes (no literals). `aria-pressed` marks the
 * connected/pending states.
 */
export const FollowButtonV4 = React.forwardRef<HTMLButtonElement, FollowButtonV4Props>(
  function FollowButtonV4(
    { state = 'follow', size = 'sm', loading = false, disabled = false, onClick, labels, className },
    ref
  ) {
    const label = labels?.[state] ?? DEFAULT_LABELS[state];
    return (
      <Button
        ref={ref as React.Ref<HTMLButtonElement>}
        variant={VARIANT[state]}
        size={size}
        disabled={disabled || loading}
        aria-label={label}
        aria-pressed={state !== 'follow'}
        aria-busy={loading || undefined}
        onClick={onClick ? () => onClick(state) : undefined}
        className={cn(
          'min-h-[44px] rounded-full px-lg font-semibold',
          state === 'requested' && 'text-muted',
          className
        )}
      >
        {loading ? <Spinner size="sm" aria-label={label} /> : label}
      </Button>
    );
  }
);
