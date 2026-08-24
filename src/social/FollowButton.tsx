import * as React from 'react';
import { Button, type ButtonSize } from '../primitives/Button';
import { Spinner } from '../primitives/Spinner';

export type FollowState = 'follow' | 'following' | 'requested';

export interface FollowButtonProps {
  /** Relationship state driving the label + variant. */
  state?: FollowState;
  size?: ButtonSize;
  /** Block clicks and show a spinner (optimistic toggle in flight). */
  loading?: boolean;
  disabled?: boolean;
  /** Fires with the *current* state so the caller can compute the next one. */
  onClick?: (state: FollowState) => void;
  /** Override the three default labels. */
  labels?: Partial<Record<FollowState, string>>;
  className?: string;
}

const DEFAULT_LABELS: Record<FollowState, string> = {
  follow: 'Follow',
  following: 'Following',
  requested: 'Requested',
};

// `follow` reads as the primary CTA; once connected/pending it de-emphasizes
// to a bordered secondary so "unfollow"/"cancel" is a deliberate second tap.
const VARIANT: Record<FollowState, 'primary' | 'secondary'> = {
  follow: 'primary',
  following: 'secondary',
  requested: 'secondary',
};

/**
 * Follow / Following / Requested toggle built on the primitive `Button`. The
 * three states cover public follow, an already-following relationship, and a
 * pending request to a private account. Stateless — the parent owns `state`
 * and flips it in `onClick`. Web parity of the native `FollowButton`; token-only
 * via `Button`. `aria-pressed` marks the connected/pending states.
 */
export const FollowButton = React.forwardRef<HTMLButtonElement, FollowButtonProps>(
  function FollowButton(
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
        className={className}
      >
        {loading ? <Spinner size="sm" aria-label={label} /> : label}
      </Button>
    );
  }
);
