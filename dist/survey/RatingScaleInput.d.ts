import * as React from 'react';
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
    'aria-label'?: string;
    disabled?: boolean;
    className?: string;
}
/**
 * An interactive rating input — a `radiogroup` of clickable cells that report a
 * 1-based rating. `star` fills glyphs up to the selection with the accent token;
 * `number` shows filled numeric chips; `emoji` maps each cell to a face. Each
 * cell announces its value and selection via `aria-checked` (never color-alone).
 * Guards `max`/`emojis` indexing. No literal colors.
 */
export declare const RatingScaleInput: React.ForwardRefExoticComponent<RatingScaleInputProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RatingScaleInput.d.ts.map