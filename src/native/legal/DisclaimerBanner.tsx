import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { DISCLAIMER_META, onToneSlot, toneColor, type DisclaimerTone } from './internal';

export type DisclaimerBannerVariant = 'soft' | 'solid' | 'outline';

export interface DisclaimerBannerProps {
  /** Severity — drives the glyph, default title, and token tint. */
  tone?: DisclaimerTone;
  /** Heading; defaults to the tone's label ("Legal notice", "Warning", …). */
  title?: string;
  /** Body copy (the disclaimer text). */
  message: string;
  /** Visual treatment. `soft` (default) tints; `solid` fills; `outline` rings. */
  variant?: DisclaimerBannerVariant;
  /** Optional dismiss affordance. */
  onDismiss?: () => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A legal disclaimer / notice banner — "not legal advice", attorney-client
 * privilege, confidentiality, statute-of-limitations warnings, etc. Severity is
 * carried by a glyph + heading + token tint (never color alone), and it exposes
 * an `alert` a11y role so screen readers announce it. `solid` fills for critical
 * notices; `outline` for a lighter footprint. All colors are theme tokens — no
 * literals.
 */
export function DisclaimerBanner({
  tone = 'info',
  title,
  message,
  variant = 'soft',
  onDismiss,
  testID,
  style,
}: DisclaimerBannerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = DISCLAIMER_META[tone];
  const tint = toneColor(colors, meta.tone);
  const heading = title ?? meta.label;

  const solid = variant === 'solid';
  const outline = variant === 'outline';
  const bg = solid ? tint : outline ? 'transparent' : withAlpha(tint, 0.12);
  const fg = solid ? colors[onToneSlot(meta.tone)] : colors.onSurface;
  const accentFg = solid ? colors[onToneSlot(meta.tone)] : tint;

  return (
    <View
      accessibilityRole="alert"
      accessibilityLabel={`${heading}. ${message}`}
      testID={testID}
      style={[
        {
          flexDirection: 'row',
          gap: tokens.spacing.sm,
          padding: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          backgroundColor: bg,
          borderWidth: outline ? 1 : 0,
          borderColor: outline ? tint : 'transparent',
        },
        style,
      ]}
    >
      <Text accessibilityElementsHidden importantForAccessibility="no" style={{ color: accentFg, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
        {meta.glyph}
      </Text>
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={{ color: accentFg, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{heading}</Text>
        <Text style={{ color: fg, fontSize: tokens.typography.scale.xs, lineHeight: tokens.typography.scale.xs * 1.5 }}>{message}</Text>
      </View>
      {onDismiss ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Dismiss notice"
          onPress={onDismiss}
          hitSlop={8}
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1, paddingHorizontal: tokens.spacing.xs })}
        >
          <Text style={{ color: accentFg, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>✕</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
