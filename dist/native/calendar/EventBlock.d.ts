import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { CalendarEvent } from './types';
export type EventBlockVariant = 'solid' | 'soft' | 'outline';
export type EventBlockSize = 'sm' | 'md';
export interface EventBlockProps {
    /** The event to render. */
    event: CalendarEvent;
    /** Fill treatment. `soft` (default) tints, `solid` fills, `outline` is a rule. */
    variant?: EventBlockVariant;
    /** Density. `sm` hides the time/subtitle lines. */
    size?: EventBlockSize;
    /** Marks the block as the current selection (announced, not color-alone). */
    selected?: boolean;
    /** Fires when the block is tapped. */
    onPress?: (event: CalendarEvent) => void;
    /** Explicit height (used when positioned inside a `TimeGrid`). */
    height?: number;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single event chip/block — the shared visual atom for `WeekView`,
 * `TimeGrid`, `DayAgenda` and `AllDayRow`. A left accent bar keeps the tone
 * legible even in `soft`/`outline` variants (never color-alone), and selection
 * is exposed through `accessibilityState.selected`. Tone resolves to a theme
 * color pair via `resolveTone`; every color traces to a token.
 */
export declare function EventBlock({ event, variant, size, selected, onPress, height, style, }: EventBlockProps): React.ReactElement;
//# sourceMappingURL=EventBlock.d.ts.map