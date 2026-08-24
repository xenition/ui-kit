import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';

export type LabStatus = 'normal' | 'low' | 'high' | 'critical';

interface StatusMeta {
  /** Non-color cue (glyph) so status is never color-only. */
  glyph: string;
  label: string;
  color: keyof SemanticColors;
}

const STATUS_META: Record<LabStatus, StatusMeta> = {
  normal: { glyph: '✓', label: 'Normal', color: 'success' },
  low: { glyph: '▼', label: 'Low', color: 'warn' },
  high: { glyph: '▲', label: 'High', color: 'warn' },
  critical: { glyph: '⚠', label: 'Critical', color: 'danger' },
};

export interface LabResultRowProps {
  /** Analyte / test name, e.g. "Hemoglobin". */
  name: string;
  /** Measured value (number or preformatted string). */
  value: React.ReactNode;
  /** Unit, e.g. "g/dL". */
  unit?: string;
  /** Reference range text, e.g. "13.5–17.5". */
  referenceRange?: string;
  /** Flag relative to the reference range. Shown by glyph + label + color. */
  status?: LabStatus;
  /** Collection date/time line. */
  collectedAt?: string;
  /** Fires when the row is pressed (e.g. open full result). */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single lab-result row: analyte name, measured value + unit, reference
 * range, and a normal / low / high / critical flag. The flag is rendered as a
 * glyph (`✓ ▼ ▲ ⚠`) plus a text label plus a warn/danger token color, so an
 * abnormal result is never signalled by color alone (accessibility + the
 * project token contract). Informational UI only — not a medical device.
 * Token-only colors.
 */
export function LabResultRow({
  name,
  value,
  unit,
  referenceRange,
  status = 'normal',
  collectedAt,
  onPress,
  style,
}: LabResultRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATUS_META[status];
  const statusColor = colors[meta.color];
  const abnormal = status !== 'normal';

  const a11y = `${name}: ${String(value)}${unit ? ` ${unit}` : ''}, ${meta.label}${referenceRange ? `, reference ${referenceRange}` : ''}`;

  const content = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
          minHeight: 56,
        },
        style,
      ]}
    >
      <View style={{ flex: 1, gap: 2 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
          {name}
        </Text>
        {referenceRange ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            Ref {referenceRange}
            {unit ? ` ${unit}` : ''}
          </Text>
        ) : null}
        {collectedAt ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {collectedAt}
          </Text>
        ) : null}
      </View>

      <View style={{ alignItems: 'flex-end', gap: 2 }}>
        <Text style={{ color: abnormal ? statusColor : colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
          {value}
          {unit ? <Text style={{ fontSize: tokens.typography.scale.xs, fontWeight: '500' }}> {unit}</Text> : null}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text allowFontScaling={false} style={{ color: statusColor, fontSize: tokens.typography.scale.xs }}>
            {meta.glyph}
          </Text>
          <Text style={{ color: statusColor, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
            {meta.label}
          </Text>
        </View>
      </View>
    </View>
  );

  if (!onPress) {
    return <View accessibilityLabel={a11y}>{content}</View>;
  }
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={a11y}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
    >
      {content}
    </Pressable>
  );
}
