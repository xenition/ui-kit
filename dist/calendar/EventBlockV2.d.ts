import * as React from 'react';
import type { EventBlockProps } from './EventBlock';
/** Same public contract as {@link EventBlock} — a drop-in alternate design. */
export type EventBlockV2Props = EventBlockProps;
/**
 * EventBlock, redesigned (v2): a **bold filled block**. The event fills its tone
 * color with the title, time range and location reversed out — a solid, punchy
 * block regardless of the `variant`. Selected gains a ring. Distinct from v1. Same
 * props, token-only.
 */
export declare const EventBlockV2: React.ForwardRefExoticComponent<EventBlockProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EventBlockV2.d.ts.map