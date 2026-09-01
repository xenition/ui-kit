import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { GradientSurface } from './internal/GradientSurface';
import { ambientGradient, ambientInk, ambientInkSoft, ambientTile, ambientBorder } from './internal/ambient';

/** Tone key for a breakdown slice — resolved to a token opacity of the near-white ink. */
export type EnergyBreakdownTone = 'primary' | 'accent' | 'warn' | 'success';

export interface EnergyDashboardProps {
  /** Headline usage figure, already formatted (e.g. "24.6 kWh") — the near-white numeral. */
  usageLabel: string;
  /** Optional cost line for the period (e.g. "$4.20 today"). */
  costLabel?: string;
  /** Period the figures cover. Default `'Today'`. */
  period?: string;
  /**
   * Optional change vs the previous period, as a percentage. For energy, **up
   * means worse** (more used); the delta chip reflects that in tone + arrow.
   */
  deltaPct?: number;
  /** Optional solar generation line, already formatted (e.g. "6.1 kWh solar"). */
  solarLabel?: string;
  /**
   * Optional usage breakdown, rendered as a stacked token bar with a frosted
   * legend. `value` is a raw magnitude; slices are normalised to the total.
   */
  breakdown?: readonly { label: string; value: number; tone?: EnergyBreakdownTone }[];
  style?: StyleProp<ViewStyle>;
}

/** Token opacity per tone, applied to the near-white ink — keeps the bar on the brand ramp. */
const TONE_ALPHA: Record<EnergyBreakdownTone, number> = {
  primary: 1,
  accent: 0.7,
  warn: 0.45,
  success: 0.25,
};

/**
 * EnergyDashboard — a whole-home energy **hero** for the smart-home module. A
 * brand-gradient ground carries the big near-white usage numeral, a cost +
 * period line, a delta chip (for energy, up = worse, so a rise reads as a
 * warning arrow), an optional solar line, and an optional stacked usage bar with
 * a frosted legend. The bar is one gradient-safe run of the near-white ink at
 * token opacities — every color derives from the compiled brand ramp via
 * `ambient*` + `withAlpha` + `GradientSurface` — token-only, no literals, light +
 * dark. Presentational: shaped data, nothing fetches.
 */
export function EnergyDashboard({
  usageLabel,
  costLabel,
  period = 'Today',
  deltaPct,
  solarLabel,
  breakdown,
  style,
}: EnergyDashboardProps): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = ambientInk(r);
  const inkSoft = ambientInkSoft(r);
  const tile = ambientTile(r);
  const border = ambientBorder(r);

  const hasDelta = typeof deltaPct === 'number' && Number.isFinite(deltaPct);
  const worse = hasDelta && (deltaPct as number) > 0;
  const total = (breakdown ?? []).reduce((sum, b) => sum + Math.max(0, b.value), 0);
  const slices = breakdown ?? [];

  return (
    <View style={[{ borderRadius: tokens.radius.lg }, style]}>
      <GradientSurface
        colors={ambientGradient(r)}
        style={{ borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden' }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.md }}>
          <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{`${period} usage`}</Text>
          {hasDelta ? (
            <View
              accessibilityRole="text"
              accessibilityLabel={`${Math.abs(deltaPct as number)} percent ${worse ? 'more' : 'less'} than the previous period`}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.xs,
                paddingHorizontal: tokens.spacing.md,
                paddingVertical: tokens.spacing.xs,
                borderRadius: tokens.radius.full,
                backgroundColor: tile,
                borderWidth: 1,
                borderColor: border,
              }}
            >
              <Icon glyph={worse ? '▲' : '▼'} size="xs" style={{ color: ink }} />
              <Text style={{ color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
                {`${Math.abs(deltaPct as number)}%`}
              </Text>
            </View>
          ) : null}
        </View>

        <Text
          allowFontScaling={false}
          style={{ color: ink, fontSize: tokens.typography.scale['3xl'], fontWeight: '800', letterSpacing: -0.5, marginTop: tokens.spacing.xs }}
        >
          {usageLabel}
        </Text>

        {costLabel || solarLabel ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }}>
            {costLabel ? (
              <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>{costLabel}</Text>
            ) : null}
            {solarLabel ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: tokens.spacing.xs,
                  paddingHorizontal: tokens.spacing.sm,
                  paddingVertical: tokens.spacing.xs,
                  borderRadius: tokens.radius.full,
                  backgroundColor: tile,
                  borderWidth: 1,
                  borderColor: border,
                }}
              >
                <Icon glyph="☀️" size="xs" style={{ color: ink }} />
                <Text style={{ color: ink, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{solarLabel}</Text>
              </View>
            ) : null}
          </View>
        ) : null}

        {slices.length > 0 && total > 0 ? (
          <View style={{ marginTop: tokens.spacing.lg }}>
            <View
              accessibilityRole="image"
              accessibilityLabel="Usage breakdown"
              style={{
                flexDirection: 'row',
                height: 12,
                width: '100%',
                overflow: 'hidden',
                borderRadius: tokens.radius.full,
                backgroundColor: tile,
                borderWidth: 1,
                borderColor: border,
              }}
            >
              {slices.map((b) => {
                const frac = Math.max(0, b.value) / total;
                if (frac <= 0) return null;
                return (
                  <View
                    key={b.label}
                    style={{ height: '100%', flexGrow: frac, backgroundColor: withAlpha(ink, TONE_ALPHA[b.tone ?? 'primary']) }}
                  />
                );
              })}
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm, marginTop: tokens.spacing.sm }}>
              {slices.map((b) => {
                const pct = Math.round((Math.max(0, b.value) / total) * 100);
                return (
                  <View
                    key={b.label}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: tokens.spacing.xs,
                      paddingHorizontal: tokens.spacing.sm,
                      paddingVertical: tokens.spacing.xs,
                      borderRadius: tokens.radius.md,
                      backgroundColor: tile,
                      borderWidth: 1,
                      borderColor: border,
                    }}
                  >
                    <View style={{ width: 10, height: 10, borderRadius: tokens.radius.full, backgroundColor: withAlpha(ink, TONE_ALPHA[b.tone ?? 'primary']) }} />
                    <Text style={{ color: ink, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{b.label}</Text>
                    <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.xs }}>{`${pct}%`}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        ) : null}
      </GradientSurface>
    </View>
  );
}
