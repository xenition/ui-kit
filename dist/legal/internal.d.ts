/**
 * Shared vocabulary for the legal / law-practice module (web). Every status is
 * expressed as a **glyph + label + tone** triple so a component can convey state
 * by text and icon — never by color alone (the accessibility half of the token
 * contract). `tone` values map onto the `--xen-*` token utility classes
 * (`text-primary`, `bg-success`, …) so one status drives both a pill fill and a
 * text color from a single source of truth — no literal colors. Money (billable
 * / retainer) is carried as integer **cents** and funnelled through the shared
 * `formatMoney` for stable 2-decimal output.
 *
 * This mirrors `native/legal/internal.ts` one-for-one (same types + META tables)
 * so the web and native surfaces stay in lockstep; only the tone → color
 * resolver differs (Tailwind token classes here vs. resolved hex on native).
 */
import * as React from 'react';
import { formatMoney } from '../commerce';
export { formatMoney };
/** Tone keys shared by `Badge`, `Tag` and the token-class resolvers below. */
export type LegalTone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger' | 'accent';
export interface StatusMeta {
    /** Non-color glyph carrying the meaning (emoji or unicode symbol). */
    glyph: string;
    /** Human label — the text half of the text+glyph contract. */
    label: string;
    /** Semantic tone (drives Badge/Tag + text color). */
    tone: LegalTone;
}
/**
 * Resolve a {@link LegalTone} to a `text-*` token utility class for text/icon
 * color. `neutral` maps to `text-muted`; every other tone is a direct semantic
 * token class, so the returned value is always a compiled-token class, never a
 * literal color.
 */
export declare function toneTextClass(tone: LegalTone): string;
/** Resolve a {@link LegalTone} to a solid `bg-*` token class (meter/rail fills). */
export declare function toneBgClass(tone: LegalTone): string;
/**
 * Resolve a {@link LegalTone} to a **soft** tinted `bg-*` token class for glyph
 * chips. `primary` / `accent` have a `-50` ramp; the rest fall back to
 * `bg-neutral-100` (still a token) so no literal color is ever emitted.
 */
