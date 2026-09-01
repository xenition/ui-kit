import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Switch, Badge } from '../primitives';
import { formatMoney } from './internal/format';
import type { AutoPayRowProps } from './AutoPayRow';

/** Drop-in for {@link AutoPayRowProps} — same props, a different design. */
export type AutoPayRowV4Props = AutoPayRowProps;

/**
 * AutoPayRow — **V4** design. An elevated card row: the AutoPay glyph in the
 * signature brand-gradient disc, a title with an on/off status conveyed by a
 * badge + label (never the switch color alone), the token-bound controlled
 * `Switch`, and — when enabled — a funding method / next-charge summary (amounts
 * integer cents via `formatMoney`). Honors `disabled`. Same props/behavior as
 * {@link AutoPayRowProps}; token-only colors.
 */
export const AutoPayRowV4 = React.forwardRef<HTMLDivElement, AutoPayRowV4Props>(
  function AutoPayRowV4(
    {
      label = 'AutoPay',
      enabled,
      onToggle,
      method,
      nextChargeDate,
      amountCents,
      currency = 'USD',
      formatMoney: format = formatMoney,
      disabled = false,
      className,
      ...rest
    },
    ref
  ) {
    const summary: string[] = [];
    if (enabled) {
      if (method != null) summary.push(method);
      if (nextChargeDate != null) summary.push(`Next ${nextChargeDate}`);
      if (amountCents != null) {
        summary.push(`up to ${format(Math.max(0, Math.trunc(amountCents)), currency)}`);
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-lg p-5',
          className
        )}
        {...rest}
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-gradient-to-br from-primary-400 to-primary-700">
          <Icon glyph="🔄" size="xl" color="onPrimary" aria-label="AutoPay" />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <div className="flex items-center gap-[var(--xen-space-sm)]">
            <span className="text-base font-semibold text-on-surface">{label}</span>
            <Badge tone={enabled ? 'success' : 'neutral'} variant="soft" size="sm">
              {enabled ? '✓ On' : '○ Off'}
            </Badge>
          </div>
          <span className="text-xs text-muted">
            {enabled
              ? summary.length > 0
                ? summary.join(' · ')
                : 'Bills are paid automatically'
              : 'Turn on to pay automatically each cycle'}
          </span>
        </div>
        <Switch
          checked={enabled}
          onCheckedChange={onToggle}
          disabled={disabled}
          aria-label={`${label}, ${enabled ? 'on' : 'off'}`}
        />
      </div>
    );
  }
);
