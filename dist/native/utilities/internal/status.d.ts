/**
 * Canonical descriptors for the utilities domain enums, shared so every
 * component labels a bill, a service, a payment, an outage, or a service
 * request the same way. Status is always conveyed by **text + glyph**, never
 * color alone — the `tone` is a redundant reinforcement, not the sole signal.
 * `tone` values map to `BadgeTone` / `SemanticColors` slots (paid → success,
 * overdue → danger).
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
export type UtilityKind = 'electric' | 'water' | 'gas' | 'internet' | 'waste' | 'solar';
export interface UtilityDescriptor {
    label: string;
    glyph: string;
    /** Default meter unit for this line. */
    unit: string;
}
export declare const UTILITY_KIND: Record<UtilityKind, UtilityDescriptor>;
/** Safe lookup — falls back to `electric` for an unknown kind. */
export declare function utilityKind(kind: UtilityKind): UtilityDescriptor;
/** Lifecycle of a bill. */
export type BillStatus = 'due' | 'paid' | 'overdue' | 'pending' | 'scheduled';
export declare const BILL_STATUS: Record<BillStatus, StatusDescriptor>;
/** Safe lookup — falls back to `due` for an unknown status. */
export declare function billStatus(status: BillStatus): StatusDescriptor;
/** Operational state of a service connection. */
export type ServiceState = 'active' | 'outage' | 'maintenance' | 'degraded';
export declare const SERVICE_STATE: Record<ServiceState, StatusDescriptor>;
/** Safe lookup — falls back to `active` for an unknown state. */
export declare function serviceState(state: ServiceState): StatusDescriptor;
/** Settlement state of a single payment. */
export type PaymentState = 'paid' | 'pending' | 'failed' | 'refunded';
export declare const PAYMENT_STATE: Record<PaymentState, StatusDescriptor>;
/** Safe lookup — falls back to `pending` for an unknown state. */
export declare function paymentState(state: PaymentState): StatusDescriptor;
/** Lifecycle of a service request / work order. */
export type RequestState = 'open' | 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
export declare const REQUEST_STATE: Record<RequestState, StatusDescriptor>;
/** Safe lookup — falls back to `open` for an unknown state. */
export declare function requestState(state: RequestState): StatusDescriptor;
/** Lifecycle of an outage event. */
export type OutageState = 'active' | 'scheduled' | 'resolved';
export interface OutageDescriptor extends StatusDescriptor {
    heading: string;
    /** Semantic color slot for the banner tint. */
    color: 'danger' | 'warn' | 'success';
}
export declare const OUTAGE_STATE: Record<OutageState, OutageDescriptor>;
/** Safe lookup — falls back to `active` for an unknown state. */
export declare function outageState(state: OutageState): OutageDescriptor;
//# sourceMappingURL=status.d.ts.map