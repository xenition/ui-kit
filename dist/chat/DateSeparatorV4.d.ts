import * as React from 'react';
import type { DateSeparatorProps } from './DateSeparator';
export type { DateSeparatorProps as DateSeparatorV4Props };
/**
 * **V4 date separator** — the web twin of the native `DateSeparatorV4`, same
 * props as {@link DateSeparator}.
 *
 * ## Two changes
 *
 * 1. **It is a heading, not a caption.** A date separator is the only landmark
 *    in a long thread; marking it a heading is what lets a screen reader jump
 *    between days instead of scrolling through every message.
 * 2. **The pill takes the card ground and `muted-text`**, where the base used
 *    `surface` — the same colour as the page behind it — so the chip read as
 *    floating text rather than a marker.
 */
export declare const DateSeparatorV4: React.ForwardRefExoticComponent<DateSeparatorProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DateSeparatorV4.d.ts.map