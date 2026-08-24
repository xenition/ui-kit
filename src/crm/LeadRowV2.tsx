import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Badge } from '../primitives';
import { formatMoney } from '../commerce';
import { activate, clampPct, toneBadgeTone, TEMPERATURE_META, type CrmTone } from './internal';
import type { LeadRowProps } from './LeadRow';

/** V2 accepts the exact same props as {@link LeadRow} — a drop-in replacement. */
export type LeadRowV2Props = LeadRowProps;

/** Tinted-pill classes (soft bg + matching text) for a temperature tone. */
function tempChipClass(tone: CrmTone): string {
  if (tone === 'danger') return 'bg-danger/10 text-danger';
  if (tone === 'warn') return 'bg-warn/10 text-warn';
  return 'bg-primary/10 text-primary';
}

/**
 * LeadRow **design V2** — a *card* (not a dense line) with a prominent
 * hot/warm/cold *flame chip*: a tinted pill carrying the temperature glyph + word
 * so heat reads instantly without relying on color. Avatar, name and company
 * lead; value and score sit in a right column. Elevated on a token `shadow-sm`,
 * with a `primary` left accent bar when `selected`. Same props as
 * {@link LeadRow}. Token-pure.
 */
export const LeadRowV2 = React.forwardRef<HTMLDivElement, LeadRowV2Props>(function LeadRowV2(
  { name, company, temperature, valueCents, currency = 'USD', score, avatarUrl, selected = false, onClick, className, ...rest },
  ref
) {
  const meta = TEMPERATURE_META[temperature];
  const interactive = onClick ? activate(onClick) : {};

  return (
    <div
      ref={ref}
      aria-label={`${meta.label} lead ${name}${company ? `, ${company}` : ''}`}
      className={cn(
        'flex items-center gap-md rounded-lg bg-surface p-md shadow-sm transition duration-200 motion-reduce:transition-none',
        selected && 'border-l-4 border-primary',
        onClick && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md motion-reduce:hover:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
      {...interactive}
      {...rest}
    >
      <Avatar size="md" name={name} src={avatarUrl} />

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="truncate font-bold text-on-surface">{name}</p>
        {company ? <p className="truncate text-sm text-muted">{company}</p> : null}
        <span className={cn('mt-0.5 flex items-center gap-0.5 self-start rounded-full px-sm py-0.5 text-xs font-bold', tempChipClass(meta.tone))}>
          <span aria-hidden="true">{meta.glyph}</span>
          <span>{meta.label}</span>
        </span>
      </div>

      <div className="flex flex-col items-end gap-0.5">
        {valueCents != null ? (
          <span className="text-base font-extrabold text-on-surface">{formatMoney(valueCents, currency)}</span>
        ) : null}
        {score != null ? <Badge tone={toneBadgeTone(meta.tone)}>{`${clampPct(score)}`}</Badge> : null}
      </div>
    </div>
  );
});
