import * as React from 'react';
import type { EventBlockProps } from './EventBlock';
/** Same public contract as {@link EventBlock} — a drop-in alternate design. */
export type EventBlockV2Props = EventBlockProps;
/**
 * EventBlock, redesigned (v2): a **filled, tone-tinted block** with a thick
 * left accent rail and the time set as its own leading column. The tint fills
 * the whole block (never color-alone — the rail + bold title + a11y state carry
 * the tone), and a press-scale spring gives it tap feedback. Distinct at a
 * glance from v1's flat chip. Same props, token-pure.
 */
export declare function EventBlockV2({ event, variant, size, selected, onPress, height, style, }: EventBlockV2Props): React.ReactElement;
//# sourceMappingURL=EventBlockV2.d.ts.map