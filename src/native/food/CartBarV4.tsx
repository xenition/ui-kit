import * as React from 'react';
import { Pressable, View, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { formatMoney as defaultFormat } from '../commerce';
import { onPair, spokenLine, TABULAR } from './internal/menu-v4';
import type { CartBarProps } from './CartBar';

export interface CartBarV4Props extends CartBarProps {
  /** Copy shown in place of `label` while the cart is settling. Default `'Updating…'`. */
  updatingLabel?: string;
  /** Build the item-count phrase. Default `'1 item'` / `'3 items'`. */
  formatItemCount?: (count: number) => string;
}

/**
 * **V4 cart bar** — same props as {@link CartBar} plus `updatingLabel` and
 * `formatItemCount`.
 *
 * ## Five changes
 *
 * 1. **It clears the home indicator.** Its own docstring calls it a sticky
 *    bottom bar and it read no safe-area inset at all, so on a notched phone
 *    the total and the checkout action sat under the home indicator — the one
 *    bug that tells a user a screen was not built for their device. The band
 *    pays `spacing.md` *plus* `insets.bottom`, the way every other
 *    edge-anchored V4 component here does. Needs a `SafeAreaProvider` above
 *    it, which Expo mounts by default.
 * 2. **The count pill stops inverting the token pair.** It filled with the
 *    bar's `on-primary` ink and lettered it in `primary` — an `on` slot used
 *    as a *fill*, which the compiler guarantees nothing about in that
 *    direction. The pill is a hairline ring in the bar's own guaranteed ink
 *    now: correct as a 3:1 boundary and as text, in both schemes.
 * 3. **"1 items" is gone.** `formatItemCount` builds the phrase, and it is the
 *    same phrase the bar announces.
 * 4. **The total is tabular.** It re-renders every time the cart changes, and
 *    proportional figures make it jitter under the reader's eye.
 * 5. **Press is a state layer**, not `opacity: 0.9` — and the whole announced
 *    name is rebuilt from the same strings the bar draws, so the busy state
 *    reads as "Updating…" rather than as a stale "View cart".
 */
export function CartBarV4({
  itemCount,
  totalCents,
  currency = 'USD',
  label = 'View cart',
  onPress,
  variant = 'primary',
  loading = false,
  emptyLabel = 'Your cart is empty',
  updatingLabel = 'Updating…',
  formatItemCount,
  formatMoney = defaultFormat,
  style,
}: CartBarV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  // Needs a `SafeAreaProvider` above it (Expo default).
  const insets = useSafeAreaInsets();

  const empty = itemCount <= 0;
  const bg = variant === 'accent' ? colors.accent : colors.primary;
  const fg = onPair(theme, variant === 'accent' ? 'accent' : 'primary');
  const disabled = empty || loading;
  const tap = minTap(tokens.spacing);

  const countText = (formatItemCount ?? ((n: number) => `${n} ${n === 1 ? 'item' : 'items'}`))(
    itemCount
  );
  const totalText = formatMoney(totalCents, currency);
  const action = loading ? updatingLabel : label;

  const barStyle = (pressed: boolean): ViewStyle => ({
    borderRadius: tokens.radius.lg,
    minHeight: tap,
    paddingTop: tokens.spacing.md,
    // Change 1: the band sits above the home indicator, not under it.
    paddingBottom: tokens.spacing.md + insets.bottom,
    paddingHorizontal: tokens.spacing.lg,
    backgroundColor: empty
      ? colors.card
      : pressed
        ? pressOver(theme, bg, fg)
        : bg,
    borderWidth: empty ? 1 : 0,
    borderColor: colors.border,
  });

  const content = empty ? (
    <TextV4 size="sm" tone="mutedText" align="center">
      {emptyLabel}
    </TextV4>
  ) : (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={{
            minWidth: tokens.spacing.lg,
            height: tokens.spacing.lg,
            paddingHorizontal: tokens.spacing.xs,
            borderRadius: tokens.radius.full,
            borderWidth: 1,
            borderColor: fg,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TextV4 size="xs" weight="bold" style={[{ color: fg }, TABULAR]}>
            {itemCount}
          </TextV4>
        </View>
        <TextV4 size="base" weight="semibold" style={{ color: fg }}>
          {action}
        </TextV4>
      </View>
      <TextV4 size="base" weight="bold" style={[{ color: fg }, TABULAR]}>
        {totalText}
      </TextV4>
    </View>
  );

  if (empty || !onPress) {
    return (
      <View
        accessible
        accessibilityRole="summary"
        accessibilityLabel={
          empty ? emptyLabel : spokenLine([action, countText, totalText])
        }
        style={[barStyle(false), style]}
      >
        {content}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={spokenLine([action, countText, totalText])}
      accessibilityState={{ disabled, busy: loading }}
      disabled={disabled}
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [barStyle(pressed), style]}
    >
      {content}
    </Pressable>
  );
}
