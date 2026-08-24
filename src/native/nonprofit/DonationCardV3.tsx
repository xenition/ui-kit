import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button } from '../primitives/Button';
import { formatMoney, withAlpha } from './internal';
import type { DonationCardProps } from './DonationCard';

/** Drop-in alternate of {@link DonationCardProps} — identical prop contract. */
export type DonationCardV3Props = DonationCardProps;

/**
 * DonationCard — design variant **V3**: a **minimal inline amount row**. No card
 * chrome at all — a compact title, a single horizontal strip of pill amounts,
 * and an inline donate button. Selection rounds a pill to a filled primary tint
 * with a bold ring and flips `accessibilityState.selected` (state by a11y + fill,
 * never color alone). Meant to drop into an existing surface (a sheet, a list
 * footer) rather than own one. Same props as {@link DonationCardProps}.
 * Token-only; money is integer cents formatted through `formatMoney`.
 */
export function DonationCardV3({
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
}: DonationCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const isCompact = variant === 'compact';

  const fallback = presets.length > 0 ? presets[0] : 0;
  const active = (selected != null ? selected : fallback) ?? 0;

  return (
    <View accessibilityRole="summary" style={[{ gap: tokens.spacing.sm }, style]}>
      <View style={{ gap: tokens.spacing.xs }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {title}
        </Text>
        {description && !isCompact ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{description}</Text>
        ) : null}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        {presets.length > 0 ? (
          <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }}>
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
                    paddingVertical: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.sm,
                    borderRadius: tokens.radius.full,
                    borderWidth: isOn ? 1.5 : 1,
                    borderColor: isOn ? colors.primary : colors.border,
                    backgroundColor: isOn
                      ? withAlpha(colors.primary, 0.12)
                      : pressed
                        ? tokens.ramps.neutral[50] ?? colors.surface
                        : 'transparent',
                  })}
                >
                  <Text
                    style={{
                      color: isOn ? colors.primaryText : colors.onSurface,
                      fontSize: tokens.typography.scale.sm,
                      fontWeight: '700',
                    }}
                  >
                    {formatMoney(cents, currency)}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ) : (
          <View style={{ flex: 1 }} />
        )}

        <Button variant="primary" size="sm" loading={loading} disabled={disabled} onPress={() => onDonate?.(active)}>
          {ctaLabel}
        </Button>
      </View>
    </View>
  );
}
