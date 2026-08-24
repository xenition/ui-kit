import * as React from 'react';
import { type HealthColor } from './internal';
export type ActivityRingColor = HealthColor;
export interface ActivityRing {
    /** Ring name, e.g. "Move". */
    label: string;
    /** Current value; clamped to `[0, goal]`. */
    value: number;
    /** Goal / full-ring value. */
    goal: number;
    /** Arc color (semantic token). */
    color?: ActivityRingColor;
    /** Unit for the a11y summary, e.g. "kcal". */
    unit?: string;
}
export interface ActivityRingsProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Concentric rings, drawn outermost-first. Typically 2–4. */
    rings: ActivityRing[];
    /** Outer diameter in px. */
    size?: number;
    /** Ring stroke width in px. */
    strokeWidth?: number;
    /** Gap between concentric rings in px. */
    gap?: number;
    /** Whether to show the labelled legend beside the rings. */
    showLegend?: boolean;
    /** Accessible summary override; a per-ring summary is generated otherwise. */
    'aria-label'?: string;
}
/**
 * Apple-style concentric activity rings drawn as inline SVG. Each ring is a
 * `--xen-border` track plus a `var(--xen-<color>)` arc (dash-array technique,
 * starting at 12 o'clock). Guards divide-by-zero per ring and renders a muted
 * "No data" note when `rings` is empty. The whole figure carries one
 * `aria-label` summarizing every ring. Web parity of the native `ActivityRings`;
 * token-only colors.
 */
export declare const ActivityRings: React.ForwardRefExoticComponent<ActivityRingsProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ActivityRings.d.ts.map