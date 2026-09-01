import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { SwitchV4 } from '../primitives/SwitchV4';
import { TextV4 } from '../primitives/TextV4';
import { metaLine, type FarmTone } from './internal/farm-v4';
import type { IrrigationRunState, IrrigationScheduleProps } from './IrrigationSchedule';

export interface IrrigationScheduleV4Props extends IrrigationScheduleProps {
  /** Override the run-state names — four English words lived inside the component. */
  stateLabels?: Partial<Record<IrrigationRunState, string>>;
  /** Description under the empty title. */
  emptyDescription?: string;
}

/** Run state → tone and default label. Genuinely a status, so the tones stay. */
const STATE_META: Record<IrrigationRunState, { label: string; tone: FarmTone }> = {
  scheduled: { label: 'Scheduled', tone: 'neutral' },
  running: { label: 'Running', tone: 'primary' },
  done: { label: 'Done', tone: 'success' },
  skipped: { label: 'Skipped', tone: 'warn' },
};

/**
 * **V4 irrigation schedule** — same props as {@link IrrigationSchedule} plus
 * `stateLabels` and `emptyDescription`.
 *
 * ## Four changes
 *
 * 1. **The per-zone toggle is `SwitchV4`.** The base drew its own, so the one
 *    control on this card a user actually operates did not match the switches
 *    anywhere else in the product — different size, different travel, no focus
 *    ring.
 * 2. **A disabled zone dims at M3's 0.38** and says `disabled` through
 *    `accessibilityState`, rather than only losing colour.
 * 3. **The empty state gets a description**, not just a title, so a schedule
 *    with nothing in it explains itself.
 * 4. **Type comes from `TextV4`** and captions take `mutedText`.
 *
 * Still fully controlled: `onToggle` reports, the component stores nothing.
 */
export function IrrigationScheduleV4({
  slots,
  title = 'Irrigation',
  onToggle,
  emptyTitle = 'No runs scheduled',
  emptyDescription = 'Zones you schedule will appear here.',
  stateLabels,
  style,
}: IrrigationScheduleV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const list = Array.isArray(slots) ? slots : [];

  return (
    <CardV4 style={[{ gap: tokens.spacing.sm }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <IconV4 glyph="💦" size="base" />
        <TextV4 size="base" weight="semibold" tone="onCard" style={{ flex: 1 }}>
          {title}
        </TextV4>
      </View>

      {list.length === 0 ? (
        <View style={{ gap: tokens.spacing.xs, paddingVertical: tokens.spacing.md }}>
          <TextV4 size="sm" weight="semibold" tone="onCard" align="center">
            {emptyTitle}
          </TextV4>
          <TextV4 size="xs" tone="mutedText" align="center">
            {emptyDescription}
          </TextV4>
        </View>
      ) : (
        <View>
          {list.map((slot, i) => {
            const meta = STATE_META[slot.state ?? 'scheduled'];
            const label = stateLabels?.[slot.state ?? 'scheduled'] ?? meta.label;
            const enabled = slot.enabled ?? true;
            const caption = metaLine([slot.time, slot.duration]);
            const last = i === list.length - 1;

            return (
              <View
                key={slot.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: tokens.spacing.sm,
                  paddingVertical: tokens.spacing.sm,
                  borderBottomWidth: last ? 0 : 1,
                  borderBottomColor: colors.border,
                  // A disabled zone keeps its box and loses its ink.
                  opacity: enabled ? 1 : theme.state.disabledContent,
                }}
              >
                <View style={{ flex: 1 }}>
                  <TextV4 size="sm" weight="semibold" tone="onCard" numberOfLines={1}>
                    {slot.zone}
                  </TextV4>
                  {caption ? (
                    <TextV4 size="xs" tone="mutedText" numeric="tabular" numberOfLines={1}>
                      {caption}
                    </TextV4>
                  ) : null}
                </View>

                <BadgeV4 tone={meta.tone} variant="soft" size="sm">
                  {label}
                </BadgeV4>

                {onToggle ? (
                  <SwitchV4
                    checked={enabled}
                    onCheckedChange={(next: boolean) => onToggle(slot.id, next)}
                    accessibilityLabel={slot.zone}
                  />
                ) : null}
              </View>
            );
          })}
        </View>
      )}
    </CardV4>
  );
}
