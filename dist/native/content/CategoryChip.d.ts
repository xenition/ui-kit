import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type CategoryChipVariant = 'solid' | 'soft' | 'outline';
export interface CategoryChipProps {
    /** Category / section label. */
    label: string;
    /**
     * Visual weight:
     * - `solid`  — filled accent chip (default), for a hero/eyebrow.
     * - `soft`   — subtle surface chip with accent text.
     * - `outline`— bordered, transparent fill.
     */
    variant?: CategoryChipVariant;
    /** Makes the chip pressable (e.g. to open a section). */
    onPress?: () => void;
    /** Marks the chip as the active filter (adds an accent ring in `soft`/`outline`). */
    active?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A small category / section label for news & blog UIs — the "Technology",
 * "Opinion", "Sport" tag you see above a headline. Three token-bound variants
 * (`solid`/`soft`/`outline`); optional `onPress` turns it into a section
 * filter. Colors come only from `SemanticColors`; no literal hex.
 */
export declare function CategoryChip({ label, variant, onPress, active, style, }: CategoryChipProps): React.ReactElement;
//# sourceMappingURL=CategoryChip.d.ts.map