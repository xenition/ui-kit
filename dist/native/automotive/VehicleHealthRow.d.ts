import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Health state of a monitored vehicle system. */
export type HealthStatus = 'ok' | 'attention' | 'critical' | 'unknown';
/** Presentation for a {@link VehicleHealthRow}. */
export type VehicleHealthVariant = 'default' | 'compact';
export interface VehicleHealthRowProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * One vehicle-health system row — its name, a reading, and a status conveyed by
 * a glyph plus a spelled-out word and an a11y label, so meaning never rests on
 * color; a `critical` status maps to the `danger` slot per contract. An optional
 * `percent` draws a token-tinted mini meter (brake life, oil, etc.).
 * Presentational: shaped data only. Colors come from semantic tokens and
 * `withAlpha` tints — no literal colors. `percent` is clamped to 0–100.
 */
export declare function VehicleHealthRow({ system, status, reading, glyph, percent, variant, style, }: VehicleHealthRowProps): React.ReactElement;
//# sourceMappingURL=VehicleHealthRow.d.ts.map