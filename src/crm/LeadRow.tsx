import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Badge } from '../primitives';
import { formatMoney } from '../commerce';
import { activate, clampPct, toneBadgeTone, toneTextClass, TEMPERATURE_META, type LeadTemperature } from './internal';

export interface LeadRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Lead / person name. */
  name: string;
  /** Company or source line. */
  company?: string;
  /** Lead temperature — drives the glyph + word (never color alone). */
  temperature: LeadTemperature;
  /** Estimated value in integer **cents**. */
  valueCents?: number;
  /** ISO 4217 currency (default USD). */
  currency?: string;
  /** Lead score 0–100, rendered as a badge. */
  score?: number;
  /** Avatar image URL; initials fallback from `name`. */
  avatarUrl?: string;
  /** Whether this row is selected/active (adds a primary border). */
  selected?: boolean;
  /** Click handler (renders as a keyboard-accessible button). */
  onClick?: () => void;
}

/**
 * Dense list row for a lead, keyed by **temperature** (`hot` 🔥 / `warm` ☀ /
 * `cold` ❄). Temperature is shown as a glyph *and* a label so it never relies on
 * color; the matching tone (`text-danger`/`text-warn`/`text-primary`) is only
 * reinforcement. Shows optional value (cents → `formatMoney`) and a score badge.
 * When `onClick` is set the row is a `role="button"` div with Enter/Space
 * activation. All colors are `--xen-*` token classes.
 */
export const LeadRow = React.forwardRef<HTMLDivElement, LeadRowProps>(function LeadRow(
  { name, company, temperature, valueCents, currency = 'USD', score, avatarUrl, selected = false, onClick, className, ...rest },
  ref
) {
  const meta = TEMPERATURE_META[temperature];
  const tempClass = toneTextClass(meta.tone);
  const interactive = onClick ? activate(onClick) : {};

  return (
    <div
      ref={ref}
      aria-label={`${meta.label} lead ${name}${company ? `, ${company}` : ''}`}
      className={cn(
        'flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border bg-surface px-[var(--xen-space-sm)] py-[var(--xen-space-sm)]',
        selected ? 'border-primary' : 'border-border',
        onClick && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
      {...interactive}
      {...rest}
    >
      <div className={cn('flex w-7 flex-col items-center', tempClass)}>
        <span aria-hidden="true" className="text-lg leading-none">
          {meta.glyph}
        </span>
        <span className="text-xs font-bold">{meta.label}</span>
      </div>

      <Avatar size="sm" name={name} src={avatarUrl} />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-on-surface">{name}</p>
        {company ? <p className="truncate text-xs text-muted">{company}</p> : null}
      </div>

      <div className="flex flex-col items-end gap-0.5">
        {valueCents != null ? (
          <span className="text-sm font-bold text-on-surface">{formatMoney(valueCents, currency)}</span>
        ) : null}
        {score != null ? <Badge tone={toneBadgeTone(meta.tone)}>{`${clampPct(score)}`}</Badge> : null}
      </div>
    </div>
  );
});
