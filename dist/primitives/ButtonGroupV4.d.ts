import * as React from 'react';
import type { ButtonGroupProps } from './ButtonGroup';
export type { ButtonGroupProps as ButtonGroupV4Props };
/**
 * **V4 button group** — the web twin of the native `ButtonGroupV4`, same props
 * as {@link ButtonGroup}, a different design line. Still purely structural: it
 * adds one colour, the `border` hairline, and lets every child keep its own.
 *
 * 1. **One row, one height.** Nothing made the cells the same height, so a
 *    group mixing an `sm` and an `md` button had a ragged bottom edge inside a
 *    single border, and the divider between them stopped short. `items-stretch`
 *    makes the seam full-bleed and the row square.
 * 2. **A joined control is still a row of tap targets.** Fusing buttons into
 *    one shape is a visual decision; it does not shrink a finger. The row keeps
 *    a 44px floor.
 * 3. **The two twins agree on what this is.** Native claimed
 *    `accessibilityRole="toolbar"` — a role that promises arrow-key navigation
 *    this component does not provide — while the web said `group`. `group` is
 *    the honest one, and it stays.
 *
 * The children keep `[&>*]:rounded-none`, which is what actually closes the
 * seams; the container's `overflow-hidden` only ever clipped its own corners,
 * and the native twin had been relying on it to do more.
 *
 * No fill, no gradient, no shadow. A segmented control groups by adjacency and
 * a hairline (§9, §11); the buttons inside it are what carry colour.
 */
export declare const ButtonGroupV4: React.ForwardRefExoticComponent<ButtonGroupProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ButtonGroupV4.d.ts.map