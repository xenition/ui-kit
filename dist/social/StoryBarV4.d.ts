import * as React from 'react';
import type { StoryBarProps } from './StoryBar';
/** Drop-in for {@link StoryBarProps} — same props, the V4 "feed" design. */
export type StoryBarV4Props = StoryBarProps;
/**
 * StoryBar — **V4** "feed" design (web parity of the native V4). A clean, airy
 * horizontally-scrolling rail of {@link StoryRing}s, optionally led by the
 * viewer's "add story" tile. In the feed line an unseen story wears the
 * accent→primary gradient ring while a seen one falls back to a muted ring;
 * the add tile carries a primary `⊕`. Ring state comes straight from each
 * story. Same props/behavior as {@link StoryBarProps}; all colors from
 * `--xen-*` token classes (no literals). Scrolls without a visible scrollbar.
 */
export declare const StoryBarV4: React.ForwardRefExoticComponent<StoryBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=StoryBarV4.d.ts.map