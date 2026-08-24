import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type CarrierCode } from './internal';
export type CarrierBadgeVariant = 'soft' | 'solid' | 'outline';
export type CarrierBadgeSize = 'sm' | 'md';
export interface CarrierBadgeProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * Compact carrier identity chip — a glyph + carrier name (+ optional service
 * level), so the carrier is never conveyed by color alone. Colors resolve from
 * the carrier's tone token (or a `withAlpha` tint of it); no literal colors.
 * Reused by `ShipmentCard`, `PackageRow`, `ManifestRow` and `DockSchedule`.
 */
export declare function CarrierBadge({ carrier, name, service, variant, size, style, }: CarrierBadgeProps): React.ReactElement;
//# sourceMappingURL=CarrierBadge.d.ts.map