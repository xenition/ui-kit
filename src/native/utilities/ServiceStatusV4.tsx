import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Icon, Badge } from '../primitives';
import { utilityKind, serviceState } from './internal/status';
import { GradientSurface } from './internal/GradientSurface';
import { brandDisc, brandInk } from './internal/brand';
import type { ServiceStatusProps } from './ServiceStatus';

/** Drop-in for {@link ServiceStatusProps} — same props, a different design. */
export type ServiceStatusV4Props = ServiceStatusProps;

/**
 * ServiceStatus — **V4** design. The clean, trust-first service card: an elevated
 * rounded surface, the utility-kind glyph in a small brand-gradient disc (the
 * signature V4 touch), and the operational `state` carried by a status `Badge`.
 * The state (active → success, outage → danger, maintenance/degraded → warn) is
 * still conveyed by **glyph + label + a color that traces to a `SemanticColors`
 * slot** — never color alone. Purely presentational; same props as
 * {@link ServiceStatusProps}; token-only colors.
 */
export function ServiceStatusV4({
  kind,
  state,
  location,
  updated,
  detail,
  style,
}: ServiceStatusV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const kd = utilityKind(kind);
  const sd = serviceState(state);

  const card = {
    backgroundColor: colors.card,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  } as const;

  return (
    <View style={[card, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <GradientSurface
          colors={brandDisc(r)}
          style={{
            width: 48,
            height: 48,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <Icon glyph={kd.glyph} size="xl" accessibilityLabel={`${kd.label} service`} style={{ color: brandInk(r) }} />
        </GradientSurface>
        <View style={{ flex: 1, gap: 2 }}>
          <Text
            numberOfLines={1}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
          >
            {kd.label}
          </Text>
          {location != null ? (
            <Text numberOfLines={1} style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>
              {location}
            </Text>
          ) : null}
        </View>
        <Badge tone={sd.tone} variant="soft">
          {`${sd.glyph} ${sd.label}`}
        </Badge>
      </View>

      {detail != null ? (
        <Text style={{ marginTop: tokens.spacing.md, color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>
          {detail}
        </Text>
      ) : null}
      {updated != null ? (
        <Text style={{ marginTop: tokens.spacing.xs, color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>
          Updated {updated}
        </Text>
      ) : null}
    </View>
  );
}
