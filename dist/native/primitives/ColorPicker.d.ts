import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface ColorSwatch {
    /** Accessible name for the swatch. */
    label: string;
    /** The token hex reported through `onChange`. */
    value: string;
}
export interface ColorPickerProps {
    /** Controlled selected color (a token hex string). */
    value?: string;
    /** Fires with the chosen swatch's token hex. */
    onChange?: (value: string) => void;
    /**
     * Optional explicit swatches. When omitted, a themed palette is drawn from
     * the semantic color tokens so every swatch is guaranteed token-pure.
     */
    swatches?: ColorSwatch[];
    disabled?: boolean;
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Swatch-grid color picker — a dependency-free grid of tappable color chips.
 * With no `swatches` prop it builds its palette straight from the semantic
 * theme tokens (primary, accent, success, warn, danger, plus neutrals), so the
 * rendered colors are always token-pure — no external color engine, no literal
 * colors. The selected chip gets a `primary` selection ring.
 */
export declare function ColorPicker({ value, onChange, swatches, disabled, accessibilityLabel, style, }: ColorPickerProps): React.ReactElement;
//# sourceMappingURL=ColorPicker.d.ts.map