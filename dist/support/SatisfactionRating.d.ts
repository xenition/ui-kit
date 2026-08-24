import * as React from 'react';
export type SatisfactionVariant = 'stars' | 'faces' | 'thumbs';
export type SatisfactionSize = 'sm' | 'md' | 'lg';
export interface SatisfactionRatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
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
}
/**
 * Customer-satisfaction (CSAT) rating input. In read-only star mode it reuses
 * the `Rating` primitive for a token-colored star row; when `onRate` is supplied
 * it renders tappable glyph `<button>`s (`stars` / emoji `faces` / `thumbs`) —
 * each keyboard-focusable and reporting a 1-based score, grouped as a
 * `radiogroup`. The active glyph is emphasized by size/opacity plus the numeric
 * a11y label, not color alone. Token colors only.
 */
export declare const SatisfactionRating: React.ForwardRefExoticComponent<SatisfactionRatingProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SatisfactionRating.d.ts.map