import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { MedicationReminderProps, MedicationForm, MedicationState } from './MedicationReminder';

/** V4 layout choices for the "companion" design. */
export type MedicationReminderLayout = 'card' | 'compact';

/** Drop-in for {@link MedicationReminderProps} — same props, the V4 "companion" design. */
export interface MedicationReminderV4Props extends MedicationReminderProps {
  /** V4 layout: `card` (default) or `compact` (dense single row). */
  variant?: MedicationReminderLayout;
}

const FORM_GLYPH: Record<MedicationForm, string> = {
  pill: '💊',
  liquid: '🧪',
  injection: '💉',
  topical: '🧴',
  drops: '💧',
  chew: '🦴',
};

const STATE_META: Record<MedicationState, { label: string; tone: 'warn' | 'primary' | 'success' | 'danger' }> = {
  due: { label: 'Due now', tone: 'warn' },
  upcoming: { label: 'Upcoming', tone: 'primary' },
  taken: { label: 'Taken', tone: 'success' },
  missed: { label: 'Missed', tone: 'danger' },
};

/**
 * MedicationReminder — **V4** "companion" design. The warm, friendly take on a
 * dose reminder: an elevated rounded card with a soft shadow, the form glyph in a
 * soft-primary tinted well, a bold title with muted dose/frequency meta, a
 * labelled state Badge, the next-dose time and doses-left rendered as small
 * soft-primary chips, and a rounded "Mark taken" CTA. Same props/behavior as
 * {@link MedicationReminderProps}; every `form` and `state` reads via a glyph +
 * labelled Badge/chip (never color alone). Token-only colors via
 * `useXenitionTheme()`. The `onMarkTaken` action is a tappable control with a
 * ≥44px tap target. Web/native parity.
 */
export function MedicationReminderV4({
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
  variant = 'card',
}: MedicationReminderV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const stateMeta = STATE_META[state];
  const showMark = onMarkTaken != null && state !== 'taken';
  const title = [name, dosage].filter(Boolean).join(' · ');

  if (variant === 'compact') {
    return (
      <View
        accessibilityLabel={`${title}, ${stateMeta.label}${nextDose ? `, next dose ${nextDose}` : ''}`}
        style={[
          {
            minHeight: 44,
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.sm,
            shadowColor: colors.onSurface,
            shadowOpacity: 0.08,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
            elevation: 3,
          },
          style,
        ]}
      >
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(colors.primary, 0.1),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg }}>
            {FORM_GLYPH[form]}
          </Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.sm }}>
          <Text numberOfLines={1} style={{ flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {name}
          </Text>
          {dosage ? (
            <Text numberOfLines={1} style={{ flexShrink: 1, color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {dosage}
            </Text>
          ) : null}
        </View>
        <Badge tone={stateMeta.tone} variant="soft" size="sm">
          {stateMeta.label}
        </Badge>
        {showMark ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${markLabel}: ${name}`}
            onPress={onMarkTaken}
            style={({ pressed }) => ({
              width: 44,
              height: 44,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: tokens.radius.md,
              borderWidth: 1,
              borderColor: colors.primary,
              backgroundColor: withAlpha(colors.primary, 0.1),
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>✓</Text>
          </Pressable>
        ) : null}
      </View>
    );
  }

  return (
    <View
      accessibilityLabel={`${title}, ${stateMeta.label}${nextDose ? `, next dose ${nextDose}` : ''}`}
      style={[
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.sm,
          shadowColor: colors.onSurface,
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 3,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(colors.primary, 0.1),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xl }}>
            {FORM_GLYPH[form]}
          </Text>
        </View>
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
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.sm }}>
          {nextDose ? (
            <View style={{ backgroundColor: withAlpha(colors.primary, 0.1), borderRadius: tokens.radius.full, paddingHorizontal: tokens.spacing.sm, paddingVertical: 2 }}>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>⏰ {nextDose}</Text>
            </View>
          ) : null}
          {dosesLeft != null ? (
            <View style={{ backgroundColor: withAlpha(colors.primary, 0.1), borderRadius: tokens.radius.full, paddingHorizontal: tokens.spacing.sm, paddingVertical: 2 }}>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                {dosesLeft} dose{dosesLeft === 1 ? '' : 's'} left
              </Text>
            </View>
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
            minHeight: 44,
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            borderRadius: tokens.radius.md,
            borderWidth: 1,
            borderColor: colors.primary,
            backgroundColor: withAlpha(colors.primary, 0.1),
            paddingVertical: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.md,
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>✓ {markLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
