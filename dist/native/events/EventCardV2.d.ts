import * as React from 'react';
import type { EventCardProps } from './EventCard';
/**
 * Alternate design (V2) for {@link EventCard}. Same props — a drop-in swap.
 *
 * Where the original stacks a cover above a text body, V2 is a **full-bleed
 * cover hero**: the image (or a token placeholder) fills the whole card, a
 * floating date chip sits top-left, the category badge top-right, and the
 * title + meta ride a bottom gradient scrim. The scrim is faked from stacked
 * `onSurface`-alpha bands (RN has no gradient without a dep) so the overlaid
 * text uses the guaranteed `surface`/`onSurface` contrast pair. Token-pure.
 */
export type EventCardV2Props = EventCardProps;
export declare function EventCardV2({ title, date, time, location, imageUrl, imageAlt, category, attendeeCount, variant, onPress, loading, style, }: EventCardV2Props): React.ReactElement;
//# sourceMappingURL=EventCardV2.d.ts.map