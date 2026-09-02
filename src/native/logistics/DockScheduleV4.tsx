import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { CarrierBadge } from './CarrierBadge';
import { DOCK_META, toneColor } from './internal';
import type { DockScheduleProps } from './DockSchedule';

/** Drop-in for {@link DockScheduleProps} — same props, the V4 "dispatch" design. */
export type DockScheduleV4Props = DockScheduleProps;

/**
 * DockSchedule — **V4** "dispatch" design (native twin of the web V4). The
 * confident, operations-desk take on a dock-door appointment board: an elevated
 * rounded card with a soft shadow, a door headline with a slot count, and a list
 * of time-window slots. Each slot is a soft-primary well with a tone-toned
 * leading edge, a **tabular-nums** window, a glyph + word status (never color
 * alone), and an optional `CarrierBadge` + reference. Empty (no slots) and
 * loading states are handled; slots are tappable when `onSelectSlot` is set.
 * Token-only colors via `useXenitionTheme()`.
 */
export function DockScheduleV4({
  dock,
  slots,
  onSelectSlot,
  loading = false,
  testID,
  style,
}: DockScheduleV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const list = Array.isArray(slots) ? slots : [];
  const shell: ViewStyle = {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    gap: tokens.spacing.md,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  };

  return (
    <View testID={testID} style={[shell, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: tokens.typography.scale.base, fontWeight: '700', color: colors.onSurface }}>{dock}</Text>
        {!loading ? (
          <Text style={{ fontSize: tokens.typography.scale.xs, color: colors.muted, fontVariant: ['tabular-nums'] }}>{`${list.length} ${list.length === 1 ? 'slot' : 'slots'}`}</Text>
        ) : null}
      </View>

      {loading ? (
        <View accessibilityLabel="Loading dock schedule" style={{ gap: tokens.spacing.sm }}>
          {[0, 1, 2].map((i) => (
            <View key={i} style={{ height: 48, borderRadius: tokens.radius.md, backgroundColor: tokens.ramps.neutral[100] }} />
          ))}
        </View>
      ) : list.length === 0 ? (
        <View accessibilityLabel="No slots scheduled" style={{ paddingVertical: tokens.spacing.lg, alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xl, color: colors.muted }}>🅿</Text>
          <Text style={{ fontSize: tokens.typography.scale.sm, color: colors.muted }}>No slots scheduled</Text>
        </View>
      ) : (
        <View style={{ gap: tokens.spacing.sm }}>
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
                style={({ pressed }) => ({
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: tokens.spacing.md,
                  paddingVertical: tokens.spacing.sm,
                  paddingHorizontal: tokens.spacing.md,
                  borderRadius: tokens.radius.md,
                  borderLeftWidth: 3,
                  borderLeftColor: accent,
                  backgroundColor: withAlpha(colors.primary, 0.05),
                  opacity: pressed && onSelectSlot ? 0.8 : 1,
                })}
              >
                <View style={{ width: 96 }}>
                  <Text style={{ fontSize: tokens.typography.scale.sm, fontWeight: '600', color: colors.onSurface, fontVariant: ['tabular-nums'] }}>{slot.window}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2, marginTop: 2 }}>
                    <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xs, color: accent }}>{meta.glyph}</Text>
                    <Text style={{ fontSize: tokens.typography.scale.xs, fontWeight: '600', color: accent }}>{meta.label}</Text>
                  </View>
                </View>
                <View style={{ flex: 1, minWidth: 0, alignItems: 'flex-start', gap: 2 }}>
                  {slot.carrier ? <CarrierBadge carrier={slot.carrier} size="sm" /> : null}
                  {slot.reference ? <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>{slot.reference}</Text> : null}
                </View>
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
}
