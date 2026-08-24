import * as React from 'react';
import type { StoryBarProps } from './StoryBar';
/** Drop-in for {@link StoryBar} — identical props, a different design. */
export type StoryBarV3Props = StoryBarProps;
/**
 * StoryBar, design V3 — **compact rounded-square tiles**. Each story is a small
 * cover tile (image or tinted initials) with a scrim-backed name at the bottom;
 * ring state maps to the tile border (`unseen` primary, `seen` hairline, `live`
 * a badge, `add` a dashed `+`). Minimal/structural. Same props as
 * {@link StoryBar}, token-only.
 */
export declare const StoryBarV3: React.ForwardRefExoticComponent<StoryBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=StoryBarV3.d.ts.map