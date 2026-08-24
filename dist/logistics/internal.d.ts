/**
 * Shared vocabulary + token-class maps for the web `logistics` blocks. Every
 * tracking stage, shipment / stop / dock status, scan kind and carrier is
 * expressed as a **glyph + label + tone** triple so components convey state by
 * icon and text — never by color alone (the accessibility contract). Each
 * `tone` maps to a `--xen-*`-bound Tailwind class (text / solid bg / soft tint /
 * border), mirroring the `SemanticColors` slots the native module resolves from
 * `useXenitionTheme()`. No literal colors live here. Web parity of the native
 * `logistics/internal`.
 */
import type * as React from 'react';
/** Tone keys shared by `Badge`, `Tag` and the class maps below. */
export type LogisticsTone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger' | 'accent';
export interface StatusMeta {
    /** Non-color glyph carrying the meaning (emoji or unicode symbol). */
    glyph: string;
    /** Human label — the text half of the text+glyph contract. */
    label: string;
    /** Semantic tone (drives Badge/Tag + text color). */
    tone: LogisticsTone;
}
/** `text-*` token class per tone (`neutral` reads as muted). */
export declare const TONE_TEXT: Record<LogisticsTone, string>;
/** Solid `bg-*` fill per tone (for filled markers / nodes). */
export declare const TONE_BG: Record<LogisticsTone, string>;
/** Readable `text-*` for content sitting on a {@link TONE_BG} solid fill. */
export declare const TONE_ON_TEXT: Record<LogisticsTone, string>;
/** Soft translucent tint per tone (the token-pure analog of `withAlpha`). */
export declare const TONE_SOFT_BG: Record<LogisticsTone, string>;
/** Stronger translucent tint per tone (for status pills). */
export declare const TONE_SOFT_STRONG_BG: Record<LogisticsTone, string>;
/** `border-*` token class per tone. */
export declare const TONE_BORDER: Record<LogisticsTone, string>;
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
/** Interaction props that make a non-\`<button>\` element behave as a button. */
export interface PressableProps {
    role: 'button';
    tabIndex: 0;
    onClick: () => void;
    onKeyDown: (event: React.KeyboardEvent) => void;
}
/**
 * The web analog of a native `Pressable` wrapper: given an optional `onClick`,
 * returns the props that turn a plain element into a keyboard-operable button
 * (click + Enter/Space), or `undefined` when the element is non-interactive.
 */
export declare function pressableProps(onClick?: () => void): PressableProps | undefined;
//# sourceMappingURL=internal.d.ts.map