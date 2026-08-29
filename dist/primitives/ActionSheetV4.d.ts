import * as React from 'react';
import type { ActionSheetAction, ActionSheetProps } from './ActionSheet';
export type { ActionSheetProps as ActionSheetV4Props, ActionSheetAction };
/**
 * `ActionSheet`, V4 — the same props, grouped, with a destructive slot.
 *
 * ## What the depth is saying
 *
 * The groups are cards over a scrimmed page, all at ONE altitude: each carries
 * `--xen-elevation-sheet`, none is nested inside another. §8's "cards inside
 * cards inside cards" is about hierarchy invented for its own sake; three
 * siblings at the same height are three objects on one table, which is what an
 * action sheet literally is. The rows inside them are flat, and nothing in this
 * component is lifted twice.
 *
 * The scrim is `--xen-elevation-color`, not `bg-neutral-950/50` — which inverts
 * under `[data-theme="dark"]` and paints a near-WHITE veil over a dark page,
 * the bug the base component has. Glass applies only when the seed asked for
 * `depth: 'glass'`; elevation is consumed unconditionally, so `depth: 'flat'`
 * needs no branch and gets a flat sheet for free.
 *
 * ## The destructive slot
 *
 * The base component tints EVERY row with `primary` — the iOS convention — and
 * marks the destructive one by swapping that tint for red. Two problems: the
 * sheet then has no hierarchy at all (§5: one dominant thing), and `primary` is
 * a FILL colour with no contrast guarantee as text.
 *
 * So V4 does the opposite. Ordinary rows are plain `on-surface`, a
 * contrast-guaranteed pair that reads as what it is: a list of choices, not a
 * list of links. The destructive action is then **the only coloured text on the
 * sheet**, in `danger-text` — the compiler's contrast-corrected red — and it
 * sits in its own card. Unmistakable because it is the one thing that looks
 * different, rather than because it shouts.
 */
export declare function ActionSheetV4({ open, onClose, title, actions, cancelLabel, className, }: ActionSheetProps): React.ReactElement | null;
//# sourceMappingURL=ActionSheetV4.d.ts.map