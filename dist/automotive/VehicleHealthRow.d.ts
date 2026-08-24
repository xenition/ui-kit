import * as React from 'react';
/** Health state of a monitored vehicle system. */
export type HealthStatus = 'ok' | 'attention' | 'critical' | 'unknown';
/** Presentation for a {@link VehicleHealthRow}. */
export type VehicleHealthVariant = 'default' | 'compact';
export interface VehicleHealthRowProps extends React.HTMLAttributes<HTMLDivElement> {
    /** System name, e.g. `'Tire pressure'`. */
    system: string;
    /** Health status. */
    status?: HealthStatus;
    /** Current reading, pre-formatted (e.g. `'32 psi'` / `'Good'`). */
    reading?: string;
    /** Icon glyph/emoji shown before the system name. */
    glyph?: string;
    /**
     * Optional 0–100 percentage that draws a mini meter (e.g. brake pad life).
     * Omit for a status-only row.
     */
    percent?: number;
    /** Presentation variant. */
    variant?: VehicleHealthVariant;
}
/**
 * One vehicle-health system row — its name, a reading, and a status conveyed by
 * a glyph plus a spelled-out word and an a11y label, so meaning never rests on
 * color; a `critical` status maps to the `danger` tone per contract. An optional
 * `percent` draws a token-tinted mini {@link Progress} meter (brake life, oil,
 * etc.). Presentational: shaped data only. Colors come from `--xen-*` token
 * classes — no literal colors. `percent` is clamped to 0–100. Web parity of the
 * native `VehicleHealthRow`.
 */
export declare const VehicleHealthRow: React.ForwardRefExoticComponent<VehicleHealthRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=VehicleHealthRow.d.ts.map