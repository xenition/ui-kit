import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { Button, type ButtonSize } from '../primitives/Button';

export type FollowState = 'follow' | 'following' | 'requested';

export interface FollowButtonProps {
  /** Relationship state driving the label + variant. */
  state?: FollowState;
  size?: ButtonSize;
  /** Block presses and show a spinner (optimistic toggle in flight). */
  loading?: boolean;
  disabled?: boolean;
  /** Fires with the *current* state so the caller can compute the next one. */
  onPress?: (state: FollowState) => void;
  /** Override the three default labels. */
  labels?: Partial<Record<FollowState, string>>;
  style?: StyleProp<ViewStyle>;
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
 * and flips it in `onPress`. Token-only via `Button`.
 */
export function FollowButton({
  state = 'follow',
  size = 'sm',
  loading = false,
  disabled = false,
  onPress,
  labels,
  style,
}: FollowButtonProps): React.ReactElement {
  const label = labels?.[state] ?? DEFAULT_LABELS[state];
  return (
    <Button
      variant={VARIANT[state]}
      size={size}
      loading={loading}
      disabled={disabled}
      accessibilityLabel={label}
      accessibilityState={{ selected: state !== 'follow' }}
      onPress={onPress ? () => onPress(state) : undefined}
      style={style}
    >
      {label}
    </Button>
  );
}
