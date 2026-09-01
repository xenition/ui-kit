import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Icon, Progress, type ProgressTone } from '../primitives';
import { formatUsage, formatPct, clamp } from './internal/format';
import { utilityKind } from './internal/status';
import { GradientSurface } from './internal/GradientSurface';
import { brandDisc, brandInk } from './internal/brand';
import type { UsageMeterProps } from './UsageMeter';

/** Drop-in for {@link UsageMeterProps} — same props, a different design. */
export type UsageMeterV4Props = UsageMeterProps;

/**
 * UsageMeter — **V4** design. The clean, trust-first consumption gauge: an
 * elevated rounded surface, the utility-kind glyph in a small brand-gradient disc
 * (the signature V4 touch), and the token-bound `Progress` bar below. The fill
 * tone still escalates by threshold (under `warnAt` → primary, over → warn,
 * at/over cap → danger) and the same escalation is echoed in a text percentage,
 * so status is never color-alone. Quantities run through `formatUsage`/`formatPct`
 * and a zero/absent allowance is guarded. Same props and loading behavior as
 * {@link UsageMeterProps}; token-only colors.
 */
export function UsageMeterV4({
  kind,
  used,
  allowance = 0,
  unit,
  decimals = 0,
  period,
  warnAt = 0.8,
  loading = false,
  style,
}: UsageMeterV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const kd = utilityKind(kind);
  const u = unit ?? kd.unit;

  const card = {
    backgroundColor: colors.card,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  } as const;

  if (loading) {
    return (
      <View accessibilityLabel="Loading usage" style={[card, { gap: tokens.spacing.sm }, style]}>
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
    <View style={[card, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <GradientSurface
          colors={brandDisc(r)}
          style={{
            width: 48,
            height: 48,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <Icon glyph={kd.glyph} size="xl" accessibilityLabel={`${kd.label} usage`} style={{ color: brandInk(r) }} />
        </GradientSurface>
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
            {kd.label}
          </Text>
          {period != null ? (
            <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>{period}</Text>
          ) : null}
        </View>
        <View style={{ alignItems: 'flex-end', gap: 2 }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
            {formatUsage(safeUsed, u, decimals)}
          </Text>
          {hasCap ? (
            <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>
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
    </View>
  );
}
