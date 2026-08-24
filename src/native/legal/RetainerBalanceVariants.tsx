import * as React from 'react';
import { Animated, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card, Button } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { useEnter } from '../primitives/internal/motion';
import { StatusPill } from './StatusPill';
import { RETAINER_STATUS_META, clampPct, formatMoney, toneColor, type RetainerStatus } from './internal';
import type { RetainerBalanceProps } from './RetainerBalance';

/** Alternate design — identical Props to {@link RetainerBalance}, drop-in swap. */
export type RetainerBalanceV2Props = RetainerBalanceProps;
/** Alternate design — identical Props to {@link RetainerBalance}, drop-in swap. */
export type RetainerBalanceV3Props = RetainerBalanceProps;

function deriveStatus(balanceCents: number, low: number): RetainerStatus {
  if (balanceCents <= 0) return 'depleted';
  if (balanceCents <= low) return 'low';
  return 'healthy';
}

/**
 * RetainerBalance, design v2 — an **elevated card** with a bold balance readout,
 * a health pill, a thick tinted **fill meter** with a percentage caption, and a
 * "Replenish" call to action when funds run low. Same Props as
 * {@link RetainerBalance}; a richer dashboard tile vs. the flat original.
 * Token-pure; status is a glyph + word, never color alone.
 */
export function RetainerBalanceV2({
  balanceCents,
  initialCents,
  lowThresholdCents = 0,
  currency = 'USD',
  status,
  label,
  loading = false,
  variant = 'default',
  onReplenish,
  testID,
  style,
}: RetainerBalanceV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter({ translateY: 8 });
  const compact = variant === 'compact';
  const resolved = status ?? deriveStatus(balanceCents, lowThresholdCents);
  const statusMeta = RETAINER_STATUS_META[resolved];
  const fillColor = toneColor(colors, statusMeta.tone);

  const pct =
    initialCents && initialCents > 0
      ? clampPct(Math.round((Math.max(0, balanceCents) / initialCents) * 100))
      : undefined;
  const showReplenish = onReplenish && (resolved === 'low' || resolved === 'depleted');

  const body = (
    <Card variant="elevated" padding={compact ? 'sm' : 'md'} radius="lg" style={[{ gap: tokens.spacing.sm }, style]} testID={testID}>
      {loading ? (
        <View accessibilityLabel="Loading retainer" style={{ gap: tokens.spacing.xs }}>
          <View style={{ height: tokens.typography.scale.xs, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
          <View style={{ height: tokens.typography.scale['2xl'], width: '60%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
          <View style={{ height: 12, width: '100%', borderRadius: tokens.radius.full, backgroundColor: colors.border }} />
        </View>
      ) : (
        <>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
            <View style={{ flex: 1, gap: 2 }}>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                {label ?? 'Retainer balance'}
              </Text>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '700' }}>
                {formatMoney(balanceCents, currency)}
              </Text>
            </View>
            <StatusPill meta={statusMeta} variant="soft" size="sm" />
          </View>

          {pct != null ? (
            <View style={{ gap: tokens.spacing.xs }}>
              <View
                accessibilityRole="progressbar"
                accessibilityValue={{ min: 0, max: 100, now: pct }}
                accessibilityLabel={`${statusMeta.label}, ${pct}% remaining`}
                style={{ height: 12, borderRadius: tokens.radius.full, backgroundColor: withAlpha(fillColor, 0.14), overflow: 'hidden' }}
              >
                <View style={{ width: `${pct}%`, height: '100%', borderRadius: tokens.radius.full, backgroundColor: fillColor }} />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>{pct}% remaining</Text>
                {initialCents ? (
                  <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                    of {formatMoney(initialCents, currency)}
                  </Text>
                ) : null}
              </View>
            </View>
          ) : null}

          {showReplenish ? (
            <Button size="sm" variant="primary" onPress={onReplenish} style={{ alignSelf: 'flex-start' }}>
              Replenish
            </Button>
          ) : null}
        </>
      )}
    </Card>
  );

  return <Animated.View style={{ opacity: enter.opacity, transform: enter.transform }}>{body}</Animated.View>;
}

/**
 * RetainerBalance, design v3 — a **minimal balance row**: label + balance on the
 * left, health pill on the right, above a thin token fill meter. Same Props as
 * {@link RetainerBalance}; no card chrome, for dense summaries. Token-pure;
 * status stays a glyph + word, never color alone.
 */
export function RetainerBalanceV3({
  balanceCents,
  initialCents,
  lowThresholdCents = 0,
  currency = 'USD',
  status,
  label,
  loading = false,
  onReplenish,
  testID,
  style,
}: RetainerBalanceV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter({ translateY: 4 });
  const resolved = status ?? deriveStatus(balanceCents, lowThresholdCents);
  const statusMeta = RETAINER_STATUS_META[resolved];
  const fillColor = toneColor(colors, statusMeta.tone);

  const pct =
    initialCents && initialCents > 0
      ? clampPct(Math.round((Math.max(0, balanceCents) / initialCents) * 100))
      : undefined;
  const showReplenish = onReplenish && (resolved === 'low' || resolved === 'depleted');

  return (
    <Animated.View
      style={[
        {
          opacity: enter.opacity,
          transform: enter.transform,
          gap: tokens.spacing.xs,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.xs,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        style,
      ]}
      testID={testID}
    >
      {loading ? (
        <View accessibilityLabel="Loading retainer" style={{ height: tokens.typography.scale.lg, borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
      ) : (
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
            <Text numberOfLines={1} style={{ flex: 1, color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
              {label ?? 'Retainer'}
            </Text>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
              {formatMoney(balanceCents, currency)}
            </Text>
            <StatusPill meta={statusMeta} variant="inline" size="sm" />
          </View>
          {pct != null ? (
            <View
              accessibilityRole="progressbar"
              accessibilityValue={{ min: 0, max: 100, now: pct }}
              accessibilityLabel={`${statusMeta.label}, ${pct}% remaining`}
              style={{ height: 4, borderRadius: tokens.radius.full, backgroundColor: colors.border, overflow: 'hidden' }}
            >
              <View style={{ width: `${pct}%`, height: '100%', borderRadius: tokens.radius.full, backgroundColor: fillColor }} />
            </View>
          ) : null}
          {showReplenish ? (
            <Button size="sm" variant="link" onPress={onReplenish} style={{ alignSelf: 'flex-start' }}>
              Replenish
            </Button>
          ) : null}
        </>
      )}
    </Animated.View>
  );
}
