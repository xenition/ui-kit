import * as React from 'react';
export type LikertVariant = 'dots' | 'numbered';
export interface LikertScaleProps {
    /** Number of agreement points (default 5). Common: 5 or 7. */
    points?: number;
    /** Selected point, 1-based. `null`/`undefined` → nothing selected. */
    value?: number | null;
    /** Fires with the chosen 1-based point. */
    onChange?: (value: number) => void;
    /** Label under the left-most (lowest) point. */
    minLabel?: string;
    /** Label under the right-most (highest) point. */
    maxLabel?: string;
    /** Accessible name for the whole scale. Default `'Agreement scale'`. */
    'aria-label'?: string;
    /** `numbered` prints the point number inside each button. Default `'dots'`. */
    variant?: LikertVariant;
    disabled?: boolean;
    className?: string;
}
/**
 * A Likert agreement scale — N equally-weighted points rendered as a
 * `radiogroup` of circular `radio` buttons, with optional anchor labels under
 * the extremes ("Strongly disagree" … "Strongly agree"). The selected point
 * fills with the primary token and is announced via `aria-checked` (selection
 * is never color-alone). `numbered` prints each point's ordinal. No literal
 * colors.
 */
export declare const LikertScale: React.ForwardRefExoticComponent<LikertScaleProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LikertScale.d.ts.map