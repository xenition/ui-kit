import * as React from 'react';
import type { EventBlockProps } from './EventBlock';
/** Same public contract as {@link EventBlock} — a drop-in alternate design. */
export type EventBlockV3Props = EventBlockProps;
/**
 * EventBlock, redesigned (v3): an **outline block** — no fill, a hairline
 * border, and a small tone dot before the title. The airy, line-based look
 * reads as a lightweight list item rather than a filled chip. Selection thickens
 * the border and is announced via a11y (never color-alone). Same props,
 * token-pure.
 */
export declare function EventBlockV3({ event, variant, size, selected, onPress, height, style, }: EventBlockV3Props): React.ReactElement;
//# sourceMappingURL=EventBlockV3.d.ts.map