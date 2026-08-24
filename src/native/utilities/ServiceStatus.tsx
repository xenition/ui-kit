import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Card, Icon, Badge } from '../primitives';
import { withAlpha } from './internal/format';
import { utilityKind, serviceState, type UtilityKind, type ServiceState } from './internal/status';

export type { UtilityKind, ServiceState };

export interface ServiceStatusProps {
  /** Utility line — drives the leading glyph and label. */
  kind: UtilityKind;
  /** Operational state — conveyed by text + glyph + color. */
  state: ServiceState;
  /** Service point / address label (e.g. "123 Main St"). */
  location?: string;
  /** Localized "last updated" string. */
  updated?: string;
  /** Supporting detail line (e.g. "Crews on site · ETA 4:00 PM"). */
  detail?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A status card for one service connection. The `state` (active/outage/
 * maintenance/degraded) is conveyed by **glyph + label + a tint that traces to a
 * `SemanticColors` slot** (active → success, outage → danger) — never color
 * alone. A left rail tinted to the state's tone reinforces it without carrying
 * the signal by itself. Purely presentational; every color traces to a token.
 */
export function ServiceStatus({
  kind,
  state,
  location,
  updated,
  detail,
  style,
}: ServiceStatusProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const kd = utilityKind(kind);
  const sd = serviceState(state);
  const tint = sd.tone === 'neutral' ? colors.muted : colors[sd.tone];

  return (
    <Card
      variant="outlined"
      style={[{ flexDirection: 'row', alignItems: 'stretch', gap: tokens.spacing.md }, style]}
    >
      <View
        style={{
          width: 4,
          borderRadius: tokens.radius.full,
          backgroundColor: tint,
        }}
      />
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: tokens.radius.md,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: withAlpha(tint, 0.14),
            }}
          >
            <Icon glyph={kd.glyph} size="lg" accessibilityLabel={`${kd.label} service`} />
          </View>
          <View style={{ flex: 1, gap: 2 }}>
            <Text
              numberOfLines={1}
              style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
            >
              {kd.label}
            </Text>
            {location != null ? (
              <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                {location}
              </Text>
            ) : null}
          </View>
          <Badge tone={sd.tone} variant="soft">
            {`${sd.glyph} ${sd.label}`}
          </Badge>
        </View>

        {detail != null ? (
          <Text style={{ marginTop: tokens.spacing.sm, color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>
            {detail}
          </Text>
        ) : null}
        {updated != null ? (
          <Text style={{ marginTop: tokens.spacing.xs, color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            Updated {updated}
          </Text>
        ) : null}
      </View>
    </Card>
  );
}
