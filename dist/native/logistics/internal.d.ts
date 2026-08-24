/**
 * Shared vocabulary for the logistics module: tracking stages, shipment /
 * stop / dock statuses, scan kinds and carrier metadata. Every status is
 * expressed as a **glyph + label + tone** triple so components convey state by
 * icon and text — never by color alone (the token contract for accessibility).
 * `tone` values are `SemanticColors`-compatible keys that also map 1:1 onto the
 * `Badge`/`Tag` tone scale, so a status can drive a badge and a text color from
 * the same source of truth. No literal colors live here — `toneColor` only ever
 * returns a compiled-theme token; `withAlpha` tints an existing token hex.
 */
import type { SemanticColors } from '../theme';
/** Tone keys shared by `Badge`, `Tag` and text-color resolution below. */
export type LogisticsTone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger' | 'accent';
export interface StatusMeta {
    /** Non-color glyph carrying the meaning (emoji or unicode symbol). */
    glyph: string;
    /** Human label — the text half of the text+glyph contract. */
    label: string;
    /** Semantic tone (drives Badge/Tag + text color). */
    tone: LogisticsTone;
}
/**
 * Resolve a {@link LogisticsTone} to a concrete token hex for text/icon color.
 * `neutral` maps to `muted`; everything else is a direct `SemanticColors` slot,
 * so the returned value is always a compiled-theme token, never a literal.
 */
export declare function toneColor(colors: SemanticColors, tone: LogisticsTone): string;
/**
 * Token-derived translucent tint (no literal hex; mirrors the primitive
 * `withAlpha` in `Button`/`Badge`). Input must be a `#rgb`/`#rrggbb` token hex.
 */
export declare function withAlpha(hex: string, alpha: number): string;
/**
 * The canonical delivery lifecycle, in order. `exception` is an off-path stage
 * that any component may surface but which never appears in the ordered
 * timeline progression.
 */
export type TrackingStage = 'picked' | 'in-transit' | 'out-for-delivery' | 'delivered' | 'exception';
/** Ordered happy-path stages (drives the tracking timeline progression). */
export declare const TRACKING_ORDER: readonly TrackingStage[];
export declare const TRACKING_META: Record<TrackingStage, StatusMeta>;
/** Return the 0-based index of a stage in the ordered timeline (−1 if off-path). */
export declare function trackingIndex(stage: TrackingStage): number;
/** High-level shipment status (superset of tracking, plus pre/hold states). */
export type ShipmentStatus = 'draft' | 'label-created' | 'in-transit' | 'out-for-delivery' | 'delivered' | 'delayed' | 'exception' | 'returned';
export declare const SHIPMENT_META: Record<ShipmentStatus, StatusMeta>;
/** Status of a single stop on a delivery route. */
export type StopStatus = 'pending' | 'en-route' | 'arrived' | 'completed' | 'failed' | 'skipped';
export declare const STOP_META: Record<StopStatus, StatusMeta>;
/** Proof-of-delivery capture kind + outcome. */
export type ProofKind = 'signature' | 'photo' | 'pin' | 'contactless';
export declare const PROOF_META: Record<ProofKind, StatusMeta>;
/** Scan event kind captured on the floor / on the route. */
export type ScanKind = 'inbound' | 'outbound' | 'sort' | 'load' | 'delivery' | 'exception';
export declare const SCAN_META: Record<ScanKind, StatusMeta>;
/** Dock-door schedule slot status. */
export type DockStatus = 'open' | 'booked' | 'loading' | 'unloading' | 'completed' | 'overdue';
export declare const DOCK_META: Record<DockStatus, StatusMeta>;
/** Well-known carriers → a glyph + short code. Unknown carriers fall back. */
export type CarrierCode = 'ups' | 'fedex' | 'usps' | 'dhl' | 'amazon' | 'ontrac' | 'generic';
export interface CarrierMeta {
    glyph: string;
    label: string;
    tone: LogisticsTone;
}
export declare const CARRIER_META: Record<CarrierCode, CarrierMeta>;
/** Clamp a 0–100 percentage into range, tolerating undefined/NaN. */
export declare function clampPct(value: number | undefined): number;
/**
 * Format a weight for display. Accepts a numeric amount + unit and renders a
 * compact string; guards against undefined/NaN by returning an em dash.
 */
export declare function formatWeight(amount: number | undefined, unit?: 'kg' | 'lb' | 'g' | 'oz'): string;
//# sourceMappingURL=internal.d.ts.map