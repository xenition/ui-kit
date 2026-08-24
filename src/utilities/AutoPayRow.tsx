import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Switch, Badge } from '../primitives';
import { formatMoney, type MoneyFormatter } from './internal/format';

export interface AutoPayRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Row heading (default "AutoPay"). */
  label?: string;
  /** Whether autopay is enabled. Controlled via `onToggle`. */
  enabled: boolean;
  /** Fires with the next enabled state when the switch is toggled. */
  onToggle?: (enabled: boolean) => void;
  /** Funding method label shown when enabled (e.g. "Visa ···4242"). */
  method?: string;
  /** Localized next-charge date shown when enabled (e.g. "Aug 15"). */
  nextChargeDate?: string;
  /** Capped charge amount in integer **cents** (shown when enabled). */
  amountCents?: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
  /** Disable the toggle (e.g. while a mutation is in flight). */
  disabled?: boolean;
}

/**
 * An AutoPay enrollment row: a leading glyph, a title with an on/off status
 * conveyed by **a badge + label** (never the switch color alone), the token-bound
 * `Switch`, and — when enabled — a funding method / next-charge summary. Any
 * amount is integer cents via `formatMoney`. The switch is fully controlled
 * (`enabled` + `onToggle`) and honors `disabled`. Every color traces to a
 * `--xen-*` token. Web parity of the native `AutoPayRow`.
 */
export const AutoPayRow = React.forwardRef<HTMLDivElement, AutoPayRowProps>(function AutoPayRow(
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
    if (amountCents != null) summary.push(`up to ${format(Math.max(0, Math.trunc(amountCents)), currency)}`);
  }

  return (
    <div
      ref={ref}
      className={cn('flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]', className)}
      {...rest}
    >
      <Icon glyph="🔄" size="lg" aria-label="AutoPay" />
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
});
