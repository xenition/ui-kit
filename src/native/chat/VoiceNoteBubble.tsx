import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { ChatBubble } from '../primitives';

export interface VoiceNoteBubbleProps {
  /** `me` aligns right on the primary fill; `them` aligns left on a surface fill. */
  side?: 'me' | 'them';
  /** Total clip length in seconds. */
  durationSec: number;
  /** Whether the clip is currently playing (controlled). */
  playing?: boolean;
  /** Playback progress 0–1 (drives the waveform fill). */
  progress?: number;
  /** Normalized waveform samples 0–1; a default pattern is used when omitted. */
  waveform?: number[];
  /** Optional meta (author / time) shown above the bubble. */
  meta?: React.ReactNode;
  /** Toggle play/pause. */
  onPlayToggle?: () => void;
  style?: StyleProp<ViewStyle>;
}

const DEFAULT_WAVE = [0.3, 0.6, 0.9, 0.5, 0.7, 1, 0.4, 0.8, 0.5, 0.6, 0.35, 0.7, 0.9, 0.5, 0.3];

function fmt(sec: number): string {
  const s = Math.max(0, Math.round(sec));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, '0')}`;
}

/**
 * Voice-message bubble — a play/pause control, a waveform whose fill reflects
 * `progress`, and a duration readout, wrapped in the primitive `ChatBubble` so
 * it shares alignment and theming with text messages. Colors adapt to the
 * `me`/`them` side (onPrimary vs. onSurface). No literal colors.
 */
export function VoiceNoteBubble({
  side = 'them',
  durationSec,
  playing = false,
  progress = 0,
  waveform,
  meta,
  onPlayToggle,
  style,
}: VoiceNoteBubbleProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const me = side === 'me';
  const fg = me ? colors.onPrimary : colors.onSurface;
  const bars = waveform && waveform.length > 0 ? waveform : DEFAULT_WAVE;
  const clamped = Math.min(1, Math.max(0, progress));

  return (
    <ChatBubble side={side} meta={meta} style={style}>
      <View
        accessibilityLabel={`Voice message, ${fmt(durationSec)}`}
        style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, minWidth: 160 }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ selected: playing }}
          accessibilityLabel={playing ? 'Pause voice message' : 'Play voice message'}
          onPress={onPlayToggle}
          hitSlop={8}
        >
          <Text allowFontScaling={false} style={{ color: fg, fontSize: tokens.typography.scale.lg }}>
            {playing ? '⏸' : '▶'}
          </Text>
        </Pressable>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2, flex: 1, height: 24 }}>
          {bars.map((h, i) => {
            const filled = i / bars.length <= clamped;
            return (
              <View
                key={i}
                style={{
                  flex: 1,
                  height: Math.max(3, h * 24),
                  borderRadius: tokens.radius.full,
                  backgroundColor: fg,
                  opacity: filled ? 1 : 0.4,
                }}
              />
            );
          })}
        </View>
        <Text style={{ color: fg, fontSize: tokens.typography.scale.xs, opacity: 0.9 }}>
          {fmt(durationSec)}
        </Text>
      </View>
    </ChatBubble>
  );
}
