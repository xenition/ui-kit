import * as React from 'react';
export interface ColorSwatch {
    /** Accessible name for the swatch. */
    label: string;
    /** The identifier reported through `onChange` (a token name or hex string). */
    value: string;
    /**
     * Token background class (e.g. `bg-primary`) painting the swatch. When
     * omitted, `value` is applied as an inline background color — pass this for
     * the default token palette so no literal color appears in source.
     */
    className?: string;
}
export interface ColorPickerProps {
    /** Controlled selected color identifier. */
    value?: string;
    /** Fires with the chosen swatch's `value`. */
    onChange?: (value: string) => void;
    /**
     * Optional explicit swatches. When omitted, a themed palette drawn from the
     * semantic color tokens is used, so every swatch is token-pure.
     */
    swatches?: ColorSwatch[];
    disabled?: boolean;
    /** Accessible label for the grid. */
    accessibilityLabel?: string;
    className?: string;
}
export declare function ColorPicker({ value, onChange, swatches, disabled, accessibilityLabel, className, }: ColorPickerProps): React.ReactElement;
//# sourceMappingURL=ColorPicker.d.ts.map