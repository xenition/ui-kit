import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button } from '../primitives/Button';
import { Icon } from '../primitives/Icon';
import { shadow } from '../primitives/internal/elevation';
import { formatMoney, withAlpha } from './internal';
import type { DonationCardProps } from './DonationCard';

/** Drop-in alternate of {@link DonationCardProps} — identical prop contract. */
export type DonationCardV2Props = DonationCardProps;

/**
 * DonationCard — design variant **V2**: an **elevated donate surface**. Where V1
 * is a flat bordered card, V2 floats on a drop shadow (no border) and turns the
 * presets into a grid of large, tappable amount tiles — the tapped tile fills
 * with the primary slot and flips `accessibilityState.selected` (state by a11y +
 * fill, never color alone). The CTA is a full-width heart button that echoes the
 * chosen amount. Same props as {@link DonationCardProps}. Token-only; money is
 * integer cents formatted through `formatMoney`.
 */
export function DonationCardV2({
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
}: DonationCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const isFeatured = variant === 'featured';
  const isCompact = variant === 'compact';

  const fallback = presets.length > 0 ? presets[0] : 0;
  const active = (selected != null ? selected : fallback) ?? 0;

  return (
    <View
      accessibilityRole="summary"
      style={[
        {
          gap: tokens.spacing.md,
          padding: isCompact ? tokens.spacing.md : tokens.spacing.lg,
          borderRadius: tokens.radius.lg,
          backgroundColor: colors.surface,
          ...shadow('lg', tokens),
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(colors.primary, 0.12),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon glyph="❤️" size="base" />
        </View>
        <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs }}>
          <Text
            numberOfLines={2}
            style={{
              color: colors.onSurface,
              fontSize: isFeatured ? tokens.typography.scale['2xl'] : tokens.typography.scale.lg,
              fontWeight: '800',
            }}
          >
            {title}
          </Text>
          {description ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{description}</Text>
          ) : null}
        </View>
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
                  flexGrow: 1,
                  flexBasis: '30%',
                  alignItems: 'center',
                  paddingVertical: tokens.spacing.md,
                  paddingHorizontal: tokens.spacing.sm,
                  borderRadius: tokens.radius.md,
                  borderWidth: isOn ? 0 : 1,
                  borderColor: colors.border,
                  backgroundColor: isOn
                    ? colors.primary
                    : pressed
                      ? tokens.ramps.neutral[50] ?? colors.surface
                      : colors.surface,
                })}
              >
                <Text
                  style={{
                    color: isOn ? colors.onPrimary : colors.onSurface,
                    fontSize: tokens.typography.scale.lg,
                    fontWeight: '800',
                  }}
                >
                  {formatMoney(cents, currency)}
                </Text>
              </Pressable>
            );
          })}
        </View>
      ) : null}

      <Button variant="primary" size="lg" loading={loading} disabled={disabled} onPress={() => onDonate?.(active)}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Icon glyph="❤️" size="lg" accessibilityLabel="Donate" />
          <Text style={{ color: colors.onPrimary, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>
            {presets.length > 0 ? `${ctaLabel} ${formatMoney(active, currency)}` : ctaLabel}
          </Text>
        </View>
      </Button>
    </View>
  );
}
