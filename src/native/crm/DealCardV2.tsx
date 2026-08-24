import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import { usePressScale, useEnter } from '../primitives/internal/motion';
import { formatMoney } from '../commerce/money';
import { clampPct } from './internal';
import type { DealCardProps } from './DealCard';

/** V2 accepts the exact same props as {@link DealCard} — a drop-in replacement. */
export type DealCardV2Props = DealCardProps;

/**
 * DealCard **design V2** — an *elevated* deal card led by a big money figure,
 * with a full-width stage progress bar and an owner avatar footer. Where the
 * original DealCard is a flat outlined summary, V2 floats on a shadow, promotes
 * the value to a hero number, and turns win-probability into the card's primary
 * visual. Same props, same integer-cents money, same glyph+word outcome so it
 * never leans on color. Token-pure; won reads `successText`, lost `dangerText`.
 */
export function DealCardV2({
  name,
  company,
  valueCents,
  currency = 'USD',
  stage,
  probability,
  owner,
  closeDate,
  outcome = 'open',
  variant = 'default',
  loading = false,
  onPress,
  testID,
  style,
}: DealCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const enter = useEnter({ translateY: 8 });
  const compact = variant === 'compact';
  const pct = clampPct(probability);
  const showMeter = probability != null;

  const outcomeGlyph = outcome === 'won' ? '✓' : outcome === 'lost' ? '✕' : outcome === 'pending' ? '⋯' : '◔';
  const outcomeLabel = outcome === 'won' ? 'Won' : outcome === 'lost' ? 'Lost' : outcome === 'pending' ? 'Pending' : 'Open';
  const valueColor = outcome === 'won' ? colors.successText : outcome === 'lost' ? colors.dangerText : colors.onSurface;
  const meterColor = outcome === 'won' ? colors.success : outcome === 'lost' ? colors.danger : colors.primary;

  const surface: React.ReactElement = (
    <Animated.View
      style={[
        {
          borderRadius: tokens.radius.lg,
          backgroundColor: colors.surface,
          padding: compact ? tokens.spacing.md : tokens.spacing.lg,
          gap: tokens.spacing.md,
          transform: [{ scale: press.scale }],
          opacity: enter.opacity,
        },
        shadow('md', tokens),
        style,
      ]}
    >
      {loading ? (
        <View accessibilityLabel="Loading deal" style={{ gap: tokens.spacing.sm }}>
          <View style={{ height: tokens.typography.scale.sm, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
          <View style={{ height: tokens.typography.scale['2xl'] ?? tokens.typography.scale.xl, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
          <View style={{ height: 8, width: '100%', borderRadius: tokens.radius.full, backgroundColor: colors.border }} />
        </View>
      ) : (
        <>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
            <View style={{ flex: 1, gap: 2 }}>
              <Text numberOfLines={2} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
                {name}
              </Text>
              {company ? (
                <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
                  {company}
                </Text>
              ) : null}
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.xs / 2,
                paddingHorizontal: tokens.spacing.sm,
                paddingVertical: 2,
                borderRadius: tokens.radius.full,
                backgroundColor: withAlpha(meterColor, 0.12),
              }}
            >
              <Text allowFontScaling={false} style={{ color: valueColor, fontSize: tokens.typography.scale.xs }}>{outcomeGlyph}</Text>
              <Text style={{ color: valueColor, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>{outcomeLabel}</Text>
            </View>
          </View>

          <Text style={{ color: valueColor, fontSize: tokens.typography.scale['2xl'] ?? tokens.typography.scale.xl, fontWeight: '800' }}>
            {formatMoney(valueCents, currency)}
          </Text>

          {showMeter ? (
            <View style={{ gap: tokens.spacing.xs / 2 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                  {stage ?? 'Progress'}
                </Text>
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>{pct}%</Text>
              </View>
              <View
                accessibilityRole="progressbar"
                accessibilityValue={{ min: 0, max: 100, now: pct }}
                style={{ height: 8, borderRadius: tokens.radius.full, backgroundColor: colors.border, overflow: 'hidden' }}
              >
                <View style={{ width: `${pct}%`, height: '100%', borderRadius: tokens.radius.full, backgroundColor: meterColor }} />
              </View>
            </View>
          ) : stage ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
              {stage}
            </Text>
          ) : null}

          {owner || closeDate ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
              {owner ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
                  <Avatar size="sm" name={owner.name} src={owner.avatarUrl} />
                  {owner.name ? (
                    <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                      {owner.name}
                    </Text>
                  ) : null}
                </View>
              ) : (
                <View />
              )}
              {closeDate ? (
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{closeDate}</Text>
              ) : null}
            </View>
          ) : null}
        </>
      )}
    </Animated.View>
  );

  if (onPress && !loading) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Deal ${name}${company ? `, ${company}` : ''}`}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        testID={testID}
      >
        {surface}
      </Pressable>
    );
  }
  return <View testID={testID}>{surface}</View>;
}
