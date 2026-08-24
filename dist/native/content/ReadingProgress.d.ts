import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type ReadingProgressVariant = 'bar' | 'labeled';
export interface ReadingProgressProps {
    /**
     * How far through the article the reader is, `0`–`1` (clamped). Typically
     * derived from a scroll offset: `offsetY / (contentHeight - viewportHeight)`.
     */
    progress: number;
    /**
     * - `bar`     — a thin token-styled progress bar (default), for pinning to
     *               the top of a reader.
     * - `labeled` — bar plus a "42%" readout.
     */
    variant?: ReadingProgressVariant;
    style?: StyleProp<ViewStyle>;
}
/**
 * A reading-progress indicator for an article reader — the thin bar that fills
 * as the reader scrolls. Composes the `Progress` primitive (0–100 scale) from a
 * clamped `0`–`1` fraction, so a scroll handler can drive it directly. A
 * `labeled` variant adds a percentage readout. Announced as a progress bar to
 * screen readers. All colors come from `SemanticColors`; no literal hex.
 */
export declare function ReadingProgress({ progress, variant, style, }: ReadingProgressProps): React.ReactElement;
//# sourceMappingURL=ReadingProgress.d.ts.map