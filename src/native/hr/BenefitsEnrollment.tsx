import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card, Button } from '../primitives';
import { StatusPill } from './StatusPill';
import {
  formatMoney,
  BENEFIT_STATUS_META,
  BENEFIT_TYPE_META,
  type BenefitStatus,
  type BenefitType,
} from './internal';

export type BenefitsEnrollmentVariant = 'default' | 'compact';

export interface BenefitsEnrollmentProps {
  /** Plan display name (e.g. "PPO Gold"). */
  planName: string;
  /** Kind of benefit — glyph + word chip. */
  type: BenefitType;
  /** Enrollment state — glyph + word pill. */
  status: BenefitStatus;
  /** Coverage tier / description (e.g. "Employee + Family"). */
  coverage?: string;
  /** Employee's per-period cost in integer **cents**. */
  costCents?: number;
  /** Cost period label (default "/mo"). */
  costPeriod?: string;
  /** ISO 4217 currency (default USD). */
  currency?: string;
  /** Open-enrollment deadline, pre-formatted. */
  enrollBy?: string;
  /** Show the enroll / change action (meaningful when `eligible`/`pending`). */
  actionable?: boolean;
  /** Density. */
  variant?: BenefitsEnrollmentVariant;
  onEnroll?: () => void;
  /** Tap handler for the whole card. */
  onPress?: () => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A benefits-plan enrollment card: plan name, benefit type, coverage tier, and
 * per-period cost (integer **cents** via `formatMoney`). Enrollment status is a
 * glyph + word pill (enrolled → success, eligible → primary, never color alone).
 * When `actionable` and not already enrolled, an enroll / change action renders.
 * `compact` drops coverage + deadline. All colors are theme tokens — no
 * literals.
 */
export function BenefitsEnrollment({
  planName,
  type,
  status,
  coverage,
  costCents,
  costPeriod = '/mo',
  currency = 'USD',
  enrollBy,
  actionable = false,
  variant = 'default',
  onEnroll,
  onPress,
  testID,
  style,
}: BenefitsEnrollmentProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const typeMeta = BENEFIT_TYPE_META[type];
  const showAction = actionable && (status === 'eligible' || status === 'pending');
  const enrolled = status === 'enrolled';

  const body = (
    <Card variant="outlined" padding={compact ? 'sm' : 'md'} style={[{ gap: tokens.spacing.sm }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        <View style={{ flex: 1, gap: 2 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <Text style={{ fontSize: tokens.typography.scale.base }}>{typeMeta.glyph}</Text>
            <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
              {planName}
            </Text>
          </View>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{typeMeta.label}</Text>
        </View>
        <StatusPill meta={BENEFIT_STATUS_META[status]} size="sm" />
      </View>

      {!compact && coverage ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{coverage}</Text>
      ) : null}

      <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        {costCents != null ? (
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs / 2 }}>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
              {formatMoney(costCents, currency)}
            </Text>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '400' }}>{costPeriod}</Text>
          </View>
        ) : (
          <View />
        )}
        {!compact && enrollBy && !enrolled ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Enroll by {enrollBy}</Text>
        ) : null}
      </View>

      {showAction ? (
        <Button size="sm" variant="soft" onPress={onEnroll}>
          {status === 'pending' ? 'Complete enrollment' : 'Enroll'}
        </Button>
      ) : null}
    </Card>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Benefit ${planName}, ${BENEFIT_STATUS_META[status].label}`}
        onPress={onPress}
        testID={testID}
      >
        {body}
      </Pressable>
    );
  }
  return <View testID={testID}>{body}</View>;
}
