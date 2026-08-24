import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives';

export type CallState = 'idle' | 'connecting' | 'active' | 'ended';

/** Token-derived translucent tint (no literal hex; mirrors GlassPanel). */
function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const STATE_META: Record<CallState, { label: string; glyph: string }> = {
  idle: { label: 'Ready to connect', glyph: '📹' },
  connecting: { label: 'Connecting…', glyph: '⏳' },
  active: { label: 'In call', glyph: '🟢' },
  ended: { label: 'Call ended', glyph: '⏹' },
};

interface RoundControlProps {
  glyph: string;
  label: string;
  bg: string;
  fg: string;
  active?: boolean;
  onPress?: () => void;
}

export interface TelehealthCallBarProps {
  /** The other party's display name. */
  participantName: string;
  /** Optional avatar image for the participant. */
  participantAvatar?: string;
  /** Call lifecycle state; drives the status line and controls. Defaults `idle`. */
  state?: CallState;
  /** Preformatted elapsed time, e.g. "04:12". Shown while `active`. */
  elapsed?: string;
  /** Whether the local mic is muted. */
  muted?: boolean;
  /** Whether the local camera is off. */
  cameraOff?: boolean;
  /** Fires when the join/connect action is pressed (shown while `idle`). */
  onJoin?: () => void;
  /** Toggles the mic; receives the next muted state. */
  onToggleMute?: (nextMuted: boolean) => void;
  /** Toggles the camera; receives the next off state. */
  onToggleCamera?: (nextOff: boolean) => void;
  /** Ends the call. */
  onEnd?: () => void;
  style?: StyleProp<ViewStyle>;
}

function RoundControl({ glyph, label, bg, fg, onPress }: RoundControlProps): React.ReactElement {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => ({
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: bg,
        opacity: pressed ? 0.8 : 1,
      })}
    >
      <Text allowFontScaling={false} style={{ color: fg, fontSize: 20 }}>
        {glyph}
      </Text>
    </Pressable>
  );
}

/**
 * A persistent telehealth call bar: the participant's identity, a connection
 * status line (idle / connecting / active / ended), an elapsed timer, and the
 * standard round controls (mute, camera, end) plus a "Join call" CTA while
 * idle. Mute/camera state is shown by glyph swap + tint, not color alone.
 * Informational UI only — not a medical device. Token-only colors.
 */
export function TelehealthCallBar({
  participantName,
  participantAvatar,
  state = 'idle',
  elapsed,
  muted = false,
  cameraOff = false,
  onJoin,
  onToggleMute,
  onToggleCamera,
  onEnd,
  style,
}: TelehealthCallBarProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATE_META[state];
  const isActive = state === 'active';
  const isIdle = state === 'idle';

  return (
    <View
      accessibilityLabel={`Telehealth call with ${participantName}, ${meta.label}${isActive && elapsed ? `, ${elapsed}` : ''}`}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.md,
        },
        style,
      ]}
    >
      <Avatar src={participantAvatar} name={participantName} size="md" status={isActive ? 'online' : undefined} />
      <View style={{ flex: 1, gap: 2 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {participantName}
        </Text>
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {meta.glyph} {meta.label}
          {isActive && elapsed ? `  ·  ${elapsed}` : ''}
        </Text>
      </View>

      {isIdle ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Join call"
          onPress={onJoin}
          style={({ pressed }) => ({
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.lg,
            borderRadius: tokens.radius.full,
            backgroundColor: colors.success,
            opacity: pressed ? 0.85 : 1,
          })}
        >
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm }}>
            📞
          </Text>
          <Text style={{ color: colors.onSuccess, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            Join call
          </Text>
        </Pressable>
      ) : state === 'ended' ? null : (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <RoundControl
            glyph={muted ? '🔇' : '🎙'}
            label={muted ? 'Unmute microphone' : 'Mute microphone'}
            bg={muted ? withAlpha(colors.danger, 0.16) : withAlpha(colors.onSurface, 0.08)}
            fg={muted ? colors.danger : colors.onSurface}
            onPress={() => onToggleMute?.(!muted)}
          />
          <RoundControl
            glyph={cameraOff ? '📷' : '📹'}
            label={cameraOff ? 'Turn camera on' : 'Turn camera off'}
            bg={cameraOff ? withAlpha(colors.danger, 0.16) : withAlpha(colors.onSurface, 0.08)}
            fg={cameraOff ? colors.danger : colors.onSurface}
            onPress={() => onToggleCamera?.(!cameraOff)}
          />
          <RoundControl
            glyph="📵"
            label="End call"
            bg={colors.danger}
            fg={colors.onDanger}
            onPress={onEnd}
          />
        </View>
      )}
    </View>
  );
}
