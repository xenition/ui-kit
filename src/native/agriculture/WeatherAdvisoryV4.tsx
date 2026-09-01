import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { mixToken } from '../../primitives/internal/v4-depth';
import { toneInk, type FarmTone } from './internal/farm-v4';
import type { AdvisoryKind, AdvisorySeverity, WeatherAdvisoryProps } from './WeatherAdvisory';

export interface WeatherAdvisoryV4Props extends WeatherAdvisoryProps {
  /** Override the severity names — four English words lived inside the component. */
  severityLabels?: Partial<Record<AdvisorySeverity, string>>;
}

/** Kind → glyph. Domain knowledge, so it stays here. */
const KIND_GLYPH: Record<AdvisoryKind, string> = {
  frost: '❄️',
  heat: '🔥',
  rain: '🌧️',
  wind: '💨',
  drought: '🏜️',
  storm: '⛈️',
  general: '🌤️',
};

/**
 * Severity → tone and default label.
 *
 * `watch` and `warning` share `warn`: the tone scale has three steps and the
 * severity scale has four, and the **word** is what separates a watch from a
 * warning — which is exactly how a meteorological service separates them too.
 */
const SEVERITY_META: Record<AdvisorySeverity, { label: string; tone: FarmTone }> = {
  info: { label: 'Info', tone: 'primary' },
  watch: { label: 'Watch', tone: 'warn' },
  warning: { label: 'Warning', tone: 'warn' },
  severe: { label: 'Severe', tone: 'danger' },
};

/** How far the advisory's ground travels from the card toward its tone. */
const GROUND_TINT = 0.1;

/**
 * **V4 weather advisory** — same props as {@link WeatherAdvisory} plus
 * `severityLabels`.
 *
 * ## Four changes
 *
 * 1. **Severity reads without colour**, via the badge word beside the tint.
 * 2. **The tint is mixed from resolved semantic colours** rather than left to
 *    a raw fill, so it lands correctly in dark mode.
 * 3. **The glyph takes the contrast-corrected ink**, not the fill slot.
 * 4. **`role="alert"` is on the severe end only.** The base announced every
 *    advisory as an alert including `info`, which trains a screen-reader user
 *    to ignore the ones that matter — an `info` advisory is a status, a
 *    `severe` one interrupts.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
export function WeatherAdvisoryV4({
  title,
  message,
  kind = 'general',
  severity = 'info',
  timeframe,
  icon,
  severityLabels,
  style,
}: WeatherAdvisoryV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!title) return null;

  const meta = SEVERITY_META[severity];
  const label = severityLabels?.[severity] ?? meta.label;
  const glyph = icon ?? KIND_GLYPH[kind];
  const ink = toneInk(theme, meta.tone);
  const fill =
    meta.tone === 'primary' ? colors.primary : meta.tone === 'warn' ? colors.warn : colors.danger;

  return (
    <View
      // Only the severe end interrupts. An `info` advisory that announces
      // itself as an alert is how a user learns to ignore all of them.
      accessibilityRole={severity === 'severe' ? 'alert' : 'summary'}
      accessibilityLabel={[label, title, timeframe].filter(Boolean).join(', ')}
      style={[
        {
          flexDirection: 'row',
          gap: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: mixToken(colors.card, fill, GROUND_TINT),
          padding: tokens.spacing.md,
        },
        style,
      ]}
    >
      <IconV4 glyph={glyph} size="2xl" style={{ color: ink }} />

      <View style={{ flex: 1, gap: tokens.spacing.xs }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <TextV4 face="heading" size="base" weight="bold" tone="onCard" style={{ flex: 1 }}>
            {title}
          </TextV4>
          <BadgeV4 tone={meta.tone} variant="soft" size="sm">
            {label}
          </BadgeV4>
        </View>

        {message ? (
          <TextV4 size="sm" tone="onCard">
            {message}
          </TextV4>
        ) : null}

        {timeframe ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <IconV4 name="clock" size="xs" color="mutedText" />
            <TextV4 size="xs" tone="mutedText">
              {timeframe}
            </TextV4>
          </View>
        ) : null}
      </View>
    </View>
  );
}
