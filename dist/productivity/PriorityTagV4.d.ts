import * as React from 'react';
import type { PriorityTagProps } from './PriorityTag';
/** Drop-in for {@link PriorityTagProps} — same props, the V4 "flow" design. */
export type PriorityTagV4Props = PriorityTagProps;
/**
 * PriorityTag — **V4** "flow" design (web parity of the native V4). The
 * focused-workspace take on a priority chip: a **soft-tint pill** colored by
 * level with a leading glyph so urgency reads by shape as well as color, keeping
 * the base levels and the `dotOnly` dense mode. Same props/behavior as
 * {@link PriorityTagProps}; all colors from `--xen-*` token classes (no literals).
 */
export declare const PriorityTagV4: React.ForwardRefExoticComponent<PriorityTagProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=PriorityTagV4.d.ts.map