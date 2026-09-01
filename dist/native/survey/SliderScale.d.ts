import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface SliderScaleProps {
    /** Current numeric value. Kept controlled — always render what you're told. */
    value: number;
    /** Fires with the new value after clamping and snapping to `step`. */
    onChange: (value: number) => void;
    /** Low end of the range. Default `0`. */
    min?: number;
    /** High end of the range. Default `10`. */
    max?: number;
    /** Snap increment between stops. Default `1`. */
    step?: number;
    /** Anchor caption under the `min` end (e.g. `'Not at all'`). */
    minLabel?: string;
    /** Anchor caption under the `max` end (e.g. `'Completely'`). */
    maxLabel?: string;
    /** Show the big current-value numeral above the track. Default `true`. */
    showValue?: boolean;
    /** Accessible name for the slider. Default `'Rating'`. */
    accessibilityLabel?: string;
    /** Non-interactive + dimmed when `true`. Default `false`. */
    disabled?: boolean;
    /** Extra style on the root. */
    style?: StyleProp<ViewStyle>;
}
/**
 * SliderScale — **V4** "clean form / focus" numeric slider question. A calm,
 * legible take: a big current-value numeral sits above a primary-filled track
 * with a large draggable thumb (the token-styled `Slider` primitive), flanked
 * by min/max anchor captions. The single accent is `primary`; the rail is
 * `border`. The `Slider` reports `accessibilityRole="adjustable"` with
 * min/max/now for VoiceOver/TalkBack. Controlled via `value` + `onChange`;
 * token-only colors via `useXenitionTheme()`.
 */
export declare function SliderScale({ value, onChange, min, max, step, minLabel, maxLabel, showValue, accessibilityLabel, disabled, style, }: SliderScaleProps): React.ReactElement;
//# sourceMappingURL=SliderScale.d.ts.map