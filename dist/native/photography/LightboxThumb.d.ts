import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Size presets for the thumbnail. */
export type LightboxThumbSize = 'sm' | 'md';
export interface LightboxThumbProps {
    /** Thumbnail source URL. When absent a token-tinted placeholder is drawn. */
    url?: string;
    /** Accessible description of the photo. */
    alt?: string;
    /** Marks this thumb as the active frame (accent ring + a11y `selected`). */
    active?: boolean;
    /** Size preset (default `md`). */
    size?: LightboxThumbSize;
    /** Position for the accessibility label (1-based). */
    index?: number;
    /** Press handler (jump the lightbox to this frame). */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A filmstrip thumbnail for a lightbox — a small square image with a token
 * accent ring when `active`. Reports its selection through the accessibility
 * `selected` state (not color alone) and exposes a `button` when pressable.
 * Meant to be laid out in a horizontal scroll strip under a `Lightbox`.
 * Token-only colors.
 */
export declare function LightboxThumb({ url, alt, active, size, index, onPress, style, }: LightboxThumbProps): React.ReactElement;
//# sourceMappingURL=LightboxThumb.d.ts.map