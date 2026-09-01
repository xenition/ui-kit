import * as React from 'react';
import type { ReorderRowProps } from './ReorderRow';
export type ReorderRowV4Props = ReorderRowProps;
/**
 * **V4 reorder row** — the same props as {@link ReorderRow}.
 *
 * ## Five changes
 *
 * 1. **Reorder is reachable.** It sat inside a `Pressable` that is
 *    `accessible` by default and carried the row's own label, so VoiceOver
 *    flattened the row to one leaf and the button — the entire point of the
 *    component — did not exist. It is a **sibling** of the row's activation
 *    now. (The web twin loses it a different way: the row's `onKeyDown`
 *    cancels Enter's default action on the nested button, so Enter on
 *    "Reorder" opens the old order instead of reordering it.)
 * 2. **The row says what is in the order.** The name was title plus the meta
 *    line; the items summary — "2× Pad Thai, 1× Spring rolls", the thing that
 *    tells a person which past order this is — was pruned with everything else
 *    inside the button role.
 * 3. **`disabled` blocks the handler**, rather than only setting a flag beside
 *    a live one, and it is drawn at M3's 0.38 band on the thumbnail alone —
 *    the base dimmed the whole row to 0.6 and then *brightened* it to 0.9 on
 *    press, so a disabled row lit up under a finger.
 * 4. **The text and trailing slots come from the shared row family**, so a
 *    past order's title column and its action sit on the same rhythm as every
 *    other row in the kit. Only those two: the family's container is
 *    transparent and border-less by design, because there the *container* owns
 *    the card — and this row is its own framed card.
 * 5. **The thumbnail placeholder survives dark mode** — it was
 *    `tokens.ramps.neutral[100]`, which native copies without inverting.
 *
 * **Renders nothing without a `title`.**
 */
export declare function ReorderRowV4({ title, itemsSummary, dateText, totalCents, currency, imageUrl, onReorder, reorderLabel, onPress, disabled, formatMoney, style, }: ReorderRowV4Props): React.ReactElement | null;
//# sourceMappingURL=ReorderRowV4.d.ts.map