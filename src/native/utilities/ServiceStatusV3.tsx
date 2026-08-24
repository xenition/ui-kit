import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Icon, Badge } from '../primitives';
import { utilityKind, serviceState } from './internal/status';
import type { ServiceStatusProps } from './ServiceStatus';

/** Same public contract as {@link ServiceStatus} — a drop-in alternate design. */
export type ServiceStatusV3Props = ServiceStatusProps;

/**
 * ServiceStatus, redesigned (v3): a **compact inline chip line**. A state dot +
 * utility glyph lead, the line label and a soft state badge sit together, and the
 * location / "updated" caption trails muted on the right — a single scannable row
 * with no card. Distinct at a glance from v1's rail card and v2's banner. Same
 * props; state is dot + glyph + label (never color alone); token-pure.
 */
export function ServiceStatusV3({
  kind,
  state,
  location,
  updated,
  style,
}: ServiceStatusV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const kd = utilityKind(kind);
  const sd = serviceState(state);
  const tint = sd.tone === 'neutral' ? colors.muted : colors[sd.tone];
  const trailing = [location, updated != null ? `Updated ${updated}` : undefined]
    .filter((s): s is string => s != null)
    .join(' · ');

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.xs,
        },
        style,
      ]}
    >
      <View style={{ width: 8, height: 8, borderRadius: tokens.radius.full, backgroundColor: tint }} />
      <Icon glyph={kd.glyph} size="sm" accessibilityLabel={`${kd.label} service`} />
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
        {kd.label}
      </Text>
      <Badge tone={sd.tone} variant="soft" size="sm">
        {`${sd.glyph} ${sd.label}`}
      </Badge>
      {trailing !== '' ? (
        <>
          <View style={{ flex: 1 }} />
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, flexShrink: 1 }}>
            {trailing}
          </Text>
        </>
      ) : null}
    </View>
  );
}
