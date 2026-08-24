import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Icon, Badge } from '../primitives';
import { formatMoney, type MoneyFormatter } from './internal/format';

/** Tip category — drives the leading glyph + label. */
export type EnergyTipCategory = 'heating' | 'cooling' | 'lighting' | 'water' | 'appliance' | 'general';

interface CategoryDescriptor {
  label: string;
  glyph: string;
}

const CATEGORY: Record<EnergyTipCategory, CategoryDescriptor> = {
  heating: { label: 'Heating', glyph: '🔥' },
  cooling: { label: 'Cooling', glyph: '❄️' },
  lighting: { label: 'Lighting', glyph: '💡' },
  water: { label: 'Water', glyph: '💧' },
  appliance: { label: 'Appliances', glyph: '🔌' },
  general: { label: 'Tip', glyph: '🌱' },
};

export interface EnergyTipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Tip headline (e.g. "Lower your thermostat 2°"). */
  title: string;
  /** Supporting explanation. */
  body?: string;
  /** Tip category — drives the glyph + label (default `general`). */
  category?: EnergyTipCategory;
  /** Estimated monthly saving in integer **cents** (shown as a badge). */
  savingsCents?: number;
  /** Effort/impact hint. */
  effort?: 'easy' | 'moderate' | 'project';
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
  /** Fires on card click (e.g. open the full tip); becomes a button when supplied. */
  onClick?: () => void;
}

const EFFORT_LABEL: Record<NonNullable<EnergyTipProps['effort']>, string> = {
  easy: 'Easy',
  moderate: 'Moderate',
  project: 'Project',
};

/**
 * An energy-saving tip card: a tinted category glyph disc, a headline + body, an
 * optional effort tag, and an optional estimated monthly saving badge. The
 * saving is integer cents via `formatMoney`, so the printed figure never drifts.
 * Becomes a `role="button"` surface only when `onClick` is supplied. Every color
 * traces to a `--xen-*` token — no literals. Web parity of the native
 * `EnergyTip`.
 */
export const EnergyTip = React.forwardRef<HTMLDivElement, EnergyTipProps>(function EnergyTip(
  {
    title,
    body,
    category = 'general',
    savingsCents,
    effort,
    currency = 'USD',
    formatMoney: format = formatMoney,
    onClick,
    className,
    ...rest
  },
  ref
) {
  const cd = CATEGORY[category] ?? CATEGORY.general;
  const savings = savingsCents != null ? Math.max(0, Math.trunc(savingsCents)) : null;
  const interactive = onClick != null;

  return (
    <Card
      ref={ref}
      variant={interactive ? 'interactive' : 'outlined'}
      className={cn(interactive && 'cursor-pointer', className)}
      {...(interactive
        ? {
            role: 'button',
            tabIndex: 0,
            'aria-label': `${cd.label} tip: ${title}${savings != null ? `, save about ${format(savings, currency)} per month` : ''}`,
            onClick,
            onKeyDown: (e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            },
          }
        : {})}
      {...rest}
    >
      <div className="flex items-start gap-[var(--xen-space-md)]">
        <span className="flex h-11 w-11 items-center justify-center rounded-[var(--xen-radius-md)] bg-success/10">
          <Icon glyph={cd.glyph} size="lg" aria-label={cd.label} />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex flex-wrap items-center gap-[var(--xen-space-sm)]">
            <span className="text-xs font-semibold text-muted">{cd.label.toUpperCase()}</span>
            {effort != null ? (
              <Badge tone="neutral" variant="soft" size="sm">{EFFORT_LABEL[effort]}</Badge>
            ) : null}
          </div>
          <span className="text-base font-bold text-on-surface">{title}</span>
          {body != null ? <span className="text-sm text-muted">{body}</span> : null}
          {savings != null ? (
            <div className="mt-0.5">
              <Badge tone="success" variant="soft" size="sm">{`Save ~${format(savings, currency)}/mo`}</Badge>
            </div>
          ) : null}
        </div>
      </div>
    </Card>
  );
});
