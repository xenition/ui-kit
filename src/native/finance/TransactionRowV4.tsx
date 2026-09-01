import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { appearanceStyle } from '../primitives/internal/appearance';
import {
  rowContainerStyle,
  rowGround,
  rowLeadingStyle,
  rowTextStyle,
  rowTrailingStyle,
} from '../dashboard/internal/row-v4';
import { formatMoney } from '../commerce/money';
import { MoneyAmountV4 } from './MoneyAmountV4';
import { signParts, spokenLine } from './internal/ledger-v4';
import type { TransactionRowProps } from './TransactionRow';

export interface TransactionRowV4Props extends TransactionRowProps {}

/**
 * **V4 transaction row** — same props as {@link TransactionRow}.
 *
 * ## Four changes
 *
 * 1. **The row says what it cost.** `accessibilityLabel={title}` on an
 *    `accessible` `Pressable` flattens the row to one leaf, so a reader heard
 *    "Whole Foods, button" and never −$84.12 — the number the row exists to
 *    show. It now carries one name holding the merchant, the category, the
 *    date and the signed amount.
 * 2. **Press is a state layer.** `opacity: pressed ? 0.7 : 1` dims the row's
 *    own content, which is the signal M3 spends 0.38 on to mean *disabled*, so
 *    a pressed row and a dead one looked alike. It takes the shared row press
 *    fill.
 * 3. **It is a row from the shared row family**, so a transaction, a settings
 *    row and a notification are one height, one gutter and one 44 leading
 *    slot — and the row clears 44 whether or not the optional category glyph
 *    is there, which the base's bare `paddingVertical` did not.
 * 4. **The caption is `mutedText`.** The subtitle and the date were drawn in
 *    `colors.muted`, a ramp step carrying no contrast promise.
 */
export function TransactionRowV4({
  title,
  subtitle,
  amountCents,
  currency = 'USD',
  direction,
  date,
  icon,
  iconColor = 'primary',
  onPress,
  appearance = 'classic',
  style,
}: TransactionRowV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  const signedCents = direction
    ? direction === 'expense'
      ? -Math.abs(amountCents)
      : Math.abs(amountCents)
    : amountCents;

  // Appearance surface goes FIRST; the row family's layout stays AFTER.
  const surface = appearance === 'classic' ? undefined : appearanceStyle(appearance, colors, tokens);

  const money = signParts(signedCents, direction);
  const name = spokenLine([
    title,
    subtitle,
    date,
    money.word,
    formatMoney(Math.abs(Math.trunc(signedCents)), currency),
  ]);

  const body = (pressed: boolean): React.ReactElement => (
    <View
      style={[
        surface,
        rowContainerStyle(theme, { twoLine: subtitle != null }),
        { backgroundColor: rowGround(theme, { pressed }) },
        style,
      ]}
    >
      {icon != null ? (
        <View style={rowLeadingStyle(theme)}>
          <IconV4 glyph={icon} color={iconColor} size="lg" badge="soft" />
        </View>
      ) : null}
      <View style={rowTextStyle(theme)}>
        <TextV4 size="base" weight="semibold" tone="onSurface" numberOfLines={1}>
          {title}
        </TextV4>
        {subtitle != null ? (
          <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
            {subtitle}
          </TextV4>
        ) : null}
      </View>
      <View style={[rowTrailingStyle(theme), { flexDirection: 'column', alignItems: 'flex-end' }]}>
        <MoneyAmountV4
          cents={signedCents}
          currency={currency}
          tone={direction ?? 'auto'}
          size="md"
          signDisplay="always"
        />
        {date != null ? (
          <TextV4 size="xs" tone="mutedText" numeric="tabular">
            {date}
          </TextV4>
        ) : null}
      </View>
    </View>
  );

  if (!onPress) {
    return (
      <View accessible accessibilityLabel={name}>
        {body(false)}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={name}
      onPress={onPress}
      style={{ borderRadius: tokens.radius.md }}
    >
      {({ pressed }) => body(pressed)}
    </Pressable>
  );
}
