import * as React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Button, type ButtonSize } from '../primitives';
import type { ApplyState } from './types';

export interface ApplyButtonProps {
  /** Current application state. Drives the label, variant, and callback. */
  state?: ApplyState;
  /** Fired to submit an application (`apply` state) or re-apply (`withdrawn`). */
  onApply?: () => void;
  /** Fired to withdraw a submitted application (`applied` state). */
  onWithdraw?: () => void;
  /** Show a spinner and block presses. */
  loading?: boolean;
  disabled?: boolean;
  size?: ButtonSize;
  /** Fill the available width. */
  block?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * The apply / applied / withdrawn call-to-action for a job. A thin, stateful
 * wrapper over the primitive `Button`:
 * - `apply` → primary "Apply", presses call `onApply`.
 * - `applied` → secondary "Applied ✓", presses call `onWithdraw` (undo).
 * - `withdrawn` → ghost "Re-apply", presses call `onApply` again.
 * The accessible label always names the state so it is not conveyed by variant
 * color alone. Colors come from the `Button` primitive's tokens.
 */
export function ApplyButton({
  state = 'apply',
  onApply,
  onWithdraw,
  loading = false,
  disabled = false,
  size = 'md',
  block = false,
  style,
}: ApplyButtonProps): React.ReactElement {
  const config = {
    apply: { label: 'Apply', variant: 'primary' as const, onPress: onApply, a11y: 'Apply to this job' },
    applied: {
      label: 'Applied ✓',
      variant: 'secondary' as const,
      onPress: onWithdraw,
      a11y: 'Applied — press to withdraw',
    },
    withdrawn: {
      label: 'Re-apply',
      variant: 'ghost' as const,
      onPress: onApply,
      a11y: 'Application withdrawn — press to re-apply',
    },
  }[state];

  return (
    <Button
      variant={config.variant}
      size={size}
      loading={loading}
      disabled={disabled}
      onPress={config.onPress}
      accessibilityLabel={config.a11y}
      style={[block ? { alignSelf: 'stretch' } : null, style]}
    >
      {config.label}
    </Button>
  );
}
