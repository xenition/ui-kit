import * as React from 'react';
import type { RowProps } from './Row';
/**
 * The V4 takes exactly the base's props (§1.4 additive-only, and there is
 * nothing to add here), so the type is re-exported rather than restated — the
 * one way to guarantee the two never drift.
 */
export type { RowProps as RowV4Props };
/**
 * **V4 row** — the horizontal stack, on the V4 design line.
 *
 * ## There is deliberately no visual change here
 *
 * `LAYOUT-DASHBOARD-V4-BRIEF.md` §5 marks `Row` "structure only": the file is
 * already token-pure (every gap is a `--xen-space-*` class from `_tokens.ts`,
 * there is not a colour, radius or font size in it), and `align='center'` is
 * the right default for the row family §4.3 describes. A V4 that moved the
 * default alignment or paid a gap the caller did not ask for would silently
 * re-space every screen that composes it, which is exactly what §1.4's
 * additive-only rule exists to prevent. So this renders byte-for-byte what
 * `Row` renders, and its spec asserts that against the base rather than
 * trusting the claim.
 *
 * It exists so the V4 line is complete — a V4 composite composes V4 children
 * (§1.4), and until now a `ListRowV4` had to reach back into the V3 `Row` for
 * its own skeleton.
 *
 * ## What it does settle
 *
 * **The `align` type.** §5 asks the twins' align vocabularies to agree.
 * `baseline` *is* meaningful on a row — it is how a title and a trailing
 * timestamp sit on the same optical line — so both twins take the full
 * `Align` from `_tokens.ts`, and the props come straight off `RowProps` so they
 * cannot drift apart later. (`Column` is the mirror-image decision: there
 * `baseline` is meaningless, so both twins narrow it away.)
 *
 * **`gap` stays optional with no default.** §4.1 owns the spacing rhythm and it
 * is the caller's to apply — a row inside a card header and a row of chips do
 * not want the same gap, and a default here would quietly outrank the rhythm.
 *
 * The `data-xen-v4-row` marker carries no styling of its own; it is the house
 * handle a future sheet or a spec uses to find a V4 row in the tree.
 */
export declare const RowV4: React.ForwardRefExoticComponent<RowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RowV4.d.ts.map