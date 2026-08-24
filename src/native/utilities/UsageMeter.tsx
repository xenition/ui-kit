import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Card, Icon, Progress, type ProgressTone } from '../primitives';
import { formatUsage, formatPct, clamp } from './internal/format';
import { utilityKind, type UtilityKind } from './internal/status';

export type { UtilityKind };

export interface UsageMeterProps {
  /** Utility line — drives the leading glyph, label, and default unit. */
  kind: UtilityKind;
  /** Consumption so far this period, in `unit`s. */
  used: number;
  /** Allowance / plan cap for the period, in `unit`s (0 → no cap shown). */
  allowance?: number;
  /** Metered unit override (defaults to the utility's canonical unit). */
  unit?: string;
  /** Decimal places for the printed quantities (default `0`). */
  decimals?: number;
  /** Localized period label (e.g. "This month"). */
  period?: string;
  /** Warn threshold as a fraction of allowance (default `0.8`). */
  warnAt?: number;
  /** Loading skeleton flag — renders a placeholder instead of data. */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A consumption gauge for one utility: current usage against an optional
 * allowance, drawn with the token-bound `Progress` bar. The fill tone escalates
 * by threshold (under `warnAt` → primary, over → warn, at/over cap → danger) and
 * the same escalation is echoed in a text percentage, so status is never
 * color-alone. Quantities run through `formatUsage` (fixed decimals, no `NaN`
 * leak) and a zero/absent allowance is guarded to avoid divide-by-zero. Every
 * color traces to a token.
 */
export function UsageMeter({
  kind,
  used,
  allowance = 0,
  unit,
  decimals = 0,
  period,
  warnAt = 0.8,
  loading = false,
  style,
}: UsageMeterProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const kd = utilityKind(kind);
  const u = unit ?? kd.unit;

  if (loading) {
    return (
      <Card style={style}>
        <View accessibilityLabel="Loading usage" style={{ gap: tokens.spacing.sm }}>
          <View
            style={{
              height: tokens.typography.scale.base,
              width: '60%',
              borderRadius: tokens.radius.sm,
              backgroundColor: colors.border,
            }}
          />
          <View style={{ height: 10, borderRadius: tokens.radius.full, backgroundColor: colors.border }} />
        </View>
      </Card>
    );
  }

  const safeUsed = Number.isFinite(used) ? Math.max(0, used) : 0;
  const cap = Number.isFinite(allowance) ? Math.max(0, allowance) : 0;
  const hasCap = cap > 0;
  const ratio = hasCap ? clamp(safeUsed / cap, 0, 1.5) : 0;
  const pct = Math.round(ratio * 100);

  const tone: ProgressTone = !hasCap
    ? 'primary'
    : ratio >= 1
      ? 'danger'
      : ratio >= warnAt
        ? 'warn'
        : 'primary';
  const toneColor = tone === 'warn' ? colors.accent : colors[tone];

  return (
    <Card style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <Icon glyph={kd.glyph} size="lg" accessibilityLabel={`${kd.label} usage`} />
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
            {kd.label}
          </Text>
          {period != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{period}</Text>
          ) : null}
        </View>
        <View style={{ alignItems: 'flex-end', gap: 2 }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
            {formatUsage(safeUsed, u, decimals)}
          </Text>
          {hasCap ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              of {formatUsage(cap, u, decimals)}
            </Text>
          ) : null}
        </View>
      </View>

      {hasCap ? (
        <View style={{ marginTop: tokens.spacing.md, gap: tokens.spacing.xs }}>
          <Progress value={Math.min(pct, 100)} max={100} tone={tone} />
          <Text style={{ color: toneColor, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
            {ratio >= 1 ? `Over allowance · ${formatPct(pct)}` : `${formatPct(pct)} of allowance`}
          </Text>
        </View>
      ) : null}
    </Card>
  );
}
