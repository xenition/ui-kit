import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Icon } from '../primitives';
import { shadow } from '../primitives/internal/elevation';
import { withAlpha } from './internal/format';
import { utilityKind, serviceState } from './internal/status';
import type { ServiceStatusProps } from './ServiceStatus';

/** Same public contract as {@link ServiceStatus} — a drop-in alternate design. */
export type ServiceStatusV2Props = ServiceStatusProps;

/**
 * ServiceStatus, redesigned (v2): a **big status banner card**. A state-tinted
 * banner fills the top with a large service-glyph tile and an oversized state
 * headline (glyph + label) beside the utility line and location; the detail and
 * "updated" caption sit in a plain body below. Lifted with a shadow. Distinct at
 * a glance from v1's slim left-rail card and v3's inline chip. Same props; state
 * is glyph + label + a tint that traces to a `SemanticColors` slot (never color
 * alone); token-pure.
 */
export function ServiceStatusV2({
  kind,
  state,
  location,
  updated,
  detail,
  style,
}: ServiceStatusV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const kd = utilityKind(kind);
  const sd = serviceState(state);
  const tint = sd.tone === 'neutral' ? colors.muted : colors[sd.tone];
  const hasBody = detail != null || updated != null;

  return (
    <View
      style={[
        {
          borderRadius: tokens.radius.lg,
          backgroundColor: colors.surface,
          overflow: 'hidden',
          ...shadow('lg', tokens),
        },
        style,
      ]}
    >
      {/* Tinted status banner */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          padding: tokens.spacing.lg,
          backgroundColor: withAlpha(tint, 0.12),
        }}
      >
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: withAlpha(tint, 0.18),
          }}
        >
          <Icon glyph={kd.glyph} size="2xl" accessibilityLabel={`${kd.label} service`} />
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={{ color: tint, fontSize: tokens.typography.scale.xl, fontWeight: '800' }}>
            {`${sd.glyph} ${sd.label}`}
          </Text>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
            {kd.label}
            {location != null ? ` · ${location}` : ''}
          </Text>
        </View>
      </View>

      {hasBody ? (
        <View style={{ padding: tokens.spacing.lg, gap: tokens.spacing.xs }}>
          {detail != null ? (
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>{detail}</Text>
          ) : null}
          {updated != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Updated {updated}</Text>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}
