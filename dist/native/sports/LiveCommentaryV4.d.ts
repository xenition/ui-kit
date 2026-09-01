import * as React from 'react';
import type { LiveCommentaryProps } from './LiveCommentary';
/** Drop-in for {@link LiveCommentaryProps} — same props, the V4 "broadcast" design. */
export type LiveCommentaryV4Props = LiveCommentaryProps;
/**
 * LiveCommentary — **V4** "broadcast" design. A live text feed on an elevated
 * card: a `live` header carries a pulsing `danger` dot + "LIVE" label (never
 * color alone), and each entry pairs a minute chip with a kind glyph + text.
 * Key events (goal / card) and any `important` entry get a soft-tint accent
 * lane. One accent: `primary`. Same props/behavior as
 * {@link LiveCommentaryProps} (drop-in) — keeps the entry list contract,
 * kinds/minutes, loading and empty states. Token-only colors via
 * `useXenitionTheme()`.
 */
export declare function LiveCommentaryV4({ entries, title, live, loadingRows, emptyLabel, style, }: LiveCommentaryV4Props): React.ReactElement;
//# sourceMappingURL=LiveCommentaryV4.d.ts.map