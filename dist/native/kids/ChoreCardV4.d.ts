import * as React from 'react';
import type { ChoreCardProps, ChoreStatus } from './ChoreCard';
export interface ChoreCardV4Props extends ChoreCardProps {
    /** A neutral explanation for a skipped or missed chore. */
    reason?: string;
    /** The word each status is printed and announced with. */
    statusLabels?: Partial<Record<ChoreStatus, string>>;
    /** The completion action's label. Default `'Mark done'`. */
    completeLabel?: string;
}
/**
 * **V4 chore card** — same props as {@link ChoreCard} plus `reason`,
 * `statusLabels` and `completeLabel`.
 *
 * ## Five changes
 *
 * 1. **"Mark done" is reachable.** The base wrapped the whole card in a
 *    `Pressable`, and a `Pressable` is `accessible` by default: VoiceOver
 *    flattened the card to one leaf carrying the card's own name, so the
 *    button, the points chip and the status chip were not reachable at all. A
 *    child could not complete a chore with a screen reader on. The fix is
 *    structural, not a guard — the container is a plain `View`, the activation
 *    wraps only the icon-and-text region, and every control sits beside it.
 * 2. **A skipped chore is not a warning.** `skipped → warn` put an amber chip
 *    on a child's card for a chore nobody may have expected them to do. It is
 *    neutral, with a glyph and a word, and `reason` carries the explanation the
 *    status had nowhere to put — `needsExplanation()` is what decides a status
 *    owes one.
 * 3. **The card is a card.** It painted `colors.surface`, the *page* colour, so
 *    it never read as raised and dark mode went flat; the skeleton painted
 *    `colors.border`, the hairline colour used as a fill.
 * 4. **Press is a state layer.** `opacity: pressed ? 0.85 : 1` sits inside M3's
 *    disabled band (0.38), so a pressed card read as an unavailable one.
 * 5. **Every string is a prop**, so a Spanish chore board is not four English
 *    words in the middle of it.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
export declare function ChoreCardV4({ title, assignee, points, due, icon, status, loading, reason, statusLabels, completeLabel, onComplete, onPress, style, }: ChoreCardV4Props): React.ReactElement | null;
//# sourceMappingURL=ChoreCardV4.d.ts.map