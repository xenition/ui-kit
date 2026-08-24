import * as React from 'react';
export type MetricTileTone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger';
export interface MetricTileProps {
    label: string;
    value: React.ReactNode;
    /** Optional leading icon/glyph slot. */
    icon?: React.ReactNode;
    /** Accent tone for the value; defaults to neutral (`on-surface`). */
    tone?: MetricTileTone;
    /** When set, the tile renders as a button. */
    onClick?: () => void;
    className?: string;
}
/**
 * A compact metric tile — a smaller, denser cousin of {@link StatCard} for grids
 * of secondary numbers. Optional accent `tone` colors the value. Renders as a
 * `<button>` when `onClick` is set. Token-only.
 */
export declare const MetricTile: React.ForwardRefExoticComponent<MetricTileProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=MetricTile.d.ts.map