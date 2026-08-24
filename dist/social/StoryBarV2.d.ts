import * as React from 'react';
import type { StoryBarProps } from './StoryBar';
/** Drop-in for {@link StoryBar} — identical props, a different design. */
export type StoryBarV2Props = StoryBarProps;
/**
 * StoryBar, design V2 — **large gradient-ring circles**. Each tile is an
 * oversized avatar inside a token-ramp gradient ring (`unseen` primary→accent
 * sweep, `live` a danger ring with a LIVE badge, `seen` a muted ring, `add` a
 * dashed ring with a `+`). Bold, media-forward. Same props as {@link StoryBar},
 * token-only; scrolls without a visible scrollbar.
 */
export declare const StoryBarV2: React.ForwardRefExoticComponent<StoryBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=StoryBarV2.d.ts.map