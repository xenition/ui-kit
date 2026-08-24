import * as React from 'react';
/** Size presets for the thumbnail. */
export type LightboxThumbSize = 'sm' | 'md';
export interface LightboxThumbProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
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
    onClick?: () => void;
}
/**
 * A filmstrip thumbnail for a lightbox — a small square image with a token
 * accent ring when `active`. Reports its selection through `aria-pressed` (not
 * color alone) and renders a real `<button>` when pressable. Meant to sit in a
 * horizontal scroll strip under a `Lightbox`. Token-only colors.
 */
export declare const LightboxThumb: React.ForwardRefExoticComponent<LightboxThumbProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LightboxThumb.d.ts.map