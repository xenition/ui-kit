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
export function toneTextClass(tone: LegalTone): string {
  switch (tone) {
    case 'primary':
      return 'text-primary';
    case 'success':
      return 'text-success';
    case 'warn':
      return 'text-warn';
    case 'danger':
      return 'text-danger';
    case 'accent':
      return 'text-accent';
    default:
      return 'text-muted';
  }
}

/** Resolve a {@link LegalTone} to a solid `bg-*` token class (meter/rail fills). */
export function toneBgClass(tone: LegalTone): string {
  switch (tone) {
    case 'primary':
      return 'bg-primary';
    case 'success':
      return 'bg-success';
    case 'warn':
      return 'bg-warn';
    case 'danger':
      return 'bg-danger';
    case 'accent':
      return 'bg-accent';
    default:
      return 'bg-muted';
  }
}

/**
 * Resolve a {@link LegalTone} to a **soft** tinted `bg-*` token class for glyph
 * chips. `primary` / `accent` have a `-50` ramp; the rest fall back to
 * `bg-neutral-100` (still a token) so no literal color is ever emitted.
 */
export function toneSoftBgClass(tone: LegalTone): string {
  switch (tone) {
    case 'primary':
      return 'bg-primary-50';
    case 'accent':
      return 'bg-accent-50';
    default:
      return 'bg-neutral-100';
  }
}

/** Keyboard activation for a `role="button"` div — Enter / Space fire the handler. */
export function activateOnKey(
  handler: (() => void) | undefined
): (event: React.KeyboardEvent<HTMLElement>) => void {
  return (event) => {
    if (!handler) return;
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
      event.preventDefault();
      handler();
    }
  };
}

// ── case ──────────────────────────────────────────────────────────────────

/** Case / file lifecycle state. */
export type CaseStatus = 'open' | 'pending' | 'onHold' | 'closed' | 'appealed';

export const CASE_STATUS_META: Record<CaseStatus, StatusMeta> = {
  open: { glyph: '●', label: 'Open', tone: 'success' },
  pending: { glyph: '⋯', label: 'Pending', tone: 'warn' },
  onHold: { glyph: '⏸', label: 'On hold', tone: 'accent' },
  closed: { glyph: '✓', label: 'Closed', tone: 'neutral' },
  appealed: { glyph: '⚖', label: 'Appealed', tone: 'primary' },
};

/** Area of legal practice. */
export type PracticeArea =
  | 'litigation'
  | 'corporate'
  | 'family'
  | 'criminal'
  | 'realEstate'
  | 'ip'
  | 'employment'
  | 'other';

export const PRACTICE_AREA_META: Record<PracticeArea, StatusMeta> = {
  litigation: { glyph: '⚖', label: 'Litigation', tone: 'primary' },
  corporate: { glyph: '🏢', label: 'Corporate', tone: 'accent' },
  family: { glyph: '👪', label: 'Family', tone: 'success' },
  criminal: { glyph: '🚨', label: 'Criminal', tone: 'danger' },
  realEstate: { glyph: '🏠', label: 'Real estate', tone: 'primary' },
  ip: { glyph: '💡', label: 'IP', tone: 'accent' },
  employment: { glyph: '💼', label: 'Employment', tone: 'neutral' },
  other: { glyph: '•', label: 'Other', tone: 'neutral' },
};

/** Case / matter priority. */
export type CasePriority = 'low' | 'normal' | 'high' | 'urgent';

export const CASE_PRIORITY_META: Record<CasePriority, StatusMeta> = {
  low: { glyph: '▽', label: 'Low', tone: 'neutral' },
  normal: { glyph: '◆', label: 'Normal', tone: 'primary' },
  high: { glyph: '▲', label: 'High', tone: 'warn' },
  urgent: { glyph: '‼', label: 'Urgent', tone: 'danger' },
};

// ── matter ────────────────────────────────────────────────────────────────

/** Matter workflow stage. */
export type MatterStage =
  | 'intake'
  | 'active'
  | 'discovery'
  | 'trial'
  | 'settlement'
  | 'closed';

