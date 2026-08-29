import * as React from 'react';
import type { TreeNode, TreeProps } from './Tree';
export type { TreeProps as TreeV4Props, TreeNode };
/**
 * **V4 tree** — the web twin of the native `TreeV4`, same props as
 * {@link Tree}, a different design line.
 *
 * A tree's whole job is to make a hierarchy visible, and the base fills the
 * selected row edge-to-edge with solid `bg-primary`. That answers "which one"
 * and destroys the answer to "where am I": the indentation, the caret and the
 * label all vanish under a brand bar, and on a deep tree the bar is the
 * loudest thing on the screen — §35.6 asks that colour create hierarchy rather
 * than noise, and §35.5 that accents stay rare.
 *
 * Four changes:
 *
 * 1. **Selection tints, it does not repaint.** 12% `--xen-primary` mixed into
 *    `--xen-surface`, the label in `text-primary-text` semibold. The row still
 *    reads as chosen at a glance and the structure it sits in survives. The
 *    rule wins over hover, because pointing at the chosen row must not
 *    un-choose it.
 * 2. **The indent matches its twin.** The base stepped by a literal `1rem`
 *    while native stepped by `spacing.lg`, so the same tree was a different
 *    shape on the two platforms. Both step by `--xen-space-lg` now, and §9
 *    makes indentation the one thing a tree cannot get wrong.
 * 3. **Hover comes off the right neutral.** `hover:bg-neutral-100` is the
 *    light-oriented ramp — under `[data-theme="dark"]` it mirrors and paints a
 *    pale slab across a dark row. The shared V4 row sheet mixes
 *    `--xen-on-surface` into `--xen-surface` instead, which inverts by
 *    construction.
 * 4. **The focus ring is a token, not a ramp step.** `ring-primary-300` was
 *    picked off the scale; `ring-ring` is the semantic slot, so a focus
 *    ring stays visible when the brand hue moves.
 *
 * Rows take the same `xl + xs` height the V4 tables use, so the data-display
 * line has one rhythm. **No guide lines and no depth**: vertical guides are the
 * obvious "premium" addition and they are ink per level for something 24px of
 * indentation already says (§7, §9), and a tree row that casts a shadow is a
 * card in a stack of cards (§8).
 */
export declare const TreeV4: React.ForwardRefExoticComponent<TreeProps & React.RefAttributes<HTMLUListElement>>;
//# sourceMappingURL=TreeV4.d.ts.map