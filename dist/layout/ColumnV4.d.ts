import * as React from 'react';
import type { ColumnProps } from './Column';
/**
 * Exactly the base's props (§1.4 additive-only — there is nothing this one
 * needs to add), re-exported rather than restated so the twins cannot drift.
 * `align` is already `Exclude<Align, 'baseline'>` here, which is the type §5
 * asks both twins to settle on.
 */
export type { ColumnProps as ColumnV4Props };
/**
 * **V4 column** — the vertical stack, on the V4 design line.
 *
 * ## There is deliberately no visual change here
 *
 * `LAYOUT-DASHBOARD-V4-BRIEF.md` §5 marks `Column` "structure only". The file
 * is already token-pure — every gap is a `--xen-space-*` class out of
 * `_tokens.ts`, and there is no colour, radius or font size in it to launder —
 * so this renders byte-for-byte what `Column` renders, and its spec asserts
 * that against the base rather than asking you to take it on trust.
 *
 * It ships so the V4 line is complete: a V4 composite composes V4 children
 * (§1.4), and the vertical stack is the skeleton under most of them.
 *
 * ## What it does settle
 *
 * **The `align` type, on both twins.** §5's parity note reads on `Column`;
 * `baseline` is not meaningful on a column — there is no shared baseline to sit
 * on when children are stacked vertically — so both twins take
 * `Exclude<Align, 'baseline'>`. The native base already narrowed it, so V4
 * pins the agreement by importing `ColumnProps` instead of restating it, and
 * the native twin does the same.
 *
 * **`gap` keeps its undefined default.** §4.1 owns the spacing rhythm and it is
 * the caller's to spend — section-to-section is `gap="xl"`, a title and its
 * supporting line are `gap="xs"`. A default here would outrank that rhythm
 * everywhere at once and would not be additive.
 *
 * The `data-xen-v4-column` marker carries no styling; it is the house handle
 * for finding a V4 column in the tree.
 */
export declare const ColumnV4: React.ForwardRefExoticComponent<ColumnProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ColumnV4.d.ts.map