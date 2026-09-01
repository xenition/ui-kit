import * as React from 'react';
import type { TransactionRowProps } from './TransactionRow';
export interface TransactionRowV4Props extends TransactionRowProps {
}
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
export declare function TransactionRowV4({ title, subtitle, amountCents, currency, direction, date, icon, iconColor, onPress, appearance, style, }: TransactionRowV4Props): React.ReactElement;
//# sourceMappingURL=TransactionRowV4.d.ts.map