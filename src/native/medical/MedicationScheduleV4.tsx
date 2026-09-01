import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Checkbox, Icon } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { MedicationScheduleProps, MedicationDose } from './MedicationSchedule';

/** Drop-in for {@link MedicationScheduleProps} — same props, the V4 "clinic" design. */
export type MedicationScheduleV4Props = MedicationScheduleProps;

/** Per-dose status → glyph + label + token tone (never color alone). */
type DoseStatus = 'taken' | 'missed' | 'pending';
const STATUS_META: Record<DoseStatus, { glyph: string; label: string; tone: 'success' | 'warn' | 'muted' }> = {
  taken: { glyph: '✓', label: 'Taken', tone: 'success' },
  missed: { glyph: '⚠', label: 'Missed', tone: 'warn' },
  pending: { glyph: '○', label: 'Pending', tone: 'muted' },
};

/**
 * MedicationSchedule — **V4** "clinic" design. The calm, clinical take on a
 * daily schedule: an elevated rounded card with a soft shadow wrapping a
 * timeline of doses. Each dose row shows a big legible time, the drug + dose
 * text, a labelled status marker (glyph + label + token tone, never color
 * alone), and a taken checkbox affordance (≥44px tap target) wired to
 * `onToggleTaken`. A taken dose reads success glyph + "Taken" + a checked
 * control; a missed/overdue dose flags with a warn glyph + "Missed". Renders
 * loading and empty states. Identical props/behavior to
 * {@link MedicationScheduleProps}. Token-only colors via `useXenitionTheme()`.
 * Informational UI only — not a medical device.
 */
export function MedicationScheduleV4({
  doses,
  title,
  onToggleTaken,
  loading = false,
  emptyLabel = 'No medications scheduled',
  style,
}: MedicationScheduleV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const shell: ViewStyle = {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.md,
    gap: tokens.spacing.sm,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  };

  const wrap = (children: React.ReactNode): React.ReactElement => (
    <View style={[shell, style]}>
      {title ? (
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{title}</Text>
      ) : null}
      {children}
    </View>
  );

  if (loading) {
    return wrap(
      <View accessibilityLabel="Loading schedule" style={{ gap: tokens.spacing.sm }}>
        {[0, 1, 2].map((i) => (
          <View key={i} style={{ height: 52, borderRadius: tokens.radius.md, backgroundColor: tokens.ramps.neutral[100] }} />
        ))}
      </View>
    );
  }

  if (doses.length === 0) {
    return wrap(<Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>);
  }

  return wrap(
    <View style={{ gap: tokens.spacing.xs }}>
      {doses.map((d) => {
        const taken = d.taken ?? false;
        const missed = !taken && (d.missed ?? false);
        const status: DoseStatus = taken ? 'taken' : missed ? 'missed' : 'pending';
        const meta = STATUS_META[status];
        const toneColor = colors[meta.tone];
        const a11y = `${d.time}, ${d.name}${d.dose ? ` ${d.dose}` : ''}, ${meta.label}`;
        return (
          <Pressable
            key={d.id}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: taken }}
            accessibilityLabel={a11y}
            onPress={onToggleTaken ? () => onToggleTaken(d.id, !taken) : undefined}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              gap: tokens.spacing.md,
              paddingVertical: tokens.spacing.sm,
              paddingHorizontal: tokens.spacing.sm,
              minHeight: 44,
              borderRadius: tokens.radius.md,
              backgroundColor: taken ? withAlpha(colors.primary, 0.1) : 'transparent',
              opacity: pressed ? 0.75 : 1,
            })}
          >
            <View style={{ width: 52, alignItems: 'center' }}>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{d.time}</Text>
            </View>
            <View style={{ flex: 1, gap: 2 }}>
              <Text
                numberOfLines={1}
                style={{
                  color: taken ? colors.muted : colors.onSurface,
                  fontSize: tokens.typography.scale.base,
                  fontWeight: '600',
                  textDecorationLine: taken ? 'line-through' : 'none',
                }}
              >
                {d.name}
                {d.dose ? <Text style={{ color: colors.muted, fontWeight: '500' }}>  {d.dose}</Text> : null}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
                <Icon glyph={meta.glyph} size="xs" style={{ color: toneColor }} />
                <Text style={{ color: toneColor, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>{meta.label}</Text>
              </View>
            </View>
            <Checkbox
              checked={taken}
              accessibilityLabel={taken ? 'Mark as not taken' : 'Mark as taken'}
              onCheckedChange={onToggleTaken ? (next) => onToggleTaken(d.id, next) : undefined}
            />
          </Pressable>
        );
      })}
    </View>
  );
}
