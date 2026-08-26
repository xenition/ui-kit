import * as React from 'react';
import type { PaginationProps } from './Pagination';
export type { PaginationProps as PaginationV4Props };
/**
 * **V4 pagination** — the web twin of the native `PaginationV4`, same props as
 * {@link Pagination}, a different design line.
 *
 * ## One page is filled; nothing else has chrome
 *
 * §32 asks the user to recognise where they are rather than reconstruct it, and
 * in a row of numbers the only thing that can carry that is a **contained
 * fill**. The current page gets `bg-primary` with its guaranteed `on-primary`
 * and weight 600; every other cell is plain `text-on-surface` with no ground,
 * no border and no tint until it is hovered. That contrast is what makes the
 * answer findable in a glance — one filled shape in a row of bare numerals —
 * and it is the hierarchy §5 asks for, applied to a component that had none.
 *
 * The hover ground is mixed from `--xen-border` instead of `bg-neutral-100`,
 * so it is a hairline's worth of contrast in both schemes rather than a fixed
 * grey that happens to invert, and it is suppressed on the current page: a
 * filled cell does not need to react to a pointer to say what it is.
 *
 * The ellipsis stays `muted`: it is a gap marker, not a page, and a reader
 * should never spend a fixation deciding whether it is one.
 *
 * ## Reach — the change that actually matters
 *
 * The base cell was `h-8 min-w-8` — **32 × 32**, hard-coded. That is not a tap
 * target on any platform (§30, §46), and this is a component whose entire
 * surface area is targets sitting side by side, so a miss lands on the wrong
 * page rather than on nothing. Every cell is now 44 × 44, composed from the
 * spacing scale — the same expression `ButtonV4` and every other V4 navigation
 * control uses.
 *
 * Each number also carries an `aria-label` of its own. A screen reader
 * announcing "3, button" tells you nothing; "Page 3" tells you everything, and
 * the base had it on native and not on web.
 */
export declare function PaginationV4({ page, pageCount, onPageChange, siblingCount, className, }: PaginationProps): React.ReactElement | null;
//# sourceMappingURL=PaginationV4.d.ts.map