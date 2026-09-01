import * as React from 'react';
import type { QueueListProps } from './QueueList';
/** Drop-in for {@link QueueListProps} — same props, the V4 "spotlight" design. */
export type QueueListV4Props = QueueListProps;
/**
 * QueueList — **V4** "spotlight" design. An ordered now/next queue of calm surface
 * rows: each row is a small rounded artwork plus title/artist, with a trailing
 * duration and a per-row remove affordance. The row matching `nowPlayingId` gets
 * a soft-`primary` tint and a leading **primary** now-playing glyph (the one
 * accent), announced via `accessibilityState.selected`. Rows are clean surface
 * (no gradient — that is reserved for the artwork-hero moments); tap targets are
 * ≥44px. When `tracks` is empty it renders an `EmptyState`. Same props/behavior
 * as {@link QueueListProps}; token-only colors via `useXenitionTheme()`.
 */
export declare function QueueListV4({ tracks, nowPlayingId, state, title, rowVariant: _rowVariant, onSelect, onRemove, emptyLabel, style, }: QueueListV4Props): React.ReactElement;
//# sourceMappingURL=QueueListV4.d.ts.map