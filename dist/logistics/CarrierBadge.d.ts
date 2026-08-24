import * as React from 'react';
import { type CarrierCode } from './internal';
export type CarrierBadgeVariant = 'soft' | 'solid' | 'outline';
export type CarrierBadgeSize = 'sm' | 'md';
export interface CarrierBadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'> {
    /** Known carrier code; anything else falls back to the generic carrier. */
    carrier?: CarrierCode;
    /** Override display name (e.g. a regional courier) — replaces the code label. */
    name?: string;
    /** Optional service level line (e.g. `Ground`, `2-Day`, `Priority`). */
    service?: string;
    /** Visual treatment. `soft` (default) tints; `solid` fills; `outline` rings. */
    variant?: CarrierBadgeVariant;
    /** Size scale. Defaults to `md`. */
    size?: CarrierBadgeSize;
}
/**
 * Compact carrier identity chip — a glyph + carrier name (+ optional service
 * level), so the carrier is never conveyed by color alone. Colors resolve from
 * the carrier's tone token class (solid / soft tint / outline); no literal
 * colors. Reused by `ShipmentCard`, `PackageRow`, `ManifestRow` and
 * `DockSchedule`. Web parity of the native `CarrierBadge`.
 */
export declare const CarrierBadge: React.ForwardRefExoticComponent<CarrierBadgeProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=CarrierBadge.d.ts.map