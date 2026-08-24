import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { StatusDot, type StatusDotTone } from '../primitives/StatusDot';
import { type AgentPresence, type AgentStatusProps } from './AgentStatus';

/** Drop-in alternate design for {@link AgentStatus}. Identical public contract. */
export type AgentStatusV3Props = AgentStatusProps;

const PRESENCE: Record<AgentPresence, { dot: StatusDotTone; text: keyof SemanticColors; label: string }> = {
  online: { dot: 'success', text: 'successText', label: 'Online' },
  away: { dot: 'warn', text: 'warnText', label: 'Away' },
  offline: { dot: 'muted', text: 'muted', label: 'Offline' },
};

/**
 * AgentStatus — **V3 (compact inline)**. A single dense line: a status dot, the
 * agent name, the presence label, and an optional detail — sized to sit inline
 * in a list header or toolbar. Same `AgentStatusProps` as {@link AgentStatus}
 * (the `variant` prop is ignored — this IS the compact design). Presence is
 * carried by dot + text; token colors only.
 */
export function AgentStatusV3({
  presence,
  name,
  detail,
  onPress,
  style,
}: AgentStatusV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const spec = PRESENCE[presence] ?? PRESENCE.offline;
  const a11y = `${name ? `${name}, ` : ''}${spec.label}${detail ? `, ${detail}` : ''}`;

  const inner = (
    <>
      <StatusDot tone={spec.dot} pulse={presence === 'online'} size={8} />
      {name ? (
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}
        >
          {name}
        </Text>
      ) : null}
      <Text style={{ color: colors[spec.text], fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
        {spec.label}
      </Text>
      {detail ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>· {detail}</Text>
      ) : null}
    </>
  );

  const rowStyle = { flexDirection: 'row' as const, alignItems: 'center' as const, gap: tokens.spacing.xs };

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={a11y}
        onPress={onPress}
        style={({ pressed }) => [rowStyle, { opacity: pressed ? 0.7 : 1 }, style]}
      >
        {inner}
      </Pressable>
    );
  }

  return (
    <View accessible accessibilityRole="text" accessibilityLabel={a11y} style={[rowStyle, style]}>
      {inner}
    </View>
  );
}
