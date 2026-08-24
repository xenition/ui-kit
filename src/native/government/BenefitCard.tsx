import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Card, Icon, Badge, type BadgeTone } from '../primitives';
import { formatMoney, withAlpha, type MoneyFormatter } from './internal/format';

/** Type of public benefit / assistance program. */
export type BenefitType =
  | 'food'
  | 'unemployment'
  | 'housing'
  | 'medical'
  | 'disability'
  | 'family'
  | 'other';

const BENEFIT_TYPE: Record<BenefitType, { label: string; glyph: string }> = {
  food: { label: 'Food assistance', glyph: '🥫' },
  unemployment: { label: 'Unemployment', glyph: '💼' },
  housing: { label: 'Housing', glyph: '🏘️' },
  medical: { label: 'Medical', glyph: '⚕️' },
  disability: { label: 'Disability', glyph: '♿' },
  family: { label: 'Family support', glyph: '👪' },
  other: { label: 'Benefit', glyph: '🤝' },
};

/** Enrolment status of a benefit case. */
export type BenefitStatus = 'active' | 'pending' | 'expiring' | 'expired' | 'denied' | 'suspended';

const STATUS: Record<BenefitStatus, { label: string; glyph: string; tone: BadgeTone }> = {
  active: { label: 'Active', glyph: '✓', tone: 'success' },
  pending: { label: 'Pending', glyph: '⋯', tone: 'warn' },
  expiring: { label: 'Expiring soon', glyph: '⚠️', tone: 'warn' },
  expired: { label: 'Expired', glyph: '✕', tone: 'neutral' },
  denied: { label: 'Denied', glyph: '✕', tone: 'danger' },
  suspended: { label: 'Suspended', glyph: '!', tone: 'danger' },
};

export interface BenefitCardProps {
  /** Program title (e.g. "SNAP", "Section 8 Housing"). */
  name: string;
  /** Benefit type — drives the leading glyph + default sub-label. */
  benefitType: BenefitType;
  /** Enrolment status (default `active`) — text + glyph + color, never alone. */
  status?: BenefitStatus;
  /** Recurring benefit amount in integer **cents** (e.g. monthly). */
  amountCents?: number;
  /** Cadence suffix for the amount (default `/mo`). */
  cadence?: string;
  /** Case / reference number. */
  caseNumber?: string;
  /** Localized date of the next payment / renewal. */
  nextDate?: string;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
  /** Fires on card press (open case detail); button only when supplied. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A public-benefit / assistance case card: a tinted program glyph, an enrolment
 * status pill conveyed by **text + glyph + color** (never color alone), an
 * optional recurring amount as integer cents through `formatMoney`, and case /
 * next-payment metadata. Becomes a button only when `onPress` is supplied.
 * Every color traces to a `SemanticColors` slot or a token-derived tint — no
 * literals.
 */
export function BenefitCard({
  name,
  benefitType,
  status = 'active',
  amountCents,
  cadence = '/mo',
  caseNumber,
  nextDate,
  currency = 'USD',
  formatMoney: format = formatMoney,
  onPress,
  style,
}: BenefitCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const bt = BENEFIT_TYPE[benefitType] ?? BENEFIT_TYPE.other;
  const sd = STATUS[status] ?? STATUS.active;

  const body = (
    <Card variant={onPress ? 'interactive' : 'elevated'} style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: withAlpha(colors.primary, 0.12),
          }}
        >
          <Icon glyph={bt.glyph} size="xl" accessibilityLabel={bt.label} />
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text
            numberOfLines={1}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}
          >
            {name}
          </Text>
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {bt.label}
            {caseNumber != null ? ` · ${caseNumber}` : ''}
          </Text>
        </View>
        <Badge tone={sd.tone} variant="soft" size="sm">
          {`${sd.glyph} ${sd.label}`}
        </Badge>
      </View>

      {amountCents != null || nextDate != null ? (
        <View
          style={{
            marginTop: tokens.spacing.md,
            paddingTop: tokens.spacing.md,
            borderTopWidth: 1,
            borderTopColor: colors.border,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          {amountCents != null ? (
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
              <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.xl, fontWeight: '700' }}>
                {format(Math.max(0, Math.trunc(amountCents)), currency)}
              </Text>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{cadence}</Text>
            </View>
          ) : (
            <View />
          )}
          {nextDate != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Next: {nextDate}</Text>
          ) : null}
        </View>
      ) : null}
    </Card>
  );

  if (!onPress) return body;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${name}, ${bt.label}, ${sd.label}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      {body}
    </Pressable>
  );
}
