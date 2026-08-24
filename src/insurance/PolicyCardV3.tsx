import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { formatMoney } from './internal/format';
import { policyVariant, type PolicyVariant } from './internal/status';
import { pressableProps } from './internal/pressable';
import type { PolicyCardProps, PolicyStatus } from './PolicyCard';

/** Same public contract as {@link PolicyCard} — a drop-in alternate design. */
export type PolicyCardV3Props = PolicyCardProps;

/** Decorative per-line category tint for the leading disc (not a status signal). */
const VARIANT_DISC: Record<PolicyVariant, string> = {
  auto: 'bg-primary/10',
  home: 'bg-accent/20',
  life: 'bg-success/10',
  health: 'bg-warn/10',
};

const STATUS_META: Record<PolicyStatus, { label: string; glyph: string; text: string }> = {
  active: { label: 'Active', glyph: '✓', text: 'text-success' },
  pending: { label: 'Pending', glyph: '⋯', text: 'text-warn' },
  lapsed: { label: 'Lapsed', glyph: '!', text: 'text-danger' },
  cancelled: { label: 'Cancelled', glyph: '✕', text: 'text-muted' },
};

/**
 * PolicyCard, redesigned (**V3**) — a **minimal single line**. A tinted category
 * disc (a decorative hue, reinforced by the glyph and the line label — never
 * color-alone) leads into the plan name and number; the coverage sits quietly on
 * the right, with the policy status shown as a small glyph + label. No card
 * chrome — separation comes from spacing. Becomes a keyboard-operable button
 * only when `onClick` is set. Same `PolicyCardProps`; drops in for dense policy
 * lists. Token-pure.
 */
export const PolicyCardV3 = React.forwardRef<HTMLDivElement, PolicyCardV3Props>(function PolicyCardV3(
  {
    variant,
    name,
    policyNumber,
    coverageCents,
    status = 'active',
    currency = 'USD',
    formatMoney: format = formatMoney,
    onClick,
    className,
    // Consume the base props unused by this dense layout so they are not
    // forwarded onto the DOM node.
    premiumCents: _premiumCents,
    cadence: _cadence,
    holder: _holder,
    renewalDate: _renewalDate,
    ...rest
  },
  ref
) {
  const vd = policyVariant(variant);
  const sm = STATUS_META[status] ?? STATUS_META.active;
  const interactive = pressableProps(onClick);
  const coverage = format(Math.max(0, Math.trunc(coverageCents || 0)), currency);

  return (
    <div
      ref={ref}
      aria-label={interactive ? `${name}, ${vd.label} policy, ${sm.label}` : undefined}
      className={cn(
        'flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
        interactive &&
          'cursor-pointer rounded-[var(--xen-radius-md)] transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none',
        className
      )}
      {...interactive}
      {...rest}
    >
      <span
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border',
          VARIANT_DISC[variant] ?? VARIANT_DISC.auto
        )}
      >
        <Icon glyph={vd.glyph} size="sm" aria-label={`${vd.label} policy`} />
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-base font-semibold text-on-surface">{name}</p>
        <div className="flex items-center gap-[var(--xen-space-xs)]">
          <span className="truncate text-xs text-muted">{policyNumber}</span>
          <span className={cn('shrink-0 text-xs font-semibold', sm.text)}>
            <span aria-hidden="true">{sm.glyph}</span> {sm.label}
          </span>
        </div>
      </div>

      <span aria-label={`Coverage ${coverage}`} className="shrink-0 text-sm font-bold text-on-surface">
        {coverage}
      </span>
    </div>
  );
});
