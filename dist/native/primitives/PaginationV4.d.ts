import * as React from 'react';
import type { PaginationProps } from './Pagination';
export type { PaginationProps as PaginationV4Props };
/**
 * **V4 pagination** — same props as {@link Pagination}, a different design
 * line.
 *
 * ## One page is filled; nothing else has chrome
 *
 * §32 asks the user to recognise where they are rather than reconstruct it, and
 * in a row of numbers the only thing that can carry that is a **contained
 * fill**. The current page gets `primary` with its guaranteed `onPrimary` and
 * weight 600; every other cell is plain `onSurface` with no ground, no border
 * and no tint. That contrast is what makes the answer findable in a glance —
 * one filled shape in a row of bare numerals — and it is exactly the hierarchy
 * §5 asks for, applied to a component that had none.
 *
 * The ellipsis stays `muted`: it is a gap marker, not a page, and a reader
 * should never spend a fixation deciding whether it is one.
 *
 * ## Reach — the change that actually matters
 *
 * The base cell was **32 × 32**, hard-coded. That is not a tap target on any
 * platform (§30, §46), and this is a component whose entire surface area is
 * tap targets sitting side by side, so a miss lands on the wrong page rather
 * than on nothing. Every cell is now 44 × 44, composed from the spacing scale
 * by `minTap` — the same expression `ButtonV4` and every other V4 navigation
 * control uses.
 *
 * The arrows keep their glyphs and gain the same target. A disabled arrow
 * drops to `muted` AND to 40% opacity, so "you cannot go back" survives a
 * reader who cannot separate the two colours.
 */
export declare function PaginationV4({ page, pageCount, onPageChange, siblingCount, style, }: PaginationProps): React.ReactElement | null;
//# sourceMappingURL=PaginationV4.d.ts.map