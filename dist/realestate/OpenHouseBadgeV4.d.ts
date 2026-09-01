import * as React from 'react';
import type { OpenHouseBadgeProps } from './OpenHouseBadge';
/** Drop-in for {@link OpenHouseBadgeProps} — same props, the V4 "listing" design. */
export type OpenHouseBadgeV4Props = OpenHouseBadgeProps;
/**
 * OpenHouseBadge — **V4** "listing" design (web parity of the native V4). The
 * editorial take on the open-house indicator: a calendar glyph and the
 * date/time window inside a soft-primary tinted pill, promoting to a
 * success-toned "open now" pill for the live state. Same props/behavior as
 * {@link OpenHouseBadgeProps}; still pure presentation (strings in, no
 * callbacks). The full window is rendered as one phrase so it is announced as a
 * single string, and status is conveyed by icon + label, not color alone. All
 * colors come from the `--xen-*` tokens — no literal colors.
 */
export declare const OpenHouseBadgeV4: React.ForwardRefExoticComponent<OpenHouseBadgeProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=OpenHouseBadgeV4.d.ts.map