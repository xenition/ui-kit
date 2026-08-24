import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';

export type HealthLogKind = 'symptom' | 'observation' | 'medication' | 'diet' | 'incident' | 'note';

interface KindMeta {
  glyph: string;
  label: string;
  slot: keyof SemanticColors;
}

const KIND_META: Record<HealthLogKind, KindMeta> = {
  symptom: { glyph: '🤒', label: 'Symptom', slot: 'danger' },
  observation: { glyph: '👀', label: 'Observation', slot: 'primary' },
  medication: { glyph: '💊', label: 'Medication', slot: 'accent' },
  diet: { glyph: '🍽️', label: 'Diet', slot: 'warn' },
  incident: { glyph: '⚠️', label: 'Incident', slot: 'danger' },
  note: { glyph: '📝', label: 'Note', slot: 'muted' },
};

export interface HealthLogEntry {
  id?: string | number;
  /** Entry category; drives the icon + accent. */
  kind: HealthLogKind;
  /** What happened. */
  text: string;
  /** When it was logged (already formatted). */
  timestamp?: string;
  /** Who logged it. */
  author?: string;
}

export interface PetHealthLogProps {
  /** Chronological log entries (newest first is conventional). */
  entries: HealthLogEntry[];
  /** Optional section title. */
  title?: string;
  /** Show a skeleton while data loads. */
  loading?: boolean;
  /** Copy shown when there are no entries. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A timeline of pet-health log entries — each a kind icon, text, and timestamp
 * threaded on a connective rail. Handles a `loading` skeleton and an explicit
 * empty state. Kind is conveyed by icon + label text, not color alone.
 * Token-only colors.
 */
export function PetHealthLog({
  entries,
  title,
  loading = false,
  emptyLabel = 'No health entries yet',
  style,
}: PetHealthLogProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const container: StyleProp<ViewStyle> = [
    {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: tokens.radius.lg,
      padding: tokens.spacing.lg,
      gap: tokens.spacing.md,
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
      <View style={{ gap: tokens.spacing.md }}>
        {entries.map((entry, i) => {
          const meta = KIND_META[entry.kind] ?? KIND_META.note;
          const last = i === entries.length - 1;
          return (
            <View
              key={entry.id ?? i}
              accessibilityLabel={`${meta.label}: ${entry.text}${entry.timestamp ? `, ${entry.timestamp}` : ''}`}
              style={{ flexDirection: 'row', gap: tokens.spacing.sm }}
            >
              <View style={{ alignItems: 'center' }}>
                <View
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: tokens.radius.full,
                    borderWidth: 1,
                    borderColor: colors[meta.slot],
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm }}>
                    {meta.glyph}
                  </Text>
                </View>
                {!last ? (
                  <View style={{ flex: 1, width: 1, marginTop: 2, backgroundColor: colors.border }} />
                ) : null}
              </View>
              <View style={{ flex: 1, gap: 2, paddingBottom: last ? 0 : tokens.spacing.sm }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
                  <Text style={{ color: colors[meta.slot], fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase' }}>
                    {meta.label}
                  </Text>
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
