import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button } from '../primitives/Button';
import { Icon } from '../primitives/Icon';
import { withAlpha } from '../primitives/internal/color';
import { formatMoney } from './internal';
import type { DonationCardProps } from './DonationCard';

/** Drop-in for {@link DonationCardProps} — same props, the V4 "rally" design. */
export type DonationCardV4Props = DonationCardProps;

/**
 * DonationCard — **V4** "rally" design. The warm, mission-driven donate
 * call-to-action surface: an elevated rounded card with a soft shadow, a bold
 * title/blurb, a grid of preset gift amounts as tappable soft-primary chips
 * (integer cents → localized currency via `formatMoney`, each ≥44px), and a
 * primary CTA that reports the chosen amount. Selection is conveyed by a filled
 * soft-primary chip, a bold border, and `accessibilityState.selected` — never
 * color alone. Honors all three `variant`s — `default` (full card), `compact`
 * (dense padding), and `featured` (larger title) — identical props/behavior to
 * {@link DonationCardProps}. Token-only colors via `useXenitionTheme()`.
 */
export function DonationCardV4({
  title,
  description,
  presets = [],
  selected,
  currency = 'USD',
  ctaLabel = 'Donate',
  variant = 'default',
  onSelectAmount,
  onDonate,
  loading = false,
  disabled = false,
  style,
}: DonationCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const isFeatured = variant === 'featured';
  const isCompact = variant === 'compact';

  const fallback = presets.length > 0 ? presets[0] : 0;
  const active = (selected != null ? selected : fallback) ?? 0;

  const containerStyle: StyleProp<ViewStyle> = [
    {
      gap: tokens.spacing.md,
      padding: isCompact ? tokens.spacing.md : tokens.spacing.lg,
      borderRadius: tokens.radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      shadowColor: colors.onSurface,
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 3,
    },
    style,
  ];

  return (
    <View accessibilityRole="summary" accessibilityLabel={title} style={containerStyle}>
      <View style={{ gap: tokens.spacing.xs }}>
        <Text
          style={{
            color: colors.onSurface,
            fontSize: isFeatured ? tokens.typography.scale.xl : tokens.typography.scale.lg,
            fontWeight: '700',
          }}
        >
          {title}
        </Text>
        {description ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{description}</Text>
        ) : null}
      </View>

      {presets.length > 0 ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}>
          {presets.map((cents, i) => {
            const isOn = cents === active;
            return (
              <Pressable
                key={i}
                accessibilityRole="radio"
                accessibilityState={{ selected: isOn, disabled }}
                accessibilityLabel={formatMoney(cents, currency)}
                disabled={disabled}
                onPress={() => onSelectAmount?.(cents)}
                style={({ pressed }) => ({
                  minHeight: 44,
                  justifyContent: 'center',
                  paddingVertical: tokens.spacing.sm,
                  paddingHorizontal: tokens.spacing.md,
                  borderRadius: tokens.radius.full,
                  borderWidth: isOn ? 2 : 1,
                  borderColor: isOn ? colors.primary : colors.border,
                  backgroundColor: isOn
                    ? withAlpha(colors.primary, 0.1)
                    : pressed
                      ? withAlpha(colors.primary, 0.1)
                      : colors.surface,
                })}
              >
                <Text
                  style={{
                    color: isOn ? colors.primary : colors.onSurface,
                    fontSize: tokens.typography.scale.base,
                    fontWeight: '700',
                  }}
                >
                  {formatMoney(cents, currency)}
                </Text>
              </Pressable>
            );
          })}
        </View>
      ) : null}

      <Button variant="primary" loading={loading} disabled={disabled} onPress={() => onDonate?.(active)}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Icon glyph="❤️" size="base" />
          <Text style={{ color: colors.onPrimary, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {presets.length > 0 ? `${ctaLabel} ${formatMoney(active, currency)}` : ctaLabel}
          </Text>
        </View>
      </Button>
    </View>
  );
}
