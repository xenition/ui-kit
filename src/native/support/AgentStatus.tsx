import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Avatar } from '../primitives/Avatar';
import { StatusDot } from '../primitives/StatusDot';

/** Availability of a support agent. */
export type AgentPresence = 'online' | 'away' | 'offline';

export interface AgentStatusProps {
  /** Presence state. Drives dot tone + label — never color alone. */
  presence: AgentPresence;
  /** Agent display name. */
  name?: string;
  /** Optional avatar URL (falls back to initials). */
  avatar?: string;
  /** Optional secondary line (e.g. `"3 active chats"`). */
  detail?: string;
  /** `dot` = compact dot+label; `row` = avatar + name + status line. */
  variant?: 'dot' | 'row';
  /** Fires when the row is tapped (only meaningful for `row`). */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

interface PresenceSpec {
  slot: 'success' | 'warn' | 'muted';
  label: string;
}

const PRESENCE: Record<AgentPresence, PresenceSpec> = {
  online: { slot: 'success', label: 'Online' },
  away: { slot: 'warn', label: 'Away' },
  offline: { slot: 'muted', label: 'Offline' },
};

/**
 * Agent availability indicator (`online`/`away`/`offline`). The `dot` variant
 * is a pulsing status dot + text label; the `row` variant adds an avatar and an
 * optional detail line and can be tapped. Presence is announced by text and dot
 * position, not color alone. The dot maps to `SemanticColors`
 * (`success`/`warn`/`muted`); no literal hex. The pulse animation respects the
 * OS reduced-motion setting via the underlying `StatusDot`.
 */
export function AgentStatus({
  presence,
  name,
  avatar,
  detail,
  variant = 'row',
  onPress,
  style,
}: AgentStatusProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const spec = PRESENCE[presence] ?? PRESENCE.offline;
  const dotTone: keyof SemanticColors = spec.slot;
  const a11y = `${name ? `${name}, ` : ''}${spec.label}${detail ? `, ${detail}` : ''}`;

  if (variant === 'dot') {
    return (
      <View
        accessible
        accessibilityRole="text"
        accessibilityLabel={a11y}
        style={[{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, style]}
      >
        <StatusDot tone={dotTone} pulse={presence === 'online'} />
        <Text style={{ color: colors[dotTone], fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {spec.label}
        </Text>
      </View>
    );
  }

  const body = (
    <>
      <Avatar size="md" name={name} src={avatar} status={presence === 'offline' ? 'offline' : presence === 'away' ? 'away' : 'online'} />
      <View style={{ flex: 1, gap: 2 }}>
        {name ? (
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
            {name}
          </Text>
        ) : null}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <StatusDot tone={dotTone} pulse={presence === 'online'} size={7} />
          <Text style={{ color: colors[dotTone], fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
            {spec.label}
          </Text>
          {detail ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>· {detail}</Text>
          ) : null}
        </View>
      </View>
    </>
  );

  const rowStyle: StyleProp<ViewStyle> = [
    { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md },
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={a11y}
        onPress={onPress}
        style={({ pressed }) => [rowStyle, { opacity: pressed ? 0.7 : 1 }]}
      >
        {body}
      </Pressable>
    );
  }

  return (
    <View accessible accessibilityRole="text" accessibilityLabel={a11y} style={rowStyle}>
      {body}
    </View>
  );
}
