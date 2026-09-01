import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { pressOver } from '../primitives/internal/state-v4';
import { metaLine, type FarmTone } from './internal/farm-v4';
import type { FieldCardProps, FieldStatus } from './FieldCard';

export interface FieldCardV4Props extends FieldCardProps {
  /** Override the status names — four English words lived inside the component. */
  statusLabels?: Partial<Record<FieldStatus, string>>;
  /**
   * Render the area. Default is the value and its unit separated by a space.
   *
   * A prop because the separator is a locale decision: `12.4 ha`, `12,4 ha`
   * and `30.6 acres` are all correct somewhere, and a component that
   * concatenates them itself is guessing.
   */
  formatArea?: (area: number | string, unit?: string) => string;
}

/** Status → tone and default label. Domain knowledge, so it stays here. */
const STATUS_META: Record<FieldStatus, { label: string; tone: FarmTone }> = {
  planted: { label: 'Planted', tone: 'success' },
  fallow: { label: 'Fallow', tone: 'neutral' },
  harvested: { label: 'Harvested', tone: 'primary' },
  preparing: { label: 'Preparing', tone: 'warn' },
};

/**
 * **V4 field card** — same props as {@link FieldCard} plus `statusLabels` and
 * `formatArea`.
 *
 * ## Four changes
 *
 * 1. **Press is a state layer**, not `opacity: 0.85` on the card's content —
 *    which is the signal M3 spends 0.38 on to mean *disabled*.
 * 2. **Type comes from `TextV4`, and captions take `mutedText`** — the slot
 *    with a contrast promise, rather than the `muted` ramp step the base used
 *    as ink three times.
 * 3. **The area is formatted, not concatenated.** See `formatArea`.
 * 4. **The card is `CardV4`'s raised ground.** In a scrolling list on a dark
 *    page the base had only its border to separate it from the page.
 *
 * `variant="compact"` still drops the secondary line. **Renders nothing
 * without a `name`** (§4.5).
 */
export function FieldCardV4({
  name,
  area,
  areaUnit = 'ha',
  crop,
  soilType,
  location,
  status = 'planted',
  icon = '🗺️',
  variant = 'detailed',
  statusLabels,
  formatArea,
  onPress,
  style,
}: FieldCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!name) return null;

  const meta = STATUS_META[status];
  const label = statusLabels?.[status] ?? meta.label;
  const detailed = variant === 'detailed';
  const format = formatArea ?? ((a: number | string, u?: string) => (u ? `${a} ${u}` : String(a)));
  const areaText = area != null ? format(area, areaUnit) : null;

  const body = (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <IconV4 glyph={icon} size={detailed ? '2xl' : 'xl'} />
        <View style={{ flex: 1 }}>
          <TextV4 face="heading" size="base" weight="bold" tone="onCard" numberOfLines={1}>
            {name}
          </TextV4>
          {areaText ? (
            <TextV4 size="sm" tone="mutedText" numeric="tabular" numberOfLines={1}>
              {areaText}
            </TextV4>
          ) : null}
        </View>
        <BadgeV4 tone={meta.tone} variant="soft" size="sm">
          {label}
        </BadgeV4>
      </View>

      {detailed && (crop != null || soilType != null || location != null) ? (
        <TextV4 size="xs" tone="mutedText" style={{ marginTop: tokens.spacing.sm }}>
          {metaLine([crop, soilType, location])}
        </TextV4>
      ) : null}
    </>
  );

  if (!onPress) return <CardV4 style={style}>{body}</CardV4>;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={[name, areaText, label].filter(Boolean).join(', ')}
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
