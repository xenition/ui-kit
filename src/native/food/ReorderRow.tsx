import * as React from 'react';
import {
  Image,
  Pressable,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button } from '../primitives/Button';
import { formatMoney as defaultFormat, type MoneyFormatter } from '../commerce';

export interface ReorderRowProps {
  /** Restaurant or order title. */
  title: string;
  /** One-line items summary (e.g. "2× Pad Thai, 1× Spring rolls"). */
  itemsSummary?: string;
  /** When the order was placed (e.g. "Aug 12"). */
  dateText?: string;
  /** Order total in integer cents. */
  totalCents?: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Thumbnail image URL. */
  imageUrl?: string;
  /** Reorder handler; renders the reorder button when provided. */
  onReorder?: () => void;
  /** Reorder button label (default `Reorder`). */
  reorderLabel?: string;
  /** Press handler for the whole row (e.g. open the past order). */
  onPress?: () => void;
  /** Disable reordering (e.g. restaurant closed) and dim the row. */
  disabled?: boolean;
  /** Override the cents → string formatter. */
  formatMoney?: MoneyFormatter;
  style?: StyleProp<ViewStyle>;
}

/**
 * A past-order row with a one-tap reorder action — thumbnail, title, an items
 * summary, date and total, and a `Reorder` button. The whole row is optionally
 * pressable to open the order. `disabled` dims the row and blocks reordering.
 * Reuses the `Button` primitive and the shared money formatter. Token-only.
 */
export function ReorderRow({
  title,
  itemsSummary,
  dateText,
  totalCents,
  currency = 'USD',
  imageUrl,
  onReorder,
  reorderLabel = 'Reorder',
  onPress,
  disabled = false,
  formatMoney = defaultFormat,
  style,
}: ReorderRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const meta = [dateText, typeof totalCents === 'number' ? formatMoney(totalCents, currency) : undefined]
    .filter(Boolean)
    .join(' · ');

  const containerStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.md,
      borderRadius: tokens.radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      padding: tokens.spacing.md,
      opacity: disabled ? 0.6 : 1,
    },
    style,
  ];

  const inner = (
    <>
      <View
        style={{
          width: 56,
          height: 56,
          borderRadius: tokens.radius.md,
          overflow: 'hidden',
          backgroundColor: tokens.ramps.neutral[100],
        }}
      >
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            accessible
            accessibilityLabel={title}
            resizeMode="cover"
            style={{ width: '100%', height: '100%' }}
          />
        ) : null}
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
          {title}
        </Text>
        {itemsSummary ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {itemsSummary}
          </Text>
        ) : null}
        {meta ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{meta}</Text>
        ) : null}
      </View>
      {onReorder ? (
        <Button variant="secondary" size="sm" onPress={onReorder} disabled={disabled}>
          {reorderLabel}
        </Button>
      ) : null}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${title}${meta ? `, ${meta}` : ''}`}
        accessibilityState={{ disabled }}
        onPress={onPress}
        style={({ pressed }) => [containerStyle, { opacity: pressed ? 0.9 : disabled ? 0.6 : 1 }]}
      >
        {inner}
      </Pressable>
    );
  }

  return <View style={containerStyle}>{inner}</View>;
}
