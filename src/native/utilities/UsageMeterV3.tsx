import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Icon, Progress, type ProgressTone } from '../primitives';
import { formatUsage, formatPct, clamp } from './internal/format';
import { utilityKind } from './internal/status';
import type { UsageMeterProps } from './UsageMeter';

/** Same public contract as {@link UsageMeter} — a drop-in alternate design. */
export type UsageMeterV3Props = UsageMeterProps;

/**
 * UsageMeter, redesigned (v3): a **slim inline bar**. A one-line header pairs the
 * utility glyph + label on the left with a right-aligned percent, then a single
 * thin `Progress` track carries the fill; a tiny used / allowance caption sits
 * under it. No card, no ring — the most compact of the three, for stacking many
 * meters in a list. The fill tone escalates by threshold and is echoed in the
 * percent text so status is never color-alone; a zero / absent allowance is
 * guarded. Same props, `formatUsage` quantities, token-pure.
 */
export function UsageMeterV3({
  kind,
  used,
  allowance = 0,
  unit,
  decimals = 0,
  period,
  warnAt = 0.8,
  loading = false,
  style,
}: UsageMeterV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const kd = utilityKind(kind);
  const u = unit ?? kd.unit;

  if (loading) {
    return (
      <View accessibilityLabel="Loading usage" style={[{ gap: tokens.spacing.xs }, style]}>
        <View
          style={{
            height: tokens.typography.scale.sm,
            width: '40%' as `${number}%`,
            borderRadius: tokens.radius.sm,
            backgroundColor: colors.border,
          }}
        />
        <View style={{ height: 6, borderRadius: tokens.radius.full, backgroundColor: colors.border }} />
      </View>
    );
  }

  const safeUsed = Number.isFinite(used) ? Math.max(0, used) : 0;
  const cap = Number.isFinite(allowance) ? Math.max(0, allowance) : 0;
  const hasCap = cap > 0;
  const ratio = hasCap ? clamp(safeUsed / cap, 0, 1.5) : 0;
  const pct = Math.round(ratio * 100);

  const tone: ProgressTone = !hasCap ? 'primary' : ratio >= 1 ? 'danger' : ratio >= warnAt ? 'warn' : 'primary';
  const toneColor = tone === 'warn' ? colors.accent : colors[tone];

  return (
    <View style={[{ gap: tokens.spacing.xs }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        <Icon glyph={kd.glyph} size="sm" accessibilityLabel={`${kd.label} usage`} />
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {kd.label}
        </Text>
        {period != null ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>· {period}</Text>
        ) : null}
        <View style={{ flex: 1 }} />
        {hasCap ? (
          <Text style={{ color: toneColor, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {formatPct(pct)}
          </Text>
        ) : null}
      </View>
      {hasCap ? <Progress value={Math.min(pct, 100)} max={100} tone={tone} /> : null}
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
        {hasCap
          ? `${formatUsage(safeUsed, u, decimals)} of ${formatUsage(cap, u, decimals)}`
          : formatUsage(safeUsed, u, decimals)}
      </Text>
    </View>
  );
}
