import * as React from 'react';
import { Pressable, ScrollView, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { formatTime } from './types';

/** One line of a lyric sheet. */
export interface LyricLine {
  /** Optional timestamp in **seconds** for this line (enables a synced tap-to-seek). */
  time?: number;
  /** The lyric text for this line. */
  text: string;
}

/**
 * Props for {@link LyricsView} — a scrolling lyric sheet (native). Presentational
 * shell only: it renders shaped lines and reports a tapped index; nothing tracks
 * playback or fetches lyrics.
 */
export interface LyricsViewProps {
  /** The lyric lines, in order. */
  lines: readonly LyricLine[];
  /** Index of the currently-active line — emphasized in `onSurface`/bold; others muted. */
  activeIndex?: number;
  /** Fires with the tapped line's index (seek to `lines[index].time`); lines become buttons when set. */
  onLineTap?: (index: number) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * LyricsView — the **V4 "spotlight"** lyric sheet (native). Deliberately calm: a
 * scrollable list on the plain surface (NOT the gradient — that's reserved for
 * the hero moments), with the `activeIndex` line emphasized in bold `primary` /
 * `onSurface` and the rest muted. When `onLineTap` is set each line becomes a
 * seek button. The active line auto-scrolls into view. Token-only colors via
 * `useXenitionTheme()` — no literals; dark-mode safe.
 */
export function LyricsView({ lines, activeIndex, onLineTap, style }: LyricsViewProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const scrollRef = React.useRef<ScrollView>(null);
  const offsetsRef = React.useRef<number[]>([]);

  React.useEffect(() => {
    if (activeIndex == null) return;
    const y = offsetsRef.current[activeIndex];
    if (y == null) return;
    scrollRef.current?.scrollTo({ y: Math.max(0, y - 96), animated: true });
  }, [activeIndex]);

  return (
    <ScrollView
      ref={scrollRef}
      style={[
        {
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
        },
        style,
      ]}
      contentContainerStyle={{ padding: tokens.spacing.lg, gap: tokens.spacing.md }}
    >
      {lines.map((line, i) => {
        const active = i === activeIndex;
        const label =
          line.time != null ? `Seek to ${formatTime(line.time)}: ${line.text}` : line.text;
        const textEl = (
          <Text
            style={{
              color: active ? colors.primary : colors.muted,
              fontSize: active ? tokens.typography.scale.xl : tokens.typography.scale.lg,
              fontWeight: active ? '800' : '500',
            }}
          >
            {line.text}
          </Text>
        );
        return (
          <View
            key={i}
            onLayout={(e) => {
              offsetsRef.current[i] = e.nativeEvent.layout.y;
            }}
          >
            {onLineTap ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={label}
                accessibilityState={{ selected: active }}
                onPress={() => onLineTap(i)}
                style={({ pressed }) => ({
                  minHeight: 44,
                  justifyContent: 'center',
                  paddingHorizontal: tokens.spacing.sm,
                  paddingVertical: tokens.spacing.xs,
                  borderRadius: tokens.radius.md,
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                {textEl}
              </Pressable>
            ) : (
              <View
                accessible
                accessibilityState={{ selected: active }}
                style={{ paddingHorizontal: tokens.spacing.sm }}
              >
                {textEl}
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}
