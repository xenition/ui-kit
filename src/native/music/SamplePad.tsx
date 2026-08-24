import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Icon, Spinner, useXenitionTheme } from '../primitives';
import { WaveformEditor } from './WaveformEditor';
import { padAccentKey, withAlpha } from './types';

export type SamplePadVariant = 'tile' | 'row';

export interface SamplePadProps {
  /** Sample display name; when omitted the pad reads as an empty slot. */
  name?: string;
  /** Optional sub-label, e.g. `'Vinyl Kick'`, `'0:02'`. */
  detail?: string;
  /** Icon glyph / emoji for the sample. */
  glyph?: string;
  /** Pre-computed peaks for the inline mini-waveform (no audio decoded here). */
  peaks?: number[];
  /** Accent slot; otherwise derived from `index`. */
  color?: keyof import('../theme').SemanticColors;
  /** Position used to derive the accent when `color` is omitted. */
  index?: number;
  /**
   * - `tile` — square pad with glyph + name (default).
   * - `row` — horizontal pad with an inline mini-waveform.
   */
  variant?: SamplePadVariant;
  /** Whether the sample is currently playing (lit + non-color affordance). */
  playing?: boolean;
  /** Whether the sample is still loading (shows a spinner, blocks presses). */
  loading?: boolean;
  disabled?: boolean;
  /** Fires when a loaded pad is triggered, with the sample name (or `''`). */
  onPress?: (name: string) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single sample trigger pad — a UI shell only, it plays no audio. When
 * `name` is set it shows the sample (glyph + name, an inline mini-`Waveform`
 * in the `row` variant) and fires `onPress(name)` on a hit; when `name` is
 * omitted it renders a dimmed "empty" slot. `playing` lights the pad and adds
 * a non-color dot; `loading` swaps in a `Spinner` and blocks presses. Accent
 * comes from a semantic token slot; no literal colors.
 */
export function SamplePad({
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
}: SamplePadProps): React.ReactElement {
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
          borderRadius: tokens.radius.md,
          borderWidth: playing ? 2 : 1,
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
            backgroundColor: isEmpty ? colors.border : withAlpha(accent, 0.2),
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
