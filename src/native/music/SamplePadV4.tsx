import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon, Spinner, useXenitionTheme } from '../primitives';
import { WaveformEditor } from './WaveformEditor';
import { padAccentKey, withAlpha } from './types';
import type { SamplePadProps } from './SamplePad';

/** Drop-in for {@link SamplePadProps} — same props, the V4 "session" design. */
export type SamplePadV4Props = SamplePadProps;

/**
 * SamplePad — **V4** "session" design (native parity of the web V4). The clean,
 * tactile take on a sample pad: a rounded token tile that carries the cell
 * accent as a soft tint at rest, and when hit/lit flashes a stronger accent
 * fill + an accent border-ring + a corner marker (never color alone). `tile` is
 * a square grid cell (glyph stacked over label), `row` is a horizontal pad with
 * an inline mini-`WaveformEditor`; both keep ≥44px tap targets. Empty slots read
 * dimmed with a `＋`, `loading` swaps in a `Spinner` and blocks presses. Identical
 * props/behavior to {@link SamplePadProps}; the accent is preserved via the
 * `padAccentKey` slot + `colors[accentKey]` resolution (no literal colors, no
 * gradient).
 */
export function SamplePadV4({
  name,
  detail,
  glyph = '♪',
  peaks,
  color,
  index = 0,
  variant = 'tile',
  playing = false,
  loading = false,
  disabled = false,
  onPress,
  style,
}: SamplePadV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const accentKey = color ?? padAccentKey(index);
  const accent = colors[accentKey];
  const isEmpty = name == null || name.length === 0;
  const isRow = variant === 'row';
  const blocked = isEmpty || loading || disabled;

  const stateNote = loading ? ', loading' : isEmpty ? ', empty' : playing ? ', playing' : '';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${isEmpty ? 'Empty pad' : name}${stateNote}`}
      accessibilityState={{ disabled: blocked, selected: playing, busy: loading }}
      disabled={blocked || !onPress}
      onPress={() => onPress?.(name ?? '')}
      style={({ pressed }) => [
        {
          flexDirection: isRow ? 'row' : 'column',
          alignItems: 'center',
          justifyContent: isRow ? 'flex-start' : 'center',
          gap: tokens.spacing.sm,
          minHeight: isRow ? 56 : 88,
          padding: tokens.spacing.sm,
          borderRadius: tokens.radius.lg,
          borderWidth: playing ? 2 : 1,
          borderStyle: isEmpty ? 'dashed' : 'solid',
          borderColor: isEmpty ? colors.border : playing ? accent : withAlpha(accent, 0.4),
          backgroundColor: isEmpty ? colors.surface : withAlpha(accent, playing || pressed ? 0.24 : 0.12),
          opacity: isEmpty ? 0.5 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <Spinner />
      ) : (
        <View
          style={{
            width: 32,
            height: 32,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.full,
            backgroundColor: isEmpty ? colors.border : withAlpha(accent, playing ? 0.28 : 0.2),
          }}
        >
          <Icon glyph={isEmpty ? '＋' : glyph} size="base" color={isEmpty ? 'muted' : accentKey} />
        </View>
      )}
      <View style={{ flex: isRow ? 1 : undefined, alignItems: isRow ? 'flex-start' : 'center', gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{
            color: isEmpty ? colors.muted : colors.onSurface,
            fontSize: tokens.typography.scale.sm,
            fontWeight: playing ? '700' : '600',
          }}
        >
          {isEmpty ? 'Empty' : name}
        </Text>
        {detail ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {detail}
          </Text>
        ) : null}
      </View>
      {isRow && !isEmpty && !loading ? (
        <View style={{ width: 72 }}>
          <WaveformEditor peaks={peaks} variant="mini" placeholderBars={peaks ? 0 : 20} />
        </View>
      ) : null}
      {playing && !loading ? (
        <View
          style={{
            position: 'absolute',
            top: 4,
            right: 4,
            width: 6,
            height: 6,
            borderRadius: tokens.radius.full,
            backgroundColor: accent,
          }}
        />
      ) : null}
    </Pressable>
  );
}
