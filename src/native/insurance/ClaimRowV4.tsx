import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import {
  rowContainerStyle,
  rowGround,
  rowLeadingStyle,
  rowTextStyle,
  rowTrailingStyle,
} from '../dashboard/internal/row-v4';
import { formatMoney } from '../../commerce/money';
import {
  CLAIM_STATUS_V4,
  DECORATIVE,
  pillGround,
  pillStyle,
  spokenLine,
  toneInk,
} from './internal/tone-v4';
import type { ClaimRowProps } from './ClaimRow';

/**
 * No new props: the base already accepts `formatMoney`, which is the only one
 * the shared prop table asks for here. Everything this file fixes is
 * structural, which is why the interface is empty and stays that way — a row
 * that announces no money is not missing a prop, it is built wrong.
 */
export interface ClaimRowV4Props extends ClaimRowProps {}

/**
 * **V4 claim row** — the same props as {@link ClaimRow}, `formatMoney`
 * included; every fix here is structural.
 *
 * ## Six changes
 *
 * 1. **The row announces its amount.** The base named the `Pressable`
 *    `"Claim CLM-20481, Windshield replacement, Approved"` and then drew the
 *    settled amount and the date as *children of that same Pressable*. A
 *    `Pressable` is `accessible` by default and flattens its whole subtree into
 *    one leaf wearing that name, so a screen-reader user working down a claims
 *    list heard a status for every claim and **never once heard how much money
 *    was involved** — which is the only reason anybody opens the screen. The
 *    amount and the date are folded into the name now, joined with commas.
 * 2. **A negative amount is shown, not swallowed.** `Math.max(0, …)` clamped
 *    every amount to zero, so `amountCents={-1}` — a reversal, a sign error
 *    upstream, a clawback — printed `$0.00`, indistinguishable from a real
 *    zero. It now prints what it was given, minus sign and all, because a
 *    number the caller cannot see is a number nobody can correct.
 * 3. **Press is a state layer.** `opacity: pressed ? 0.7 : 1` faded the row's
 *    own content into M3's 0.38 disabled band, so a pressed row and a dead row
 *    looked the same. The row tints its container instead and leaves the ink at
 *    full strength.
 * 4. **It is a row from the shared row family.** `ClaimRow`, `BeneficiaryRow`
 *    and `PolicyDocumentRow` were three heights, three leading slots and three
 *    press treatments in one module; all three now come from
 *    `dashboard/internal/row-v4`, so a claims list scrolled into a documents
 *    list reads as one product.
 * 5. **The status disc is decorative.** It was an `Icon` carrying its own
 *    `accessibilityLabel`, so the status was announced twice on a static row
 *    and read out of a flattened subtree on a pressable one. The disc is hidden
 *    and the word beside it does the talking.
 * 6. **The disc's tint is opaque.** `withAlpha(tint, 0.14)` is a translucent
 *    wash that changes colour with whatever is behind the row; the glyph's
 *    contrast against it was a different number on a card than on the page.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
export function ClaimRowV4({
  claimNumber,
  title,
  status,
  amountCents,
  currency = 'USD',
  date,
  formatMoney: format = formatMoney,
  onPress,
  style,
}: ClaimRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  if (!title) return null;

  const meta = CLAIM_STATUS_V4[status] ?? CLAIM_STATUS_V4.filed;
  const word = meta.label;

  // No `Math.max(0, …)`: see change 2. `Math.trunc` stays — cents are integers,
  // and a fractional cent is a caller's rounding bug this row cannot fix.
  const amount =
    typeof amountCents === 'number' && Number.isFinite(amountCents)
      ? format(Math.trunc(amountCents), currency)
      : null;

  const spoken = spokenLine([title, claimNumber, word, amount, date]);

  const body = (pressed: boolean): React.ReactElement => (
    <View
      style={[
        rowContainerStyle(theme, { twoLine: true }),
        { backgroundColor: rowGround(theme, { pressed }) },
        style,
      ]}
    >
      <View
        {...DECORATIVE}
        style={[
          rowLeadingStyle(theme),
          { borderRadius: tokens.radius.full, backgroundColor: pillGround(theme, meta.tone) },
        ]}
      >
        <TextV4 size="base" style={{ color: toneInk(theme, meta.tone) }}>
          {meta.glyph}
        </TextV4>
      </View>

      <View style={rowTextStyle(theme)}>
        <TextV4 size="base" weight="semibold" tone="onCard" numberOfLines={1}>
          {title}
        </TextV4>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          {claimNumber ? (
            <TextV4 size="xs" tone="mutedText" numberOfLines={1} style={{ flexShrink: 1 }}>
              {claimNumber}
            </TextV4>
          ) : null}
          <View style={pillStyle(theme, meta.tone)}>
            <TextV4 size="xs" style={{ color: toneInk(theme, meta.tone) }}>
              {meta.glyph}
            </TextV4>
            <TextV4 size="xs" weight="semibold" style={{ color: toneInk(theme, meta.tone) }}>
              {word}
            </TextV4>
          </View>
        </View>
      </View>

      <View style={[rowTrailingStyle(theme), { flexDirection: 'column', alignItems: 'flex-end' }]}>
        {amount ? (
          <TextV4 size="base" weight="bold" tone="onCard" numeric="tabular">
            {amount}
          </TextV4>
        ) : null}
        {date ? (
          <TextV4 size="xs" tone="mutedText" numeric="tabular">
            {date}
          </TextV4>
        ) : null}
      </View>
    </View>
  );

  if (!onPress) {
    return (
      <View accessible accessibilityLabel={spoken}>
        {body(false)}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={spoken}
      onPress={onPress}
      style={{ borderRadius: tokens.radius.md }}
    >
      {({ pressed }) => body(pressed)}
    </Pressable>
  );
}
