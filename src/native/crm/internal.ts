/**
 * Shared vocabulary for the CRM module: deal outcomes, lead temperatures,
 * activity kinds and quote statuses. Every status is expressed as a
 * **glyph + label + tone** triple so components can convey state by text and
 * icon — never by color alone (the token contract for accessibility). `tone`
 * values are `SemanticColors`-compatible keys that also map 1:1 onto the
 * `Badge`/`Tag` tone scale, so a status can drive a badge and a text color from
 * the same source of truth.
 */
import type { SemanticColors } from '../theme';

/** Tone keys shared by `Badge`, `Tag` and text-color resolution below. */
export type CrmTone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger' | 'accent';

export interface StatusMeta {
  /** Non-color glyph carrying the meaning (emoji or unicode symbol). */
  glyph: string;
  /** Human label — the text half of the text+glyph contract. */
  label: string;
  /** Semantic tone (drives Badge/Tag + text color). */
  tone: CrmTone;
}

/**
 * Resolve a {@link CrmTone} to a concrete token hex for text/icon color.
 * `neutral` maps to `muted`; everything else is a direct `SemanticColors` slot,
 * so the returned value is always a compiled-theme token, never a literal.
 */
export function toneColor(colors: SemanticColors, tone: CrmTone): string {
  return tone === 'neutral' ? colors.muted : colors[tone];
}

/** Lifecycle result of a deal. `won` reads success, `lost` reads danger. */
export type DealOutcome = 'open' | 'won' | 'lost' | 'pending';

export const OUTCOME_META: Record<DealOutcome, StatusMeta> = {
  open: { glyph: '◔', label: 'Open', tone: 'primary' },
  won: { glyph: '✓', label: 'Won', tone: 'success' },
  lost: { glyph: '✕', label: 'Lost', tone: 'danger' },
  pending: { glyph: '⋯', label: 'Pending', tone: 'warn' },
};

/** Lead heat. Conveyed by glyph + label; color is a redundant reinforcement. */
export type LeadTemperature = 'hot' | 'warm' | 'cold';

export const TEMPERATURE_META: Record<LeadTemperature, StatusMeta> = {
  hot: { glyph: '🔥', label: 'Hot', tone: 'danger' },
  warm: { glyph: '☀', label: 'Warm', tone: 'warn' },
  cold: { glyph: '❄', label: 'Cold', tone: 'primary' },
};

/** Kind of a logged CRM activity. */
export type ActivityKind = 'call' | 'email' | 'meeting' | 'note' | 'task' | 'deal';

export const ACTIVITY_META: Record<ActivityKind, StatusMeta> = {
  call: { glyph: '📞', label: 'Call', tone: 'primary' },
  email: { glyph: '✉', label: 'Email', tone: 'accent' },
  meeting: { glyph: '👥', label: 'Meeting', tone: 'primary' },
  note: { glyph: '📝', label: 'Note', tone: 'neutral' },
  task: { glyph: '✔', label: 'Task', tone: 'success' },
  deal: { glyph: '💰', label: 'Deal', tone: 'success' },
};

/** Quote / proposal lifecycle. */
export type QuoteStatus = 'draft' | 'sent' | 'viewed' | 'accepted' | 'rejected' | 'expired';

export const QUOTE_META: Record<QuoteStatus, StatusMeta> = {
  draft: { glyph: '✎', label: 'Draft', tone: 'neutral' },
  sent: { glyph: '➤', label: 'Sent', tone: 'primary' },
  viewed: { glyph: '👁', label: 'Viewed', tone: 'accent' },
  accepted: { glyph: '✓', label: 'Accepted', tone: 'success' },
  rejected: { glyph: '✕', label: 'Rejected', tone: 'danger' },
  expired: { glyph: '⌛', label: 'Expired', tone: 'warn' },
};

/** Clamp a 0–100 percentage into range, tolerating undefined/NaN. */
export function clampPct(value: number | undefined): number {
  if (value == null || !Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
}
