import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { withAlpha } from '../primitives/internal/color';

/** The three outcomes an {@link OddsBar} splits across. */
export type OddsPick = 'home' | 'draw' | 'away';

export interface OddsBarProps {
  /** Home-win odds as a **decimal price** (e.g. `1.85`). Lower = more likely. */
  home: number;
  /** Draw odds as a **decimal price** (e.g. `3.40`). Lower = more likely. */
  draw: number;
  /** Away-win odds as a **decimal price** (e.g. `4.20`). Lower = more likely. */
  away: number;
  /** Caption under the home price. Default `"Home"`. */
  homeLabel?: string;
  /** Caption under the draw price. Default `"Draw"`. */
  drawLabel?: string;
  /** Caption under the away price. Default `"Away"`. */
  awayLabel?: string;
  /**
   * Optional select handler; receives the chosen outcome. When supplied each
   * segment becomes a ≥44px pressable button; when omitted the bar is
   * presentational.
   */
  onSelect?: (pick: OddsPick) => void;
  /** The currently selected outcome, highlighted in primary. */
  selected?: OddsPick;
  /** Optional style override merged onto the bar container. */
  style?: ViewStyle;
}

/** Format a decimal price for display, keeping two decimals. */
function formatPrice(v: number): string {
  return Number.isFinite(v) ? v.toFixed(2) : '—';
}

/**
 * OddsBar — **V4** "broadcast" design. A three-segment odds split (home / draw /
 * away) as an elevated, evenly-divided bar. Each segment stacks a big price
 * numeral over a caption. Odds are **decimal prices**, so the **favourite is the
 * lowest price**: it is emphasized in the single `primary` accent. A `selected`
 * pick is filled in primary; when `onSelect` is given each segment is an
 * accessible ≥44px button reflecting its pressed state. Token-only colors via
 * `useXenitionTheme()`; dark-mode safe.
 */
export function OddsBar({
  home,
  draw,
  away,
  homeLabel = 'Home',
  drawLabel = 'Draw',
  awayLabel = 'Away',
  onSelect,
  selected,
  style,
}: OddsBarProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const container: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 6,
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: 6,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  };

  const segments: readonly { pick: OddsPick; price: number; label: string }[] = [
    { pick: 'home', price: home, label: homeLabel },
    { pick: 'draw', price: draw, label: drawLabel },
    { pick: 'away', price: away, label: awayLabel },
  ];

  // Favourite = lowest decimal price (most likely outcome).
  const min = Math.min(home, draw, away);

  return (
    <View accessibilityRole="none" accessibilityLabel="Match odds" style={[container, style]}>
      {segments.map(({ pick, price, label }) => {
        const isSelected = selected === pick;
        const isFav = price === min && Number.isFinite(price);

        const bg = isSelected
          ? colors.primary
          : isFav
            ? withAlpha(colors.primary, 0.12)
            : withAlpha(colors.onSurface, 0.05);
        const priceColor = isSelected ? colors.onPrimary : isFav ? colors.primary : colors.onSurface;
        const labelColor = isSelected ? colors.onPrimary : colors.muted;

        const a11y = `${label} ${formatPrice(price)}${isFav ? ', favourite' : ''}${isSelected ? ', selected' : ''}`;

        const inner = (
          <>
            <Text allowFontScaling={false} style={{ color: priceColor, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}>
              {formatPrice(price)}
            </Text>
            <Text
              allowFontScaling={false}
              style={{ color: labelColor, fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase' }}
            >
              {label}
            </Text>
          </>
        );

        const segStyle: ViewStyle = {
          flex: 1,
          minHeight: 44,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          paddingHorizontal: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          backgroundColor: bg,
        };

        if (onSelect) {
          return (
            <Pressable
              key={pick}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={a11y}
              onPress={() => onSelect(pick)}
              style={({ pressed }) => [segStyle, { opacity: pressed ? 0.85 : 1 }]}
            >
              {inner}
            </Pressable>
          );
        }

        return (
          <View key={pick} accessible accessibilityRole="text" accessibilityLabel={a11y} style={segStyle}>
            {inner}
          </View>
        );
      })}
    </View>
  );
}
