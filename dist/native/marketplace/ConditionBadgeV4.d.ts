import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { ConditionBadgeSize, ConditionBadgeVariant } from './ConditionBadge';
import type { Condition } from './internal';
export type { ConditionBadgeSize, ConditionBadgeVariant };
export interface ConditionBadgeV4Props {
    /** Item condition grade. */
    condition: Condition;
    /**
     * Visual weight. Default `soft`.
     *
     * The native chip already obeyed this; the **web** chip accepted it and
     * dropped it on the floor "for parity". Both obey it now — see the component
     * note.
     */
    variant?: ConditionBadgeVariant;
    /** Size scale. Default `md`. Honoured on both twins in V4. */
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
    /** Accessible name. Defaults to the visible words, without the glyph. */
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
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
 *    `new`. See {@link CONDITION_TONE}.
 * 3. **`variant` and `size` behave identically on both twins.** They already
 *    did here; the web twin caught up.
 *
 * **The glyph is not announced.** A screen reader reading "sparkles New" on
 * every card in a grid is noise, so the chip is one accessibility element
 * carrying the words alone and the composed string stays visual. This is the
 * same call `PriceTagV4` makes for its struck compare-at price.
 *
 * The wrapper `View` exists only to own that accessible name: `BadgeV4` takes
 * `style` and `children` and nothing else, and the label has to sit on
 * something. It hugs its content (`alignSelf: 'flex-start'`) so the chip
 * measures exactly as the bare badge does.
 *
 * Composes `BadgeV4` (rule 7). An unrecognised grade — one that arrived from
 * an API the types could not check — falls back to a neutral chip carrying the
 * raw value rather than an empty one.
 */
export declare function ConditionBadgeV4({ condition, variant, size, label, showIcon, accessibilityLabel, style, }: ConditionBadgeV4Props): React.ReactElement;
//# sourceMappingURL=ConditionBadgeV4.d.ts.map