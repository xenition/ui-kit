import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { PetHealthLogProps, HealthLogKind } from './PetHealthLog';

/** Drop-in for {@link PetHealthLogProps} — same props, the V4 "companion" design. */
export type PetHealthLogV4Props = PetHealthLogProps;

interface KindMeta {
  glyph: string;
  label: string;
  tone: 'danger' | 'primary' | 'accent' | 'warn' | 'neutral';
}

const KIND_META: Record<HealthLogKind, KindMeta> = {
  symptom: { glyph: '🤒', label: 'Symptom', tone: 'danger' },
  observation: { glyph: '👀', label: 'Observation', tone: 'primary' },
  medication: { glyph: '💊', label: 'Medication', tone: 'accent' },
  diet: { glyph: '🍽️', label: 'Diet', tone: 'warn' },
  incident: { glyph: '⚠️', label: 'Incident', tone: 'danger' },
  note: { glyph: '📝', label: 'Note', tone: 'neutral' },
};

/**
 * PetHealthLog — **V4** "companion" design (native parity of the web V4). The
 * warm, friendly take on a pet-health log: an elevated rounded card with a soft
 * shadow (no gradient — a clean surface) wrapping a list of entry rows. Each entry
 * is a soft-primary tinted well holding the kind glyph, a labelled kind Badge, the
 * text, and a muted timestamp. Kind is conveyed by glyph + labelled Badge (never
 * color alone). Preserves the `loading` skeleton and the explicit empty state.
 * Same props/behavior as {@link PetHealthLogProps}. Token-only colors via
 * `useXenitionTheme()`.
 */
export function PetHealthLogV4({
  entries,
  title,
  loading = false,
  emptyLabel = 'No health entries yet',
  style,
}: PetHealthLogV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const container: StyleProp<ViewStyle> = [
    {
      backgroundColor: colors.card,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: tokens.radius.lg,
      padding: tokens.spacing.lg,
      gap: tokens.spacing.md,
      shadowColor: colors.onSurface,
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 3,
    },
    style,
  ];

  const heading = title ? (
    <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{title}</Text>
  ) : null;

  if (loading) {
    return (
      <View accessibilityLabel="Loading health log" style={container}>
        {heading}
        {[0, 1, 2].map((i) => (
          <View key={i} style={{ height: 14, borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
        ))}
      </View>
    );
  }

  if (entries.length === 0) {
    return (
      <View accessibilityLabel={emptyLabel} style={container}>
        {heading}
        <View style={{ alignItems: 'center', paddingVertical: tokens.spacing.lg, gap: tokens.spacing.xs }}>
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['2xl'] }}>
            📋
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={container}>
      {heading}
      <View style={{ gap: tokens.spacing.sm }}>
        {entries.map((entry, i) => {
          const meta = KIND_META[entry.kind] ?? KIND_META.note;
          return (
            <View
              key={entry.id ?? i}
              accessibilityLabel={`${meta.label}: ${entry.text}${entry.timestamp ? `, ${entry.timestamp}` : ''}`}
              style={{
                flexDirection: 'row',
                gap: tokens.spacing.sm,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: tokens.radius.md,
                padding: tokens.spacing.sm,
              }}
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
                <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.base }}>
                  {meta.glyph}
                </Text>
              </View>
              <View style={{ flex: 1, gap: 2 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
                  <Badge tone={meta.tone} variant="soft" size="sm">
                    {meta.label}
                  </Badge>
                  {entry.timestamp ? (
                    <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{entry.timestamp}</Text>
                  ) : null}
                </View>
                <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>{entry.text}</Text>
                {entry.author ? (
                  <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>— {entry.author}</Text>
                ) : null}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
