import * as React from 'react';
import type { StoryRingProps } from './StoryRing';
/** Drop-in for {@link StoryRingProps} — same props, the V4 "feed" design. */
export type StoryRingV4Props = StoryRingProps;
/**
 * StoryRing — **V4** "feed" design. The one place in the feed line that carries
 * a gradient: an unseen story wears an accent→primary gradient ring
 * ({@link feedStory} through a {@link GradientSurface}), a seen one falls back
 * to a muted ring, `live` keeps the danger ring + LIVE tag, and `add` renders a
 * dashed ring with a primary `⊕`. Keeps `size`, `state`, `label` and the
 * caption behavior. Same props/behavior as {@link StoryRingProps}; token-only
 * colors via `useXenitionTheme()` / feed helpers (no literals).
 */
export declare function StoryRingV4({ src, name, state, size, label, onPress, style, }: StoryRingV4Props): React.ReactElement;
//# sourceMappingURL=StoryRingV4.d.ts.map