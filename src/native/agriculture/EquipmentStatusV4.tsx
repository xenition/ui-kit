import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { ProgressV4 } from '../primitives/ProgressV4';
import { TextV4 } from '../primitives/TextV4';
import { pressOver } from '../primitives/internal/state-v4';
import { clampPercent, toneInk, type FarmTone } from './internal/farm-v4';
import type { EquipmentState, EquipmentStatusProps } from './EquipmentStatus';

export interface EquipmentStatusV4Props extends EquipmentStatusProps {
  /** Override the state names — four English words lived inside the component. */
  stateLabels?: Partial<Record<EquipmentState, string>>;
  /**
   * Below this fuel percentage the meter turns `warn`. Default `20`, which the
   * base hard-coded — and a threshold that is right for a tractor is not right
   * for a generator running a cold store.
   */
  lowFuelThreshold?: number;
}

/** State → tone and default label. Genuinely a status, so the tones stay. */
const STATE_META: Record<EquipmentState, { label: string; tone: FarmTone }> = {
  operational: { label: 'Operational', tone: 'success' },
  idle: { label: 'Idle', tone: 'neutral' },
  maintenance: { label: 'Maintenance', tone: 'warn' },
  offline: { label: 'Offline', tone: 'danger' },
};

/**
 * **V4 equipment status** — same props as {@link EquipmentStatus} plus
 * `stateLabels` and `lowFuelThreshold`.
 *
 * ## Four changes
 *
 * 1. **The low-fuel threshold is a prop.** 20% was a constant inside the
 *    component, and it is a fleet decision, not a design-system one.
 * 2. **Press is a state layer**, not `opacity: 0.85`.
 * 3. **The state's ink is the contrast-corrected slot** — `mutedText`,
 *    `successText`, `warnText`, `dangerText` — where the base put the *fill*
 *    slots (`muted`, `success`, …) directly on text.
 * 4. **Type comes from `TextV4`**, and the fuel and hours figures are tabular
 *    so a column of machines lines up.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export function EquipmentStatusV4({
  name,
  type,
  icon = '🚜',
  state = 'operational',
  fuelPct,
  fuelLabel = 'Fuel',
  hours,
  stateLabels,
  lowFuelThreshold = 20,
  onPress,
  style,
}: EquipmentStatusV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!name) return null;

  const meta = STATE_META[state];
  const label = stateLabels?.[state] ?? meta.label;
  const pct = clampPercent(fuelPct);
  const lowFuel = pct != null && pct < lowFuelThreshold;

  const body = (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <IconV4 glyph={icon} size="xl" />
        <View style={{ flex: 1 }}>
          <TextV4 face="heading" size="base" weight="bold" tone="onCard" numberOfLines={1}>
            {name}
          </TextV4>
          {type != null ? (
            <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
              {type}
            </TextV4>
          ) : null}
        </View>
        <BadgeV4 tone={meta.tone} variant="soft" size="sm">
          {label}
        </BadgeV4>
      </View>

      {pct != null ? (
        <View style={{ marginTop: tokens.spacing.md, gap: tokens.spacing.xs }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TextV4 size="xs" tone="mutedText">
              {fuelLabel}
            </TextV4>
            <TextV4
              size="xs"
              weight="semibold"
              numeric="tabular"
              style={{ color: lowFuel ? toneInk(theme, 'warn') : colors.onCard }}
            >
              {pct}%
            </TextV4>
          </View>
          <ProgressV4 value={pct} tone={lowFuel ? 'warn' : 'primary'} />
        </View>
      ) : null}

      {hours != null ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            marginTop: tokens.spacing.sm,
          }}
        >
          <IconV4 name="clock" size="xs" color="mutedText" />
          <TextV4 size="xs" tone="mutedText" numeric="tabular">
            {hours}
          </TextV4>
        </View>
      ) : null}
    </>
  );

  if (!onPress) return <CardV4 style={style}>{body}</CardV4>;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={[name, type, label].filter(Boolean).join(', ')}
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
