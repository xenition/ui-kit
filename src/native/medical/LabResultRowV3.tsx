import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { usePressScale } from '../primitives/internal/motion';
import type { LabResultRowProps, LabStatus } from './LabResultRow';

/** Same public contract as {@link LabResultRow} — a drop-in alternate design. */
export type LabResultRowV3Props = LabResultRowProps;

interface StatusMeta {
  glyph: string;
  label: string;
  color: keyof SemanticColors;
}

const STATUS_META: Record<LabStatus, StatusMeta> = {
  normal: { glyph: '✓', label: 'Normal', color: 'successText' },
  low: { glyph: '▼', label: 'Low', color: 'warnText' },
  high: { glyph: '▲', label: 'High', color: 'warnText' },
  critical: { glyph: '⚠', label: 'Critical', color: 'dangerText' },
};

/**
 * LabResultRow, redesigned (v3): a **dense scan line**. The analyte name leads
 * one flexible line, the value + unit hug the right edge, and the flag reduces
 * to a leading glyph + word ("▲ High") in an AA-safe status color — never color
 * alone. No card, no reference stack — a lean line tuned for long panels; the
 * reference range collapses under the name only when present. Distinct at a
 * glance from v1's row and v2's value card. Same props, token-pure.
 */
export function LabResultRowV3({
  name,
  value,
  unit,
  referenceRange,
  status = 'normal',
  collectedAt,
  onPress,
  style,
}: LabResultRowV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const meta = STATUS_META[status];
  const statusColor = colors[meta.color];
  const abnormal = status !== 'normal';

  const sub = [referenceRange ? `Ref ${referenceRange}${unit ? ` ${unit}` : ''}` : undefined, collectedAt]
    .filter(Boolean)
    .join(' · ');
  const a11y = `${name}: ${String(value)}${unit ? ` ${unit}` : ''}, ${meta.label}${referenceRange ? `, reference ${referenceRange}` : ''}`;

  const body = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          minHeight: 44,
        },
        style,
      ]}
    >
      {/* Leading glyph + word status. */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, minWidth: 74 }}>
        <Text allowFontScaling={false} style={{ color: statusColor, fontSize: tokens.typography.scale.xs }}>
          {meta.glyph}
        </Text>
        <Text style={{ color: statusColor, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
          {meta.label}
        </Text>
      </View>

      <View style={{ flex: 1, gap: 1 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {name}
        </Text>
        {sub !== '' ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {sub}
          </Text>
        ) : null}
      </View>

      <Text style={{ color: abnormal ? statusColor : colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
        {value}
        {unit ? <Text style={{ fontSize: tokens.typography.scale.xs, fontWeight: '500', color: colors.muted }}> {unit}</Text> : null}
      </Text>
    </View>
  );

  if (!onPress) {
    return <View accessibilityLabel={a11y}>{body}</View>;
  }
  return (
    <Animated.View style={{ transform: [{ scale: press.scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={a11y}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
      >
        {body}
      </Pressable>
    </Animated.View>
  );
}
