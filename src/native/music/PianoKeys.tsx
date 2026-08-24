import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { NOTE_NAMES, isBlackKey, withAlpha } from './types';

export type PianoKeysVariant = 'full' | 'compact';

export interface PianoKeysProps {
  /** Lowest octave number (default `4`). */
  startOctave?: number;
  /** How many octaves to render (default `1`). Clamped to `>= 1`. */
  octaves?: number;
  /** Note names currently held down, e.g. `['C4','E4','G4']` (playing state). */
  highlightedNotes?: string[];
  /**
   * - `full` — labelled white keys + overlaid black keys (default).
   * - `compact` — shorter keys, no labels.
   */
  variant?: PianoKeysVariant;
  /** Show the note name on each white key (default true in `full`). */
  showLabels?: boolean;
  disabled?: boolean;
  /** Fires with the note name (e.g. `'C#4'`) when a key is pressed. */
  onKeyPress?: (note: string) => void;
  style?: StyleProp<ViewStyle>;
}

/** White-key pitch classes in order, with their chromatic index. */
const WHITE = [0, 2, 4, 5, 7, 9, 11];

/**
 * An on-screen keyboard — one or more octaves of piano keys, a UI shell only
 * (it makes no sound). White keys lay out in a row with the black keys
 * overlaid at the correct positions; `highlightedNotes` lights held keys via a
 * tint **and** a filled marker (never color alone) plus the a11y `selected`
 * state. Pressing a key fires `onKeyPress(note)` with a name like `'C#4'`.
 * Token-only styling.
 */
export function PianoKeys({
  startOctave = 4,
  octaves = 1,
  highlightedNotes,
  variant = 'full',
  showLabels,
  disabled = false,
  onKeyPress,
  style,
}: PianoKeysProps): React.ReactElement {
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
        { height, flexDirection: 'row', position: 'relative', opacity: disabled ? 0.5 : 1 },
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
              paddingBottom: tokens.spacing.xs,
              borderWidth: 1,
              borderColor: colors.border,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: tokens.radius.sm,
              borderBottomRightRadius: tokens.radius.sm,
              backgroundColor: active
                ? withAlpha(colors.primary, 0.22)
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
                  top: tokens.spacing.xs,
                  width: 7,
                  height: 7,
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

      {/* Black keys overlaid at chromatic offsets. */}
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
              top: 0,
              left,
              width: `${whiteW * 0.6}%`,
              height: '62%',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingBottom: 4,
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
                  width: 6,
                  height: 6,
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
