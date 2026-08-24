import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, Icon, type BadgeTone } from '../primitives';
import type { InspectionRowProps, InspectionResult } from './InspectionRow';

/**
 * Alternate design (v3) of {@link InspectionRow} — a drop-in with the **same
 * props**. The *dense line*: a small result glyph, the checkpoint label on one
 * line (code inline, muted), and the result word pinned to the trailing edge.
 * Result is glyph + label + a token slot (pass→success, fail→danger) — never
 * color alone. Token-pure.
 */
export type InspectionRowV3Props = InspectionRowProps;

interface Desc {
  label: string;
  glyph: string;
  tone: BadgeTone;
  /** Text slot safe on the surface (an on-surface contrast-checked hue). */
  textSlot: 'successText' | 'dangerText' | 'primaryText' | 'muted';
  iconSlot: 'success' | 'danger' | 'primary' | 'muted';
}

const RESULT: Record<InspectionResult, Desc> = {
  pass: { label: 'Pass', glyph: '✓', tone: 'success', textSlot: 'successText', iconSlot: 'success' },
  fail: { label: 'Fail', glyph: '✕', tone: 'danger', textSlot: 'dangerText', iconSlot: 'danger' },
  na: { label: 'N/A', glyph: '–', tone: 'neutral', textSlot: 'muted', iconSlot: 'muted' },
  pending: { label: 'Pending', glyph: '○', tone: 'primary', textSlot: 'primaryText', iconSlot: 'primary' },
};

export function InspectionRowV3({
  label,
  result,
  code,
  note,
  onPress,
  style,
}: InspectionRowV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const rd = RESULT[result] ?? RESULT.pending;

  const rowStyle = {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: tokens.spacing.sm,
    paddingVertical: tokens.spacing.xs,
    paddingHorizontal: tokens.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  };

  const a11y = `${label}, ${rd.label}`;
  const Container: React.ElementType = onPress ? Pressable : View;

  return (
    <Container
      accessible
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={a11y}
      onPress={onPress}
      style={onPress ? ({ pressed }: { pressed: boolean }) => [rowStyle, style, { opacity: pressed ? 0.7 : 1 }] : [rowStyle, style]}
    >
      <Icon glyph={rd.glyph} size="sm" color={rd.iconSlot} accessibilityLabel={rd.label} />
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {label}
          {code != null ? <Text style={{ color: colors.muted, fontWeight: '400' }}>{`   ${code}`}</Text> : null}
        </Text>
        {note != null ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {note}
          </Text>
        ) : null}
      </View>
      <Text style={{ color: colors[rd.textSlot], fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
        {`${rd.glyph} ${rd.label}`}
      </Text>
    </Container>
  );
}
