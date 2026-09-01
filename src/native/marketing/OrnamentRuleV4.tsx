import * as React from 'react';
import { View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { OrnamentRuleProps, OrnamentShape, OrnamentTone } from './OrnamentRule';

export type { OrnamentShape, OrnamentTone };

/** Drop-in for {@link OrnamentRuleProps} — same props, the V4 "showcase" design. */
export type OrnamentRuleV4Props = OrnamentRuleProps;

/**
 * OrnamentRule — **V4** "showcase" design (native mirror of the web V4).
 *
 * Same technique as the native base: a 1px rule flanking an optional centered
 * `diamond`/`dot`/`line`/`none` ornament — React Native has no CSS gradient
 * here, so each rule half is a **solid low-opacity token fill** (the tint
 * always originates from a theme token, never a literal). The V4 *refines* the
 * look: a slightly stronger, cleaner rule tint that fades toward the outer
 * edges via two stacked segments (approximating the web's fuller gradient), and
 * a crisper ornament sitting on a faint token halo pad for a sharper read.
 *
 * Every `ornament` shape and `tone` value is honored exactly. Purely
 * decorative and **static** — no motion, nothing to reduce. Token-only colors.
 */
export function OrnamentRuleV4({
  ornament = 'diamond',
  tone = 'accent',
  style,
}: OrnamentRuleV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const toneColor: string =
    tone === 'accent'
      ? tokens.ramps.accent[400]
      : tone === 'primary'
        ? tokens.ramps.primary[400]
        : colors.border;

  // Two-segment rule: a stronger inner tint fading to a fainter outer one —
  // a token-only approximation of the web V4's fuller three-stop gradient.
  const ruleInner = withAlpha(toneColor, 0.5);
  const ruleOuter = withAlpha(toneColor, 0.12);

  const shape: OrnamentShape = ornament;
  const ornamentStyle: ViewStyle | null =
    shape === 'none'
      ? null
      : shape === 'diamond'
        ? { width: 7, height: 7, transform: [{ rotate: '45deg' }] }
        : shape === 'dot'
          ? { width: 6, height: 6, borderRadius: 9999 }
          : { width: 24, height: 1 };

  const rule = (side: 'left' | 'right'): React.ReactElement => (
    <View style={{ flex: 1, height: 1, flexDirection: 'row' }}>
      <View style={{ flex: 1, backgroundColor: side === 'left' ? ruleOuter : ruleInner }} />
      <View style={{ flex: 1, backgroundColor: side === 'left' ? ruleInner : ruleOuter }} />
    </View>
  );

  return (
    <View
      testID="xen-ornament-rule-v4"
      accessibilityRole="none"
      style={[
        { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
        style,
      ]}
    >
      {rule('left')}
      {ornamentStyle ? (
        <View
          style={{
            marginHorizontal: tokens.spacing.md,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Faint token halo pad → sharper ornament read (native has no box-shadow glow). */}
          <View
            style={{
              position: 'absolute',
              width: 14,
              height: 14,
              borderRadius: 9999,
              backgroundColor: withAlpha(toneColor, 0.16),
            }}
          />
          <View style={{ backgroundColor: toneColor, ...ornamentStyle }} />
        </View>
      ) : null}
      {rule('right')}
    </View>
  );
}
