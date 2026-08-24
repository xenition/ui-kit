import * as React from 'react';
import type { EventCardProps } from './EventCard';
/** Drop-in replacement for {@link EventCard} — identical props. */
export type EventCardV2Props = EventCardProps;
/**
 * EventCard — **full-bleed cover hero** alternate design (web / React DOM).
 *
 * Where the base card stacks a cover above a text body, V2 fills the whole card
 * with the image (or a token placeholder), floats a `surface` date chip top-left
 * and the category badge top-right, and rides the title + meta on a bottom
 * gradient scrim reversed out in `surface`. Elevated (shadow, no border),
 * media-forward. Same props as {@link EventCard} — a drop-in swap. Token-pure:
 * the scrim is a `neutral-900` → transparent gradient, every color a `--xen-*`.
 */
export declare const EventCardV2: React.ForwardRefExoticComponent<EventCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EventCardV2.d.ts.map