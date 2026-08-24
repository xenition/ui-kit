import * as React from 'react';
import type { EventBlockProps } from './EventBlock';
/** Same public contract as {@link EventBlock} — a drop-in alternate design. */
export type EventBlockV3Props = EventBlockProps;
/**
 * EventBlock, redesigned (v3): a **minimal accent-rail line**. A thin tone-colored
 * left bar precedes the title and time on a bare surface — the lightest possible
 * block for a dense agenda. Selected tints faintly. The opposite of v2's filled
 * block. Same props, token-only.
 */
export declare const EventBlockV3: React.ForwardRefExoticComponent<EventBlockProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EventBlockV3.d.ts.map