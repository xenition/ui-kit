import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button } from '../primitives';

/** Enrollment lifecycle. */
export type EnrollState = 'idle' | 'enrolling' | 'enrolled' | 'full';

export interface EnrollButtonProps {
  /** Current enrollment state. */
  state?: EnrollState;
  /** CTA label when idle (default "Enroll now"). */
  label?: string;
  /** Optional price shown next to / under the button. */
  price?: string;
  /** Fires when an idle button is pressed. */
  onEnroll?: () => void;
  /** Full-width layout. */
  block?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Course enrollment CTA built on the primitive `Button`. Maps the enrollment
 * lifecycle to button appearance: `idle` → primary CTA, `enrolling` → loading,
 * `enrolled` → a success confirmation (not pressable), `full` → a disabled
 * "Class full". Announces the current state. Token-only colors.
 */
export function EnrollButton({
  state = 'idle',
  label = 'Enroll now',
  price,
  onEnroll,
  block = true,
  style,
}: EnrollButtonProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const container: StyleProp<ViewStyle> = [{ alignSelf: block ? 'stretch' : 'flex-start', gap: 4 }, style];

  if (state === 'enrolled') {
    return (
      <View accessibilityRole="text" accessibilityLabel="Enrolled" style={container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: tokens.spacing.xs,
            paddingVertical: tokens.spacing.md,
            paddingHorizontal: tokens.spacing.lg,
            borderRadius: tokens.radius.md,
            backgroundColor: colors.success,
          }}
        >
          <Text allowFontScaling={false} style={{ color: colors.onSuccess, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            ✓
          </Text>
          <Text style={{ color: colors.onSuccess, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>Enrolled</Text>
        </View>
      </View>
    );
  }

  if (state === 'full') {
    return (
      <View style={container}>
        <Button variant="secondary" disabled onPress={() => {}}>
          Class full
        </Button>
      </View>
    );
  }

  return (
    <View style={container}>
      <Button
        variant="primary"
        loading={state === 'enrolling'}
        onPress={onEnroll}
        accessibilityLabel={state === 'enrolling' ? 'Enrolling' : label}
      >
        {state === 'enrolling' ? 'Enrolling…' : price ? `${label} · ${price}` : label}
      </Button>
    </View>
  );
}
