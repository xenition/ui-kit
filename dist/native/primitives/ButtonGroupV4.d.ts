import * as React from 'react';
import type { ButtonGroupProps } from './ButtonGroup';
export type { ButtonGroupProps as ButtonGroupV4Props };
/**
 * **V4 button group** — same props as {@link ButtonGroup}, a different design
 * line. Still purely structural: it adds one colour, the `border` hairline, and
 * lets every child keep its own.
 *
 * 1. **The seams actually close.** `overflow: 'hidden'` clips the CONTAINER's
 *    corners; it does nothing to the children's. So every button inside the
 *    native group kept its own `radius.md` and the group showed a notch at each
 *    seam, with the page bleeding through — while the web twin had it right all
 *    along with `[&>*]:rounded-none`. V4 passes `borderRadius: 0` down to each
 *    cell, which is that rule's native equivalent.
 * 2. **It stops claiming to be a `toolbar`.** That role promises arrow-key
 *    navigation between its controls, and this component provides none — a
 *    screen-reader user who trusts it is stranded inside the group. React
 *    Native has no `group` role to swap in (the web twin's `role="group"` has
 *    no native equivalent), so V4 claims nothing: the buttons are the
 *    accessible elements and the row is layout. An honest silence beats a
 *    promise the component cannot keep (§46).
 * 3. **One row, one height.** Nothing made the cells the same height, so a
 *    group mixing an `sm` and an `md` button had a ragged bottom edge inside a
 *    single border. They stretch now, and the row has a 44pt floor — a joined
 *    control is still a row of tap targets.
 *
 * No fill, no gradient, no shadow. A segmented control groups by adjacency and
 * a hairline (§9, §11); the buttons inside it are what carry colour.
 */
export declare function ButtonGroupV4({ children, fill, style, }: ButtonGroupProps): React.ReactElement;
//# sourceMappingURL=ButtonGroupV4.d.ts.map