import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import {
  formatMoney,
  initials,
  seedRampStep,
  toneColor,
  withAlpha,
  type PosTone,
} from './internal';

export type ProductGridTileVariant = 'default' | 'compact';

export interface ProductGridTileProps {
  /** Product name. */
  name: string;
  /** Price in integer **cents**. */
  priceCents?: number;
  /** ISO 4217 currency (default USD). */
  currency?: string;
  /** Thumbnail URL. When absent a token-tinted plate with initials is drawn. */
  imageUrl?: string;
  /** Seed for the fallback plate tint (defaults to the name). */
  seed?: string;
  /** Optional category accent tone for the plate/label. */
  tone?: PosTone;
  /** Out-of-stock — dims the tile and shows a "Sold out" flag (text, not color). */
  soldOut?: boolean;
  /** Selected/active state (accent ring, announced to a11y). */
  selected?: boolean;
  /** Press handler (add to ticket). */
  onPress?: () => void;
  /** Long-press handler (e.g. open variants). */
  onLongPress?: () => void;
  /** `default` is a square card with a plate; `compact` is a color-block chip. */
  variant?: ProductGridTileVariant;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A tappable catalog tile for the register grid. With an `imageUrl` it shows the
 * thumbnail; otherwise a deterministic token-tinted plate with the product's
 * initials (the kit ships no image loader — a missing image never blanks). Price
 * is integer **cents** via `formatMoney`. `soldOut` dims and flags by word (not
 * color alone); `selected` draws an accent ring reflected in
 * `accessibilityState`. Token-only tints via `withAlpha` of a theme ramp.
 */
export function ProductGridTile({
  name,
  priceCents,
  currency = 'USD',
  imageUrl,
  seed,
  tone = 'primary',
  soldOut = false,
  selected = false,
  onPress,
  onLongPress,
  variant = 'default',
  testID,
  style,
}: ProductGridTileProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const accent = toneColor(colors, tone);
  const plateTint = tokens.ramps.neutral[seedRampStep(seed ?? name)];

  const plate = imageUrl ? (
    <Image
      source={{ uri: imageUrl }}
      accessible
      accessibilityLabel={name}
      resizeMode="cover"
      style={{ width: '100%', height: '100%' }}
    />
  ) : (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: plateTint }}>
      <Text allowFontScaling={false} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }}>
        {initials(name)}
      </Text>
    </View>
  );

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected, disabled: soldOut }}
      accessibilityLabel={
        `${name}${typeof priceCents === 'number' ? `, ${formatMoney(priceCents, currency)}` : ''}${soldOut ? ', sold out' : ''}`
      }
      disabled={soldOut}
      onPress={onPress}
      onLongPress={onLongPress}
      testID={testID}
      style={({ pressed }) => [
        {
          borderRadius: tokens.radius.lg,
          borderWidth: selected ? 2 : 1,
          borderColor: selected ? accent : colors.border,
          backgroundColor: selected ? withAlpha(accent, 0.1) : colors.surface,
          overflow: 'hidden',
          opacity: soldOut ? 0.5 : pressed ? 0.9 : 1,
        },
        style,
      ]}
    >
      {!compact ? (
        <View style={{ height: 72, width: '100%', overflow: 'hidden' }}>{plate}</View>
      ) : (
        <View style={{ height: 4, width: '100%', backgroundColor: accent }} />
      )}
      <View style={{ padding: tokens.spacing.sm, gap: 2 }}>
        <Text numberOfLines={compact ? 1 : 2} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
          {name}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          {typeof priceCents === 'number' ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {formatMoney(priceCents, currency)}
            </Text>
          ) : (
            <View />
          )}
          {soldOut ? (
            <Text style={{ color: colors.danger, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
              Sold out
            </Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}
