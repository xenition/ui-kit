import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Card, Icon, Badge, Switch, EmptyState } from '../primitives';

/** Run status of an irrigation slot. */
export type IrrigationRunState = 'scheduled' | 'running' | 'done' | 'skipped';

/** A single irrigation slot / zone run. */
export interface IrrigationSlot {
  /** Stable key. */
  id: string;
  /** Zone / valve name (e.g. "Zone 1 · Drip"). */
  zone: string;
  /** Start time (e.g. "06:00"). */
  time?: string;
  /** Duration hint (e.g. "20 min"). */
  duration?: string;
  /** Run state — drives the state chip. Default `'scheduled'`. */
  state?: IrrigationRunState;
  /** Whether the slot is enabled. */
  enabled?: boolean;
}

export interface IrrigationScheduleProps {
  /** Slots in run order. Empty → empty state. Guarded indexing. */
  slots: IrrigationSlot[];
  /** Card title. Default "Irrigation". */
  title?: string;
  /** Fires with the slot id + requested enabled value. */
  onToggle?: (id: string, next: boolean) => void;
  /** Empty-state title. */
  emptyTitle?: string;
  style?: StyleProp<ViewStyle>;
}

const STATE_META: Record<
  IrrigationRunState,
  { label: string; tone: 'neutral' | 'primary' | 'success' | 'warn'; color: keyof SemanticColors }
> = {
  scheduled: { label: 'Scheduled', tone: 'neutral', color: 'muted' },
  running: { label: 'Running', tone: 'primary', color: 'primary' },
  done: { label: 'Done', tone: 'success', color: 'success' },
  skipped: { label: 'Skipped', tone: 'warn', color: 'warn' },
};

/**
 * An irrigation schedule — a titled {@link Card} listing zone runs (zone, time,
 * duration) each with a run-state {@link Badge} and an enable {@link Switch}.
 * The enabled state rides the switch's a11y `checked` state (not color), and the
 * run state is stated as text. Toggling fires `onToggle(id, next)`. When `slots`
 * is empty an {@link EmptyState} stands in. Rows are keyed + indexed defensively.
 * Token-bound throughout — no literal colors.
 */
export function IrrigationSchedule({
  slots,
  title = 'Irrigation',
  onToggle,
  emptyTitle = 'No irrigation scheduled',
  style,
}: IrrigationScheduleProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const list = Array.isArray(slots) ? slots : [];

  return (
    <Card variant="outlined" style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        <Icon glyph="🚿" color="primary" size="base" />
        <Text style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
          {title}
        </Text>
      </View>

      {list.length === 0 ? (
        <View style={{ marginTop: tokens.spacing.md }}>
          <EmptyState icon={<Icon glyph="💧" size="2xl" color="muted" />} title={emptyTitle} description="Add a zone run to get started." />
        </View>
      ) : (
        <View style={{ marginTop: tokens.spacing.xs }}>
          {list.map((slot, i) => {
            const meta = STATE_META[slot.state ?? 'scheduled'];
            const enabled = slot.enabled ?? true;
            return (
              <View
                key={slot.id ?? `slot-${i}`}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: tokens.spacing.sm,
                  paddingVertical: tokens.spacing.sm,
                  borderBottomWidth: i === list.length - 1 ? 0 : 1,
                  borderBottomColor: colors.border,
                  opacity: enabled ? 1 : 0.6,
                }}
              >
                {slot.time != null ? (
                  <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700', fontFamily: tokens.typography.fontHeading, width: 52 }}>
                    {slot.time}
                  </Text>
                ) : null}
                <View style={{ flex: 1 }}>
                  <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
                    {slot.zone}
                  </Text>
                  {slot.duration != null ? (
                    <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{slot.duration}</Text>
                  ) : null}
                </View>
                <Badge tone={meta.tone} variant="soft" size="sm">
                  {meta.label}
                </Badge>
                <Switch
                  checked={enabled}
                  onCheckedChange={(next) => onToggle?.(slot.id, next)}
                  accessibilityLabel={`${slot.zone} irrigation`}
                />
              </View>
            );
          })}
        </View>
      )}
    </Card>
  );
}
