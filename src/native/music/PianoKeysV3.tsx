import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { NOTE_NAMES, isBlackKey, withAlpha } from './types';
import type { PianoKeysProps } from './PianoKeys';

/** Same public contract as {@link PianoKeys} — a drop-in alternate design. */
export type PianoKeysV3Props = PianoKeysProps;

/** White-key pitch classes in order, with their chromatic index. */
const WHITE = [0, 2, 4, 5, 7, 9, 11];

/**
 * PianoKeys, redesigned (v3): a **compact slim keyboard** — short, thin white
 * keys with narrow flat black keys, no labels by default, sized for a header
 * strip or a small inline control. A held key (`highlightedNotes`) reads via a
 * tint plus a small filled marker and the a11y `selected` state — never color
 * alone. Pressing fires `onKeyPress(note)`. Token-only styling. Distinct at a
 * glance from v1's taller labelled octave. Same props.
 */
export function PianoKeysV3({
  startOctave = 4,
  octaves = 1,
  highlightedNotes,
  variant = 'full',
  showLabels,
  disabled = false,
  onKeyPress,
  style,
}: PianoKeysV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const count = Math.max(1, Math.trunc(Number.isFinite(octaves) ? octaves : 1));
  const base = Number.isFinite(startOctave) ? Math.trunc(startOctave) : 4;
  const held = new Set(highlightedNotes ?? []);
  const labels = showLabels ?? false;
  const height = variant === 'compact' ? 52 : 68;

  const whiteKeys: { note: string; chroma: number; octave: number }[] = [];
  for (let o = 0; o < count; o += 1) {
    WHITE.forEach((chroma) => {
      whiteKeys.push({ note: `${NOTE_NAMES[chroma]}${base + o}`, chroma, octave: base + o });
    });
  }
  const whiteCount = Math.max(1, whiteKeys.length);
  const whiteW = 100 / whiteCount;

  const pressKey = (note: string): void => {
    if (disabled) return;
    onKeyPress?.(note);
  };

  return (
    <View
      style={[
        {
          height,
          flexDirection: 'row',
          position: 'relative',
          borderRadius: tokens.radius.sm,
          overflow: 'hidden',
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {/* White keys */}
      {whiteKeys.map((k) => {
        const active = held.has(k.note);
        return (
          <Pressable
            key={k.note}
            accessibilityRole="button"
            accessibilityLabel={`Key ${k.note}`}
            accessibilityState={{ selected: active, disabled }}
            disabled={disabled || !onKeyPress}
            onPress={() => pressKey(k.note)}
            style={({ pressed }) => ({
              flex: 1,
              height: '100%',
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingBottom: 3,
              borderRightWidth: 1,
              borderColor: colors.border,
              backgroundColor: active
                ? withAlpha(colors.primary, 0.24)
                : pressed
                  ? withAlpha(colors.primary, 0.12)
                  : colors.surface,
            })}
          >
            {active ? (
              <View
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: tokens.radius.full,
                  backgroundColor: colors.primary,
                }}
              />
            ) : null}
            {labels ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                {k.note}
              </Text>
            ) : null}
          </Pressable>
        );
      })}

      {/* Slim flat black keys overlaid at chromatic offsets. */}
      {whiteKeys.map((k, wi) => {
        const nextChroma = (k.chroma + 1) % 12;
        if (!isBlackKey(nextChroma)) return null;
        const note = `${NOTE_NAMES[nextChroma]}${k.octave}`;
        const active = held.has(note);
        const left = `${(wi + 1) * whiteW - whiteW * 0.25}%` as const;
        return (
          <Pressable
            key={note}
            accessibilityRole="button"
            accessibilityLabel={`Key ${note}`}
            accessibilityState={{ selected: active, disabled }}
            disabled={disabled || !onKeyPress}
            onPress={() => pressKey(note)}
            style={({ pressed }) => ({
              position: 'absolute',
              top: 0,
              left,
              width: `${whiteW * 0.5}%`,
              height: '58%',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingBottom: 2,
              borderBottomLeftRadius: tokens.radius.sm,
              borderBottomRightRadius: tokens.radius.sm,
              backgroundColor: active
                ? colors.primary
                : pressed
                  ? withAlpha(colors.onSurface, 0.75)
                  : colors.onSurface,
            })}
          >
            {active ? (
              <View
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: tokens.radius.full,
                  backgroundColor: colors.onPrimary,
                }}
              />
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}
