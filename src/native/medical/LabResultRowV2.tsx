import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { useEnter } from '../primitives/internal/motion';
import { shadow } from '../primitives/internal/elevation';
import { withAlpha } from '../primitives/internal/color';
import type { LabResultRowProps, LabStatus } from './LabResultRow';

/** Same public contract as {@link LabResultRow} — a drop-in alternate design. */
export type LabResultRowV2Props = LabResultRowProps;

interface StatusMeta {
  glyph: string;
  label: string;
  /** Text/glyph color (AA-safe *Text slot for abnormal states). */
  color: keyof SemanticColors;
  /** Fill slot for the status band tint. */
  fill: keyof SemanticColors;
}

const STATUS_META: Record<LabStatus, StatusMeta> = {
  normal: { glyph: '✓', label: 'Normal', color: 'successText', fill: 'success' },
  low: { glyph: '▼', label: 'Low', color: 'warnText', fill: 'warn' },
  high: { glyph: '▲', label: 'High', color: 'warnText', fill: 'warn' },
  critical: { glyph: '⚠', label: 'Critical', color: 'dangerText', fill: 'danger' },
};

/**
 * LabResultRow, redesigned (v2): an **elevated result card**. The measured value
 * is set very large as the centrepiece, and a full-width status band across the
 * foot carries the glyph + word flag (Normal / Low / High / Critical) over a
 * tinted fill — so an abnormal result reads instantly yet never on color alone.
 * Analyte name and reference range head the card. Lifted with a shadow and a
 * fade-in mount — distinct at a glance from v1's dense line. Same props,
 * token-pure.
 */
export function LabResultRowV2({
  name,
  value,
  unit,
  referenceRange,
  status = 'normal',
  collectedAt,
  onPress,
  style,
}: LabResultRowV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const meta = STATUS_META[status];
  const statusColor = colors[meta.color];
  const bandFill = colors[meta.fill];
  const abnormal = status !== 'normal';

  const a11y = `${name}: ${String(value)}${unit ? ` ${unit}` : ''}, ${meta.label}${referenceRange ? `, reference ${referenceRange}` : ''}`;

  const card = (
    <Animated.View
      style={[
        {
          backgroundColor: colors.surface,
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
          opacity: enter.opacity,
          transform: enter.transform,
          ...shadow('md', tokens),
        },
        style,
      ]}
    >
      <View style={{ padding: tokens.spacing.lg, gap: tokens.spacing.xs }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
          <Text numberOfLines={1} style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {name}
          </Text>
          {referenceRange ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              Ref {referenceRange}
              {unit ? ` ${unit}` : ''}
            </Text>
          ) : null}
        </View>

        <Text style={{ color: abnormal ? statusColor : colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '700' }}>
          {value}
          {unit ? <Text style={{ fontSize: tokens.typography.scale.sm, fontWeight: '500', color: colors.muted }}> {unit}</Text> : null}
        </Text>

        {collectedAt ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {collectedAt}
          </Text>
        ) : null}
      </View>

      {/* Status band — tinted fill + glyph + word, never color alone. */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.xs,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.lg,
          backgroundColor: withAlpha(bandFill, 0.12),
        }}
      >
        <Text allowFontScaling={false} style={{ color: statusColor, fontSize: tokens.typography.scale.sm }}>
          {meta.glyph}
        </Text>
        <Text style={{ color: statusColor, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          {meta.label}
        </Text>
      </View>
    </Animated.View>
  );

  if (!onPress) {
    return <View accessibilityLabel={a11y}>{card}</View>;
  }
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={a11y} onPress={onPress}>
      {card}
    </Pressable>
  );
}
