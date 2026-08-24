import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card } from '../primitives';
import { CarrierBadge } from './CarrierBadge';
import { DOCK_META, toneColor, type DockStatus, type CarrierCode } from './internal';

export interface DockSlot {
  /** Stable key. */
  id: string;
  /** Time window label (e.g. `08:00–09:00`). */
  window: string;
  /** Slot status — glyph + word, never color alone. */
  status: DockStatus;
  /** Carrier assigned to the slot. */
  carrier?: CarrierCode;
  /** Carrier / appointment reference. */
  reference?: string;
}

export interface DockScheduleProps {
  /** Dock door identifier (headline, e.g. `Dock 4`). */
  dock: string;
  /** Scheduled slots for the door, drawn top→bottom. */
  slots?: DockSlot[];
  /** Fires with the pressed slot. */
  onSelectSlot?: (slot: DockSlot) => void;
  /** Loading skeleton. */
  loading?: boolean;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A dock-door appointment board: a door headline over a list of time-window
 * slots, each with a glyph + word status chip and an optional `CarrierBadge`.
 * Empty (no slots) and loading states are handled. Slots are tappable when
 * `onSelectSlot` is set (button role + label). All colors are theme tokens.
 */
export function DockSchedule({
  dock,
  slots,
  onSelectSlot,
  loading = false,
  testID,
  style,
}: DockScheduleProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const list = Array.isArray(slots) ? slots : [];

  return (
    <Card variant="outlined" testID={testID} style={style}>
      <View style={{ gap: tokens.spacing.sm }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: tokens.typography.scale.base, fontWeight: '700', color: colors.onSurface }}>
            {dock}
          </Text>
          {!loading ? (
            <Text style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>
              {`${list.length} ${list.length === 1 ? 'slot' : 'slots'}`}
            </Text>
          ) : null}
        </View>

        {loading ? (
          <View accessibilityLabel="Loading dock schedule" style={{ gap: tokens.spacing.xs }}>
            {[0, 1, 2].map((i) => (
              <View key={i} style={{ height: 40, borderRadius: tokens.radius.md, backgroundColor: tokens.ramps.neutral[100] }} />
            ))}
          </View>
        ) : list.length === 0 ? (
          <View
            accessibilityLabel="No slots scheduled"
            style={{ paddingVertical: tokens.spacing.lg, alignItems: 'center', gap: tokens.spacing.xs }}
          >
            <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xl, color: colors.muted }}>
              🅿
            </Text>
            <Text style={{ fontSize: tokens.typography.scale.sm, color: colors.muted }}>No slots scheduled</Text>
          </View>
        ) : (
          <View style={{ gap: tokens.spacing.xs }}>
            {list.map((slot) => {
              const meta = DOCK_META[slot.status] ?? DOCK_META.open;
              const accent = toneColor(colors, meta.tone);
              return (
                <Pressable
                  key={slot.id}
                  accessibilityRole="button"
                  accessibilityLabel={`${slot.window}, ${meta.label}`}
                  disabled={!onSelectSlot}
                  onPress={() => onSelectSlot?.(slot)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    paddingVertical: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.sm,
                    borderRadius: tokens.radius.md,
                    borderLeftWidth: 3,
                    borderLeftColor: accent,
                    backgroundColor: tokens.ramps.neutral[100],
                  }}
                >
                  <View style={{ width: 92 }}>
                    <Text style={{ fontSize: tokens.typography.scale.sm, fontWeight: '600', color: colors.onSurface }}>
                      {slot.window}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                      <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xs, color: accent }}>
                        {meta.glyph}
                      </Text>
                      <Text style={{ fontSize: tokens.typography.scale.xs, fontWeight: '600', color: accent }}>
                        {meta.label}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flex: 1, minWidth: 0, alignItems: 'flex-start', gap: 2 }}>
                    {slot.carrier ? <CarrierBadge carrier={slot.carrier} size="sm" /> : null}
                    {slot.reference ? (
                      <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>
                        {slot.reference}
                      </Text>
                    ) : null}
                  </View>
                </Pressable>
              );
            })}
          </View>
        )}
      </View>
    </Card>
  );
}
