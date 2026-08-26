import * as React from 'react';
import type { KanbanCard, KanbanColumn, KanbanProps } from './Kanban';
export type { KanbanProps as KanbanV4Props, KanbanColumn, KanbanCard };
/**
 * `Kanban`, V4 — the same props, and the board stops being boxes inside boxes.
 *
 * ## The nesting problem, and what fixes it
 *
 * The base gives the column a `border` and a `surface` fill, then fills every
 * card inside it with `surface` and gives it a `border` too. Two nested
 * rectangles on identical grounds, separated only by a hairline each — which is
 * §8's "cards inside cards inside cards" almost exactly, and it makes a busy
 * board read as a grid of empty frames before it reads as work.
 *
 * V4 splits the two levels apart by **ground** rather than by outline. The
 * column becomes a recessed tray — one 4% step towards `on-surface`, the same
 * step the V4 tables band with — and loses its border entirely. The cards keep
 * `surface` and their hairline, so they now sit *on* something instead of
 * inside something. One level of depth, said once, and the outline that was
 * doing the work goes away (§9 — spacing and ground as structure).
 *
 * Neither level gets a shadow. A card on a board is not a layer; it is an item
 * in a list that happens to be laid out in columns.
 *
 * ## The count chip
 *
 * It shared a bug with several other chips in the kit: `bg-muted` with
 * `text-surface`. `muted` is a decorative slot with no contrast promise and
 * `surface` is a *page* colour, so the pair was never measured against
 * anything — and both move independently per scheme. V4 uses the same recipe
 * the V4 navigation badges use: an opaque mix of `on-surface` into `surface`,
 * carrying `on-surface` as its ink, which is a compiler-guaranteed pair.
 *
 * ## Feedback
 *
 * Cards hover and press with the M3 state layer over `surface`, replacing
 * `hover:bg-neutral-50` — a light-oriented ramp step, so the base's hover is a
 * near-white slab on a dark board. Focus is `--xen-ring`, the one ring the kit
 * shares, replacing `ring-primary-300`, which is a ramp step and inverts the
 * same way.
 *
 * Still non-drag: `onCardPress` is the whole interaction, and a DnD layer is
 * the caller's. Saying so is better than implying reordering the board cannot
 * do.
 */
export declare const KanbanV4: React.ForwardRefExoticComponent<KanbanProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=KanbanV4.d.ts.map