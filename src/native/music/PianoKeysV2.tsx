import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { shadow } from '../primitives/internal/elevation';
import { NOTE_NAMES, isBlackKey, withAlpha } from './types';
import type { PianoKeysProps } from './PianoKeys';

/** Same public contract as {@link PianoKeys} — a drop-in alternate design. */
export type PianoKeysV2Props = PianoKeysProps;

/** White-key pitch classes in order, with their chromatic index. */
const WHITE = [0, 2, 4, 5, 7, 9, 11];

/**
 * PianoKeys, redesigned (v2): a **large keyboard with raised keys and labels**.
 * Tall white keys sit under overlaid black keys that read as physically raised
 * (drop shadow + a lit top edge), and every white key carries its note label.
 * A held key (`highlightedNotes`) tints **and** drops a filled marker plus the
 * a11y `selected` state — never color alone. Pressing fires `onKeyPress(note)`.
 * Token-only styling. Distinct at a glance from v1's flatter octave. Same props.
 */
export function PianoKeysV2({
  startOctave = 4,
  octaves = 1,
  highlightedNotes,
  variant = 'full',
  showLabels,
  disabled = false,
  onKeyPress,
  style,
}: PianoKeysV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const count = Math.max(1, Math.trunc(Number.isFinite(octaves) ? octaves : 1));
  const base = Number.isFinite(startOctave) ? Math.trunc(startOctave) : 4;
  const held = new Set(highlightedNotes ?? []);
  const labels = showLabels ?? true;
  const height = variant === 'compact' ? 132 : 184;

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
          padding: tokens.spacing.xs,
          borderRadius: tokens.radius.md,
          backgroundColor: withAlpha(colors.onSurface, 0.06),
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
              paddingBottom: tokens.spacing.sm,
              marginHorizontal: 1,
              borderWidth: 1,
              borderColor: colors.border,
              borderBottomLeftRadius: tokens.radius.md,
              borderBottomRightRadius: tokens.radius.md,
              backgroundColor: active
                ? withAlpha(colors.primary, 0.24)
                : pressed
                  ? withAlpha(colors.primary, 0.12)
                  : colors.surface,
              ...shadow('sm', tokens),
            })}
          >
            {active ? (
              <View
                style={{
                  position: 'absolute',
                  top: tokens.spacing.sm,
                  width: 10,
                  height: 10,
                  borderRadius: tokens.radius.full,
                  backgroundColor: colors.primary,
                }}
              />
            ) : null}
            {labels ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
                {k.note}
              </Text>
            ) : null}
          </Pressable>
        );
      })}

      {/* Raised black keys overlaid at chromatic offsets. */}
      {whiteKeys.map((k, wi) => {
        const nextChroma = (k.chroma + 1) % 12;
        if (!isBlackKey(nextChroma)) return null;
        const note = `${NOTE_NAMES[nextChroma]}${k.octave}`;
        const active = held.has(note);
        const left = `${(wi + 1) * whiteW - whiteW * 0.32}%` as const;
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
              width: `${whiteW * 0.64}%`,
              height: '60%',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingBottom: 6,
              // Lit top edge reads as a raised bevel.
              borderTopWidth: 2,
              borderTopColor: withAlpha(colors.surface, 0.4),
              borderBottomLeftRadius: tokens.radius.md,
              borderBottomRightRadius: tokens.radius.md,
              backgroundColor: active
                ? colors.primary
                : pressed
                  ? withAlpha(colors.onSurface, 0.72)
                  : colors.onSurface,
              ...shadow('md', tokens),
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
