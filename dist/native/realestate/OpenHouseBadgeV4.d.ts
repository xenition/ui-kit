import * as React from 'react';
import type { OpenHouseBadgeProps } from './OpenHouseBadge';
/** Drop-in for {@link OpenHouseBadgeProps} — same props, the V4 "listing" design. */
export type OpenHouseBadgeV4Props = OpenHouseBadgeProps;
/**
 * OpenHouseBadge — **V4** "listing" design. The editorial take on the
 * open-house indicator: a calendar glyph and the date/time window inside a
 * soft-primary tinted pill, promoting to a success-toned "open now" pill for the
 * live state. Same props/behavior as {@link OpenHouseBadgeProps}; still pure
 * presentation (strings in, no callbacks). The full window is announced as a
 * single phrase, and status is conveyed by icon + label, not color alone.
 * Token-only colors via `useXenitionTheme()` + `withAlpha`.
 */
export declare function OpenHouseBadgeV4({ dateLabel, startTime, endTime, status, style, }: OpenHouseBadgeV4Props): React.ReactElement;
//# sourceMappingURL=OpenHouseBadgeV4.d.ts.map