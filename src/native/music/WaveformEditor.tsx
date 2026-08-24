import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { EmptyState, Icon, Spinner, useXenitionTheme } from '../primitives';
import { clamp, withAlpha } from './types';

export type WaveformEditorVariant = 'full' | 'mini';

export interface WaveformEditorProps {
  /**
   * Normalized peak magnitudes in `[0, 1]`, one per bar. This is a UI shell —
   * peaks are pre-computed by the app; no audio is decoded here.
   */
  peaks?: number[];
  /** Playhead position as a ratio in `[0, 1]`. */
  progress?: number;
  /** Optional selected region `[startRatio, endRatio]` (both in `[0, 1]`). */
  selection?: [number, number];
  /**
   * - `full` — taller bars with a scrubber row (default).
   * - `mini` — short inline strip (e.g. a clip thumbnail).
   */
  variant?: WaveformEditorVariant;
  /** Show a loading spinner in place of the bars. */
  loading?: boolean;
  /** Message shown when there are no peaks and not loading. */
  emptyLabel?: string;
  /** Number of bars drawn when `peaks` is omitted (placeholder). Default 48. */
  placeholderBars?: number;
  /** Fires with a `[0,1]` ratio when a bar is tapped (seek intent). */
  onSeek?: (ratio: number) => void;
  style?: StyleProp<ViewStyle>;
}

/** Deterministic pseudo-random height so the placeholder looks wave-like. */
function placeholderHeight(i: number): number {
  const v = Math.abs(Math.sin(i * 12.9898) * 43758.5453);
  return 0.25 + (v - Math.floor(v)) * 0.7;
}

/**
 * A waveform editor — a **token-bar placeholder**, not a real renderer. It
 * draws `peaks` (or a deterministic placeholder when omitted) as a row of
 * token-colored bars, overlays a playhead at `progress`, and tints an optional
 * `selection` region. Tapping a bar fires `onSeek` with the `[0,1]` position.
 * Shows a `Spinner` while `loading` and an `EmptyState` when there is nothing
 * to show. No audio is decoded; token-only styling.
 */
export function WaveformEditor({
  peaks,
  progress,
  selection,
  variant = 'full',
  loading = false,
  emptyLabel = 'No audio loaded',
  placeholderBars = 48,
  onSeek,
  style,
}: WaveformEditorProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const height = variant === 'mini' ? 32 : 72;

  if (loading) {
    return (
      <View
        accessibilityRole="image"
        accessibilityLabel="Loading waveform"
        style={[
          { height, alignItems: 'center', justifyContent: 'center', borderRadius: tokens.radius.md, backgroundColor: colors.surface },
          style,
        ]}
      >
        <Spinner />
      </View>
    );
  }

  const hasPeaks = Array.isArray(peaks) && peaks.length > 0;
  if (!hasPeaks && placeholderBars <= 0) {
    return (
      <EmptyState
        icon={<Icon glyph="〰️" size="2xl" color="muted" accessibilityLabel="Waveform" />}
        title={emptyLabel}
        style={style}
      />
    );
  }

  const count = hasPeaks ? peaks!.length : Math.max(1, Math.trunc(placeholderBars));
  const playRatio = progress == null ? null : clamp(progress, 0, 1);
  const [selStart, selEnd] = selection ?? [null, null];

  const inSelection = (ratio: number): boolean => {
    if (selStart == null || selEnd == null) return false;
    const lo = clamp(Math.min(selStart, selEnd), 0, 1);
    const hi = clamp(Math.max(selStart, selEnd), 0, 1);
    return ratio >= lo && ratio <= hi;
  };

  return (
    <View
      accessibilityRole="adjustable"
      accessibilityLabel="Waveform"
      accessibilityValue={playRatio == null ? undefined : { now: Math.round(playRatio * 100), min: 0, max: 100 }}
      style={[
        {
          height,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1,
          paddingHorizontal: tokens.spacing.xs,
          borderRadius: tokens.radius.md,
          backgroundColor: withAlpha(colors.onSurface, 0.04),
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {Array.from({ length: count }).map((_, i) => {
        const raw = hasPeaks ? peaks![i] : placeholderHeight(i);
        const mag = clamp(raw ?? 0, 0, 1);
        const ratio = count > 1 ? i / (count - 1) : 0;
        const played = playRatio != null && ratio <= playRatio;
        const selected = inSelection(ratio);
        const barColor = played ? colors.primary : selected ? colors.accent : withAlpha(colors.onSurface, 0.35);

        return (
          <Pressable
            key={i}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            disabled={!onSeek}
            onPress={() => onSeek?.(ratio)}
            style={{ flex: 1, height: '100%', justifyContent: 'center' }}
          >
            <View
              style={{
                height: `${Math.max(6, mag * 100)}%`,
                borderRadius: tokens.radius.full,
                backgroundColor: barColor,
              }}
            />
          </Pressable>
        );
      })}
      {playRatio != null && variant === 'full' ? (
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${playRatio * 100}%`,
            width: 2,
            backgroundColor: colors.primary,
          }}
        />
      ) : null}
      {!hasPeaks && variant === 'full' ? (
        <Text
          style={{
            position: 'absolute',
            alignSelf: 'center',
            color: colors.muted,
            fontSize: tokens.typography.scale.xs,
            fontWeight: '600',
          }}
        >
          {emptyLabel}
        </Text>
      ) : null}
    </View>
  );
}
