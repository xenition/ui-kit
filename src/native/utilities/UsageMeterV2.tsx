import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Card, Icon } from '../primitives';
import { ProgressRing } from '../charts';
import { formatUsage, formatPct, clamp } from './internal/format';
import { utilityKind } from './internal/status';
import type { UsageMeterProps } from './UsageMeter';

/** Same public contract as {@link UsageMeter} — a drop-in alternate design. */
export type UsageMeterV2Props = UsageMeterProps;

/**
 * UsageMeter, redesigned (v2): a **big gauge ring**. A large `ProgressRing`
 * centers the period's usage as a percent of allowance, escalating its arc color
 * by threshold (under `warnAt` → primary, over → accent, at/over cap → danger);
 * the utility line and the used / allowance figures stack centered beneath it,
 * with a redundant escalation caption so status is never color-alone. A zero /
 * absent allowance is guarded (no divide-by-zero) and shows the raw usage in the
 * ring instead. Distinct at a glance from v1's inline bar and v3's slim bar. Same
 * props, `formatUsage` quantities, token-pure.
 */
export function UsageMeterV2({
  kind,
  used,
  allowance = 0,
  unit,
  decimals = 0,
  period,
  warnAt = 0.8,
  loading = false,
  style,
}: UsageMeterV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const kd = utilityKind(kind);
  const u = unit ?? kd.unit;

  if (loading) {
    return (
      <Card style={style}>
        <View accessibilityLabel="Loading usage" style={{ alignItems: 'center', gap: tokens.spacing.md }}>
          <View style={{ width: 140, height: 140, borderRadius: tokens.radius.full, backgroundColor: colors.border }} />
          <View
            style={{
              height: tokens.typography.scale.base,
              width: '50%' as `${number}%`,
              borderRadius: tokens.radius.sm,
              backgroundColor: colors.border,
            }}
          />
        </View>
      </Card>
    );
  }

  const safeUsed = Number.isFinite(used) ? Math.max(0, used) : 0;
  const cap = Number.isFinite(allowance) ? Math.max(0, allowance) : 0;
  const hasCap = cap > 0;
  const ratio = hasCap ? clamp(safeUsed / cap, 0, 1.5) : 0;
  const pct = Math.round(ratio * 100);

  const ringColor: 'primary' | 'accent' | 'danger' = !hasCap
    ? 'primary'
    : ratio >= 1
      ? 'danger'
      : ratio >= warnAt
        ? 'accent'
        : 'primary';
  const toneColor = colors[ringColor];

  return (
    <Card style={style}>
      <View style={{ alignItems: 'center', gap: tokens.spacing.md }}>
        <ProgressRing
          value={hasCap ? Math.min(pct, 100) : 0}
          max={100}
          size={140}
          strokeWidth={14}
          color={ringColor}
          showPercent={false}
          label={hasCap ? formatPct(pct) : formatUsage(safeUsed, u, decimals)}
          accessibilityLabel={
            hasCap ? `${kd.label} usage, ${formatPct(pct)} of allowance` : `${kd.label} usage, ${formatUsage(safeUsed, u, decimals)}`
          }
        />
        <View style={{ alignItems: 'center', gap: 2 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <Icon glyph={kd.glyph} size="base" accessibilityLabel={`${kd.label} usage`} />
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
              {kd.label}
            </Text>
          </View>
          {period != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{period}</Text>
          ) : null}
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>
            {formatUsage(safeUsed, u, decimals)}
            {hasCap ? (
              <Text style={{ color: colors.muted }}> of {formatUsage(cap, u, decimals)}</Text>
            ) : null}
          </Text>
          {hasCap ? (
            <Text style={{ color: toneColor, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
              {ratio >= 1 ? `Over allowance · ${formatPct(pct)}` : `${formatPct(pct)} of allowance`}
            </Text>
          ) : (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>No allowance set</Text>
          )}
        </View>
      </View>
    </Card>
  );
}
