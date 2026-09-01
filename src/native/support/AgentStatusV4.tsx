import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Avatar } from '../primitives/Avatar';
import { withAlpha } from './internal';
import type { AgentStatusProps, AgentPresence } from './AgentStatus';

/** Drop-in for {@link AgentStatusProps} — same props, the V4 "console" design. */
export type AgentStatusV4Props = AgentStatusProps;

interface PresenceSpec {
  slot: keyof SemanticColors;
  glyph: string;
  label: string;
}

// online → success, away → warn, offline → muted. Each carries a distinct glyph
// so presence reads by shape as well as color.
const PRESENCE: Record<AgentPresence, PresenceSpec> = {
  online: { slot: 'success', glyph: '●', label: 'Online' },
  away: { slot: 'warn', glyph: '◐', label: 'Away' },
  offline: { slot: 'muted', glyph: '○', label: 'Offline' },
};

/**
 * AgentStatus — **V4** "calm console" design. The agent-workspace take on a
 * presence indicator: an avatar + name with a soft-tint presence pill carrying
 * glyph + label (presence is encoded by glyph **and** color, never color alone),
 * plus an optional detail chip. The compact `dot` variant is just the pill; the
 * `row` variant is an elevated, tappable ≥44px card. Same props/behavior as
 * {@link AgentStatusProps}; token-only colors via `useXenitionTheme()`.
 */
export function AgentStatusV4({
  presence,
  name,
  avatar,
  detail,
  variant = 'row',
  onPress,
  style,
}: AgentStatusV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const spec = PRESENCE[presence] ?? PRESENCE.offline;
  const presenceColor = colors[spec.slot];
  const a11y = `${name ? `${name}, ` : ''}${spec.label}${detail ? `, ${detail}` : ''}`;

  const pill = (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: tokens.spacing.sm,
        paddingVertical: 2,
        borderRadius: tokens.radius.full,
        backgroundColor: withAlpha(presenceColor, 0.12),
      }}
    >
      <Text style={{ color: presenceColor, fontSize: tokens.typography.scale.xs }}>{spec.glyph}</Text>
      <Text style={{ color: presenceColor, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
        {spec.label}
      </Text>
    </View>
  );

  if (variant === 'dot') {
    return (
      <View
        accessible
        accessibilityRole="text"
        accessibilityLabel={a11y}
        style={[{ flexDirection: 'row', alignItems: 'center' }, style]}
      >
        {pill}
      </View>
    );
  }

  const cardBase: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.md,
    minHeight: 44,
    padding: tokens.spacing.sm,
    backgroundColor: colors.card,
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  };

  const body = (
    <>
      <Avatar
        size="md"
        name={name}
        src={avatar}
        status={presence === 'offline' ? 'offline' : presence === 'away' ? 'away' : 'online'}
      />
      <View style={{ flex: 1, gap: 4 }}>
        {name ? (
          <Text
            numberOfLines={1}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
          >
            {name}
          </Text>
        ) : null}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
          {pill}
          {detail ? (
            <View
              style={{
                paddingHorizontal: tokens.spacing.sm,
                paddingVertical: 2,
                borderRadius: tokens.radius.full,
                backgroundColor: withAlpha(colors.onSurface, 0.05),
              }}
            >
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                {detail}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={a11y}
        onPress={onPress}
        style={({ pressed }) => [
          cardBase,
          { backgroundColor: pressed ? withAlpha(colors.onSurface, 0.04) : colors.card },
          style as StyleProp<ViewStyle>,
        ]}
      >
        {body}
      </Pressable>
    );
  }

  return (
    <View accessible accessibilityRole="text" accessibilityLabel={a11y} style={[cardBase, style]}>
      {body}
    </View>
  );
}
