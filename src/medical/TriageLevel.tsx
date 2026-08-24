import * as React from 'react';
import { cn } from '../primitives/cn';
import { TEXT_TONE, type MedicalTone } from './internal';

/** Emergency-severity levels, 1 (most acute) → 5 (least). */
export type TriageLevelValue = 1 | 2 | 3 | 4 | 5;

const LEVEL_META: Record<TriageLevelValue, { label: string; glyph: string; tone: MedicalTone; hint: string }> = {
  1: { label: 'Immediate', glyph: '⚠', tone: 'danger', hint: 'Life-threatening — resuscitate now' },
  2: { label: 'Emergent', glyph: '▲', tone: 'danger', hint: 'High risk — see within minutes' },
  3: { label: 'Urgent', glyph: '◆', tone: 'warn', hint: 'Needs prompt evaluation' },
  4: { label: 'Less urgent', glyph: '●', tone: 'primary', hint: 'Can wait — routine care' },
  5: { label: 'Non-urgent', glyph: '○', tone: 'success', hint: 'Minor — lowest priority' },
};

export interface TriageLevelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Severity level 1–5. Out-of-range values are clamped into 1–5. */
  level: TriageLevelValue;
  /** Overrides the default level label. */
  label?: string;
  /** Overrides the default descriptive hint. */
  description?: string;
  /** Compact chip form (no description block). */
  compact?: boolean;
}

function clampLevel(n: number): TriageLevelValue {
  const r = Math.round(n);
  const c = r < 1 ? 1 : r > 5 ? 5 : r;
  return c as TriageLevelValue;
}

/**
 * A triage acuity indicator (1 = immediate … 5 = non-urgent) — the web mirror
 * of the native `TriageLevel`. The level is always conveyed by the number + a
 * text label + a glyph, so severity never relies on the color fill alone (the
 * token color is a supporting cue only). Renders a full card with a guidance
 * hint, or a `compact` chip. Token-only colors. Informational UI only — not a
 * medical device.
 */
export const TriageLevel = React.forwardRef<HTMLDivElement, TriageLevelProps>(
  function TriageLevel({ level, label, description, compact = false, className, ...rest }, ref) {
    const safe = clampLevel(level);
    const meta = LEVEL_META[safe];
    const toneClass = TEXT_TONE[meta.tone];
    const text = label ?? meta.label;
    const hint = description ?? meta.hint;
    const a11y = `Triage level ${safe}, ${text}. ${hint}`;

    if (compact) {
      return (
        <div
          ref={ref}
          data-xen-triage-level=""
          aria-label={a11y}
          className={cn(
            'inline-flex items-center gap-[var(--xen-space-xs)] self-start rounded-full bg-neutral-100 px-[var(--xen-space-md)] py-[var(--xen-space-xs)]',
            className
          )}
          {...rest}
        >
          <span aria-hidden="true" className={cn('text-sm', toneClass)}>
            {meta.glyph}
          </span>
          <span className={cn('text-sm font-bold', toneClass)}>
            {safe} · {text}
          </span>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        data-xen-triage-level=""
        aria-label={a11y}
        className={cn(
          'flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)]',
          className
        )}
        {...rest}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-[var(--xen-radius-md)] bg-neutral-100">
          <span className={cn('text-xl font-extrabold', toneClass)}>{safe}</span>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="flex items-center gap-[var(--xen-space-xs)]">
            <span aria-hidden="true" className={cn('text-sm', toneClass)}>
              {meta.glyph}
            </span>
            <span className={cn('text-base font-bold', toneClass)}>{text}</span>
          </span>
          <span className="text-sm text-muted">{hint}</span>
        </div>
      </div>
    );
  }
);
