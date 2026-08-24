import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../primitives';
import { Icon, Button } from '../primitives';
import { formatMoney, type MoneyFormatter, withAlpha } from './internal/format';

/** Urgency of the renewal — an ordered, non-color signal. */
export type RenewalUrgency = 'upcoming' | 'due' | 'overdue';

interface UrgencyDescriptor {
  glyph: string;
  color: keyof SemanticColors;
  heading: string;
}

const URGENCY: Record<RenewalUrgency, UrgencyDescriptor> = {
  upcoming: { glyph: '🗓️', color: 'primary', heading: 'Renewal coming up' },
  due: { glyph: '⏰', color: 'warn', heading: 'Renewal due' },
  overdue: { glyph: '⚠️', color: 'danger', heading: 'Renewal overdue' },
};

export interface RenewalBannerProps {
  /** Localized renewal date string (already formatted by the caller). */
  renewalDate: string;
  /** Urgency level — drives glyph + tint + heading (default `due`). */
  urgency?: RenewalUrgency;
  /** Renewal premium in integer **cents** (shown when provided). */
  premiumCents?: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
  /** Renew button label (default "Renew now"). Hidden when no `onRenew`. */
  renewLabel?: string;
  /** Show a spinner and block the renew button. */
  loading?: boolean;
  /** Fires when the renew action is pressed. */
  onRenew?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A call-to-action banner prompting a policy renewal. Urgency is conveyed by
 * **glyph + heading + a tint that traces to a `SemanticColors` slot**
 * (upcoming → primary, overdue → danger) — never color alone. The optional
 * renewal premium is integer cents via `formatMoney`. The renew `Button` is
 * only rendered when `onRenew` is supplied. Token-bound throughout.
 */
export function RenewalBanner({
  renewalDate,
  urgency = 'due',
  premiumCents,
  currency = 'USD',
  formatMoney: format = formatMoney,
  renewLabel = 'Renew now',
  loading = false,
  onRenew,
  style,
}: RenewalBannerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const ud = URGENCY[urgency] ?? URGENCY.due;
  const tint = colors[ud.color];

  return (
    <View
      accessibilityLabel={`${ud.heading}, ${renewalDate}`}
      style={[
        {
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: tint,
          backgroundColor: withAlpha(tint, 0.1),
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.md }}>
        <Icon glyph={ud.glyph} size="xl" accessibilityLabel={ud.heading} />
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {ud.heading}
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            Your policy renews on {renewalDate}
            {premiumCents != null
              ? ` · ${format(Math.max(0, Math.trunc(premiumCents)), currency)}`
              : ''}
          </Text>
        </View>
      </View>
      {onRenew != null ? (
        <Button
          variant="primary"
          tone={urgency === 'overdue' ? 'danger' : 'default'}
          onPress={onRenew}
          loading={loading}
        >
          {renewLabel}
        </Button>
      ) : null}
    </View>
  );
}
