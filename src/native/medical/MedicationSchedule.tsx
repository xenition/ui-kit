import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface MedicationDose {
  /** Stable identifier returned through `onToggleTaken`. */
  id: string;
  /** Medication name, e.g. "Metformin". */
  name: string;
  /** Dose text, e.g. "500 mg". */
  dose?: string;
  /** Scheduled time label, e.g. "08:00". */
  time: string;
  /** Whether this dose has been taken. */
  taken?: boolean;
  /** Marks the dose as missed/overdue (past its time, not taken). */
  missed?: boolean;
}

export interface MedicationScheduleProps {
  /** Doses to render, in display order. */
  doses: MedicationDose[];
  /** Optional list heading. */
  title?: string;
  /** Fires with the dose id and its next taken state. */
  onToggleTaken?: (id: string, nextTaken: boolean) => void;
  /** Skeleton placeholder while the schedule loads. */
  loading?: boolean;
  /** Message shown when there are no doses. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A daily medication schedule: a timeline of doses each with its time, drug,
 * dose text, and a taken checkbox. A missed/overdue dose is flagged with a
 * glyph + label + warn color (never color alone). Renders loading and empty
 * states. Informational UI only — not a medical device. Token-only colors.
 */
export function MedicationSchedule({
  doses,
  title,
  onToggleTaken,
  loading = false,
  emptyLabel = 'No medications scheduled',
  style,
}: MedicationScheduleProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const shell = (children: React.ReactNode): React.ReactElement => (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      {title ? (
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{title}</Text>
      ) : null}
      {children}
    </View>
  );

  if (loading) {
    return shell(
      <View accessibilityLabel="Loading schedule" style={{ gap: tokens.spacing.sm }}>
        {[0, 1, 2].map((i) => (
          <View key={i} style={{ height: 52, borderRadius: tokens.radius.md, backgroundColor: tokens.ramps.neutral[100] }} />
        ))}
      </View>
    );
  }

  if (doses.length === 0) {
    return shell(<Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>);
  }

  return shell(
    <View>
      {doses.map((d) => {
        const taken = d.taken ?? false;
        const missed = !taken && (d.missed ?? false);
        const a11y = `${d.time}, ${d.name}${d.dose ? ` ${d.dose}` : ''}, ${taken ? 'taken' : missed ? 'missed' : 'not taken'}`;
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
              minHeight: 52,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <View style={{ width: 52, alignItems: 'center' }}>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{d.time}</Text>
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
              {missed ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
                  <Text allowFontScaling={false} style={{ color: colors.warn, fontSize: tokens.typography.scale.xs }}>
                    ⚠
                  </Text>
                  <Text style={{ color: colors.warn, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>Missed</Text>
                </View>
              ) : null}
            </View>
            <View
              style={{
                width: 26,
                height: 26,
                borderRadius: tokens.radius.full,
                borderWidth: 2,
                borderColor: taken ? colors.success : colors.border,
                backgroundColor: taken ? colors.success : colors.surface,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {taken ? (
                <Text allowFontScaling={false} style={{ color: colors.onSuccess, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
                  ✓
                </Text>
              ) : null}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