export declare function toneSoftBgClass(tone: LegalTone): string;
/** Keyboard activation for a `role="button"` div — Enter / Space fire the handler. */
export declare function activateOnKey(handler: (() => void) | undefined): (event: React.KeyboardEvent<HTMLElement>) => void;
/** Case / file lifecycle state. */
export type CaseStatus = 'open' | 'pending' | 'onHold' | 'closed' | 'appealed';
export declare const CASE_STATUS_META: Record<CaseStatus, StatusMeta>;
/** Area of legal practice. */
export type PracticeArea = 'litigation' | 'corporate' | 'family' | 'criminal' | 'realEstate' | 'ip' | 'employment' | 'other';
export declare const PRACTICE_AREA_META: Record<PracticeArea, StatusMeta>;
/** Case / matter priority. */
export type CasePriority = 'low' | 'normal' | 'high' | 'urgent';
export declare const CASE_PRIORITY_META: Record<CasePriority, StatusMeta>;
/** Matter workflow stage. */
export type MatterStage = 'intake' | 'active' | 'discovery' | 'trial' | 'settlement' | 'closed';
export declare const MATTER_STAGE_META: Record<MatterStage, StatusMeta>;
/** Ordered matter stages for a progress meter. */
export declare const MATTER_STAGE_ORDER: MatterStage[];
/** Legal document lifecycle. */
export type DocumentStatus = 'draft' | 'review' | 'final' | 'signed' | 'filed' | 'expired';
export declare const DOCUMENT_STATUS_META: Record<DocumentStatus, StatusMeta>;
/** Document kind (drives the leading glyph). */
export type DocumentKind = 'contract' | 'brief' | 'motion' | 'pleading' | 'correspondence' | 'exhibit' | 'other';
export declare const DOCUMENT_KIND_META: Record<DocumentKind, StatusMeta>;
/** Negotiation state of a single contract clause. */
export type ClauseStatus = 'standard' | 'review' | 'negotiate' | 'flagged' | 'agreed';
export declare const CLAUSE_STATUS_META: Record<ClauseStatus, StatusMeta>;
/** Risk level of a clause. */
export type ClauseRisk = 'low' | 'medium' | 'high';
export declare const CLAUSE_RISK_META: Record<ClauseRisk, StatusMeta>;
/** Kind of legal appointment. */
export type AppointmentType = 'consultation' | 'deposition' | 'mediation' | 'hearing' | 'meeting' | 'call';
export declare const APPOINTMENT_TYPE_META: Record<AppointmentType, StatusMeta>;
/** Scheduling state of an appointment. */
export type AppointmentStatus = 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
export declare const APPOINTMENT_STATUS_META: Record<AppointmentStatus, StatusMeta>;
/** Billing state of a time entry. */
export type BillableStatus = 'draft' | 'unbilled' | 'billed' | 'writtenOff';
export declare const BILLABLE_STATUS_META: Record<BillableStatus, StatusMeta>;
/** Prospective-client intake stage. */
export type IntakeStatus = 'new' | 'contacted' | 'qualified' | 'retained' | 'declined';
export declare const INTAKE_STATUS_META: Record<IntakeStatus, StatusMeta>;
/** Conflict-check outcome for a prospective client. */
export type ConflictCheck = 'clear' | 'pending' | 'conflict';
export declare const CONFLICT_CHECK_META: Record<ConflictCheck, StatusMeta>;
/** Kind of court date / deadline. */
export type CourtEventType = 'hearing' | 'trial' | 'filing' | 'deadline' | 'conference';
export declare const COURT_EVENT_META: Record<CourtEventType, StatusMeta>;
/** Time-relative urgency of a court date. */
export type CourtUrgency = 'past' | 'today' | 'soon' | 'upcoming';
export declare const COURT_URGENCY_META: Record<CourtUrgency, StatusMeta>;
/** Retainer / trust-account health. */
export type RetainerStatus = 'healthy' | 'low' | 'depleted' | 'replenished';
export declare const RETAINER_STATUS_META: Record<RetainerStatus, StatusMeta>;
/** E-signature request lifecycle. */
export type SignatureStatus = 'draft' | 'sent' | 'viewed' | 'signed' | 'declined' | 'expired';
export declare const SIGNATURE_STATUS_META: Record<SignatureStatus, StatusMeta>;
/** Kind of evidence exhibit. */
export type EvidenceKind = 'document' | 'photo' | 'video' | 'audio' | 'testimony' | 'physical';
export declare const EVIDENCE_KIND_META: Record<EvidenceKind, StatusMeta>;
/** Admissibility / evidentiary status. */
export type EvidenceStatus = 'admitted' | 'pending' | 'objected' | 'excluded';
export declare const EVIDENCE_STATUS_META: Record<EvidenceStatus, StatusMeta>;
/** Severity of a legal disclaimer / notice banner. */
export type DisclaimerTone = 'info' | 'notice' | 'warning' | 'critical';
export declare const DISCLAIMER_META: Record<DisclaimerTone, StatusMeta>;
/** Clamp a 0–100 percentage into range, tolerating undefined/NaN. */
export declare function clampPct(value: number | undefined): number;
/**
 * Format decimal hours as a stable `Hh Mm` string (e.g. `1.5` → `1h 30m`).
 * Guards NaN/negatives to `0h 0m`; used by the billable time row.
 */
export declare function formatHours(hours: number | undefined): string;
/**
 * Compute a billable amount in integer **cents** from decimal hours and an
 * hourly rate (also in cents). Rounds to the nearest cent and guards bad input
 * to `0`, so downstream `formatMoney` always gets a clean integer.
 */
export declare function billableCents(hours: number | undefined, rateCents: number | undefined): number;
//# sourceMappingURL=internal.d.ts.map