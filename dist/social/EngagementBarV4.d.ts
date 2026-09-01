import * as React from 'react';
import { type EngagementBarProps } from './EngagementBar';
/** Drop-in for {@link EngagementBarProps} — same props, the V4 "feed" design. */
export type EngagementBarV4Props = EngagementBarProps;
/**
 * EngagementBar — **V4** "feed" design (web parity of the native V4). A clean,
 * airy row of like / comment / share (+ optional bookmark) pill actions with big
 * ≥44px tap targets. The `liked` heart fills `danger`, the `bookmarked` flag
 * fills `primary`; inactive actions read `muted`, counts stay `muted`, and a
 * pressed action gets a soft-primary tint. Same props/behavior as
 * {@link EngagementBarProps}; all colors from `--xen-*` token classes (no
 * literals). State is announced via `aria-pressed`, not color alone.
 */
export declare const EngagementBarV4: React.ForwardRefExoticComponent<EngagementBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EngagementBarV4.d.ts.map