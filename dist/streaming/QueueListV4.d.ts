import * as React from 'react';
import type { QueueListProps } from './QueueList';
/** Drop-in for {@link QueueListProps} — same props, the V4 "spotlight" design. */
export type QueueListV4Props = QueueListProps;
/**
 * QueueList — **V4** "spotlight" design (web parity of the native V4). An ordered
 * now/next queue of calm surface rows: each row is a small rounded artwork plus
 * title/artist, with a trailing duration and per-row remove affordance. The row
 * matching `nowPlayingId` gets a soft-`primary` tint and a leading **primary**
 * now-playing glyph (the one accent), announced via `aria-current`. Rows are
 * clean surface (no gradient — that is reserved for the artwork-hero moments);
 * tap targets are ≥44px. When `tracks` is empty it renders an `EmptyState` (from
 * `commerce`). Same props/behavior as {@link QueueListProps}; all colors from
 * `--xen-*` token classes (no literal hex).
 */
export declare const QueueListV4: React.ForwardRefExoticComponent<QueueListProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=QueueListV4.d.ts.map