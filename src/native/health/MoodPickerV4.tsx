import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { type Appearance } from '../primitives/internal/appearance';
import {
  looseCardStyle,
  onPair,
  toneFill,
  toneInk,
  trackGround,
  type ToneV4,
} from './internal/tone-v4';
import type { Mood, MoodPickerProps } from './MoodPicker';

export type { Mood };

export interface MoodPickerV4Props extends MoodPickerProps {
  /** Wording for each mood. Defaults to `Awful` … `Great`. */
  moodLabels?: Partial<Record<Mood, string>>;
  /** The group's own accessible name. Default `'Mood'`. */
  groupLabel?: string;
  /** Surface treatment. Defaults to `classic`, matching the rest of the module. */
  appearance?: Appearance;
}

const MOOD_GLYPH: Record<Mood, string> = {
  awful: '😣',
  bad: '🙁',
  okay: '😐',
  good: '🙂',
  great: '😄',
};

const MOOD_LABEL: Record<Mood, string> = {
  awful: 'Awful',
  bad: 'Bad',
  okay: 'Okay',
  good: 'Good',
  great: 'Great',
};

/**
 * Mood → tone. `okay` is `neutral` rather than the base's `muted`, which was
 * the *unselected* treatment, so choosing it produced no visible change at all.
 * The rest keep their reading: a mood genuinely is a status.
 */
const MOOD_TONE: Record<Mood, ToneV4> = {
  awful: 'danger',
  bad: 'warn',
  okay: 'neutral',
  good: 'primary',
  great: 'success',
};

const MOOD_ORDER: Mood[] = ['awful', 'bad', 'okay', 'good', 'great'];

/** One face. Its own component so each option can own its press state. */
function MoodFaceV4({
  mood,
  label,
  selected,
  showLabels,
  onChange,
}: {
  mood: Mood;
  label: string;
  selected: boolean;
  showLabels: boolean;
  onChange?: (mood: Mood) => void;
}): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const tone = MOOD_TONE[mood];
  const tap = minTap(tokens.spacing);
  const fill = selected ? toneFill(theme, tone) : 'transparent';
  const ground = selected ? fill : colors.surface;
  const groundInk = selected ? onPair(theme, tone) : colors.onSurface;

  const face = (pressed: boolean): React.ReactElement => (
    <View style={{ alignItems: 'center', gap: tokens.spacing.xs }}>
      <View
        style={{
          width: tap,
          height: tap,
          borderRadius: tokens.radius.full,
          borderWidth: 2,
          borderColor: selected ? toneFill(theme, tone) : trackGround(theme),
          // The press layer is mixed against the ground this face actually
          // paints, with that ground's own paired ink — `onSurface` over a tone
          // fill would be a layer nobody measured.
          backgroundColor: pressed ? pressOver(theme, ground, groundInk) : fill,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TextV4 size="xl" allowFontScaling={false}>
          {MOOD_GLYPH[mood]}
        </TextV4>
        {/* Selection is a mark as well as a fill: `okay` is a neutral tone, and
            a neutral fill alone is not a state anybody can see. */}
        {selected ? (
          <View
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              borderRadius: tokens.radius.full,
              paddingHorizontal: tokens.spacing.xs,
              backgroundColor: toneFill(theme, tone),
            }}
          >
            <TextV4
              size="xs"
              weight="bold"
              allowFontScaling={false}
              style={{ color: onPair(theme, tone) }}
            >
              ✓
            </TextV4>
          </View>
        ) : null}
      </View>
      {showLabels ? (
        <TextV4
          size="xs"
          weight={selected ? 'bold' : 'regular'}
          style={{ color: selected ? toneInk(theme, tone) : colors.mutedText }}
        >
          {label}
        </TextV4>
      ) : null}
    </View>
  );

  if (!onChange) {
    return (
      <View accessible accessibilityLabel={label} accessibilityState={{ checked: selected }}>
        {face(false)}
      </View>
    );
  }
  return (
    <Pressable
      accessibilityRole="radio"
      // A radio's state is `checked`. The base sent `selected`, which VoiceOver
      // reads on a tab or a cell and ignores here, so no option was ever
      // announced as the chosen one.
      accessibilityState={{ checked: selected }}
      accessibilityLabel={label}
      onPress={() => onChange(mood)}
    >
      {({ pressed }) => face(pressed)}
    </Pressable>
  );
}

/**
 * **V4 mood picker** — same props as {@link MoodPicker} plus `moodLabels`,
 * `groupLabel` and `appearance`.
 *
 * ## Five changes
 *
 * 1. **Choosing "Okay" now does something.** Its tone was `muted`, which is
 *    exactly the unselected treatment, so the middle option of a five-point
 *    scale gave no feedback at all — and with `showLabels={false}` nothing
 *    whatsoever distinguished it. Selection is a filled ground **and** a check
 *    mark now, so it survives a neutral tone, greyscale and CVD.
 * 2. **The unselected faces stop being dimmed.** `opacity: 0.5` on every
 *    option but the chosen one is inside M3's disabled band: picking a mood
 *    made the other four look unavailable rather than unchosen.
 * 3. **A radio announces `checked`.** The base sent `accessibilityState={{
 *    selected }}`, which is not the state a radio carries, so a reader was
 *    never told which mood was chosen.
 * 4. **The group has a name**, and it is explicitly *not* one accessibility
 *    element — an `accessible` radiogroup would swallow its own options.
 * 5. **A face clears 44** and presses with a state layer rather than
 *    `opacity: pressed ? 0.7 : 1`.
 */
export function MoodPickerV4({
  value,
  options = MOOD_ORDER,
  showLabels = true,
  moodLabels,
  groupLabel = 'Mood',
  appearance = 'classic',
  onChange,
  style,
}: MoodPickerV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { tokens } = theme;

  return (
    <View
      // Explicitly NOT `accessible`: a group that is one element flattens the
      // radios inside it and there is then nothing left to choose.
      accessible={false}
      accessibilityRole="radiogroup"
      accessibilityLabel={groupLabel}
      style={[
        { flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.xs },
        // `classic` is deliberately surface-free: a row of faces sits on the
        // page unless the caller asks for a treatment, exactly as the rings and
        // the streak readout do.
        looseCardStyle(theme, appearance),
        style,
      ]}
    >
      {options.map((mood) => (
        <MoodFaceV4
          key={mood}
          mood={mood}
          label={moodLabels?.[mood] ?? MOOD_LABEL[mood]}
          selected={value === mood}
          showLabels={showLabels}
          onChange={onChange}
        />
      ))}
    </View>
  );
}
