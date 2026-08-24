/**
 * Canonical descriptors for the utilities domain enums, shared so every
 * component labels a bill, a service, a payment, an outage, or a service
 * request the same way. Status is always conveyed by **text + glyph**, never
 * color alone — the `tone` is a redundant reinforcement, not the sole signal.
 * `tone` values map to `BadgeTone` slots (paid → success, overdue → danger).
 * Web parity of the native `utilities/internal/status`.
 */
import type { BadgeTone } from '../../primitives';

export interface StatusDescriptor {
  /** Human label (the primary, non-color signal). */
  label: string;
  /** Reinforcing glyph (the secondary, non-color signal). */
  glyph: string;
  /** Redundant color reinforcement. */
  tone: BadgeTone;
}

/** Utility line a bill / meter / plan belongs to. */
export type UtilityKind =
  | 'electric'
  | 'water'
  | 'gas'
  | 'internet'
  | 'waste'
  | 'solar';

export interface UtilityDescriptor {
  label: string;
  glyph: string;
  /** Default meter unit for this line. */
  unit: string;
}

export const UTILITY_KIND: Record<UtilityKind, UtilityDescriptor> = {
  electric: { label: 'Electric', glyph: '⚡', unit: 'kWh' },
  water: { label: 'Water', glyph: '💧', unit: 'gal' },
  gas: { label: 'Gas', glyph: '🔥', unit: 'therm' },
  internet: { label: 'Internet', glyph: '📶', unit: 'GB' },
  waste: { label: 'Waste', glyph: '🗑️', unit: 'lb' },
  solar: { label: 'Solar', glyph: '☀️', unit: 'kWh' },
};

/** Safe lookup — falls back to `electric` for an unknown kind. */
export function utilityKind(kind: UtilityKind): UtilityDescriptor {
  return UTILITY_KIND[kind] ?? UTILITY_KIND.electric;
}

/** Lifecycle of a bill. */
export type BillStatus = 'due' | 'paid' | 'overdue' | 'pending' | 'scheduled';

export const BILL_STATUS: Record<BillStatus, StatusDescriptor> = {
  due: { label: 'Due', glyph: '📄', tone: 'warn' },
  paid: { label: 'Paid', glyph: '✓', tone: 'success' },
  overdue: { label: 'Overdue', glyph: '⚠️', tone: 'danger' },
  pending: { label: 'Pending', glyph: '⋯', tone: 'neutral' },
  scheduled: { label: 'Scheduled', glyph: '🗓️', tone: 'primary' },
};

/** Safe lookup — falls back to `due` for an unknown status. */
export function billStatus(status: BillStatus): StatusDescriptor {
  return BILL_STATUS[status] ?? BILL_STATUS.due;
}

/** Operational state of a service connection. */
export type ServiceState = 'active' | 'outage' | 'maintenance' | 'degraded';

export const SERVICE_STATE: Record<ServiceState, StatusDescriptor> = {
  active: { label: 'Active', glyph: '✓', tone: 'success' },
  outage: { label: 'Outage', glyph: '⚠️', tone: 'danger' },
  maintenance: { label: 'Maintenance', glyph: '🛠️', tone: 'warn' },
  degraded: { label: 'Degraded', glyph: '⚠', tone: 'warn' },
};

/** Safe lookup — falls back to `active` for an unknown state. */
export function serviceState(state: ServiceState): StatusDescriptor {
  return SERVICE_STATE[state] ?? SERVICE_STATE.active;
}

/** Settlement state of a single payment. */
export type PaymentState = 'paid' | 'pending' | 'failed' | 'refunded';

export const PAYMENT_STATE: Record<PaymentState, StatusDescriptor> = {
  paid: { label: 'Paid', glyph: '✓', tone: 'success' },
  pending: { label: 'Pending', glyph: '⋯', tone: 'warn' },
  failed: { label: 'Failed', glyph: '✕', tone: 'danger' },
  refunded: { label: 'Refunded', glyph: '↩', tone: 'neutral' },
};

/** Safe lookup — falls back to `pending` for an unknown state. */
export function paymentState(state: PaymentState): StatusDescriptor {
  return PAYMENT_STATE[state] ?? PAYMENT_STATE.pending;
}

/** Lifecycle of a service request / work order. */
export type RequestState =
  | 'open'
  | 'scheduled'
  | 'in-progress'
  | 'completed'
  | 'cancelled';

export const REQUEST_STATE: Record<RequestState, StatusDescriptor> = {
  open: { label: 'Open', glyph: '📥', tone: 'primary' },
  scheduled: { label: 'Scheduled', glyph: '🗓️', tone: 'warn' },
  'in-progress': { label: 'In progress', glyph: '🔧', tone: 'warn' },
  completed: { label: 'Completed', glyph: '✓', tone: 'success' },
  cancelled: { label: 'Cancelled', glyph: '✕', tone: 'neutral' },
};

/** Safe lookup — falls back to `open` for an unknown state. */
export function requestState(state: RequestState): StatusDescriptor {
  return REQUEST_STATE[state] ?? REQUEST_STATE.open;
}

/** Lifecycle of an outage event. */
export type OutageState = 'active' | 'scheduled' | 'resolved';

export interface OutageDescriptor extends StatusDescriptor {
  heading: string;
  /** Semantic color slot for the banner tint. */
  color: 'danger' | 'warn' | 'success';
}

export const OUTAGE_STATE: Record<OutageState, OutageDescriptor> = {
  active: { label: 'Active', glyph: '⚠️', tone: 'danger', heading: 'Service outage', color: 'danger' },
  scheduled: { label: 'Scheduled', glyph: '🗓️', tone: 'warn', heading: 'Planned maintenance', color: 'warn' },
  resolved: { label: 'Resolved', glyph: '✓', tone: 'success', heading: 'Outage resolved', color: 'success' },
};

/** Safe lookup — falls back to `active` for an unknown state. */
export function outageState(state: OutageState): OutageDescriptor {
  return OUTAGE_STATE[state] ?? OUTAGE_STATE.active;
}
