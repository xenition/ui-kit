import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, Icon, Badge, type BadgeTone } from '../primitives';
import { withAlpha } from './internal/format';

/** Inspection result — text + glyph + color (never color-alone). */
export type InspectionResult = 'pass' | 'fail' | 'na' | 'pending';

interface ResultDescriptor {
  label: string;
  glyph: string;
  tone: BadgeTone;
  /** Semantic slot used for the tinted disc; `neutral` maps to `muted`. */
  slot: 'success' | 'danger' | 'muted' | 'primary';
}

const INSPECTION_RESULT: Record<InspectionResult, ResultDescriptor> = {
  pass: { label: 'Pass', glyph: '✓', tone: 'success', slot: 'success' },
  fail: { label: 'Fail', glyph: '✕', tone: 'danger', slot: 'danger' },
  na: { label: 'N/A', glyph: '–', tone: 'neutral', slot: 'muted' },
  pending: { label: 'Pending', glyph: '○', tone: 'primary', slot: 'primary' },
};

export interface InspectionRowProps {
  /** Inspection checkpoint label (e.g. "Fire extinguisher charged"). */
  label: string;
  /** Result — conveyed by text + glyph + color. */
  result: InspectionResult;
  /** Reference code shown as a meta line (e.g. "NFPA 10"). */
  code?: string;
  /** Inspector note / defect description shown under the label. */
  note?: string;
  /** Fires on row press (e.g. open the checkpoint detail). */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * One line in an inspection checklist: a tinted result glyph disc, a
 * label/code/note stack, and a result pill. The result is conveyed redundantly
 * (glyph + label + a color that traces to a `SemanticColors` slot: pass →
 * success, fail → danger) so it is never color-alone. Becomes a button only
 * when `onPress` is supplied. No literal colors.
 */
export function InspectionRow({
  label,
  result,
  code,
  note,
  onPress,
  style,
}: InspectionRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const rd = INSPECTION_RESULT[result] ?? INSPECTION_RESULT.pending;
  const tint = rd.slot === 'muted' ? colors.muted : colors[rd.slot];

  const row = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(tint, 0.14),
        }}
      >
        <Icon glyph={rd.glyph} color={rd.slot} accessibilityLabel={rd.label} />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={2}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
        >
          {label}
        </Text>
        {code != null ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{code}</Text>
        ) : null}
        {note != null ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{note}</Text>
        ) : null}
      </View>
      <Badge tone={rd.tone} variant="soft" size="sm">{`${rd.glyph} ${rd.label}`}</Badge>
    </View>
  );

  if (!onPress) return row;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${label}, ${rd.label}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
    >
      {row}
    </Pressable>
  );
}
