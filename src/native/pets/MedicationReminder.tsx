import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Badge } from '../primitives';

export type MedicationForm = 'pill' | 'liquid' | 'injection' | 'topical' | 'drops' | 'chew';
export type MedicationState = 'due' | 'upcoming' | 'taken' | 'missed';

const FORM_GLYPH: Record<MedicationForm, string> = {
  pill: '💊',
  liquid: '🧪',
  injection: '💉',
  topical: '🧴',
  drops: '💧',
  chew: '🦴',
};

const STATE_META: Record<MedicationState, { label: string; tone: 'warn' | 'primary' | 'success' | 'danger'; slot: keyof SemanticColors }> = {
  due: { label: 'Due now', tone: 'warn', slot: 'warn' },
  upcoming: { label: 'Upcoming', tone: 'primary', slot: 'primary' },
  taken: { label: 'Taken', tone: 'success', slot: 'success' },
  missed: { label: 'Missed', tone: 'danger', slot: 'danger' },
};

export interface MedicationReminderProps {
  /** Medication name, e.g. "Apoquel". */
  name: string;
  /** Dosage, e.g. "5 mg". */
  dosage?: string;
  /** Form; drives the icon. */
  form?: MedicationForm;
  /** Frequency label, e.g. "Twice daily". */
  frequency?: string;
  /** Next dose time (already formatted). */
  nextDose?: string;
  /** Reminder state; drives the chip + accent. */
  state: MedicationState;
  /** Doses remaining in the course. */
  dosesLeft?: number;
  /** Label for the mark-taken action; hidden once taken or no handler. */
  markLabel?: string;
  onMarkTaken?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A medication dose reminder: form icon, name + dosage, frequency, the next-dose
 * time, and a state chip. Actionable states (`due`/`upcoming`/`missed`) expose a
 * tappable "Mark taken" control. State reads via a labelled chip + left accent
 * (never color alone). Token-only colors.
 */
export function MedicationReminder({
  name,
  dosage,
  form = 'pill',
  frequency,
  nextDose,
  state,
  dosesLeft,
  markLabel = 'Mark taken',
  onMarkTaken,
  style,
}: MedicationReminderProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const stateMeta = STATE_META[state];
  const showMark = onMarkTaken != null && state !== 'taken';

  const title = [name, dosage].filter(Boolean).join(' · ');

  return (
    <View
      accessibilityLabel={`${title}, ${stateMeta.label}${nextDose ? `, next dose ${nextDose}` : ''}`}
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderLeftColor: colors[stateMeta.slot],
          borderWidth: 1,
          borderLeftWidth: 4,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.md,
          gap: tokens.spacing.sm,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xl }}>
          {FORM_GLYPH[form]}
        </Text>
        <View style={{ flex: 1, gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {title}
          </Text>
          {frequency ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{frequency}</Text>
          ) : null}
        </View>
        <Badge tone={stateMeta.tone} variant="soft" size="sm">
          {stateMeta.label}
        </Badge>
      </View>

      {nextDose || dosesLeft != null ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          {nextDose ? (
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>⏰ {nextDose}</Text>
          ) : (
            <View />
          )}
          {dosesLeft != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {dosesLeft} dose{dosesLeft === 1 ? '' : 's'} left
            </Text>
          ) : null}
        </View>
      ) : null}

      {showMark ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${markLabel}: ${name}`}
          onPress={onMarkTaken}
          style={({ pressed }) => ({
            alignSelf: 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            borderRadius: tokens.radius.md,
            borderWidth: 1,
            borderColor: colors[stateMeta.slot],
            paddingVertical: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.md,
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Text style={{ color: colors[stateMeta.slot], fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>✓ {markLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