export const MATTER_STAGE_META: Record<MatterStage, StatusMeta> = {
  intake: { glyph: '○', label: 'Intake', tone: 'neutral' },
  active: { glyph: '◔', label: 'Active', tone: 'primary' },
  discovery: { glyph: '🔍', label: 'Discovery', tone: 'accent' },
  trial: { glyph: '⚖', label: 'Trial', tone: 'warn' },
  settlement: { glyph: '🤝', label: 'Settlement', tone: 'success' },
  closed: { glyph: '✓', label: 'Closed', tone: 'neutral' },
};

/** Ordered matter stages for a progress meter. */
export const MATTER_STAGE_ORDER: MatterStage[] = [
  'intake',
  'active',
  'discovery',
  'trial',
  'settlement',
  'closed',
];

// ── document ────────────────────────────────────────────────────────────────

/** Legal document lifecycle. */
export type DocumentStatus =
  | 'draft'
  | 'review'
  | 'final'
  | 'signed'
  | 'filed'
  | 'expired';

export const DOCUMENT_STATUS_META: Record<DocumentStatus, StatusMeta> = {
  draft: { glyph: '✎', label: 'Draft', tone: 'neutral' },
  review: { glyph: '◔', label: 'In review', tone: 'primary' },
  final: { glyph: '●', label: 'Final', tone: 'accent' },
  signed: { glyph: '✓', label: 'Signed', tone: 'success' },
  filed: { glyph: '🗄', label: 'Filed', tone: 'success' },
  expired: { glyph: '✕', label: 'Expired', tone: 'danger' },
};

/** Document kind (drives the leading glyph). */
export type DocumentKind =
  | 'contract'
  | 'brief'
  | 'motion'
  | 'pleading'
  | 'correspondence'
  | 'exhibit'
  | 'other';

export const DOCUMENT_KIND_META: Record<DocumentKind, StatusMeta> = {
  contract: { glyph: '📄', label: 'Contract', tone: 'primary' },
  brief: { glyph: '📑', label: 'Brief', tone: 'accent' },
  motion: { glyph: '📝', label: 'Motion', tone: 'primary' },
  pleading: { glyph: '📋', label: 'Pleading', tone: 'accent' },
  correspondence: { glyph: '✉', label: 'Letter', tone: 'neutral' },
  exhibit: { glyph: '📎', label: 'Exhibit', tone: 'warn' },
  other: { glyph: '📁', label: 'Document', tone: 'neutral' },
};

// ── contract clause ─────────────────────────────────────────────────────────

/** Negotiation state of a single contract clause. */
export type ClauseStatus = 'standard' | 'review' | 'negotiate' | 'flagged' | 'agreed';

export const CLAUSE_STATUS_META: Record<ClauseStatus, StatusMeta> = {
  standard: { glyph: '○', label: 'Standard', tone: 'neutral' },
  review: { glyph: '◔', label: 'Under review', tone: 'primary' },
  negotiate: { glyph: '⇄', label: 'In negotiation', tone: 'warn' },
  flagged: { glyph: '⚠', label: 'Flagged', tone: 'danger' },
  agreed: { glyph: '✓', label: 'Agreed', tone: 'success' },
};

/** Risk level of a clause. */
export type ClauseRisk = 'low' | 'medium' | 'high';

export const CLAUSE_RISK_META: Record<ClauseRisk, StatusMeta> = {
  low: { glyph: '▽', label: 'Low risk', tone: 'success' },
  medium: { glyph: '◆', label: 'Medium risk', tone: 'warn' },
  high: { glyph: '▲', label: 'High risk', tone: 'danger' },
};

// ── appointment ─────────────────────────────────────────────────────────────

/** Kind of legal appointment. */
export type AppointmentType =
  | 'consultation'
  | 'deposition'
  | 'mediation'
  | 'hearing'
  | 'meeting'
  | 'call';

export const APPOINTMENT_TYPE_META: Record<AppointmentType, StatusMeta> = {
  consultation: { glyph: '💬', label: 'Consultation', tone: 'primary' },
  deposition: { glyph: '🎙', label: 'Deposition', tone: 'accent' },
  mediation: { glyph: '🤝', label: 'Mediation', tone: 'success' },
  hearing: { glyph: '⚖', label: 'Hearing', tone: 'warn' },
  meeting: { glyph: '📅', label: 'Meeting', tone: 'primary' },
  call: { glyph: '📞', label: 'Call', tone: 'neutral' },
};

