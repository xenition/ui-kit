import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { DISCLAIMER_META, onToneSlot, toneColor } from './internal';
import type { DisclaimerBannerProps } from './DisclaimerBanner';

/** Drop-in for {@link DisclaimerBannerProps} — same props, the V4 "chambers" design. */
export type DisclaimerBannerV4Props = DisclaimerBannerProps;

/**
 * DisclaimerBanner — **V4** "chambers" design (native twin of the web V4). The
 * severity is carried by a glyph in its own toned chip + a heading + a token tint
 * (never color alone), and it exposes an `alert` a11y role. `soft` (default)
 * rides a tinted well with a soft shadow; `solid` fills for critical notices;
 * `outline` rings for a lighter footprint. Reuses the base `variant`
 * (`soft` / `solid` / `outline`). Token-only colors via `useXenitionTheme()`.
 */
export function DisclaimerBannerV4({
  tone = 'info',
  title,
  message,
  variant = 'soft',
  onDismiss,
  testID,
  style,
}: DisclaimerBannerV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = DISCLAIMER_META[tone];
  const tint = toneColor(colors, meta.tone);
  const onTint = colors[onToneSlot(meta.tone)];
  const heading = title ?? meta.label;
  const solid = variant === 'solid';
  const outline = variant === 'outline';
  const bg = solid ? tint : outline ? colors.surface : withAlpha(tint, 0.12);
  const fg = solid ? onTint : colors.onSurface;
  const accentFg = solid ? onTint : tint;

  const shell: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: tokens.spacing.sm,
    padding: tokens.spacing.md,
    borderRadius: tokens.radius.lg,
    backgroundColor: bg,
    borderWidth: outline ? 1 : 0,
    borderColor: outline ? tint : 'transparent',
    ...(solid || outline
      ? {}
      : { shadowColor: colors.onSurface, shadowOpacity: 0.06, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 2 }),
  };

  return (
    <View accessibilityRole="alert" accessibilityLabel={`${heading}. ${message}`} testID={testID} style={[shell, style]}>
      <View style={{ width: 28, height: 28, borderRadius: tokens.radius.full, alignItems: 'center', justifyContent: 'center', backgroundColor: solid ? withAlpha(onTint, 0.2) : tint }}>
        <Text accessibilityElementsHidden importantForAccessibility="no" allowFontScaling={false} style={{ color: solid ? onTint : onTint, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{meta.glyph}</Text>
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={{ color: accentFg, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{heading}</Text>
        <Text style={{ color: fg, fontSize: tokens.typography.scale.xs, lineHeight: tokens.typography.scale.xs * 1.5 }}>{message}</Text>
      </View>
      {onDismiss ? (
        <Pressable accessibilityRole="button" accessibilityLabel="Dismiss notice" onPress={onDismiss} hitSlop={8} style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1, paddingHorizontal: tokens.spacing.xs })}>
          <Text style={{ color: accentFg, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>✕</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
