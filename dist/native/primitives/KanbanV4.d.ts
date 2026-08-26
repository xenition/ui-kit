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
 * column becomes a recessed tray — one `ZEBRA_MIX` step towards `onSurface`,
 * the same step the V4 tables band with — and loses its border entirely. The
 * cards keep `surface` and their hairline, so they now sit *on* something
 * instead of inside something. One level of depth, said once, and the outline
 * that was doing the work goes away (§9 — spacing and ground as structure).
 *
 * Both mixes are composited from the two **scheme-resolved** slots rather than
 * from `tokens.ramps`, which carries the light orientation in both schemes; and
 * they are opaque rather than translucent, so a column on a patterned page
 * still owns its colour.
 *
 * Neither level gets a shadow. A card on a board is not a layer; it is an item
 * in a list that happens to be laid out in columns.
 *
 * ## The count chip
 *
 * It shared a bug with several other chips in the kit: a `muted` fill with
 * `surface` as its ink. `muted` is a decorative slot with no contrast promise
 * and `surface` is a *page* colour, so the pair was never measured against
 * anything — and both move independently per scheme. V4 uses the same recipe
 * the V4 navigation badges use on the web: an opaque mix of `onSurface` into
 * `surface`, carrying `onSurface` as its ink, which is a compiler-guaranteed
 * pair.
 *
 * ## Feedback
 *
 * Cards press with the M3 state layer over `surface` — the base gave a card no
 * press feedback at all, so a tappable card was indistinguishable from a static
 * one until something happened somewhere else on the screen (§14).
 *
 * Still non-drag: `onCardPress` is the whole interaction, and a gesture layer
 * for reordering is the caller's.
 */
export declare function KanbanV4({ columns, onCardPress, columnWidth, style, }: KanbanProps): React.ReactElement;
//# sourceMappingURL=KanbanV4.d.ts.map