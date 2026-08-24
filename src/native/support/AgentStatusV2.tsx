import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Avatar, type AvatarStatus } from '../primitives/Avatar';
import { StatusDot, type StatusDotTone } from '../primitives/StatusDot';
import { appearanceStyle } from '../primitives/internal/appearance';
import { usePressScale, useEnter } from '../primitives/internal/motion';
import { withAlpha } from './internal';
import { type AgentPresence, type AgentStatusProps } from './AgentStatus';

/** Drop-in alternate design for {@link AgentStatus}. Identical public contract. */
export type AgentStatusV2Props = AgentStatusProps;

interface PresenceSpec {
  dot: StatusDotTone;
  avatar: AvatarStatus;
  text: keyof SemanticColors;
  label: string;
}

const PRESENCE: Record<AgentPresence, PresenceSpec> = {
  online: { dot: 'success', avatar: 'online', text: 'successText', label: 'Online' },
  away: { dot: 'warn', avatar: 'away', text: 'warnText', label: 'Away' },
  offline: { dot: 'muted', avatar: 'offline', text: 'muted', label: 'Offline' },
};

/**
 * AgentStatus — **V2 (avatar tile)**. A raised, centered tile: a large avatar
 * with a presence ring + corner status dot, the agent name, a
 * glyph-dot + presence label, and an optional detail line. Same
 * `AgentStatusProps` as {@link AgentStatus} (the `variant` prop is ignored — the
 * tile IS the design). Presence is carried by dot + text, never color alone;
 * token colors only.
 */
export function AgentStatusV2({
  presence,
  name,
  avatar,
  detail,
  onPress,
  style,
}: AgentStatusV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const spec = PRESENCE[presence] ?? PRESENCE.offline;
  const press = usePressScale();
  const enter = useEnter();
  const a11y = `${name ? `${name}, ` : ''}${spec.label}${detail ? `, ${detail}` : ''}`;

  const inner = (
    <>
      <Avatar size="lg" name={name} src={avatar} status={spec.avatar} ring />
      {name ? (
        <Text
          numberOfLines={1}
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale.base,
            fontWeight: '700',
            marginTop: tokens.spacing.sm,
          }}
        >
          {name}
        </Text>
      ) : null}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.xs,
          marginTop: tokens.spacing.xs,
          backgroundColor: withAlpha(colors[spec.dot === 'muted' ? 'onSurface' : spec.dot], 0.1),
          borderRadius: tokens.radius.full,
          paddingVertical: 2,
          paddingHorizontal: tokens.spacing.sm,
        }}
      >
        <StatusDot tone={spec.dot} pulse={presence === 'online'} size={7} />
        <Text style={{ color: colors[spec.text], fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
          {spec.label}
        </Text>
      </View>
      {detail ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, marginTop: tokens.spacing.xs }}>
          {detail}
        </Text>
      ) : null}
    </>
  );

  const tileStyle = [
    appearanceStyle('elevated', colors, tokens),
    {
      borderRadius: tokens.radius.lg,
      padding: tokens.spacing.md,
      alignItems: 'center' as const,
      minWidth: 120,
    },
  ];

  if (onPress) {
    return (
      <Animated.View
        style={[
          { opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] },
          style,
        ]}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={a11y}
          onPress={onPress}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
          style={tileStyle}
        >
          {inner}
        </Pressable>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      accessible
      accessibilityRole="text"
      accessibilityLabel={a11y}
      style={[{ opacity: enter.opacity, transform: enter.transform }, ...tileStyle, style]}
    >
      {inner}
    </Animated.View>
  );
}
