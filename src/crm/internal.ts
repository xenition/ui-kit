/**
 * Shared vocabulary for the web CRM module — the DOM parity of
 * `native/crm/internal`. Every status is expressed as a **glyph + label + tone**
 * triple so components convey state by text and icon, never by color alone (the
 * token contract for accessibility). `tone` values map 1:1 onto the web
 * `Badge`/`Icon` token scale and resolve to `text-*`/`bg-*` `--xen-*` classes —
 * no literal colors. Web has no `accent` slot, so `accent` folds into `primary`.
 */
import * as React from 'react';
import type { BadgeTone } from '../primitives/Badge';

/** Tone keys shared by the CRM blocks (superset of the web `Badge` tones). */
export type CrmTone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger' | 'accent';

export interface StatusMeta {
  /** Non-color glyph carrying the meaning (emoji or unicode symbol). */
  glyph: string;
  /** Human label — the text half of the text+glyph contract. */
  label: string;
  /** Semantic tone (drives Badge tone + text color). */
  tone: CrmTone;
}

/**
 * Resolve a {@link CrmTone} to a `text-*` token class for glyph/label color.
 * `neutral` → `text-muted`; `accent` → `text-primary` (web has no accent slot);
 * everything else is the matching `text-<tone>` token class — never a literal.
 */
export function toneTextClass(tone: CrmTone): string {
  if (tone === 'neutral') return 'text-muted';
  if (tone === 'accent') return 'text-primary';
  return `text-${tone}`;
}

/** Map a {@link CrmTone} onto the web `Badge` tone scale (accent → primary). */
export function toneBadgeTone(tone: CrmTone): BadgeTone {
  return tone === 'neutral' ? 'neutral' : tone === 'accent' ? 'primary' : tone;
}

/**
 * Filled-chip classes for a selected {@link CrmTone} (background + on-color +
 * transparent border). All token classes — used by the filter bar's active chip.
 */
export function toneFillClass(tone: CrmTone): string {
  switch (tone) {
    case 'success':
      return 'bg-success text-on-success border-transparent';
    case 'warn':
      return 'bg-warn text-on-warn border-transparent';
    case 'danger':
      return 'bg-danger text-on-danger border-transparent';
    case 'neutral':
      return 'bg-neutral-100 text-on-surface border-border';
    // primary + accent
    default:
      return 'bg-primary text-on-primary border-transparent';
  }
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

/**
 * DOM props that turn a non-button element into an accessible, keyboard-driven
 * button when `handler` is set (Enter/Space activate it). Returns an empty object
 * when there's no handler, so the element stays inert. Interactive CRM cards
 * spread this onto their root `div`.
 */
export function activate(handler?: () => void): {
  role?: 'button';
  tabIndex?: number;
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
} {
  if (!handler) return {};
  return {
    role: 'button',
    tabIndex: 0,
    onClick: handler,
    onKeyDown: (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handler();
      }
    },
  };
}
