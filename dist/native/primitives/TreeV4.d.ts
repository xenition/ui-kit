import * as React from 'react';
import type { TreeNode, TreeProps } from './Tree';
export type { TreeProps as TreeV4Props, TreeNode };
/**
 * **V4 tree** — same props as {@link Tree}, a different design line.
 *
 * A tree's whole job is to make a hierarchy visible, and the base fills the
 * selected row edge-to-edge with solid `primary`. That answers "which one" and
 * destroys the answer to "where am I": the indentation, the caret and the
 * label all vanish under a brand bar, and on a deep tree the bar is the
 * loudest thing on the screen — §35.6 asks that colour create hierarchy rather
 * than noise, and §35.5 that accents stay rare.
 *
 * Three changes:
 *
 * 1. **Selection tints, it does not repaint.** 12% `primary` composited into
 *    `surface`, the label in `primaryText` at weight 600. The row still reads
 *    as chosen at a glance, and the structure it sits in survives. The label
 *    is re-measured with `ensureContrast` against the tint the row actually
 *    painted, so the promise is about this row rather than about the page it
 *    was designed on.
 * 2. **The indent is the structure, and it matches its twin.** Both twins now
 *    step by `spacing.lg` per level. The base web twin used a literal `1rem`
 *    while native used `spacing.lg`, so the same tree was a different shape on
 *    the two platforms — and §9 makes indentation the one thing a tree cannot
 *    get wrong.
 * 3. **A row is a real target and never a card.** Every row takes the same
 *    `xl + xs` height the V4 tables use, so the whole line is one rhythm, and
 *    a press tints from the two scheme-resolved neutral slots instead of the
 *    light-oriented ramp step the base web twin reached for.
 *
 * **No guide lines and no depth.** Vertical guides are the obvious "premium"
 * addition and they are ink per level for something 24pt of indentation
 * already says (§7, §9). Nothing lifts: a tree row that casts a shadow is a
 * card in a stack of cards (§8).
 */
export declare function TreeV4({ data, defaultExpanded, selectedId, onSelect, style, }: TreeProps): React.ReactElement;
//# sourceMappingURL=TreeV4.d.ts.map