import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { EmptyState, Icon, Spinner, useXenitionTheme } from '../primitives';
import { clamp, withAlpha } from './types';
import {
  sessionGradient,
  sessionInk,
  sessionInkSoft,
  sessionTile,
  sessionBorder,
} from './internal/session';
import { GradientSurface } from './internal/GradientSurface';
import type { WaveformEditorProps } from './WaveformEditor';

/** Drop-in for {@link WaveformEditorProps} — same props, the V4 "session" design. */
export type WaveformEditorV4Props = WaveformEditorProps;

/** Deterministic pseudo-random height so the placeholder looks wave-like. */
function placeholderHeight(i: number): number {
  const v = Math.abs(Math.sin(i * 12.9898) * 43758.5453);
  return 0.25 + (v - Math.floor(v)) * 0.7;
}

/**
 * WaveformEditor — **V4** "session" design, and the ONE reserved gradient moment
 * of the music V4 line: the signal hero (web/native parity). In `full` the
 * waveform sits on the brand-gradient ground (`sessionGradient(tokens.ramps)` as
 * an absolute-fill wash) with the bars drawn in near-white ink — `sessionInk(r)`
 * for played/active, `withAlpha(sessionInk(r), 0.4)` for unplayed — the playhead
 * in `sessionInk`, any labels in `sessionInk`/`sessionInkSoft`, and a time chip
 * as a frosted tile (`sessionTile` + `sessionBorder`). In `mini` it degrades to a
 * clean, compact strip on the plain surface (no gradient) with bars in
 * `colors.primary`/`withAlpha(colors.primary, 0.3)`. Honors every prop of
 * {@link WaveformEditorProps}: the played/unplayed split, playhead position,
 * optional selection region, and the `onSeek` intent. State is never on color
 * alone: the playhead is a real marker. Token-only colors via `useXenitionTheme()`.
 */
export function WaveformEditorV4({
  peaks,
  progress,
  selection,
  variant = 'full',
  loading = false,
  emptyLabel = 'No audio loaded',
  placeholderBars = 48,
  onSeek,
  style,
}: WaveformEditorV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const isFull = variant === 'full';
  const height = isFull ? 72 : 32;

  const ink = sessionInk(r);
  const inkSoft = sessionInkSoft(r);

  if (loading) {
    return (
      <View
        accessibilityRole="image"
        accessibilityLabel="Loading waveform"
        style={[
          {
            height,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.md,
            overflow: 'hidden',
            borderWidth: isFull ? 0 : 1,
            borderColor: colors.border,
            backgroundColor: isFull ? undefined : colors.surface,
          },
          style,
        ]}
      >
        {isFull ? (
          <GradientSurface colors={sessionGradient(r)} style={absoluteFill} />
        ) : null}
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

  // Near-white ink on the gradient ground (`full`); primary token on the plain
  // surface (`mini`).
  const activeBar = isFull ? ink : colors.primary;
  const idleBar = isFull ? withAlpha(ink, 0.4) : withAlpha(colors.primary, 0.3);

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
          overflow: 'hidden',
          borderWidth: isFull ? 0 : 1,
          borderColor: colors.border,
          backgroundColor: isFull ? undefined : colors.surface,
        },
        style,
      ]}
    >
      {/* The reserved gradient signal ground — only for the `full` hero. */}
      {isFull ? <GradientSurface colors={sessionGradient(r)} style={absoluteFill} /> : null}

      {Array.from({ length: count }).map((_, i) => {
        const raw = hasPeaks ? peaks![i] : placeholderHeight(i);
        const mag = clamp(raw ?? 0, 0, 1);
        const ratio = count > 1 ? i / (count - 1) : 0;
        const played = playRatio != null && ratio <= playRatio;
        const selected = inSelection(ratio);
        const barColor = played || selected ? activeBar : idleBar;

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

      {/* The playhead is a real marker — state never on color alone. */}
      {playRatio != null && isFull ? (
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${playRatio * 100}%`,
            width: 2,
            backgroundColor: ink,
          }}
        />
      ) : null}

      {/* Frosted time-position tile on the gradient ground. */}
      {playRatio != null && isFull ? (
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            right: tokens.spacing.xs,
            bottom: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.sm,
            paddingVertical: 1,
            borderRadius: tokens.radius.full,
            backgroundColor: sessionTile(r),
            borderWidth: 1,
            borderColor: sessionBorder(r),
          }}
        >
          <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
            {Math.round(playRatio * 100)}%
          </Text>
        </View>
      ) : null}

      {!hasPeaks && isFull ? (
        <View pointerEvents="none" style={{ position: 'absolute', left: 0, right: 0, alignItems: 'center' }}>
          <Text style={{ color: ink, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{emptyLabel}</Text>
        </View>
      ) : null}
    </View>
  );
}

const absoluteFill = { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 } as const;
