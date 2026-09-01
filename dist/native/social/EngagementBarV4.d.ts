import * as React from 'react';
import type { EngagementBarProps } from './EngagementBar';
/** Drop-in for {@link EngagementBarProps} — same props, the V4 "feed" design. */
export type EngagementBarV4Props = EngagementBarProps;
/**
 * EngagementBar — **V4** "feed" design. A clean, airy row of like / comment /
 * share (+ optional bookmark) pill actions with big ≥44px tap targets. The
 * `liked` heart fills `dangerText`, the `bookmarked` flag fills `primaryText`;
 * inactive actions and counts read `muted`, and a pressed action gets a
 * soft-primary tint. Same props/behavior as {@link EngagementBarProps};
 * token-only colors via `useXenitionTheme()` + `withAlpha`. State is announced
 * via `accessibilityState.selected`, not color alone.
 */
export declare function EngagementBarV4({ likeCount, commentCount, shareCount, liked, bookmarked, onLike, onComment, onShare, onBookmark, hideZero, style, }: EngagementBarV4Props): React.ReactElement;
//# sourceMappingURL=EngagementBarV4.d.ts.map