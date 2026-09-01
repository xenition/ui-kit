import * as React from 'react';
import type { ControllerHintProps } from './ControllerHint';
export type ControllerHintV4Props = ControllerHintProps;
/**
 * **V4 controller hint** — the same props as {@link ControllerHint}.
 *
 * ## Three changes
 *
 * 1. **The spoken order matches the drawn order.** The name was
 *    `` `${action}: ${button}` `` — so a sighted player read "Ⓐ Jump" and a
 *    blind one heard "Jump: A". In a HUD strip of six hints those are two
 *    different mappings to memorise, and the strip is exactly the surface
 *    where a player is reading fast. The parts are joined the module's way now
 *    — a comma, which a reader pauses on, rather than a colon it either reads
 *    out loud or swallows.
 * 2. **The key cap scales with Dynamic Type.** It was `allowFontScaling={false}`
 *    inside a 20 or 26 pixel box, so a player who had turned text size up got
 *    every label in the app bigger except the one telling them which button to
 *    press. The glyph scales, and the cap is a minimum with padding rather
 *    than a fixed square, so it grows instead of clipping.
 * 3. **The cap's geometry comes off the scale** rather than being typed as 20
 *    and 26, which are not steps on anything.
 *
 * `inline` is documented as a HUD strip that sits in a caller's own layout, so
 * this component deliberately pays **no safe-area inset** — the inset belongs
 * to whatever pins the strip to the bottom of the screen, and paying it twice
 * floats a HUD off its own edge.
 *
 * **Renders nothing without at least one hint.**
 */
export declare function ControllerHintV4({ button, action, hints, variant, size, style, }: ControllerHintV4Props): React.ReactElement | null;
//# sourceMappingURL=ControllerHintV4.d.ts.map