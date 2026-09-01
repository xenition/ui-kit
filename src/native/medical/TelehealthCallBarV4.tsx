import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Icon } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { TelehealthCallBarProps, CallState } from './TelehealthCallBar';

/** Drop-in for {@link TelehealthCallBarProps} — same props, the V4 "clinic" design. */
export type TelehealthCallBarV4Props = TelehealthCallBarProps;

/** Call lifecycle state → glyph + label + token tone (never color alone). */
const STATE_META: Record<CallState, { label: string; glyph: string; tone: 'muted' | 'primary' | 'success' }> = {
  idle: { label: 'Ready to connect', glyph: '📹', tone: 'muted' },
  connecting: { label: 'Connecting…', glyph: '⏳', tone: 'primary' },
  active: { label: 'In call', glyph: '🟢', tone: 'success' },
  ended: { label: 'Call ended', glyph: '⏹', tone: 'muted' },
};

interface RoundControlProps {
  glyph: string;
  label: string;
  bg: string;
  fg: string;
  onPress?: () => void;
}

function RoundControl({ glyph, label, bg, fg, onPress }: RoundControlProps): React.ReactElement {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => ({
        width: 44,
        height: 44,
        borderRadius: 22,
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
 * TelehealthCallBar — **V4** "clinic" design. A calm, persistent call bar on an
 * elevated rounded surface with a soft shadow. Shows the participant's identity
 * and a labelled connection-state marker (glyph + label + token tone, never
 * color alone) for each `state`: `idle` / `connecting` / `active` / `ended`.
 * While `idle` a "Join call" CTA is shown; while `active` the standard round
 * controls appear (mute, camera, and a `danger`-token labelled End-call
 * button), each a ≥44px tap target. Mute/camera state is shown by a glyph swap
 * + tint. Identical props/behavior to {@link TelehealthCallBarProps}. Token-only
 * colors via `useXenitionTheme()`. Informational UI only — not a medical device.
 */
export function TelehealthCallBarV4({
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
}: TelehealthCallBarV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATE_META[state];
  const isActive = state === 'active';
  const isIdle = state === 'idle';
  const toneColor = colors[meta.tone];

  const shell: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.md,
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.md,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  };

  return (
    <View
      accessibilityLabel={`Telehealth call with ${participantName}, ${meta.label}${isActive && elapsed ? `, ${elapsed}` : ''}`}
      style={[shell, style]}
    >
      <Avatar src={participantAvatar} name={participantName} size="md" status={isActive ? 'online' : undefined} />
      <View style={{ flex: 1, gap: 2 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {participantName}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Icon glyph={meta.glyph} size="xs" style={{ color: toneColor }} />
          <Text numberOfLines={1} style={{ color: toneColor, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
            {meta.label}
          </Text>
          {isActive && elapsed ? (
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
              {'  ·  '}
              {elapsed}
            </Text>
          ) : null}
        </View>
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
            minHeight: 44,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.lg,
            borderRadius: tokens.radius.full,
            backgroundColor: colors.primary,
            opacity: pressed ? 0.85 : 1,
          })}
        >
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm }}>
            📞
          </Text>
          <Text style={{ color: colors.onPrimary, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            Join call
          </Text>
        </Pressable>
      ) : state === 'ended' ? null : (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <RoundControl
            glyph={muted ? '🔇' : '🎙'}
            label={muted ? 'Unmute microphone' : 'Mute microphone'}
            bg={muted ? withAlpha(colors.danger, 0.16) : withAlpha(colors.primary, 0.1)}
            fg={muted ? colors.danger : colors.onSurface}
            onPress={() => onToggleMute?.(!muted)}
          />
          <RoundControl
            glyph={cameraOff ? '📷' : '📹'}
            label={cameraOff ? 'Turn camera on' : 'Turn camera off'}
            bg={cameraOff ? withAlpha(colors.danger, 0.16) : withAlpha(colors.primary, 0.1)}
            fg={cameraOff ? colors.danger : colors.onSurface}
            onPress={() => onToggleCamera?.(!cameraOff)}
          />
          <RoundControl glyph="📵" label="End call" bg={colors.danger} fg={colors.onDanger} onPress={onEnd} />
        </View>
      )}
    </View>
  );
}
