import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type DealOutcome } from './internal';
export type WinLossSize = 'sm' | 'md';
export type WinLossVariant = 'badge' | 'inline';
export interface WinLossBadgeProps {
    /** Deal result. `won` reads success, `lost` reads danger — plus a glyph. */
    outcome: DealOutcome;
    /** `badge` (default) is a filled pill; `inline` is a bare glyph + label. */
    variant?: WinLossVariant;
    size?: WinLossSize;
    /** Hide the text label, leaving only the glyph (still a11y-labelled). */
    hideLabel?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * Outcome badge for a deal — `won` / `lost` / `open` / `pending`. The result is
 * carried by a glyph **and** a word (never color alone): won `✓`, lost `✕`,
 * open `◔`, pending `⋯`. Won maps to the `success` token, lost to `danger`. Use
 * the `badge` variant on cards and the `inline` variant inside dense rows. All
 * colors come from the theme via the tone map — no literals.
 */
export declare function WinLossBadge({ outcome, variant, size, hideLabel, style, }: WinLossBadgeProps): React.ReactElement;
//# sourceMappingURL=WinLossBadge.d.ts.map