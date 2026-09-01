import * as React from 'react';
import type { ControllerHintProps } from './ControllerHint';
export interface ControllerHintV4Props extends ControllerHintProps {
}
/**
 * **V4 controller hint** — the same props as {@link ControllerHint}.
 *
 * ## Three changes
 *
 * 1. **The hint is announced in the order it is drawn.** The label was
 *    `` `${action}: ${button}` `` — so a sighted player read "Ⓐ Jump" and a
 *    screen-reader user heard "Jump: A", the mapping backwards. In a HUD strip
 *    of six hints that is six inverted sentences to reassemble. It is built
 *    with `spokenLine()` now, button first, in the reading order.
 * 2. **The key cap scales with Dynamic Type.** See {@link CAP_BOX}: the box
 *    was two hand-picked pixel heights around text that grows with the user's
 *    type setting, so a large-type player got a clipped glyph.
 * 3. **A strip of hints is a list.** It was a bare `flex` of `role="img"`
 *    spans with no container, so a reader had no count and no way to move
 *    through the mapping one hint at a time.
 */
export declare const ControllerHintV4: React.ForwardRefExoticComponent<ControllerHintV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ControllerHintV4.d.ts.map