/** Scheduling state of an appointment. */
export type AppointmentStatus = 'scheduled' | 'confirmed' | 'completed' | 'cancelled';

export const APPOINTMENT_STATUS_META: Record<AppointmentStatus, StatusMeta> = {
  scheduled: { glyph: '○', label: 'Scheduled', tone: 'primary' },
  confirmed: { glyph: '✓', label: 'Confirmed', tone: 'success' },
  completed: { glyph: '●', label: 'Completed', tone: 'neutral' },
  cancelled: { glyph: '✕', label: 'Cancelled', tone: 'danger' },
};

// ── billing ─────────────────────────────────────────────────────────────────

/** Billing state of a time entry. */
export type BillableStatus = 'draft' | 'unbilled' | 'billed' | 'writtenOff';

export const BILLABLE_STATUS_META: Record<BillableStatus, StatusMeta> = {
  draft: { glyph: '✎', label: 'Draft', tone: 'neutral' },
  unbilled: { glyph: '⋯', label: 'Unbilled', tone: 'warn' },
  billed: { glyph: '✓', label: 'Billed', tone: 'success' },
  writtenOff: { glyph: '✕', label: 'Written off', tone: 'danger' },
};

// ── intake ──────────────────────────────────────────────────────────────────

/** Prospective-client intake stage. */
export type IntakeStatus = 'new' | 'contacted' | 'qualified' | 'retained' | 'declined';

export const INTAKE_STATUS_META: Record<IntakeStatus, StatusMeta> = {
  new: { glyph: '✦', label: 'New', tone: 'primary' },
  contacted: { glyph: '◔', label: 'Contacted', tone: 'accent' },
  qualified: { glyph: '●', label: 'Qualified', tone: 'warn' },
  retained: { glyph: '✓', label: 'Retained', tone: 'success' },
  declined: { glyph: '✕', label: 'Declined', tone: 'neutral' },
};

/** Conflict-check outcome for a prospective client. */
export type ConflictCheck = 'clear' | 'pending' | 'conflict';

export const CONFLICT_CHECK_META: Record<ConflictCheck, StatusMeta> = {
  clear: { glyph: '✓', label: 'Conflict clear', tone: 'success' },
  pending: { glyph: '⋯', label: 'Conflict pending', tone: 'warn' },
  conflict: { glyph: '⛔', label: 'Conflict found', tone: 'danger' },
};

// ── court ───────────────────────────────────────────────────────────────────

/** Kind of court date / deadline. */
export type CourtEventType = 'hearing' | 'trial' | 'filing' | 'deadline' | 'conference';

export const COURT_EVENT_META: Record<CourtEventType, StatusMeta> = {
  hearing: { glyph: '⚖', label: 'Hearing', tone: 'primary' },
  trial: { glyph: '🏛', label: 'Trial', tone: 'warn' },
  filing: { glyph: '🗄', label: 'Filing', tone: 'accent' },
  deadline: { glyph: '⏰', label: 'Deadline', tone: 'danger' },
  conference: { glyph: '👥', label: 'Conference', tone: 'primary' },
};

/** Time-relative urgency of a court date. */
export type CourtUrgency = 'past' | 'today' | 'soon' | 'upcoming';

export const COURT_URGENCY_META: Record<CourtUrgency, StatusMeta> = {
  past: { glyph: '✓', label: 'Past', tone: 'neutral' },
  today: { glyph: '‼', label: 'Today', tone: 'danger' },
  soon: { glyph: '⚠', label: 'Soon', tone: 'warn' },
  upcoming: { glyph: '○', label: 'Upcoming', tone: 'primary' },
};

// ── retainer ────────────────────────────────────────────────────────────────

/** Retainer / trust-account health. */
export type RetainerStatus = 'healthy' | 'low' | 'depleted' | 'replenished';

export const RETAINER_STATUS_META: Record<RetainerStatus, StatusMeta> = {
  healthy: { glyph: '✓', label: 'Healthy', tone: 'success' },
  low: { glyph: '⚠', label: 'Running low', tone: 'warn' },
  depleted: { glyph: '⛔', label: 'Depleted', tone: 'danger' },
  replenished: { glyph: '↑', label: 'Replenished', tone: 'primary' },
};

