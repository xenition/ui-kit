import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type RatingScaleVariant = 'star' | 'number' | 'emoji';
export interface RatingScaleInputProps {
    /** Selected rating, 1-based. `0`/`null`/`undefined` → nothing selected. */
    value?: number | null;
    /** Fires with the chosen 1-based rating. */
    onChange?: (value: number) => void;
    /** Total glyphs/cells (default 5). */
    max?: number;
    /** Render mode. Default `'star'`. */
    variant?: RatingScaleVariant;
    /**
     * Emoji faces for `variant='emoji'`, lowest→highest. Defaults to a 5-face
     * ramp; indexed defensively so any `max` is safe.
     */
    emojis?: string[];
    /** Accessible name for the control. Default `'Rating'`. */
    accessibilityLabel?: string;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * An interactive rating input — a `radiogroup` of tappable cells that report a
 * 1-based rating. `star` fills glyphs up to the selection with the accent
 * token; `number` shows filled numeric chips; `emoji` maps each cell to a face.
 * Each cell announces its value and selection (never color-alone). Guards
 * `max`/`emojis` indexing. No literal colors.
 */
export declare function RatingScaleInput({ value, onChange, max, variant, emojis, accessibilityLabel, disabled, style, }: RatingScaleInputProps): React.ReactElement;
//# sourceMappingURL=RatingScaleInput.d.ts.map