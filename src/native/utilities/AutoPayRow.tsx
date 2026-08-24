import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Icon, Switch, Badge } from '../primitives';
import { formatMoney, type MoneyFormatter } from './internal/format';

export interface AutoPayRowProps {
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
  style?: StyleProp<ViewStyle>;
}

/**
 * An AutoPay enrollment row: a leading glyph, a title with an on/off status
 * conveyed by **a badge + label** (never the switch color alone), the token-bound
 * `Switch`, and — when enabled — a funding method / next-charge summary. Any
 * amount is integer cents via `formatMoney`. The switch is fully controlled
 * (`enabled` + `onToggle`) and honors `disabled`. Every color traces to a token.
 */
export function AutoPayRow({
  label = 'AutoPay',
  enabled,
  onToggle,
  method,
  nextChargeDate,
  amountCents,
  currency = 'USD',
  formatMoney: format = formatMoney,
  disabled = false,
  style,
}: AutoPayRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const summary: string[] = [];
  if (enabled) {
    if (method != null) summary.push(method);
    if (nextChargeDate != null) summary.push(`Next ${nextChargeDate}`);
    if (amountCents != null) {
      summary.push(`up to ${format(Math.max(0, Math.trunc(amountCents)), currency)}`);
    }
  }

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
        },
        style,
      ]}
    >
      <Icon glyph="🔄" size="lg" accessibilityLabel="AutoPay" />
      <View style={{ flex: 1, gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
            {label}
          </Text>
          <Badge tone={enabled ? 'success' : 'neutral'} variant="soft" size="sm">
            {enabled ? '✓ On' : '○ Off'}
          </Badge>
        </View>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {enabled
            ? summary.length > 0
              ? summary.join(' · ')
              : 'Bills are paid automatically'
            : 'Turn on to pay automatically each cycle'}
        </Text>
      </View>
      <Switch
        checked={enabled}
        onCheckedChange={onToggle}
        disabled={disabled}
        accessibilityLabel={`${label}, ${enabled ? 'on' : 'off'}`}
      />
    </View>
  );
}
