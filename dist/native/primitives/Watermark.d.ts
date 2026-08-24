import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface WatermarkProps {
    /** The repeated text (e.g. `'CONFIDENTIAL'`, a username). */
    text: string;
    /** Content the watermark overlays. */
    children?: React.ReactNode;
    /** Tile repetition count (rows × cols is derived from this). Default `24`. */
    count?: number;
    style?: StyleProp<ViewStyle>;
}
/**
 * Watermark — tiles faint, diagonally-rotated repeating text across its
 * children as a non-interactive overlay (`pointerEvents="none"`). The text is
 * the `muted` token at low opacity so it stays a pure theme color; the overlay
 * never intercepts touches. Useful for "confidential" / ownership marks over
 * documents or previews. No literal colors.
 */
export declare function Watermark({ text, children, count, style }: WatermarkProps): React.ReactElement;
//# sourceMappingURL=Watermark.d.ts.map