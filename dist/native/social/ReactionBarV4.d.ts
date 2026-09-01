import * as React from 'react';
import type { ReactionBarProps } from './ReactionBar';
/** Drop-in for {@link ReactionBarProps} — same props, the V4 "feed" design. */
export type ReactionBarV4Props = ReactionBarProps;
/**
 * ReactionBar — **V4** "feed" design. A clean wrap of emoji reaction pills, each
 * with a count. The selected reaction highlights with a soft-primary tint pill
 * (primary border + `withAlpha(primary)` fill + `primaryText` count); the rest
 * read on a plain surface with a `muted` count. A trailing `+` opens a fuller
 * picker upstream, and the empty tally is handled too. Same props/behavior as
 * {@link ReactionBarProps}; token-only colors via `useXenitionTheme()` +
 * `withAlpha`, `accessibilityState.selected` per pill.
 */
export declare function ReactionBarV4({ reactions, onReact, onAddReaction, emptyLabel, style, }: ReactionBarV4Props): React.ReactElement;
//# sourceMappingURL=ReactionBarV4.d.ts.map