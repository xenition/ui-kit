import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { ProgressV4 } from '../primitives/ProgressV4';
import { TextV4 } from '../primitives/TextV4';
import { pressOver } from '../primitives/internal/state-v4';
import { clampPercent, skeletonBarStyle, toneInk, type FarmTone } from './internal/farm-v4';
import type { ProgressTone } from '../primitives/Progress';
import type { CropCardProps, CropHealth, GrowthStage } from './CropCard';

export interface CropCardV4Props extends CropCardProps {
  /** Label for the maturity meter. Default `'Maturity'`, which the base hard-coded. */
  progressLabel?: string;
  /** Override the stage names — five English words lived inside the component. */
  stageLabels?: Partial<Record<GrowthStage, string>>;
  /** Override the health names. */
  healthLabels?: Partial<Record<CropHealth, string>>;
}

/** Stage → glyph, tone and default label. Domain knowledge, so it stays here. */
const STAGE_META: Record<GrowthStage, { label: string; glyph: string; tone: FarmTone }> = {
  seeding: { label: 'Seeding', glyph: '🌱', tone: 'neutral' },
  growing: { label: 'Growing', glyph: '🌿', tone: 'primary' },
  flowering: { label: 'Flowering', glyph: '🌸', tone: 'accent' },
  mature: { label: 'Mature', glyph: '🌾', tone: 'success' },
  harvested: { label: 'Harvested', glyph: '📦', tone: 'neutral' },
};

/**
 * Health → tone. Genuinely a status — healthy is good and critical is bad — so
 * this is one of the places §5 of the brief *keeps* the status colours.
 *
 * Typed as `ProgressTone` rather than `FarmTone` because the meter is the
 * narrower of the two consumers: `BadgeV4` takes `accent`, `ProgressV4` does
 * not, and a health value can never be `accent` anyway.
 */
const HEALTH_META: Record<CropHealth, { label: string; tone: ProgressTone & FarmTone }> = {
  healthy: { label: 'Healthy', tone: 'success' },
  stressed: { label: 'Stressed', tone: 'warn' },
  critical: { label: 'Critical', tone: 'danger' },
};

/**
 * **V4 crop card** — same props as {@link CropCard} plus `progressLabel`,
 * `stageLabels` and `healthLabels`.
 *
 * ## Five changes
 *
 * 1. **The skeleton stops being made of hairlines.** The base filled its
 *    loading bars with `colors.border` — a divider token asked to act as a
 *    block. See `internal/farm-v4`.
 * 2. **Press is a state layer over the card's own fill**, not `opacity: 0.85`
 *    on its content — which is the signal M3 spends 0.38 on to mean *disabled*,
 *    so a pressed card read as unavailable.
 * 3. **Type comes from `TextV4`.** The base hand-wrote `color`, `fontSize`,
 *    `fontWeight` and `fontFamily` on a raw `<Text>` six times in one file.
 * 4. **The location and harvest captions carry icons, not emoji glued into the
 *    string.** `'📍 ' + fieldLabel` cannot be tinted, cannot be replaced, and
 *    is read aloud by a screen reader as the emoji's name.
 * 5. **Nine English strings became props**, in a module whose whole contract is
 *    that copy is caller-supplied.
 *
 * `variant="compact"` still drops the meter and the captions, and `loading`
 * still renders the skeleton rather than a bordered blank.
 */
export function CropCardV4({
  name,
  variety,
  icon,
  stage = 'growing',
  health,
  progress,
  fieldLabel,
  harvestLabel,
  variant = 'detailed',
  loading = false,
  progressLabel = 'Maturity',
  stageLabels,
  healthLabels,
  onPress,
  style,
}: CropCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  if (loading) {
    return (
      <CardV4 style={[{ gap: tokens.spacing.sm }, style]}>
        <View style={skeletonBarStyle(theme, { width: '60%', step: 'base' })} />
        <View style={skeletonBarStyle(theme, { width: '40%', step: 'sm' })} />
      </CardV4>
    );
  }

  if (!name) return null;

  const stageMeta = STAGE_META[stage];
  const stageLabel = stageLabels?.[stage] ?? stageMeta.label;
  const glyph = icon ?? stageMeta.glyph;
  const healthMeta = health ? HEALTH_META[health] : null;
  const healthLabel = health ? (healthLabels?.[health] ?? healthMeta!.label) : null;
  const detailed = variant === 'detailed';
  const pct = clampPercent(progress);

  const body = (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <IconV4 glyph={glyph} size={detailed ? '2xl' : 'xl'} />
        <View style={{ flex: 1 }}>
          <TextV4 face="heading" size="base" weight="bold" tone="onCard" numberOfLines={1}>
            {name}
          </TextV4>
          {variety != null ? (
            <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
              {variety}
            </TextV4>
          ) : null}
        </View>
        <View style={{ alignItems: 'flex-end', gap: tokens.spacing.xs }}>
          <BadgeV4 tone={stageMeta.tone} variant="soft" size="sm">
            {stageLabel}
          </BadgeV4>
          {healthMeta ? (
            <BadgeV4 tone={healthMeta.tone} variant="soft" size="sm">
              {healthLabel}
            </BadgeV4>
          ) : null}
        </View>
      </View>

      {detailed && pct != null ? (
        <View style={{ marginTop: tokens.spacing.md, gap: tokens.spacing.xs }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TextV4 size="xs" tone="mutedText">
              {progressLabel}
            </TextV4>
            <TextV4
              size="xs"
              weight="semibold"
              numeric="tabular"
              style={{ color: healthMeta ? toneInk(theme, healthMeta.tone) : colors.onCard }}
            >
              {pct}%
            </TextV4>
          </View>
          <ProgressV4 value={pct} tone={healthMeta ? healthMeta.tone : 'primary'} />
        </View>
      ) : null}

      {detailed && (fieldLabel != null || harvestLabel != null) ? (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: tokens.spacing.md,
            marginTop: tokens.spacing.md,
          }}
        >
          {fieldLabel != null ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
              <IconV4 name="location" size="xs" color="mutedText" />
              <TextV4 size="xs" tone="mutedText">
                {fieldLabel}
              </TextV4>
            </View>
          ) : null}
          {harvestLabel != null ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
              <IconV4 name="calendar" size="xs" color="mutedText" />
              <TextV4 size="xs" tone="mutedText">
                {harvestLabel}
              </TextV4>
            </View>
          ) : null}
        </View>
      ) : null}
    </>
  );

  if (!onPress) return <CardV4 style={style}>{body}</CardV4>;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={[name, variety, stageLabel, healthLabel].filter(Boolean).join(', ')}
      onPress={onPress}
      style={({ pressed }) => ({
        borderRadius: tokens.radius.lg,
        backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent',
      })}
    >
      <CardV4 style={style}>{body}</CardV4>
    </Pressable>
  );
}
