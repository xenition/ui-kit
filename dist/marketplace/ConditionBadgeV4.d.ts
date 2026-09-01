import * as React from 'react';
import type { BadgeProps } from '../primitives/Badge';
import type { ConditionBadgeSize, ConditionBadgeVariant } from './ConditionBadge';
import type { Condition } from './internal';
export type { ConditionBadgeSize, ConditionBadgeVariant };
export interface ConditionBadgeV4Props extends Omit<BadgeProps, 'tone' | 'children'> {
    /** Item condition grade. */
    condition: Condition;
    /**
     * Visual weight. Default `soft`.
     *
     * **This is now honoured on the web.** The base's doc comment says the prop
     * is "retained for parity with the native chip… the web `Badge` ships a
     * single soft-pill treatment, so this is currently informational" — which
     * stopped being true when `Badge` grew `solid` / `soft` / `outline`. The
     * comment was never updated, so the web chip silently ignored a prop the
     * native chip obeyed. See the component note.
     */
    variant?: ConditionBadgeVariant;
    /**
     * Size scale. Default `md`.
     *
     * Honoured on the web too, for the same reason as {@link variant}: `Badge`
     * has taken a `size` since the shadcn pass and the base still described
     * itself as "a fixed size".
     */
    size?: ConditionBadgeSize;
    /** Override the visible label (defaults to a humanized condition). */
    label?: string;
    /**
     * Draw the grade's glyph before the label. Default `true`.
     *
     * Rule 6 asks for an icon **and** a word, and this chip always ships the
     * word — so the escape hatch drops the glyph, never the label. Turn it off
     * where a row is already dense with marks; never to save space by going
     * colour-only.
     */
    showIcon?: boolean;
}
/**
 * The humanized grade, exported because `ListingCardV4` needs the same words
 * for its accessible name. The base card announced the raw slug — "Vintage
 * camera, $125.00, like-new" — which is a database value read aloud to a
 * shopper. One map, two callers, no second spelling of "Refurbished".
 */
export declare const CONDITION_V4_LABEL: Record<Condition, string>;
/**
 * **V4 condition chip** — `new` / `like-new` / `used` / `refurb`, as an icon
 * **and** a word.
 *
 * Brief §3 Group C: "a condition grade is an icon plus a label. It is not
 * status — a 'used' item is not a warning, and rule 3 forbids spending `warn`
 * on it." Three changes follow from that sentence, and nothing else:
 *
 * 1. **An icon joined the word** (rule 6). The base carried a label and a
 *    tone; a tone is not a second channel when the reader is colour-blind or
 *    the chip is printed. See {@link CONDITION_ICON}.
 * 2. **No status colour is spent on a grade** (rule 3). `success` is gone from
 *    `new`. See {@link CONDITION_TONE} for what replaced it, and for the
 *    `accent` divergence between the twins that it also closes.
 * 3. **`variant` and `size` are real on the web.** Both were accepted and
 *    dropped on the floor by the web base "for parity with the native chip",
 *    which is the parity defect inverted: the twins had the same *signature*
 *    and different *behaviour*, which is worse than an honest asymmetry
 *    because nothing catches it.
 *
 * **The glyph is not announced.** A screen reader reading "sparkles New" on
 * every card in a grid is noise, so the chip carries an `aria-label` of the
 * words alone and the composed string stays visual. This is the same call
 * `PriceTagV4` makes for its struck compare-at price.
 *
 * Composes `BadgeV4` (rule 7). An unrecognised grade — one that arrived from
 * an API the types could not check — falls back to a neutral chip carrying the
 * raw value rather than an empty one.
 */
export declare const ConditionBadgeV4: React.ForwardRefExoticComponent<ConditionBadgeV4Props & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=ConditionBadgeV4.d.ts.map