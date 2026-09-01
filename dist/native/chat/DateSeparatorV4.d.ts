import * as React from 'react';
import type { DateSeparatorProps } from './DateSeparator';
export type { DateSeparatorProps as DateSeparatorV4Props };
/**
 * **V4 date separator** — same props as {@link DateSeparator}.
 *
 * ## Two changes
 *
 * 1. **It is a heading, not a caption.** A date separator is the only
 *    landmark in a long thread; marking it `header` is what lets a screen
 *    reader jump between days instead of scrolling through every message.
 * 2. **The pill takes the card ground and `mutedText`**, where the base used
 *    `surface` — the same colour as the page behind it — so the chip read as
 *    floating text rather than a marker.
 */
export declare function DateSeparatorV4({ label, appearance, style, }: DateSeparatorProps): React.ReactElement | null;
//# sourceMappingURL=DateSeparatorV4.d.ts.map