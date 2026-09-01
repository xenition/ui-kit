import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { GradientSurface } from './internal/GradientSurface';
import { journeyBorder, journeyDisc, journeyGradient, journeyInk, journeyInkSoft, journeyTile } from './internal/journey';

export interface LoyaltyCardProps {
  /** Loyalty program name (e.g. "SkyMiles"). */
  program: string;
  /** Member's display name. */
  memberName: string;
  /** Membership tier label (e.g. "Gold"). */
  tier: string;
  /** Current miles / points balance (formatted with `toLocaleString()`). */
  points: number;
  /** Optional membership / account id shown in the card footer. */
  memberId?: string;
  /**
   * Points required to reach the next tier. When set (and above `points`), a
   * token-driven progress bar toward the next tier is shown.
   */
  nextTierPoints?: number;
  /** Word for the balance unit (default "points"). */
  unitLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * LoyaltyCard — a **V4** "journey" loyalty card. A miles / points membership card
 * on the brand gradient: the program name and a frosted tier chip up top, the
 * balance (formatted via `toLocaleString()`) in near-white ink, an optional
 * token-driven progress bar toward the next tier, and the member name / id as a
 * frosted footer row. Token-only colors via `useXenitionTheme()` and the
 * `journey*` helpers; dark-mode safe.
 */
export function LoyaltyCard({
  program,
  memberName,
  tier,
  points,
  memberId,
  nextTierPoints,
  unitLabel = 'points',
  style,
}: LoyaltyCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = journeyInk(r);
  const inkSoft = journeyInkSoft(r);
  const balance = Math.max(0, Math.trunc(points || 0));
  const hasNext = typeof nextTierPoints === 'number' && nextTierPoints > balance;
  const remaining = hasNext ? nextTierPoints! - balance : 0;
  const pct = hasNext ? Math.min(100, Math.max(0, Math.round((balance / nextTierPoints!) * 100))) : 0;

  return (
    <View
      accessible
      accessibilityLabel={`${program} loyalty card, ${tier}, ${balance.toLocaleString()} ${unitLabel}`}
      style={[{ borderRadius: tokens.radius.lg }, style]}
    >
      <GradientSurface
        colors={journeyGradient(r)}
        style={{ borderRadius: tokens.radius.lg, overflow: 'hidden', padding: tokens.spacing.lg, gap: tokens.spacing.lg }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.md }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
            <GradientSurface
              colors={journeyDisc(r)}
              style={{ width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
            >
              <Text style={{ color: ink, fontSize: tokens.typography.scale.sm }}>✦</Text>
            </GradientSurface>
            <Text numberOfLines={1} style={{ flex: 1, color: ink, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>
              {program}
            </Text>
          </View>
          <View
            style={{
              borderRadius: tokens.radius.full,
              borderWidth: 1,
              borderColor: journeyBorder(r),
              backgroundColor: journeyTile(r),
              paddingHorizontal: tokens.spacing.md,
              paddingVertical: tokens.spacing.xs,
            }}
          >
            <Text style={{ color: ink, fontSize: tokens.typography.scale.xs, fontWeight: '700', letterSpacing: 1 }}>
              {tier.toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={{ gap: 2 }}>
          <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>Balance</Text>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: tokens.spacing.xs }}>
            <Text allowFontScaling={false} style={{ color: ink, fontSize: tokens.typography.scale['3xl'], fontWeight: '800', letterSpacing: -0.5 }}>
              {balance.toLocaleString()}
            </Text>
            <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.base, fontWeight: '600', marginBottom: 3 }}>
              {unitLabel}
            </Text>
          </View>
        </View>

        {hasNext ? (
          <View style={{ gap: tokens.spacing.xs }}>
            <View
              accessibilityRole="progressbar"
              accessibilityValue={{ min: 0, max: 100, now: pct }}
              accessibilityLabel={`${remaining.toLocaleString()} ${unitLabel} to next tier`}
              style={{ height: 8, borderRadius: 4, backgroundColor: journeyTile(r, 0.2), overflow: 'hidden' }}
            >
              <View style={{ width: `${pct}%`, height: '100%', borderRadius: 4, backgroundColor: ink }} />
            </View>
            <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.xs }}>
              {remaining.toLocaleString()} {unitLabel} to next tier
            </Text>
          </View>
        ) : null}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: tokens.spacing.md,
            borderRadius: tokens.radius.md,
            borderWidth: 1,
            borderColor: journeyBorder(r),
            backgroundColor: journeyTile(r),
            paddingHorizontal: tokens.spacing.md,
            paddingVertical: tokens.spacing.sm,
          }}
        >
          <View style={{ flex: 1, gap: 2 }}>
            <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.xs }}>Member</Text>
            <Text numberOfLines={1} style={{ color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
              {memberName}
            </Text>
          </View>
          {memberId ? (
            <View style={{ alignItems: 'flex-end', gap: 2 }}>
              <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.xs }}>Member ID</Text>
              <Text style={{ color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700', letterSpacing: 1 }}>
                {memberId}
              </Text>
            </View>
          ) : null}
        </View>
      </GradientSurface>
    </View>
  );
}
