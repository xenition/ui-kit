import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Badge } from '../primitives';
import { formatMoney } from './internal/format';
import type { EnergyTipProps, EnergyTipCategory } from './EnergyTip';

/** Drop-in for {@link EnergyTipProps} — same props, a different design. */
export type EnergyTipV4Props = EnergyTipProps;

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

const EFFORT_LABEL: Record<NonNullable<EnergyTipProps['effort']>, string> = {
  easy: 'Easy',
  moderate: 'Moderate',
  project: 'Project',
};

/**
 * EnergyTip — **V4** design. A clean, elevated tip card: the category glyph in
 * the signature brand-gradient disc, a category eyebrow + optional effort tag, a
 * headline + body, and an optional estimated monthly saving badge (integer cents
 * via `formatMoney`, so the figure never drifts). Becomes a `role="button"`
 * surface only when `onClick` is supplied. Same props/categories/behavior as
 * {@link EnergyTipProps}; token-only colors.
 */
export const EnergyTipV4 = React.forwardRef<HTMLDivElement, EnergyTipV4Props>(
  function EnergyTipV4(
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
      <div
        ref={ref}
        className={cn(
          'rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-lg p-5',
          interactive &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          className
        )}
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
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-gradient-to-br from-primary-400 to-primary-700">
            <Icon glyph={cd.glyph} size="lg" color="onPrimary" aria-label={cd.label} />
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
      </div>
    );
  }
);
