import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Icon, Badge, Button } from '../primitives';
import { formatMoney, type MoneyFormatter } from './internal/format';

/** Rate structure family — an ordered, non-color signal via glyph + label. */
export type RatePlanVariant = 'fixed' | 'variable' | 'time-of-use' | 'tiered' | 'green';

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

export interface RatePlanCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Plan name (e.g. "SimpleSave 12"). */
  name: string;
  /** Rate structure — drives the glyph + label (default `fixed`). */
  variant?: RatePlanVariant;
  /**
   * Price per metered unit in integer **cents** (e.g. 1299 → "$12.99"). Kept as
   * cents so the printed rate never drifts.
   */
  rateCents: number;
  /** Unit the rate is charged per (e.g. "kWh"). */
  unit: string;
  /** Contract term / cadence label (e.g. "12-month term"). */
  term?: string;
  /** Bullet list of plan features. */
  features?: string[];
  /** Marks the plan as the current/selected one (adds a badge + accent ring). */
  selected?: boolean;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
  /** Select button label (default "Choose plan"). Hidden when no `onSelect`. */
  selectLabel?: string;
  /** Fires when the plan is chosen. */
  onSelect?: () => void;
}

/**
 * A selectable rate-plan card: a per-unit price headline (integer cents via
 * `formatMoney`, so it never drifts), a rate-structure glyph + label, an optional
 * feature list, and a select action. The `selected` state is conveyed by **a
 * badge + label + an accent ring** (never color alone). The select `Button`
 * renders only when `onSelect` is supplied. Every color traces to a `--xen-*`
 * token — no literals. Web parity of the native `RatePlanCard`.
 */
export const RatePlanCard = React.forwardRef<HTMLDivElement, RatePlanCardProps>(function RatePlanCard(
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
    <Card
      ref={ref}
      variant={selected ? 'elevated' : 'outlined'}
      className={cn(selected && 'border-2 border-primary bg-primary/5', className)}
      {...rest}
    >
      <div className="flex items-center gap-[var(--xen-space-sm)]">
        <Icon glyph={vd.glyph} size="lg" aria-label={vd.label} />
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
    </Card>
  );
});
