import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { clampPercent, skeletonFill, toneFill, toneInk, type ToneV4 } from './internal/fleet-v4';
import type { FuelChargeGaugeProps } from './FuelChargeGauge';

/** The three bands a level falls in. Genuinely a status, so the tones stay. */
export type FuelBand = 'low' | 'fair' | 'good';

export interface FuelChargeGaugeV4Props extends FuelChargeGaugeProps {
  /** Override the band words — three English words lived inside the component. */
  bandLabels?: Partial<Record<FuelBand, string>>;
  /** Appended when `charging`. Default `'Charging'`. */
  chargingLabel?: string;
}

const BAND_META: Record<FuelBand, { label: string; tone: ToneV4 }> = {
  low: { label: 'Low', tone: 'danger' },
  fair: { label: 'Fair', tone: 'warn' },
  good: { label: 'Good', tone: 'success' },
};

/** Where the bands sit, relative to the caller's low threshold. */
function bandFor(pct: number, low: number): FuelBand {
  if (pct <= low) return 'low';
  if (pct <= low * 2.5) return 'fair';
  return 'good';
}

/** The meter's thickness per variant, off the spacing scale rather than 8/12. */
function trackHeight(xs: number, compact: boolean): number {
  return compact ? xs * 1.5 : xs * 2;
}

/**
 * **V4 fuel / charge gauge** — same props as {@link FuelChargeGauge} plus
 * `bandLabels` and `chargingLabel`.
 *
 * ## Four changes
 *
 * 1. **The percentage takes contrast-corrected ink.** The base painted the
 *    figure `colors[band.tone]` — a **fill** slot, on the largest number in
 *    the component. `warnText` is that colour pulled until it clears AA.
 * 2. **The glyph is an element, not part of the string.** `'⛽ Fuel'` cannot
 *    be tinted, cannot be replaced, and is read aloud as the emoji's name.
 * 3. **`fontWeight: '800'` is off the scale.** The kit stops at `bold`; the
 *    base asked for a weight the type system does not have, which resolves
 *    differently on every platform.
 * 4. **The track's thickness comes off the spacing scale**, and the meter
 *    reports itself as a `progressbar` with its real value.
 */
export function FuelChargeGaugeV4({
  percent,
  kind = 'fuel',
  label,
  rangeLabel,
  lowThreshold = 15,
  charging = false,
  variant = 'bar',
  bandLabels,
  chargingLabel = 'Charging',
  loading = false,
  style,
}: FuelChargeGaugeV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const compact = variant === 'compact';

  if (loading) {
    return (
      <View style={[{ gap: tokens.spacing.xs }, style]}>
        <View
          style={{
            height: tokens.typography.scale.xs,
            width: '40%',
            borderRadius: tokens.radius.sm,
            backgroundColor: skeletonFill(theme),
          }}
        />
        <View
          style={{
            height: trackHeight(tokens.spacing.xs, compact),
            borderRadius: tokens.radius.full,
            backgroundColor: skeletonFill(theme),
          }}
        />
      </View>
    );
  }

  const pct = clampPercent(percent) ?? 0;
  const low = Number.isFinite(lowThreshold) ? lowThreshold : 15;
  const band = bandFor(pct, low);
  const meta = BAND_META[band];
  const word = bandLabels?.[band] ?? meta.label;
  const heading = label ?? (kind === 'ev' ? 'Battery' : 'Fuel');
  const glyph = kind === 'ev' ? (charging ? '⚡' : '🔋') : '⛽';

  const spoken = [
    heading,
    charging ? chargingLabel : null,
    `${pct} percent`,
    word,
    rangeLabel,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <View accessible accessibilityLabel={spoken} style={[{ gap: tokens.spacing.xs }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <IconV4 glyph={glyph} size="sm" />
          <TextV4 size="sm" weight="semibold" tone="onSurface">
            {heading}
          </TextV4>
          {charging ? (
            <TextV4 size="xs" tone="primaryText">
              {chargingLabel}
            </TextV4>
          ) : null}
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
          <TextV4
            size="base"
            weight="bold"
            numeric="tabular"
            style={{ color: toneInk(theme, meta.tone) }}
          >
            {pct}%
          </TextV4>
          <TextV4 size="xs" tone="mutedText">
            {word}
          </TextV4>
        </View>
      </View>

      <View
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: 100, now: pct }}
        style={{
          height: trackHeight(tokens.spacing.xs, compact),
          borderRadius: tokens.radius.full,
          backgroundColor: colors.muted,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            width: `${pct}%`,
            height: '100%',
            borderRadius: tokens.radius.full,
            backgroundColor: toneFill(theme, meta.tone),
          }}
        />
      </View>

      {rangeLabel && !compact ? (
        <TextV4 size="xs" tone="mutedText" numeric="tabular">
          {rangeLabel}
        </TextV4>
      ) : null}
    </View>
  );
}
