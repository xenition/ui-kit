import * as React from 'react';
import type { RowProps } from './Row';
/**
 * The V4 takes exactly the base's props (§1.4 additive-only — there is nothing
 * to add here), re-exported rather than restated so the twins cannot drift.
 */
export type { RowProps as RowV4Props };
/**
 * **V4 row (native)** — the horizontal stack, on the V4 design line, and the
 * exact twin of the web `RowV4`.
 *
 * ## There is deliberately no visual change here
 *
 * `LAYOUT-DASHBOARD-V4-BRIEF.md` §5 marks `Row` "structure only": every gap
 * already comes off `tokens.spacing`, and there is not a colour, radius or font
 * size in the file to launder. So this renders the same style object the base
 * renders, and the spec asserts that against the base rather than trusting the
 * claim. It exists so the V4 line is complete — a V4 composite composes V4
 * children (§1.4).
 *
 * ## What it does settle
 *
 * **The `align` type.** §5 asks the twins' align vocabularies to agree.
 * `baseline` *is* meaningful on a row — it is how a title and a trailing
 * timestamp sit on one optical line — so both twins take the full `Align`, and
 * both take it from `RowProps` so they cannot drift. (`Column` is the
 * mirror-image decision: `baseline` is meaningless there, so both twins narrow
 * it away.)
 *
 * **`gap` stays optional with no default.** §4.1 owns the spacing rhythm and it
 * is the caller's to spend; a default here would quietly outrank it everywhere.
 *
 * The caller's `style` is still applied **last**, exactly as the base does it.
 */
export declare function RowV4({ gap, align, justify, wrap, style, children, ...rest }: RowProps): React.ReactElement;
//# sourceMappingURL=RowV4.d.ts.map