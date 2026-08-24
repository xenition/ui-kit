import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { formatMoney, type MoneyFormatter } from '../commerce/money';

export type ServiceCategory =
  | 'hair'
  | 'nails'
  | 'skin'
  | 'massage'
  | 'makeup'
  | 'brows'
  | 'waxing'
  | 'spa';

interface CategoryMeta {
  glyph: string;
  label: string;
  color: keyof SemanticColors;
}

const CATEGORY_META: Record<ServiceCategory, CategoryMeta> = {
  hair: { glyph: '💇', label: 'Hair', color: 'primary' },
  nails: { glyph: '💅', label: 'Nails', color: 'accent' },
  skin: { glyph: '✨', label: 'Skin', color: 'success' },
  massage: { glyph: '💆', label: 'Massage', color: 'primary' },
  makeup: { glyph: '💄', label: 'Makeup', color: 'danger' },
  brows: { glyph: '👁️', label: 'Brows', color: 'accent' },
  waxing: { glyph: '🕯️', label: 'Waxing', color: 'warn' },
  spa: { glyph: '🧖', label: 'Spa', color: 'success' },
};

export interface ServiceMenuItemProps {
  /** Service name, e.g. "Balayage & tone". */
  name: string;
  /** Price in integer cents. */
  priceCents: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Category; drives the icon, tag, and accent tone. Falls back to `spa`. */
  category?: ServiceCategory;
  /** Duration in minutes. */
  durationMin?: number;
  /** Optional one/two-line description. */
  description?: string;
  /** Flags the row with a "Popular" marker. */
  popular?: boolean;
  /** When set, the row is dimmed and non-interactive. */
  unavailable?: boolean;
  /** Prefix shown before the price (e.g. "from"). */
  pricePrefix?: string;
  /** Override the cents → string money formatter. */
  formatMoney?: MoneyFormatter;
  /** Fires when the row is tapped (unless `unavailable`). */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single salon/spa service-menu row: category icon + tag, name, optional
 * description, a duration chip, and a right-aligned price (integer cents via
 * {@link formatMoney}). `popular` adds a soft marker; `unavailable` dims the row
 * and blocks the press. The whole row is one `button` when interactive with a
 * spoken label carrying the price/duration. Token-only colors.
 */
export function ServiceMenuItem({
  name,
  priceCents,
  currency = 'USD',
  category = 'spa',
  durationMin,
  description,
  popular = false,
  unavailable = false,
  pricePrefix,
  formatMoney: format = formatMoney,
  onPress,
  style,
}: ServiceMenuItemProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = CATEGORY_META[category] ?? CATEGORY_META.spa;
  const priceText = `${pricePrefix ? `${pricePrefix} ` : ''}${format(priceCents, currency)}`;
  const interactive = !unavailable && !!onPress;

  const a11yLabel = `${name}, ${meta.label}${durationMin != null ? `, ${durationMin} minutes` : ''}, ${priceText}${
    unavailable ? ', unavailable' : ''
  }`;

  return (
    <Pressable
      accessibilityRole={interactive ? 'button' : undefined}
      accessibilityLabel={a11yLabel}
      accessibilityState={{ disabled: unavailable }}
      disabled={!interactive}
      onPress={interactive ? onPress : undefined}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.md,
          opacity: unavailable ? 0.5 : pressed ? 0.9 : 1,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(colors[meta.color], 0.14),
        }}
      >
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg }}>
          {meta.glyph}
        </Text>
      </View>

      <View style={{ flex: 1, gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <Text
            numberOfLines={1}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700', flexShrink: 1 }}
          >
            {name}
          </Text>
          {popular ? (
            <View
              style={{
                borderRadius: tokens.radius.sm,
                paddingHorizontal: tokens.spacing.xs,
                paddingVertical: 1,
                backgroundColor: withAlpha(colors.accent, 0.16),
              }}
            >
              <Text style={{ color: colors.accent, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
                Popular
              </Text>
            </View>
          ) : null}
        </View>
        {description ? (
          <Text numberOfLines={2} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {description}
          </Text>
        ) : null}
        {durationMin != null ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{durationMin} min</Text>
        ) : null}
      </View>

      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
        {priceText}
      </Text>
    </Pressable>
  );
}
