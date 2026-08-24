import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney } from '../commerce';
import { activate, clampPct, toneTextClass, TEMPERATURE_META, type CrmTone } from './internal';
import type { LeadRowProps } from './LeadRow';

/** V3 accepts the exact same props as {@link LeadRow} — a drop-in replacement. */
export type LeadRowV3Props = LeadRowProps;

/** Left-accent border color class for a temperature tone. */
function tempBorderClass(tone: CrmTone): string {
  if (tone === 'danger') return 'border-danger';
  if (tone === 'warn') return 'border-warn';
  return 'border-primary';
}

/**
 * LeadRow **design V3** — the *densest* single line: a leading temperature glyph
 * (🔥/☀/❄), the name with the company inline, the value pushed hard right, and a
 * small score. No avatar, no second line of chrome — a maximum-density lead list
 * for triage screens. A left accent bar (colored by temperature, or `primary`
 * when `selected`) reinforces heat, and the glyph is paired with an accessible
 * word in the row label so meaning never rests on color. Same props as
 * {@link LeadRow}. Token-pure.
 */
export const LeadRowV3 = React.forwardRef<HTMLDivElement, LeadRowV3Props>(function LeadRowV3(
  { name, company, temperature, valueCents, currency = 'USD', score, selected = false, onClick, className, ...rest },
  ref
) {
  const meta = TEMPERATURE_META[temperature];
  const interactive = onClick ? activate(onClick) : {};

  return (
    <div
      ref={ref}
      aria-label={`${meta.label} lead ${name}${company ? `, ${company}` : ''}`}
      className={cn(
        'flex items-center gap-sm border-l-[3px] bg-surface px-sm py-xs transition duration-200 motion-reduce:transition-none',
        selected ? 'border-primary' : tempBorderClass(meta.tone),
        onClick && 'cursor-pointer hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
      {...interactive}
      {...rest}
    >
      <span aria-hidden="true" className={cn('w-5 shrink-0 text-center text-base', toneTextClass(meta.tone))}>
        {meta.glyph}
      </span>

      <p className="min-w-0 flex-1 truncate text-sm font-semibold text-on-surface">
        {name}
        {company ? <span className="ml-2 font-normal text-muted">{company}</span> : null}
      </p>

      {valueCents != null ? (
        <span className="shrink-0 text-sm font-bold text-on-surface">{formatMoney(valueCents, currency)}</span>
      ) : null}
      {score != null ? (
        <span className={cn('min-w-[20px] shrink-0 text-right text-xs font-bold', toneTextClass(meta.tone))}>{clampPct(score)}</span>
      ) : null}
    </div>
  );
});
