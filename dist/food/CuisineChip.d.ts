import * as React from 'react';
export type CuisineChipSize = 'sm' | 'md';
export interface CuisineChipProps {
    /** Cuisine / category label (e.g. "Thai", "Desserts"). */
    label: string;
    /** Optional leading glyph/emoji. */
    glyph?: string;
    /** Selected state — fills with the `primary` token pair. */
    selected?: boolean;
    /** Activation handler. When provided the chip is a filter toggle (native `onPress`). */
    onClick?: () => void;
    /** Disable the chip. */
    disabled?: boolean;
    /** Size (default `md`). */
    size?: CuisineChipSize;
    /** Extra classes. */
    className?: string;
}
/**
 * A pill chip for a cuisine / category filter. When `onClick` is given it is a
 * real `<button>` filter toggle whose selected state is carried in
 * `aria-pressed` (never signalled by color alone); without `onClick` it is a
 * static label. Selected chips use the `primary`/`on-primary` token pair. Web
 * parity of the native `CuisineChip`; token-only.
 */
export declare const CuisineChip: React.ForwardRefExoticComponent<CuisineChipProps & React.RefAttributes<HTMLButtonElement | HTMLSpanElement>>;
//# sourceMappingURL=CuisineChip.d.ts.map