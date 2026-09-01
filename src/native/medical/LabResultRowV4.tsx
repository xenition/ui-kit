import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { LabResultRowProps, LabStatus } from './LabResultRow';

/** V4 layout choices for the "clinic" design. */
export type LabResultRowLayout = 'full' | 'compact';

/** Drop-in for {@link LabResultRowProps} — same props, the V4 "clinic" design. */
export interface LabResultRowV4Props extends LabResultRowProps {
  /** V4 layout: `full` (default) or `compact` (denser single line). */
  variant?: LabResultRowLayout;
}

type Tone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger';

const STATUS_META: Record<
  LabStatus,
  { glyph: string; arrow?: string; label: string; tone: Tone; color: 'success' | 'warn' | 'danger' }
> = {
  normal: { glyph: '✓', label: 'Normal', tone: 'success', color: 'success' },
  low: { glyph: '▼', arrow: '↓', label: 'Low', tone: 'warn', color: 'warn' },
  high: { glyph: '▲', arrow: '↑', label: 'High', tone: 'warn', color: 'warn' },
  critical: { glyph: '⚠', arrow: '↑', label: 'Critical', tone: 'danger', color: 'danger' },
};

/**
 * LabResultRow — **V4** "clinic" design. The calm, clinical take on a lab
 * result: an elevated rounded row with a soft shadow, the analyte name, a big
 * legible **tabular-nums** value + unit, and a normal / low / high / critical
 * flag. Out-of-range values are colored by tone and marked with an ↑/↓ arrow
 * plus a labelled status Badge, so an abnormal result is never signalled by
 * color alone (accessibility + the token contract). Honors the V4 `variant` —
 * `full` (default, shows the reference range) and `compact` (a denser single
 * line that hides the reference-range detail) — identical props/behavior to
 * {@link LabResultRowProps}. Token-only colors via `useXenitionTheme()`.
 * Web/native parity of the V4 web component. Informational UI only — not a
 * medical device.
 */
export function LabResultRowV4({
  name,
  value,
  unit,
  referenceRange,
  status = 'normal',
  collectedAt,
  onPress,
  variant = 'full',
  style,
}: LabResultRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATUS_META[status];
  const statusColor = colors[meta.color];
  const abnormal = status !== 'normal';

  const shell: ViewStyle = {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  };

  const a11y = `${name}: ${String(value)}${unit ? ` ${unit}` : ''}, ${meta.label}${
    referenceRange ? `, reference ${referenceRange}` : ''
  }`;

  const valueColor = abnormal ? statusColor : colors.onSurface;

  // ── compact: denser single line ──
  const content =
    variant === 'compact' ? (
      <View
        style={[
          shell,
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
            minHeight: 44,
          },
          style,
        ]}
      >
        <Text numberOfLines={1} style={{ flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {name}
        </Text>
        <Text style={{ marginLeft: 'auto', color: valueColor, fontSize: tokens.typography.scale.base, fontWeight: '700', fontVariant: ['tabular-nums'] }}>
          {abnormal && meta.arrow ? `${meta.arrow} ` : ''}
          {value}
          {unit ? <Text style={{ fontSize: tokens.typography.scale.xs, fontWeight: '500' }}> {unit}</Text> : null}
        </Text>
        <Badge tone={meta.tone} variant="soft" size="sm">
          {`${meta.glyph} ${meta.label}`}
        </Badge>
      </View>
    ) : (
      <View
        style={[
          shell,
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
            <View style={{ alignSelf: 'flex-start', backgroundColor: withAlpha(colors.primary, 0.1), borderRadius: tokens.radius.sm, paddingHorizontal: tokens.spacing.xs }}>
              <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                Ref {referenceRange}
                {unit ? ` ${unit}` : ''}
              </Text>
            </View>
          ) : null}
          {collectedAt ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {collectedAt}
            </Text>
          ) : null}
        </View>

        <View style={{ alignItems: 'flex-end', gap: 4 }}>
          <Text style={{ color: valueColor, fontSize: tokens.typography.scale['2xl'], fontWeight: '700', fontVariant: ['tabular-nums'] }}>
            {abnormal && meta.arrow ? `${meta.arrow} ` : ''}
            {value}
            {unit ? <Text style={{ fontSize: tokens.typography.scale.xs, fontWeight: '500' }}> {unit}</Text> : null}
          </Text>
          <Badge tone={meta.tone} variant="soft" size="sm">
            {`${meta.glyph} ${meta.label}`}
          </Badge>
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
