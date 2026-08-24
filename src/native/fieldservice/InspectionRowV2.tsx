import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, Icon, Badge, type BadgeTone } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import { useEnter } from '../primitives/internal/motion';
import type { InspectionRowProps, InspectionResult } from './InspectionRow';

/**
 * Alternate design (v2) of {@link InspectionRow} — a drop-in with the **same
 * props**. Where the original is a thin row with a small disc, V2 is an
 * *elevated checkpoint card* fronted by a large **pass / fail marker** (a
 * tinted square carrying the result glyph), the label / code / note stack, and
 * a bold **result banner** down the trailing edge. Result is glyph + label +
 * a token slot (pass→success, fail→danger) — never color alone. Token-pure.
 */
export type InspectionRowV2Props = InspectionRowProps;

interface Desc {
  label: string;
  glyph: string;
  tone: BadgeTone;
  slot: 'success' | 'danger' | 'primary' | 'muted';
}

const RESULT: Record<InspectionResult, Desc> = {
  pass: { label: 'Pass', glyph: '✓', tone: 'success', slot: 'success' },
  fail: { label: 'Fail', glyph: '✕', tone: 'danger', slot: 'danger' },
  na: { label: 'N/A', glyph: '–', tone: 'neutral', slot: 'muted' },
  pending: { label: 'Pending', glyph: '○', tone: 'primary', slot: 'primary' },
};

export function InspectionRowV2({
  label,
  result,
  code,
  note,
  onPress,
  style,
}: InspectionRowV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const rd = RESULT[result] ?? RESULT.pending;
  const tint = colors[rd.slot];

  const surface = {
    flexDirection: 'row' as const,
    alignItems: 'stretch' as const,
    gap: tokens.spacing.md,
    borderRadius: tokens.radius.lg,
    backgroundColor: colors.surface,
    padding: tokens.spacing.md,
    ...shadow('md', tokens),
  };

  const inner = (
    <View style={surface}>
      <View
        style={{
          width: 52,
          height: 52,
          borderRadius: tokens.radius.md,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(tint, 0.14),
        }}
      >
        <Icon glyph={rd.glyph} size="2xl" color={rd.slot} accessibilityLabel={rd.label} />
      </View>
      <View style={{ flex: 1, justifyContent: 'center', gap: 2 }}>
        <Text numberOfLines={2} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
          {label}
        </Text>
        {code != null ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, letterSpacing: 0.5 }}>{code}</Text> : null}
        {note != null ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{note}</Text> : null}
      </View>
      <View style={{ justifyContent: 'center' }}>
        <Badge tone={rd.tone} variant="soft">{`${rd.glyph} ${rd.label}`}</Badge>
      </View>
    </View>
  );

  const a11y = `${label}, ${rd.label}`;

  return (
    <Animated.View style={[{ opacity: enter.opacity, transform: enter.transform }, style]}>
      {onPress ? (
        <Pressable accessible accessibilityRole="button" accessibilityLabel={a11y} onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}>
          {inner}
        </Pressable>
      ) : (
        <View accessible accessibilityLabel={a11y}>
          {inner}
        </View>
      )}
    </Animated.View>
  );
}
