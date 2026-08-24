import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type IcebreakerChipSize = 'sm' | 'md';
export type IcebreakerChipVariant = 'soft' | 'outline' | 'solid';
export interface IcebreakerChipProps {
    /** The prompt shown on the chip (e.g. "Coffee or tea?"). */
    label: string;
    /** Value reported to `onPress`; falls back to `label`. */
    value?: string;
    /** Selected/answered state (drawn AND announced, never color-only). */
    selected?: boolean;
    /** Disabled (already used / unavailable). */
    disabled?: boolean;
    /** Visual weight. Defaults to `soft`. */
    variant?: IcebreakerChipVariant;
    /** Size scale. Defaults to `md`. */
    size?: IcebreakerChipSize;
    /** Leading glyph (emoji). */
    glyph?: string;
    /** Fires the chip's `value` (or `label`) when tapped. */
    onPress?: (value: string) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * Tappable conversation-starter chip — the native icebreaker. A person picks a
 * prompt to break the ice; `selected` reflects an already-chosen prompt and is
 * surfaced to screen readers via `accessibilityState.selected` (not color
 * alone). All colors derive from theme tokens through `withAlpha` tints — no
 * literal colors.
 */
export declare function IcebreakerChip({ label, value, selected, disabled, variant, size, glyph, onPress, style, }: IcebreakerChipProps): React.ReactElement;
//# sourceMappingURL=IcebreakerChip.d.ts.map