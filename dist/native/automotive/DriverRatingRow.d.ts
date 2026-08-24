import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Presentation for a {@link DriverRatingRow}. */
export type DriverRatingVariant = 'interactive' | 'readonly';
export interface DriverRatingRowProps {
    /** Driver display name. */
    driverName: string;
    /** Optional driver avatar URL. */
    avatarUrl?: string;
    /** Vehicle / trip subtitle, e.g. `'Toyota Prius · Sep 3'`. */
    subtitle?: string;
    /** Current rating value (0–max). Controls the filled glyph count. */
    value?: number;
    /** Number of stars (default 5). */
    max?: number;
    /**
     * Fires with the chosen star (1–max) when tapped. When omitted the row is
     * read-only regardless of `variant`.
     */
    onRate?: (stars: number) => void;
    /** Presentation variant. `readonly` disables tapping. */
    variant?: DriverRatingVariant;
    /** Placeholder skeleton while data loads. */
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A rate-your-driver row — the driver identity plus a star control that fires
 * `onRate(stars)` when tapped. Interactive stars are real `Pressable`s with per-
 * star a11y labels and a selected state; when there is no `onRate` (or
 * `variant="readonly"`) it falls back to the read-only `Rating` primitive.
 * Colors come from semantic tokens and `withAlpha` tints — no literal colors.
 * The star count is clamped and indexing is guarded.
 */
export declare function DriverRatingRow({ driverName, avatarUrl, subtitle, value, max, onRate, variant, loading, style, }: DriverRatingRowProps): React.ReactElement;
//# sourceMappingURL=DriverRatingRow.d.ts.map