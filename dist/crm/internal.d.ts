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
export declare function toneTextClass(tone: CrmTone): string;
/** Map a {@link CrmTone} onto the web `Badge` tone scale (accent → primary). */
export declare function toneBadgeTone(tone: CrmTone): BadgeTone;
/**
 * Filled-chip classes for a selected {@link CrmTone} (background + on-color +
 * transparent border). All token classes — used by the filter bar's active chip.
 */
export declare function toneFillClass(tone: CrmTone): string;
/** Lifecycle result of a deal. `won` reads success, `lost` reads danger. */
export type DealOutcome = 'open' | 'won' | 'lost' | 'pending';
export declare const OUTCOME_META: Record<DealOutcome, StatusMeta>;
/** Lead heat. Conveyed by glyph + label; color is a redundant reinforcement. */
export type LeadTemperature = 'hot' | 'warm' | 'cold';
export declare const TEMPERATURE_META: Record<LeadTemperature, StatusMeta>;
/** Kind of a logged CRM activity. */
export type ActivityKind = 'call' | 'email' | 'meeting' | 'note' | 'task' | 'deal';
export declare const ACTIVITY_META: Record<ActivityKind, StatusMeta>;
/** Quote / proposal lifecycle. */
export type QuoteStatus = 'draft' | 'sent' | 'viewed' | 'accepted' | 'rejected' | 'expired';
export declare const QUOTE_META: Record<QuoteStatus, StatusMeta>;
/** Clamp a 0–100 percentage into range, tolerating undefined/NaN. */
export declare function clampPct(value: number | undefined): number;
/**
 * DOM props that turn a non-button element into an accessible, keyboard-driven
 * button when `handler` is set (Enter/Space activate it). Returns an empty object
 * when there's no handler, so the element stays inert. Interactive CRM cards
 * spread this onto their root `div`.
 */
export declare function activate(handler?: () => void): {
    role?: 'button';
    tabIndex?: number;
    onClick?: () => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
};
//# sourceMappingURL=internal.d.ts.map