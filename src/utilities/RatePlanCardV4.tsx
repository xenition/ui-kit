import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Badge, Button } from '../primitives';
import { formatMoney } from './internal/format';
import type { RatePlanCardProps, RatePlanVariant } from './RatePlanCard';

/** Drop-in for {@link RatePlanCardProps} — same props, a different design. */
export type RatePlanCardV4Props = RatePlanCardProps;

interface VariantDescriptor {
  label: string;
  glyph: string;
}

const VARIANT: Record<RatePlanVariant, VariantDescriptor> = {
  fixed: { label: 'Fixed rate', glyph: '🔒' },
  variable: { label: 'Variable', glyph: '📈' },
  'time-of-use': { label: 'Time-of-use', glyph: '⏱️' },
  tiered: { label: 'Tiered', glyph: '📊' },
  green: { label: '100% renewable', glyph: '🌱' },
};

/**
 * RatePlanCard — **V4** design. A clean, elevated rate-plan card: the
 * rate-structure glyph in the signature brand-gradient disc, a per-unit price
 * headline (integer cents via `formatMoney`, so it never drifts), an optional
 * feature list, and a select action. The `selected` state stays conveyed by a
 * badge + label + an accent ring (never color alone) and the CTA becomes inert.
 * Same props/variants/behavior as {@link RatePlanCardProps}; token-only colors.
 */
export const RatePlanCardV4 = React.forwardRef<HTMLDivElement, RatePlanCardV4Props>(
  function RatePlanCardV4(
    {
      name,
      variant = 'fixed',
      rateCents,
      unit,
      term,
      features,
      selected = false,
      currency = 'USD',
      formatMoney: format = formatMoney,
      selectLabel = 'Choose plan',
      onSelect,
      className,
      ...rest
    },
    ref
  ) {
    const vd = VARIANT[variant] ?? VARIANT.fixed;
    const rate = Math.max(0, Math.trunc(rateCents || 0));
    const rows = Array.isArray(features) ? features : [];

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-lg p-5',
          selected && 'border-2 border-primary ring-2 ring-primary-300 bg-primary/5',
          className
        )}
        {...rest}
      >
        <div className="flex items-center gap-[var(--xen-space-md)]">
          <span className="flex h-12 w-12 items-center justify-center rounded-[var(--xen-radius-md)] bg-gradient-to-br from-primary-400 to-primary-700">
            <Icon glyph={vd.glyph} size="xl" color="onPrimary" aria-label={vd.label} />
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="truncate text-lg font-bold text-on-surface">{name}</span>
            <span className="text-xs text-muted">
              {vd.label}
              {term != null ? ` · ${term}` : ''}
            </span>
          </div>
          {selected ? (
            <Badge tone="primary" variant="soft" size="sm">✓ Current</Badge>
          ) : null}
        </div>

        <div className="mt-[var(--xen-space-md)] flex items-baseline gap-[var(--xen-space-xs)]">
          <span className="text-2xl font-bold text-primary">{format(rate, currency)}</span>
          <span className="text-sm text-muted">/{unit}</span>
        </div>

        {rows.length > 0 ? (
          <ul className="mt-[var(--xen-space-md)] flex flex-col gap-[var(--xen-space-xs)]">
            {rows.map((f, i) => (
              <li key={`${f}-${i}`} className="flex items-center gap-[var(--xen-space-xs)]">
                <Icon glyph="✓" size="sm" color="success" aria-label="included" />
                <span className="flex-1 text-sm text-on-surface">{f}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {onSelect != null ? (
          <Button
            variant={selected ? 'outline' : 'primary'}
            onClick={selected ? undefined : onSelect}
            disabled={selected}
            className="mt-[var(--xen-space-md)] w-full"
          >
            {selected ? 'Current plan' : selectLabel}
          </Button>
        ) : null}
      </div>
    );
  }
);
