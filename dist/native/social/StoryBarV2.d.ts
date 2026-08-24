import * as React from 'react';
import type { StoryBarProps } from './StoryBar';
/** Drop-in for {@link StoryBar} — identical props, a different design. */
export type StoryBarV2Props = StoryBarProps;
/**
 * StoryBar, design V2 — **large gradient-ring circles**. Each tile is an
 * oversized avatar inside a four-corner multi-tone ring (a token-pure faux
 * gradient), with `live` in danger and `add` a dashed ring. Same props as
 * {@link StoryBar}, token-only; scrolls without a visible scrollbar.
 */
export declare function StoryBarV2({ stories, onPressStory, showAdd, onPressAdd, addLabel, style, }: StoryBarV2Props): React.ReactElement;
//# sourceMappingURL=StoryBarV2.d.ts.map