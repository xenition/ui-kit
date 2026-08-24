import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Badge, Button, Card, Icon, useXenitionTheme } from '../primitives';
import { clamp, type GameLobby } from './types';

export type LobbyRowVariant = 'default' | 'compact';

export interface LobbyRowProps {
  /** The lobby / room to render. */
  lobby: GameLobby;
  /** Variant — `compact` drops the mode line + slot bar. */
  variant?: LobbyRowVariant;
  /** Show a spinner + block the join button (join in flight). */
  joining?: boolean;
  /** Called when the join button is pressed. Renders the button when set. */
  onJoin?: (lobby: GameLobby) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * One joinable lobby / room row — name, host, mode, a filled/total slot meter,
 * and a Join button. The button disables (with a "Full" / "In progress" label,
 * not color alone) when the room can't be joined. `onJoin(lobby)` fires the
 * intent. Composes `Card`, `Button`, `Badge`, `Icon`. Token-only.
 */
export function LobbyRow({
  lobby,
  variant = 'default',
  joining = false,
  onJoin,
  style,
}: LobbyRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';

  const cap = Math.max(0, lobby.capacity);
  const filled = clamp(lobby.players, 0, cap || lobby.players);
  const isFull = cap > 0 && filled >= cap;
  const joinable = !isFull && !lobby.inProgress;
  const joinLabel = lobby.inProgress ? 'In progress' : isFull ? 'Full' : 'Join';

  const slots = cap > 0 ? Array.from({ length: cap }, (_, i) => i < filled) : [];

  return (
    <Card style={[{ gap: compact ? tokens.spacing.xs : tokens.spacing.sm }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <View style={{ flex: 1, gap: 2 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            {lobby.locked ? <Icon glyph="🔒" size="sm" color="muted" accessibilityLabel="Locked" /> : null}
            <Text
              numberOfLines={1}
              style={{ flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
            >
              {lobby.name}
            </Text>
          </View>
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {[lobby.host ? `Host ${lobby.host}` : undefined, !compact ? lobby.mode : undefined]
              .filter(Boolean)
              .join(' · ') || ' '}
          </Text>
        </View>
        <Badge tone={isFull ? 'danger' : 'neutral'} variant="soft" size="sm">
          {`${filled}/${cap || lobby.players}`}
        </Badge>
        {onJoin ? (
          <Button
            variant={joinable ? 'primary' : 'secondary'}
            size="sm"
            loading={joining}
            disabled={!joinable}
            onPress={() => onJoin(lobby)}
            accessibilityLabel={`${joinLabel} ${lobby.name}`}
          >
            {joinLabel}
          </Button>
        ) : null}
      </View>

      {!compact && slots.length > 0 ? (
        <View
          style={{ flexDirection: 'row', gap: 3 }}
          accessible
          accessibilityLabel={`${filled} of ${cap} slots filled`}
        >
          {slots.map((on, i) => (
            <View
              key={i}
              style={{
                flex: 1,
                height: 4,
                borderRadius: tokens.radius.full,
                backgroundColor: on ? colors.primary : colors.border,
              }}
            />
          ))}
        </View>
      ) : null}
    </Card>
  );
}
