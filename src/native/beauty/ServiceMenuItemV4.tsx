import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { disabledOpacity } from '../primitives/internal/chrome-v4';
import {
  rowContainerStyle,
  rowGround,
  rowEdgeStyle,
  rowTextStyle,
} from '../dashboard/internal/row-v4';
import { formatMoney as defaultFormatMoney } from '../commerce/money';
import { metaLine } from './internal/salon-v4';
import type { ServiceCategory, ServiceMenuItemProps } from './ServiceMenuItem';

export interface ServiceMenuItemV4Props extends ServiceMenuItemProps {
  /** Override the category names — eight English words lived inside. */
  categoryLabels?: Partial<Record<ServiceCategory, string>>;
  /** Copy on the popular chip. Default `'Popular'`. */
  popularLabel?: string;
  /** Copy when the service cannot be booked. Default `'Unavailable'`. */
  unavailableLabel?: string;
  /** Format the duration. Default `'45 min'`. */
  formatDuration?: (minutes: number) => string;
  /** Draw the separator under the row. Default `false`. */
  last?: boolean;
}

/**
 * Category → glyph and default word.
 *
 * A treatment category is **not** a status: it does not mean good or bad, so
 * §5 of the brief keeps the status colours away from it and the glyph carries
 * the identity instead. The base assigned each category a `keyof
 * SemanticColors`, which spent `success` and `warn` on "nails" and "waxing".
 */
const CATEGORY_META: Record<ServiceCategory, { label: string; glyph: string }> = {
  hair: { label: 'Hair', glyph: '💇' },
  nails: { label: 'Nails', glyph: '💅' },
  skin: { label: 'Skin', glyph: '🧴' },
  massage: { label: 'Massage', glyph: '💆' },
  makeup: { label: 'Makeup', glyph: '💄' },
  brows: { label: 'Brows', glyph: '👁' },
  waxing: { label: 'Waxing', glyph: '🕯' },
  spa: { label: 'Spa', glyph: '🧖' },
};

/**
 * **V4 service menu item** — same props as {@link ServiceMenuItem} plus
 * `categoryLabels`, `popularLabel`, `unavailableLabel`, `formatDuration` and
 * `last`.
 *
 * ## Four changes
 *
 * 1. **A category stops spending the status colours.** See
 *    {@link CATEGORY_META}: "nails" was `success` and "waxing" was `warn`, so
 *    a menu of eight services used up every tone that means something.
 * 2. **An unavailable service cannot be pressed**, and dims at M3's 0.38 —
 *    the base greyed it and kept it live.
 * 3. **It is a row from the shared row line**, with tabular prices.
 * 4. **Nine English strings become props.**
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export function ServiceMenuItemV4({
  name,
  priceCents,
  currency = 'USD',
  category,
  durationMin,
  description,
  popular = false,
  unavailable = false,
  pricePrefix,
  formatMoney = defaultFormatMoney,
  categoryLabels,
  popularLabel = 'Popular',
  unavailableLabel = 'Unavailable',
  formatDuration,
  last = false,
  onPress,
  style,
}: ServiceMenuItemV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  if (!name) return null;

  const meta = category ? CATEGORY_META[category] : null;
  const categoryWord = category ? (categoryLabels?.[category] ?? meta!.label) : null;
  const price = formatMoney(priceCents, currency);
  const duration =
    typeof durationMin === 'number'
      ? (formatDuration ?? ((m: number) => `${m} min`))(durationMin)
      : null;
  const caption = metaLine([categoryWord, duration, description]);

  const content = (pressed: boolean): React.ReactElement => (
    <View
      style={[
        rowContainerStyle(theme, { twoLine: Boolean(caption) }),
        { backgroundColor: rowGround(theme, { pressed }) },
        !last ? rowEdgeStyle(theme) : null,
        { opacity: disabledOpacity(theme.state, unavailable) },
        style,
      ]}
    >
      {meta ? <IconV4 glyph={meta.glyph} size="lg" /> : null}

      <View style={rowTextStyle(theme)}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <TextV4
            size="base"
            weight="semibold"
            tone="onCard"
            numberOfLines={1}
            style={{ flexShrink: 1 }}
          >
            {name}
          </TextV4>
          {popular && !unavailable ? (
            <BadgeV4 tone="accent" variant="soft" size="sm">
              {popularLabel}
            </BadgeV4>
          ) : null}
          {unavailable ? (
            <BadgeV4 tone="neutral" variant="soft" size="sm">
              {unavailableLabel}
            </BadgeV4>
          ) : null}
        </View>
        {caption ? (
          <TextV4 size="xs" tone="mutedText" numberOfLines={2}>
            {caption}
          </TextV4>
        ) : null}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
        {pricePrefix ? (
          <TextV4 size="xs" tone="mutedText">
            {pricePrefix}
          </TextV4>
        ) : null}
        <TextV4 face="heading" size="base" weight="bold" tone="onCard" numeric="tabular">
          {price}
        </TextV4>
      </View>
    </View>
  );

  const label = metaLine([name, caption, price, unavailable ? unavailableLabel : null]);

  if (!onPress || unavailable) {
    return (
      <View accessible accessibilityLabel={label} accessibilityState={{ disabled: unavailable }}>
        {content(false)}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={{ borderRadius: tokens.radius.md }}
    >
      {({ pressed }) => content(pressed)}
    </Pressable>
  );
}
