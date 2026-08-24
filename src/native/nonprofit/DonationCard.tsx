import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button } from '../primitives/Button';
import { Icon } from '../primitives/Icon';
import { formatMoney, withAlpha } from './internal';

/** Visual density of a {@link DonationCard}. */
export type DonationCardVariant = 'default' | 'compact' | 'featured';

export interface DonationCardProps {
  /** Headline, e.g. `Support Clean Water`. */
  title: string;
  /** Optional supporting blurb. */
  description?: string;
  /**
   * Preset gift amounts in integer **cents**. Rendered as a selectable chip
   * grid; the tapped preset becomes the amount passed to `onDonate`.
   */
  presets?: number[];
  /** Controlled selected preset (cents). Falls back to the first preset. */
  selected?: number;
  /** ISO 4217 currency for money formatting (default `USD`). */
  currency?: string;
  /** Label for the primary CTA (default `Donate`). */
  ctaLabel?: string;
  /** Density / emphasis. `featured` enlarges the title. */
  variant?: DonationCardVariant;
  /** Fires when a preset chip is chosen (cents). */
  onSelectAmount?: (cents: number) => void;
  /** Fires when the CTA is pressed, with the active amount in cents. */
  onDonate?: (cents: number) => void;
  /** Block the CTA and show a spinner. */
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * The donate call-to-action surface: a title/blurb, a grid of preset gift
 * amounts (integer cents → localized currency via `formatMoney`), and a primary
 * CTA that reports the chosen amount. Selection is conveyed by a filled chip, a
 * bold border, and `accessibilityState.selected` — not color alone. When no
 * `presets` are supplied the grid is omitted and the CTA reports `0`. All colors
 * come from the compiled theme tokens — no literal colors.
 */
export function DonationCard({
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
}: DonationCardProps): React.ReactElement {
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
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
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
                  paddingVertical: tokens.spacing.sm,
                  paddingHorizontal: tokens.spacing.md,
                  borderRadius: tokens.radius.md,
                  borderWidth: isOn ? 2 : 1,
                  borderColor: isOn ? colors.primary : colors.border,
                  backgroundColor: isOn
                    ? withAlpha(colors.primary, 0.12)
                    : pressed
                      ? tokens.ramps.neutral[50]
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

      <Button
        variant="primary"
        loading={loading}
        disabled={disabled}
        onPress={() => onDonate?.(active)}
      >
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
