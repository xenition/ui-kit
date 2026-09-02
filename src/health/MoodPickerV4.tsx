import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { TONE_INK, type ToneV4 } from '../primitives/internal/tone-v4';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import type { Mood, MoodPickerProps } from './MoodPicker';
import {
  appearanceStateVars,
  FOCUS_RING_CLASS,
  frameClass,
  type Appearance,
} from './internal/tone-v4';

export interface MoodPickerV4Props extends MoodPickerProps {
  /** Override the five mood words. */
  moodLabels?: Partial<Record<Mood, string>>;
  /** The group's accessible name. Default `'Mood'`. */
  groupLabel?: string;
  /** Surface preset, matching the native twin. Default `'classic'`. */
  appearance?: Appearance;
}

interface MoodMeta {
  glyph: string;
  label: string;
  /** A self-reported state is a verdict, so the scale keeps its status tones. */
  tone: ToneV4;
}

const MOOD_META: Record<Mood, MoodMeta> = {
  awful: { glyph: '😣', label: 'Awful', tone: 'danger' },
  bad: { glyph: '🙁', label: 'Bad', tone: 'warn' },
  okay: { glyph: '😐', label: 'Okay', tone: 'neutral' },
  good: { glyph: '🙂', label: 'Good', tone: 'primary' },
  great: { glyph: '😄', label: 'Great', tone: 'success' },
};

const MOOD_ORDER: Mood[] = ['awful', 'bad', 'okay', 'good', 'great'];

/**
 * **V4 mood picker** — same props as {@link MoodPicker} plus `moodLabels`,
 * `groupLabel` and `appearance`.
 *
 * ## Five changes
 *
 * 1. **Choosing "Okay" produced no selected state at all.** Selection was drawn
 *    as a border in the mood's own colour, and "Okay"'s colour is `muted` —
 *    which is exactly the unselected treatment. With `showLabels={false}`
 *    nothing whatsoever distinguished the chosen face from the other four, so
 *    the middle of a five-point scale was unpickable. Selection is now carried
 *    by the ground, the border and the weight, none of which depends on which
 *    mood was picked.
 * 2. **The unpicked faces were dimmed to 0.38-ish.** `opacity-50` on the
 *    alternatives is M3's *disabled* band, so four perfectly available choices
 *    looked unavailable. They are simply not selected now.
 * 3. **The radiogroup behaves like one.** No roving `tabIndex`, no arrow keys
 *    and no name on the group: a keyboard user tabbed through five separate
 *    stops into an unnamed collection. Arrow keys and Home/End move and select,
 *    one stop carries the tab, and the group has a name.
 * 4. **The faces clear 44** and press is a state layer, not `hover:opacity-70`
 *    — see change 2 for why dimming cannot mean two things at once.
 * 5. **The read-only branch stopped naming bare `<span>`s.** Role `generic`
 *    cannot be named; the five labels were dropped by the browser. It is a
 *    list now, and the chosen mood says that it is chosen in words.
 */
export const MoodPickerV4 = React.forwardRef<HTMLDivElement, MoodPickerV4Props>(
  function MoodPickerV4(
    {
      value,
      options = MOOD_ORDER,
      showLabels = true,
      onChange,
      moodLabels,
      groupLabel = 'Mood',
      appearance = 'classic',
      className,
      ...rest
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    }, []);

    const faces = React.useRef<Array<HTMLButtonElement | null>>([]);
    const word = (mood: Mood): string => moodLabels?.[mood] ?? MOOD_META[mood].label;

    // One tab stop for the whole group, ARIA's radiogroup pattern: the selected
    // radio takes it, or the first when nothing is selected yet.
    const selectedIndex = value ? options.indexOf(value) : -1;
    const tabIndexOf = (index: number): 0 | -1 =>
      (selectedIndex === -1 ? index === 0 : index === selectedIndex) ? 0 : -1;

    const move = (from: number, step: number): void => {
      if (!onChange) return;
      const next = (from + step + options.length) % options.length;
      const mood = options[next];
      if (mood === undefined) return;
      onChange(mood);
      faces.current[next]?.focus();
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number): void => {
      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault();
          move(index, 1);
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault();
          move(index, -1);
          break;
        case 'Home':
          event.preventDefault();
          move(-1, 1);
          break;
        case 'End':
          event.preventDefault();
          move(0, -1);
          break;
        default:
          break;
      }
    };

    const shell = cn('flex justify-between gap-xs', frameClass(appearance), className);

    const face = (mood: Mood, selected: boolean): React.ReactElement => (
      <>
        <span
          aria-hidden
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-full border-2 text-xl',
            // Ground, border and weight — never the mood's own hue, which is
            // what made "Okay" indistinguishable from unselected.
            selected ? 'border-primary bg-selected' : 'border-border bg-card'
          )}
        >
          {MOOD_META[mood].glyph}
        </span>
        {showLabels ? (
          <span
            className={cn(
              'text-xs',
              selected ? cn('font-bold', TONE_INK[MOOD_META[mood].tone]) : 'text-muted-text'
            )}
          >
            {word(mood)}
          </span>
        ) : null}
      </>
    );

    if (!onChange) {
      return (
        <div ref={ref} className={shell} {...rest}>
          <ul role="group" aria-label={groupLabel} className="flex flex-1 justify-between gap-xs">
            {options.map((mood) => {
              const selected = value === mood;
              return (
                <li key={mood} className="flex flex-col items-center gap-xs">
                  {face(mood, selected)}
                  {/* Nothing is carried by colour alone, so selection gets a word. */}
                  <span className="sr-only">
                    {selected ? `${word(mood)}, selected` : word(mood)}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }

    return (
      <div ref={ref} role="radiogroup" aria-label={groupLabel} className={shell} {...rest}>
        {options.map((mood, index) => {
          const selected = value === mood;
          return (
            <button
              key={mood}
              ref={(node) => {
                faces.current[index] = node;
              }}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={word(mood)}
              tabIndex={tabIndexOf(index)}
              onClick={() => onChange(mood)}
              onKeyDown={(event) => onKeyDown(event, index)}
              data-xen-v4-state=""
              style={appearanceStateVars(appearance)}
              className={cn(
                'flex flex-col items-center gap-xs rounded-[var(--xen-radius-md)] bg-transparent px-xs',
                MIN_TAP_CLASS,
                FOCUS_RING_CLASS
              )}
            >
              {face(mood, selected)}
            </button>
          );
        })}
      </div>
    );
  }
);
