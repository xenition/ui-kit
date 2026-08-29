import * as React from 'react';
import type { TimelineItemData, TimelineProps, TimelineTone } from './Timeline';
export type { TimelineProps as TimelineV4Props, TimelineItemData, TimelineTone };
/**
 * **V4 timeline** — the web twin of the native `TimelineV4`, same props as
 * {@link Timeline}, a different design line.
 *
 * A timeline is scanned by **when**, then read for **what**. The base puts the
 * time last, in the same muted register as the description, so the one field
 * the eye is hunting for is the least findable thing in the item and sits
 * below the text it is supposed to stamp.
 *
 * Four changes:
 *
 * 1. **The time leads.** It moves above the title, muted and in tabular
 *    figures, so the times form a straight column the eye runs down — the
 *    landmark §33 asks for. Tabular figures matter more here than anywhere:
 *    `09:05` and `11:42` only line up if the digits are the same width.
 * 2. **The title outranks the description.** `text-base` semibold against
 *    `text-xs` muted. The base set both at `text-sm` and separated them by
 *    colour alone (§10 — hierarchy through size and weight, not just
 *    contrast).
 * 3. **The rail is continuous.** The base put `pb-6` on the whole `<li>`, so
 *    the connector stopped above the padding and every item was fenced off by
 *    a gap in its own thread. Moving the padding to the content column lets
 *    the rail run dot-to-dot, which is what makes a timeline read as one
 *    sequence instead of a stack of blocks.
 * 4. **The dot is a token.** `h-2.5 w-2.5 mt-1` were Tailwind's own scale;
 *    they come off the theme's spacing scale now, so a seed that changes the
 *    scale changes the timeline with it.
 *
 * **No depth, no container.** An activity feed is the classic place to wrap
 * each entry in a card, and §11 asks what that container would be for: the
 * rail already groups the items and the gaps already separate them.
 */
export declare function TimelineV4({ items, className }: TimelineProps): React.ReactElement;
//# sourceMappingURL=TimelineV4.d.ts.map