import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Icon, Switch, Badge } from '../primitives';
import { formatMoney } from './internal/format';
import { GradientSurface } from './internal/GradientSurface';
import { brandDisc, brandInk } from './internal/brand';
import type { AutoPayRowProps } from './AutoPayRow';

/** Drop-in for {@link AutoPayRowProps} — same props, a different design. */
export type AutoPayRowV4Props = AutoPayRowProps;

/**
 * AutoPayRow — **V4** design. An elevated row: the AutoPay glyph in the
 * signature brand-gradient disc, a title with an on/off status conveyed by a
 * badge + label (never the switch color alone), the token-bound controlled
 * `Switch`, and — when enabled — a funding method / next-charge summary (amounts
 * integer cents via `formatMoney`). Honors `disabled`. Same props as
 * {@link AutoPayRowProps}; token-only colors.
 */
export function AutoPayRowV4({
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
}: AutoPayRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;

  const summary: string[] = [];
  if (enabled) {
    if (method != null) summary.push(method);
    if (nextChargeDate != null) summary.push(`Next ${nextChargeDate}`);
    if (amountCents != null) {
      summary.push(`up to ${format(Math.max(0, Math.trunc(amountCents)), currency)}`);
    }
  }

  const card = {
    backgroundColor: colors.card,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  } as const;

  return (
    <View
      style={[
        card,
        { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md },
        style,
      ]}
    >
      <GradientSurface
        colors={brandDisc(r)}
        style={{ width: 48, height: 48, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
      >
        <Icon glyph="🔄" size="xl" accessibilityLabel="AutoPay" style={{ color: brandInk(r) }} />
      </GradientSurface>
      <View style={{ flex: 1, gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
            {label}
          </Text>
          <Badge tone={enabled ? 'success' : 'neutral'} variant="soft" size="sm">
            {enabled ? '✓ On' : '○ Off'}
          </Badge>
        </View>
        <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>
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
