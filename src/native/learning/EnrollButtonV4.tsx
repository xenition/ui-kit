import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { Button } from '../primitives';
import type { EnrollButtonProps } from './EnrollButton';

/** Drop-in for {@link EnrollButtonProps} — same props, the V4 "campus" design. */
export type EnrollButtonV4Props = EnrollButtonProps;

/**
 * EnrollButton — **V4** "campus" design (native twin of the web V4). The course
 * enrollment CTA built on the primitive `Button`, mapping the lifecycle to
 * appearance: `idle` → primary CTA, `enrolling` → loading, `enrolled` → a
 * soft-success confirmation pill with a ✓ (not pressable), `full` → a disabled
 * "Class full". State is announced and carried by a word + glyph, never color
 * alone. Token-only colors via `useXenitionTheme()`.
 */
export function EnrollButtonV4({ state = 'idle', label = 'Enroll now', price, onEnroll, block = true, style }: EnrollButtonV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const container: StyleProp<ViewStyle> = [{ alignSelf: block ? 'stretch' : 'flex-start', gap: 4 }, style];

  if (state === 'enrolled') {
    return (
      <View accessibilityRole="text" accessibilityLabel="Enrolled" style={container}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.xs, paddingVertical: tokens.spacing.md, paddingHorizontal: tokens.spacing.lg, borderRadius: tokens.radius.md, backgroundColor: withAlpha(colors.success, 0.12), borderWidth: 1, borderColor: withAlpha(colors.success, 0.3) }}>
          <Text allowFontScaling={false} style={{ color: colors.success, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>✓</Text>
          <Text style={{ color: colors.success, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>Enrolled</Text>
        </View>
      </View>
    );
  }

  if (state === 'full') {
    return (
      <View style={container}>
        <Button variant="secondary" disabled onPress={() => {}}>Class full</Button>
      </View>
    );
  }

  return (
    <View style={container}>
      <Button variant="primary" loading={state === 'enrolling'} onPress={onEnroll} accessibilityLabel={state === 'enrolling' ? 'Enrolling' : label}>
        {state === 'enrolling' ? 'Enrolling…' : price ? `${label} · ${price}` : label}
      </Button>
    </View>
  );
}
