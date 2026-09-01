import * as React from 'react';
import { cn } from '../primitives/cn';
import { TEXT_TONE, type MedicalTone } from './internal';
import type { TriageLevelProps, TriageLevelValue } from './TriageLevel';

/** Drop-in for {@link TriageLevelProps} — same props, the V4 "clinic" design. */
export type TriageLevelV4Props = TriageLevelProps;

const LEVEL_META: Record<TriageLevelValue, { label: string; glyph: string; tone: MedicalTone; hint: string }> = {
  1: { label: 'Immediate', glyph: '⚠', tone: 'danger', hint: 'Life-threatening — resuscitate now' },
  2: { label: 'Emergent', glyph: '▲', tone: 'danger', hint: 'High risk — see within minutes' },
  3: { label: 'Urgent', glyph: '◆', tone: 'warn', hint: 'Needs prompt evaluation' },
  4: { label: 'Less urgent', glyph: '●', tone: 'primary', hint: 'Can wait — routine care' },
  5: { label: 'Non-urgent', glyph: '○', tone: 'success', hint: 'Minor — lowest priority' },
};

function clampLevel(n: number): TriageLevelValue {
  const r = Math.round(n);
  const c = r < 1 ? 1 : r > 5 ? 5 : r;
  return c as TriageLevelValue;
}

/**
 * TriageLevel — **V4** "clinic" design (web parity of the native V4). The calm,
 * clinical acuity indicator (1 = Immediate/resuscitation … 5 = Non-urgent): a big
 * legible **tabular-nums** number in a soft-tone well, a text label, and a glyph,
 * so severity is always number + label + glyph + supporting tone — never a color
 * fill alone (no gradient — clinical surfaces stay clean). Renders an elevated
 * rounded card with a guidance hint, or a `compact` chip. Identical
 * props/behavior to {@link TriageLevelProps}. All colors from `--xen-*` token
 * classes (no literals). Informational UI only — not a medical device.
 */
export const TriageLevelV4 = React.forwardRef<HTMLDivElement, TriageLevelV4Props>(
  function TriageLevelV4({ level, label, description, compact = false, className, ...rest }, ref) {
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
            'inline-flex items-center gap-[var(--xen-space-xs)] self-start rounded-full border border-border bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-xs)] shadow-sm',
            className
          )}
          {...rest}
        >
          <span aria-hidden="true" className={cn('text-sm', toneClass)}>
            {meta.glyph}
          </span>
          <span className={cn('text-sm font-bold tabular-nums', toneClass)}>
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
          'flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm p-[var(--xen-space-lg)]',
          className
        )}
        {...rest}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-[var(--xen-radius-md)] bg-primary/10">
          <span className={cn('text-3xl font-extrabold tabular-nums', toneClass)}>{safe}</span>
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
