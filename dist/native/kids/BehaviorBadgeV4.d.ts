import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { BadgeSize } from '../primitives/Badge';
import type { BehaviorBadgeProps, BehaviorTone } from './BehaviorBadge';
export interface BehaviorBadgeV4Props extends BehaviorBadgeProps {
    /** A neutral explanation shown under the chip, e.g. "Tired after swimming". */
    note?: string;
    /** The word each tone is announced and printed with. */
    toneLabels?: Partial<Record<BehaviorTone, string>>;
    /** Chip size. Default `'md'`. */
    size?: BadgeSize;
    /** Layout override — margins and alignment, never colour. */
    style?: StyleProp<ViewStyle>;
}
/**
 * **V4 behaviour badge** — same props as {@link BehaviorBadge} plus `note`,
 * `toneLabels`, `size` and a `style` surface.
 *
 * ## Four changes
 *
 * 1. **A child's conduct is no longer drawn in the error colour.** The base
 *    mapped `negative → danger`, so
 *    `<BehaviorBadge tone="negative" label="Interrupted" points={2} />` put a
 *    red chip with a 👎 and "(−2)" against a six-year-old's name. `danger`
 *    means *something has gone wrong with the system*; spending it on a child
 *    is both a status-colour-on-identity violation and a shaming pattern. All
 *    three tones now wear the same neutral chip, and the tone is carried by a
 *    glyph, a word and the sign on the points — which is also the only version
 *    of this that survives greyscale, colour blindness and a screen reader.
 *    `positive` is not given `success` either: colour-grading a child's
 *    behaviour at all is the pattern, not the particular hue.
 * 2. **The spoken string stops labelling the child.** It read
 *    `"negative behavior: Interrupted (−2)"`. It now reads
 *    `"Interrupted, Needs a chat, −2"` — the event, then a neutral verdict —
 *    and every word of it is a prop.
 * 3. **A `note` can explain instead of the chip judging.** A behaviour log
 *    entry with a reason attached is a conversation; one without is a verdict.
 * 4. **The chip can be positioned.** Its props interface extended nothing, so
 *    a caller could not give it a margin or align it — it is the only
 *    component in the module with no `style` surface at all. It also picks up
 *    a real 44 tap target when it is pressable, and a state layer instead of
 *    `opacity: pressed ? 0.7 : 1` — an opacity inside M3's *disabled* band.
 *
 * **Renders nothing without a `label`** (§4.5).
 */
export declare function BehaviorBadgeV4({ label, tone, points, icon, size, note, toneLabels, onPress, style, }: BehaviorBadgeV4Props): React.ReactElement | null;
//# sourceMappingURL=BehaviorBadgeV4.d.ts.map