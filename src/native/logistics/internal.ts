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
export function toneColor(colors: SemanticColors, tone: LogisticsTone): string {
  return tone === 'neutral' ? colors.muted : colors[tone];
}

/**
 * Token-derived translucent tint (no literal hex; mirrors the primitive
 * `withAlpha` in `Button`/`Badge`). Input must be a `#rgb`/`#rrggbb` token hex.
 */
export function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * The canonical delivery lifecycle, in order. `exception` is an off-path stage
 * that any component may surface but which never appears in the ordered
 * timeline progression.
 */
export type TrackingStage =
  | 'picked'
  | 'in-transit'
  | 'out-for-delivery'
  | 'delivered'
  | 'exception';

/** Ordered happy-path stages (drives the tracking timeline progression). */
export const TRACKING_ORDER: readonly TrackingStage[] = [
  'picked',
  'in-transit',
  'out-for-delivery',
  'delivered',
] as const;

export const TRACKING_META: Record<TrackingStage, StatusMeta> = {
  picked: { glyph: '📦', label: 'Picked', tone: 'primary' },
  'in-transit': { glyph: '🚚', label: 'In transit', tone: 'accent' },
  'out-for-delivery': { glyph: '🛵', label: 'Out for delivery', tone: 'warn' },
  delivered: { glyph: '✓', label: 'Delivered', tone: 'success' },
  exception: { glyph: '⚠', label: 'Exception', tone: 'danger' },
};

/** Return the 0-based index of a stage in the ordered timeline (−1 if off-path). */
export function trackingIndex(stage: TrackingStage): number {
  return TRACKING_ORDER.indexOf(stage);
}

/** High-level shipment status (superset of tracking, plus pre/hold states). */
export type ShipmentStatus =
  | 'draft'
  | 'label-created'
  | 'in-transit'
  | 'out-for-delivery'
  | 'delivered'
  | 'delayed'
  | 'exception'
  | 'returned';

export const SHIPMENT_META: Record<ShipmentStatus, StatusMeta> = {
  draft: { glyph: '✎', label: 'Draft', tone: 'neutral' },
  'label-created': { glyph: '🏷', label: 'Label created', tone: 'primary' },
  'in-transit': { glyph: '🚚', label: 'In transit', tone: 'accent' },
  'out-for-delivery': { glyph: '🛵', label: 'Out for delivery', tone: 'warn' },
  delivered: { glyph: '✓', label: 'Delivered', tone: 'success' },
  delayed: { glyph: '⏳', label: 'Delayed', tone: 'warn' },
  exception: { glyph: '⚠', label: 'Exception', tone: 'danger' },
  returned: { glyph: '↩', label: 'Returned', tone: 'danger' },
};

/** Status of a single stop on a delivery route. */
export type StopStatus = 'pending' | 'en-route' | 'arrived' | 'completed' | 'failed' | 'skipped';

export const STOP_META: Record<StopStatus, StatusMeta> = {
  pending: { glyph: '○', label: 'Pending', tone: 'neutral' },
  'en-route': { glyph: '➤', label: 'En route', tone: 'accent' },
  arrived: { glyph: '📍', label: 'Arrived', tone: 'primary' },
  completed: { glyph: '✓', label: 'Completed', tone: 'success' },
  failed: { glyph: '✕', label: 'Failed', tone: 'danger' },
  skipped: { glyph: '⤳', label: 'Skipped', tone: 'warn' },
};

/** Proof-of-delivery capture kind + outcome. */
export type ProofKind = 'signature' | 'photo' | 'pin' | 'contactless';

export const PROOF_META: Record<ProofKind, StatusMeta> = {
  signature: { glyph: '✍', label: 'Signature', tone: 'primary' },
  photo: { glyph: '📷', label: 'Photo', tone: 'accent' },
  pin: { glyph: '🔢', label: 'PIN', tone: 'primary' },
  contactless: { glyph: '📲', label: 'Contactless', tone: 'accent' },
};

/** Scan event kind captured on the floor / on the route. */
export type ScanKind = 'inbound' | 'outbound' | 'sort' | 'load' | 'delivery' | 'exception';

export const SCAN_META: Record<ScanKind, StatusMeta> = {
  inbound: { glyph: '⬇', label: 'Inbound', tone: 'primary' },
  outbound: { glyph: '⬆', label: 'Outbound', tone: 'accent' },
  sort: { glyph: '🔀', label: 'Sort', tone: 'primary' },
  load: { glyph: '🚛', label: 'Load', tone: 'accent' },
  delivery: { glyph: '✓', label: 'Delivery', tone: 'success' },
  exception: { glyph: '⚠', label: 'Exception', tone: 'danger' },
};

/** Dock-door schedule slot status. */
export type DockStatus = 'open' | 'booked' | 'loading' | 'unloading' | 'completed' | 'overdue';

export const DOCK_META: Record<DockStatus, StatusMeta> = {
  open: { glyph: '○', label: 'Open', tone: 'neutral' },
  booked: { glyph: '📅', label: 'Booked', tone: 'primary' },
  loading: { glyph: '⬆', label: 'Loading', tone: 'accent' },
  unloading: { glyph: '⬇', label: 'Unloading', tone: 'accent' },
  completed: { glyph: '✓', label: 'Completed', tone: 'success' },
  overdue: { glyph: '⚠', label: 'Overdue', tone: 'danger' },
};

/** Well-known carriers → a glyph + short code. Unknown carriers fall back. */
export type CarrierCode = 'ups' | 'fedex' | 'usps' | 'dhl' | 'amazon' | 'ontrac' | 'generic';

export interface CarrierMeta {
  glyph: string;
  label: string;
  tone: LogisticsTone;
}

export const CARRIER_META: Record<CarrierCode, CarrierMeta> = {
  ups: { glyph: '📦', label: 'UPS', tone: 'warn' },
  fedex: { glyph: '✈', label: 'FedEx', tone: 'accent' },
  usps: { glyph: '📮', label: 'USPS', tone: 'primary' },
  dhl: { glyph: '🚚', label: 'DHL', tone: 'warn' },
  amazon: { glyph: '📦', label: 'Amazon', tone: 'accent' },
  ontrac: { glyph: '🚐', label: 'OnTrac', tone: 'primary' },
  generic: { glyph: '🚚', label: 'Carrier', tone: 'neutral' },
};

/** Clamp a 0–100 percentage into range, tolerating undefined/NaN. */
export function clampPct(value: number | undefined): number {
  if (value == null || !Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
}

/**
 * Format a weight for display. Accepts a numeric amount + unit and renders a
 * compact string; guards against undefined/NaN by returning an em dash.
 */
export function formatWeight(amount: number | undefined, unit: 'kg' | 'lb' | 'g' | 'oz' = 'kg'): string {
  if (amount == null || !Number.isFinite(amount)) return '—';
  const rounded = Math.round(amount * 100) / 100;
  return `${rounded} ${unit}`;
}
