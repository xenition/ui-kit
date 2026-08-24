import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';

export type VitalStatus = 'normal' | 'low' | 'high' | 'critical';

export interface VitalReading {
  /** Stable key + label, e.g. "Heart rate". */
  label: string;
  /** Measured value (number or preformatted, e.g. "120/80"). */
  value: React.ReactNode;
  /** Unit, e.g. "bpm", "mmHg". */
  unit?: string;
  /** Optional leading glyph. */
  glyph?: string;
  /** Flag vs. expected range. Shown by glyph + text, never color alone. */
  status?: VitalStatus;
}

interface StatusMeta {
  glyph: string;
  label: string;
  color: keyof SemanticColors;
}

const STATUS_META: Record<VitalStatus, StatusMeta> = {
  normal: { glyph: '✓', label: 'Normal', color: 'success' },
  low: { glyph: '▼', label: 'Low', color: 'warn' },
  high: { glyph: '▲', label: 'High', color: 'warn' },
  critical: { glyph: '⚠', label: 'Critical', color: 'danger' },
};

export interface VitalsPanelProps {
  /** The vital readings to tile out. */
  vitals: VitalReading[];
  /** Optional panel heading. */
  title?: string;
  /** Skeleton placeholder while readings load. */
  loading?: boolean;
  /** Message shown when `vitals` is empty. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A vitals dashboard panel: a responsive grid of reading tiles (heart rate,
 * blood pressure, SpO₂, temperature, …). Each tile shows value + unit and, when
 * flagged, a normal / low / high / critical marker drawn as a glyph + label +
 * warn/danger token color so it is never color-only. Renders a loading skeleton
 * and an empty note. Informational UI only — not a medical device. Token-only
 * colors.
 */
export function VitalsPanel({
  vitals,
  title,
  loading = false,
  emptyLabel = 'No vitals recorded',
  style,
}: VitalsPanelProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const header = title ? (
    <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{title}</Text>
  ) : null;

  const shell = (children: React.ReactNode): React.ReactElement => (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.md,
          gap: tokens.spacing.md,
        },
        style,
      ]}
    >
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
            style={{ flexBasis: '47%', flexGrow: 1, height: 64, borderRadius: tokens.radius.md, backgroundColor: tokens.ramps.neutral[100] }}
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
      {vitals.map((v, i) => {
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
              gap: 2,
              padding: tokens.spacing.sm,
              borderRadius: tokens.radius.md,
              backgroundColor: tokens.ramps.neutral[100],
            }}
          >
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {v.glyph ? `${v.glyph} ` : ''}
              {v.label}
            </Text>
            <Text style={{ color: abnormal ? statusColor : colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }}>
              {v.value}
              {v.unit ? <Text style={{ fontSize: tokens.typography.scale.xs, fontWeight: '500' }}> {v.unit}</Text> : null}
            </Text>
            {meta ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
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
