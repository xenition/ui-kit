import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type SatisfactionVariant = 'stars' | 'faces' | 'thumbs';
export type SatisfactionSize = 'sm' | 'md' | 'lg';
export interface SatisfactionRatingProps {
    /** Current CSAT value (1..max). `0`/undefined = unrated. */
    value?: number;
    /** Scale ceiling (default 5; forced to 2 for the `thumbs` variant). */
    max?: number;
    /** Interaction style (default `stars`). */
    variant?: SatisfactionVariant;
    /** Size scale (default `md`). */
    size?: SatisfactionSize;
    /** Fires with the chosen 1-based score. Omit to render read-only. */
    onRate?: (value: number) => void;
    /** Force read-only (display) even when `onRate` is provided. */
    readOnly?: boolean;
    /** Optional caption above the control. */
    label?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Customer-satisfaction (CSAT) rating input. In read-only mode it reuses the
 * `Rating` primitive for a token-colored star row; when `onRate` is supplied it
 * renders tappable glyphs (`stars` / emoji `faces` / `thumbs`) that each report
 * a 1-based score. The active glyph is emphasized by size/opacity plus text
 * (the numeric a11y label), not color alone. Colors come from tokens only.
 */
export declare function SatisfactionRating({ value, max, variant, size, onRate, readOnly, label, style, }: SatisfactionRatingProps): React.ReactElement;
//# sourceMappingURL=SatisfactionRating.d.ts.map