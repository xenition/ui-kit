import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { NOTE_NAMES, isBlackKey, withAlpha } from './types';
import type { PianoKeysProps } from './PianoKeys';

/** Drop-in for {@link PianoKeysProps} — same props, the V4 "session" design. */
export type PianoKeysV4Props = PianoKeysProps;

/** White-key pitch classes in order, with their chromatic index. */
const WHITE = [0, 2, 4, 5, 7, 9, 11];

/**
 * PianoKeys — **V4** "session" design. The tactile take on an on-screen
 * keyboard: white keys read as satisfying `surface` controls on a rounded token
 * bed, black keys sit on a token-dark (`onSurface`) fill, and a held key lights
 * with a soft-primary tint **plus** a filled marker dot (never color alone) and
 * the a11y `selected` state. No gradient — performance surfaces stay clean and
 * tactile. Honors both `variant`s (`full` / `compact`), the `showLabels`,
 * `disabled`, black-vs-white layout and `onKeyPress(note)` behavior identical to
 * {@link PianoKeysProps}. Token-only colors via `useXenitionTheme()`.
 */
export function PianoKeysV4({
  startOctave = 4,
  octaves = 1,
  highlightedNotes,
  variant = 'full',
  showLabels,
  disabled = false,
  onKeyPress,
  style,
}: PianoKeysV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const count = Math.max(1, Math.trunc(Number.isFinite(octaves) ? octaves : 1));
  const base = Number.isFinite(startOctave) ? Math.trunc(startOctave) : 4;
  const held = new Set(highlightedNotes ?? []);
  const labels = showLabels ?? variant === 'full';
  const height = variant === 'compact' ? 96 : 140;

  // Flatten white keys across the requested octaves, preserving order.
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
          gap: 1,
          padding: tokens.spacing.xs,
          borderRadius: tokens.radius.md,
          backgroundColor: colors.border,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {/* White keys — tactile token tiles. */}
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
              paddingBottom: tokens.spacing.sm,
              borderWidth: 1,
              borderColor: active ? colors.primary : colors.border,
              borderTopLeftRadius: tokens.radius.sm,
              borderTopRightRadius: tokens.radius.sm,
              borderBottomLeftRadius: tokens.radius.md,
              borderBottomRightRadius: tokens.radius.md,
              backgroundColor: active
                ? withAlpha(colors.primary, 0.2)
                : pressed
                  ? withAlpha(colors.primary, 0.12)
                  : colors.surface,
            })}
          >
            {active ? (
              // Non-color "held" affordance sitting on the key.
              <View
                style={{
                  position: 'absolute',
                  top: tokens.spacing.sm,
                  width: 8,
                  height: 8,
                  borderRadius: tokens.radius.full,
                  backgroundColor: colors.primary,
                }}
              />
            ) : null}
            {labels ? (
              <Text
                style={{
                  color: active ? colors.primary : colors.muted,
                  fontSize: tokens.typography.scale.xs,
                  fontWeight: '700',
                }}
              >
                {k.note}
              </Text>
            ) : null}
          </Pressable>
        );
      })}

      {/* Black keys overlaid at chromatic offsets — token-dark tactile caps. */}
      {whiteKeys.map((k, wi) => {
        // A black key follows this white key unless the next pitch is white.
        const nextChroma = (k.chroma + 1) % 12;
        if (!isBlackKey(nextChroma)) return null;
        const note = `${NOTE_NAMES[nextChroma]}${k.octave}`;
        const active = held.has(note);
        // Center the black key on the boundary between this white key and next.
        const left = `${(wi + 1) * whiteW - whiteW * 0.3}%` as const;
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
              top: tokens.spacing.xs,
              left,
              width: `${whiteW * 0.6}%`,
              height: '60%',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingBottom: 6,
              borderWidth: 1,
              borderColor: active ? colors.primary : colors.border,
              borderTopLeftRadius: tokens.radius.sm,
              borderTopRightRadius: tokens.radius.sm,
              borderBottomLeftRadius: tokens.radius.md,
              borderBottomRightRadius: tokens.radius.md,
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
                  width: 8,
                  height: 8,
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
