import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Card, Icon, Badge, type BadgeTone } from '../primitives';
import { shadow } from '../primitives/internal/elevation';
import { useEnter, usePressScale } from '../primitives/internal/motion';
import { formatMoney, withAlpha } from './internal/format';
import { policyVariant } from './internal/status';
import type { PolicyCardProps, PolicyStatus, PremiumCadence } from './PolicyCard';

/** Drop-in replacement for {@link PolicyCard} — identical props, distinct design. */
export type PolicyCardV2Props = PolicyCardProps;

const POLICY_STATUS: Record<PolicyStatus, { label: string; glyph: string; tone: BadgeTone }> = {
  active: { label: 'Active', glyph: '✓', tone: 'success' },
  pending: { label: 'Pending', glyph: '⋯', tone: 'warn' },
  lapsed: { label: 'Lapsed', glyph: '!', tone: 'danger' },
  cancelled: { label: 'Cancelled', glyph: '✕', tone: 'neutral' },
};

const CADENCE_SUFFIX: Record<PremiumCadence, string> = {
  monthly: '/mo',
  quarterly: '/qtr',
  annual: '/yr',
};

/**
 * PolicyCard, alternate design **V2** — an elevated hero card. A large tinted
 * glyph tile anchors the top row beside the plan name and a status pill; a
 * full-width tinted "coverage band" makes the benefit amount the visual anchor,
 * with the premium and renewal as a quiet footer. Same `PolicyCardProps`, same
 * data contract (integer cents via `formatMoney`, status by glyph + text +
 * color), so it drops in wherever `PolicyCard` is used. Token-pure.
 */
export function PolicyCardV2({
  variant,
  name,
  policyNumber,
  coverageCents,
  premiumCents,
  cadence = 'monthly',
  status = 'active',
  holder,
  renewalDate,
  currency = 'USD',
  formatMoney: format = formatMoney,
  onPress,
  style,
}: PolicyCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const vd = policyVariant(variant);
  const sd = POLICY_STATUS[status] ?? POLICY_STATUS.active;
  const enter = useEnter({ translateY: 8 });
  const press = usePressScale();

  const coverage = format(Math.max(0, Math.trunc(coverageCents || 0)), currency);

  const body = (
    <Card variant="elevated" padding="none" radius="lg" style={[{ overflow: 'hidden' }, style]}>
      <View style={{ padding: tokens.spacing.lg, gap: tokens.spacing.md }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: tokens.radius.lg,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: withAlpha(colors.primary, 0.12),
              ...shadow('sm', tokens),
            }}
          >
            <Icon glyph={vd.glyph} size="3xl" accessibilityLabel={`${vd.label} policy`} />
          </View>
          <View style={{ flex: 1, gap: 2 }}>
            <Text
              numberOfLines={1}
              style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800' }}
            >
              {name}
            </Text>
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              {vd.label} · {policyNumber}
            </Text>
            {holder != null ? (
              <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                Insured: {holder}
              </Text>
            ) : null}
          </View>
          <Badge tone={sd.tone} variant="soft">
            {`${sd.glyph} ${sd.label}`}
          </Badge>
        </View>

        <View
          style={{
            borderRadius: tokens.radius.md,
            backgroundColor: withAlpha(colors.primary, 0.08),
            paddingVertical: tokens.spacing.md,
            paddingHorizontal: tokens.spacing.md,
            gap: 2,
          }}
        >
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
            Total coverage
          </Text>
          <Text
            accessibilityLabel={`Coverage ${coverage}`}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}
          >
            {coverage}
          </Text>
        </View>

        {premiumCents != null || renewalDate != null ? (
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: tokens.spacing.md }}
          >
            {premiumCents != null ? (
              <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
                <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
                  {format(Math.max(0, Math.trunc(premiumCents)), currency)}
                </Text>
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                  {CADENCE_SUFFIX[cadence]}
                </Text>
              </View>
            ) : (
              <View />
            )}
            {renewalDate != null ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Renews {renewalDate}</Text>
            ) : null}
          </View>
        ) : null}
      </View>
    </Card>
  );

  if (!onPress) {
    return <Animated.View style={{ opacity: enter.opacity, transform: enter.transform }}>{body}</Animated.View>;
  }
  return (
    <Animated.View
      style={{ opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${name}, ${vd.label} policy, ${sd.label}`}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        {body}
      </Pressable>
    </Animated.View>
  );
}