// ── signature ───────────────────────────────────────────────────────────────

/** E-signature request lifecycle. */
export type SignatureStatus =
  | 'draft'
  | 'sent'
  | 'viewed'
  | 'signed'
  | 'declined'
  | 'expired';

export const SIGNATURE_STATUS_META: Record<SignatureStatus, StatusMeta> = {
  draft: { glyph: '✎', label: 'Draft', tone: 'neutral' },
  sent: { glyph: '➤', label: 'Awaiting signature', tone: 'warn' },
  viewed: { glyph: '👁', label: 'Viewed', tone: 'primary' },
  signed: { glyph: '✓', label: 'Signed', tone: 'success' },
  declined: { glyph: '✕', label: 'Declined', tone: 'danger' },
  expired: { glyph: '⏳', label: 'Expired', tone: 'neutral' },
};

// ── evidence ────────────────────────────────────────────────────────────────

/** Kind of evidence exhibit. */
export type EvidenceKind = 'document' | 'photo' | 'video' | 'audio' | 'testimony' | 'physical';

export const EVIDENCE_KIND_META: Record<EvidenceKind, StatusMeta> = {
  document: { glyph: '📄', label: 'Document', tone: 'primary' },
  photo: { glyph: '📷', label: 'Photo', tone: 'accent' },
  video: { glyph: '🎞', label: 'Video', tone: 'accent' },
  audio: { glyph: '🔊', label: 'Audio', tone: 'primary' },
  testimony: { glyph: '🗣', label: 'Testimony', tone: 'neutral' },
  physical: { glyph: '📦', label: 'Physical', tone: 'warn' },
};

/** Admissibility / evidentiary status. */
export type EvidenceStatus = 'admitted' | 'pending' | 'objected' | 'excluded';

export const EVIDENCE_STATUS_META: Record<EvidenceStatus, StatusMeta> = {
  admitted: { glyph: '✓', label: 'Admitted', tone: 'success' },
  pending: { glyph: '⋯', label: 'Pending ruling', tone: 'warn' },
  objected: { glyph: '⚠', label: 'Objected', tone: 'danger' },
  excluded: { glyph: '✕', label: 'Excluded', tone: 'neutral' },
};

// ── disclaimer ──────────────────────────────────────────────────────────────

/** Severity of a legal disclaimer / notice banner. */
export type DisclaimerTone = 'info' | 'notice' | 'warning' | 'critical';

export const DISCLAIMER_META: Record<DisclaimerTone, StatusMeta> = {
  info: { glyph: 'ℹ', label: 'Notice', tone: 'primary' },
  notice: { glyph: '§', label: 'Legal notice', tone: 'accent' },
  warning: { glyph: '⚠', label: 'Warning', tone: 'warn' },
  critical: { glyph: '⛔', label: 'Important', tone: 'danger' },
};

// ── numeric helpers ─────────────────────────────────────────────────────────

/** Clamp a 0–100 percentage into range, tolerating undefined/NaN. */
export function clampPct(value: number | undefined): number {
  if (value == null || !Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
}

/**
 * Format decimal hours as a stable `Hh Mm` string (e.g. `1.5` → `1h 30m`).
 * Guards NaN/negatives to `0h 0m`; used by the billable time row.
 */
export function formatHours(hours: number | undefined): string {
  const h = hours == null || !Number.isFinite(hours) || hours < 0 ? 0 : hours;
  const whole = Math.floor(h);
  const mins = Math.round((h - whole) * 60);
  if (mins === 60) return `${whole + 1}h 0m`;
  return `${whole}h ${mins}m`;
}

/**
 * Compute a billable amount in integer **cents** from decimal hours and an
 * hourly rate (also in cents). Rounds to the nearest cent and guards bad input
 * to `0`, so downstream `formatMoney` always gets a clean integer.
 */
export function billableCents(
  hours: number | undefined,
  rateCents: number | undefined
): number {
  const h = hours == null || !Number.isFinite(hours) || hours < 0 ? 0 : hours;
  const r = rateCents == null || !Number.isFinite(rateCents) || rateCents < 0 ? 0 : rateCents;
  return Math.round(h * r);
}
