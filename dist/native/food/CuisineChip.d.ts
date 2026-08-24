import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type CuisineChipSize = 'sm' | 'md';
export interface CuisineChipProps {
    /** Cuisine / category label (e.g. "Thai", "Desserts"). */
    label: string;
    /** Optional leading glyph/emoji. */
    glyph?: string;
    /** Selected state — fills with the `primary` token pair. */
    selected?: boolean;
    /** Press handler. When provided the chip is a filter toggle (`radio`-like). */
    onPress?: () => void;
    /** Disable the chip. */
    disabled?: boolean;
    /** Size (default `md`). */
    size?: CuisineChipSize;
    style?: StyleProp<ViewStyle>;
}
/**
 * A pill chip for a cuisine / category filter. When `onPress` is given it acts
 * as a selectable filter and its selected state is carried in
 * `accessibilityState.selected` (never signalled by color alone); without
 * `onPress` it is a static label. Selected chips use the `primary`/`onPrimary`
 * token pair. Token-only.
 */
export declare function CuisineChip({ label, glyph, selected, onPress, disabled, size, style, }: CuisineChipProps): React.ReactElement;
//# sourceMappingURL=CuisineChip.d.ts.map