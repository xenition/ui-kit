import * as React from 'react';
import type { MultiSelectOption, MultiSelectProps } from './MultiSelect';
export type { MultiSelectProps as MultiSelectV4Props, MultiSelectOption };
/**
 * **V4 multi-select** — the same props as {@link MultiSelect}, a different
 * design line.
 *
 * The trigger is a **field**: `2xl` tall, `md` radius, `md` horizontal padding,
 * from the same shared `fieldMetrics` `InputV4` and `SelectV4` take. A form
 * whose controls disagree about their own height reads as parts that happened
 * to land near each other; matching them is the cheapest quality signal a kit
 * has (§13).
 *
 * Two things changed beyond the metrics, and both are about colour discipline:
 *
 * 1. **The chips are not a second brand colour.** The base fills every chip
 *    with `accent`, which puts the brand's secondary hue on screen once per
 *    selection — §35.5 asks for a limited number of simultaneous accents, and
 *    §35.2 says the accent exists for emphasis, not for repetition. A V4 chip
 *    is a 14% brand tint **composited into `surface`**, so it reads as chosen
 *    without shouting, and it is an opaque colour rather than a translucent
 *    one: a chip at 14% alpha is a different colour on a card, on glass and on
 *    the page, and its label only ever carried a contrast guarantee against
 *    one of the three.
 * 2. **The chips are not pills.** `radius.sm` from the seed, so a `sharp`
 *    brand gets square chips. §8 lists excessive pill-shaped controls among the
 *    tells of generic AI UI, and a row of capsules is exactly that shape.
 *
 * The sheet goes through the shared surface plumbing — `panelSkin` plus
 * `elevation.sheet` over a scrim built from the elevation colour, which does
 * not invert with the scheme the way the base's neutral ramp step does. The
 * rows inside it are flat: the sheet is the layer, and everything on it belongs
 * to that layer (§8, no cards inside cards).
 *
 * The caret rotates as the sheet opens, so the disclosure explains itself
 * (§36.1); it runs on the native driver and is skipped under Reduce Motion
 * (§36.10).
 */
export declare function MultiSelectV4({ options, value, onChange, placeholder, invalid, disabled, accessibilityLabel, style, }: MultiSelectProps): React.ReactElement;
//# sourceMappingURL=MultiSelectV4.d.ts.map