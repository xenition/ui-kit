import * as React from 'react';
import { Text } from 'react-native';
import { Button } from '../primitives/Button';
import { useXenitionTheme } from '../theme';
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
 * FollowButton — **V4** "feed" design. The clean pill toggle over Follow /
 * Following / Requested: `follow` is a solid-**primary** pill, `following` a
 * soft-primary tint, `requested` a muted state — one accent, big ≥44px tap
 * target, fully rounded. Stateless: the parent owns `state` and flips it in
 * `onPress`. Same props/behavior as {@link FollowButtonProps}; token-only via
 * the primitive `Button`. `accessibilityState.selected` marks the connected/
 * pending states.
 */
export function FollowButtonV4({
  state = 'follow',
  size = 'sm',
  loading = false,
  disabled = false,
  onPress,
  labels,
  style,
}: FollowButtonV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const label = labels?.[state] ?? DEFAULT_LABELS[state];
  const textKey = size === 'lg' ? 'lg' : size === 'md' ? 'base' : 'sm';
  return (
    <Button
      variant={VARIANT[state]}
      size={size}
      loading={loading}
      disabled={disabled}
      accessibilityLabel={label}
      accessibilityState={{ selected: state !== 'follow' }}
      onPress={onPress ? () => onPress(state) : undefined}
      style={[
        { minHeight: 44, borderRadius: tokens.radius.full, paddingHorizontal: tokens.spacing.lg },
        state === 'requested' ? { borderWidth: 1, borderColor: colors.border } : null,
        style,
      ]}
    >
      {state === 'requested' ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale[textKey], fontWeight: '600' }}>{label}</Text>
      ) : (
        label
      )}
    </Button>
  );
}
