import * as React from 'react';
import { Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { VitalsPanelProps, VitalReading, VitalStatus } from './VitalsPanel';

/** Drop-in for {@link VitalsPanelProps} — same props, the V4 "clinic" design. */
export type VitalsPanelV4Props = VitalsPanelProps;

interface StatusMeta {
  glyph: string;
  label: string;
  color: keyof SemanticColors;
}

const STATUS_META: Record<VitalStatus, StatusMeta> = {
  normal: { glyph: '✓', label: 'Normal', color: 'success' },
  low: { glyph: '↓', label: 'Low', color: 'warn' },
  high: { glyph: '↑', label: 'High', color: 'warn' },
  critical: { glyph: '⚠', label: 'Critical', color: 'danger' },
};

/**
 * VitalsPanel — **V4** "clinic" design. The calm, clinical take on a vitals
 * dashboard: an elevated rounded surface with a soft shadow holding a responsive
 * grid of reading tiles (heart rate, blood pressure, SpO₂, temperature, …). Each
 * tile shows a big legible **tabular-nums** value + unit; when a reading is
 * abnormal it is flagged by an ↑/↓ (or ⚠) glyph + a text label + a warn/danger
 * token tone, so severity is never color alone. Renders a loading skeleton and an
 * empty note. Identical props/behavior to {@link VitalsPanelProps}. Token-only
 * colors via `useXenitionTheme()`. Informational UI only — not a medical device.
 */
export function VitalsPanelV4({
  vitals,
  title,
  loading = false,
  emptyLabel = 'No vitals recorded',
  style,
}: VitalsPanelV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const header = title ? (
    <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{title}</Text>
  ) : null;

  const shellStyle: ViewStyle = {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    gap: tokens.spacing.md,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  };

  const shell = (children: React.ReactNode): React.ReactElement => (
    <View style={[shellStyle, style]}>
      {header}
      {children}
    </View>
  );

  if (loading) {
    return shell(
      <View accessibilityLabel="Loading vitals" style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}>
        {[0, 1, 2, 3].map((i) => (
          <View
            key={i}
            style={{ flexBasis: '47%', flexGrow: 1, height: 80, borderRadius: tokens.radius.md, backgroundColor: tokens.ramps.neutral[100] }}
          />
        ))}
      </View>
    );
  }

  if (vitals.length === 0) {
    return shell(<Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>);
  }

  return shell(
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}>
      {vitals.map((v: VitalReading, i) => {
        const meta = v.status ? STATUS_META[v.status] : undefined;
        const abnormal = v.status != null && v.status !== 'normal';
        const statusColor = meta ? colors[meta.color] : colors.onSurface;
        return (
          <View
            key={`${v.label}-${i}`}
            accessibilityLabel={`${v.label}: ${String(v.value)}${v.unit ? ` ${v.unit}` : ''}${meta ? `, ${meta.label}` : ''}`}
            style={{
              flexBasis: '47%',
              flexGrow: 1,
              gap: tokens.spacing.xs,
              padding: tokens.spacing.md,
              borderRadius: tokens.radius.md,
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: colors.surface,
            }}
          >
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {v.glyph ? `${v.glyph} ` : ''}
              {v.label}
            </Text>
            <Text style={{ color: abnormal ? statusColor : colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '700', fontVariant: ['tabular-nums'] }}>
              {v.value}
              {v.unit ? <Text style={{ fontSize: tokens.typography.scale.xs, fontWeight: '500' }}> {v.unit}</Text> : null}
            </Text>
            {meta ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'flex-start',
                  gap: tokens.spacing.xs,
                  paddingHorizontal: tokens.spacing.sm,
                  paddingVertical: tokens.spacing.xs,
                  borderRadius: tokens.radius.full,
                  backgroundColor: abnormal ? withAlpha(colors.primary, 0.1) : tokens.ramps.neutral[100],
                }}
              >
                <Text allowFontScaling={false} style={{ color: statusColor, fontSize: tokens.typography.scale.xs }}>
                  {meta.glyph}
                </Text>
                <Text style={{ color: statusColor, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>{meta.label}</Text>
              </View>
            ) : null}
          </View>
        );
      })}
    </View>
  );
}
