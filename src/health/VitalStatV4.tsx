import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { TONE_INK } from '../primitives/internal/tone-v4';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import { rangeVerdict, type HealthRange, type RangeVerdict } from './goal-v4';
import type { VitalStatProps } from './VitalStat';
import {
  appearanceClass,
  appearanceStateVars,
  FOCUS_RING_CLASS,
  HEALTH_TILE_CLASS,
  spokenLine,
  VERDICT_LABEL,
  VERDICT_TONE,
  type Appearance,
} from './internal/tone-v4';

export interface VitalStatV4Props extends VitalStatProps {
  /** The reading's normal band. Given one, tone and a word follow the verdict. */
  range?: HealthRange;
  /** Override the three verdict words. */
  rangeLabels?: Partial<Record<RangeVerdict, string>>;
  /** Surface preset, matching the native twin. Default `'classic'`. */
  appearance?: Appearance;
}

interface VitalMeta {
  glyph: string;
  label: string;
  unit: string;
}

/**
 * Identity only — glyph, name and unit.
 *
 * The base's fourth field was a `color`, and dropping it is change 1: a
 * discipline, a category or a vital sign is *not* a status, and spending
 * `danger` on "this tile is about the heart" leaves nothing to say when the
 * heart rate is actually dangerous.
 */
const VITAL_META: Record<VitalStatProps['variant'], VitalMeta> = {
  'heart-rate': { glyph: '❤️', label: 'Heart rate', unit: 'bpm' },
  steps: { glyph: '👟', label: 'Steps', unit: '' },
  calories: { glyph: '🔥', label: 'Calories', unit: 'kcal' },
  distance: { glyph: '📍', label: 'Distance', unit: 'km' },
  oxygen: { glyph: '🫁', label: 'Blood oxygen', unit: '%' },
  'blood-pressure': { glyph: '🩺', label: 'Blood pressure', unit: 'mmHg' },
  temperature: { glyph: '🌡️', label: 'Temperature', unit: '°C' },
  respiration: { glyph: '💨', label: 'Respiration', unit: 'br/min' },
};

/**
 * **V4 vital stat** — same props as {@link VitalStat} plus `range`,
 * `rangeLabels` and `appearance` (`label` and `unit` were already there).
 *
 * ## Five changes
 *
 * 1. **A resting 58 bpm and a dangerous 190 bpm rendered identically.** The
 *    tone was fixed by `variant` — `heart-rate` was permanently `danger`,
 *    `temperature` permanently `warn` — so the status vocabulary was spent on
 *    *identity* and had nothing left to say about the reading. The glyph now
 *    carries the identity; pass a `range` and `success`/`warn`/`danger` mean
 *    what they say, with a word beside them so nothing rests on colour. With no
 *    `range` the tile behaves exactly as it did.
 * 2. **The delta reached sighted users only.** The card computed it, coloured
 *    it and drew it — and then left it out of the accessible name, which, once
 *    the tile was a `role="button"`, *replaced* its contents. The one number
 *    that says whether the reading is moving was silently dropped.
 * 3. **The activation is a real `<button>` and clears 44.** `div` +
 *    `role="button"` + `tabIndex` + a hand-written Enter/Space handler is three
 *    approximations of a button, and it sat inside a tile with no minimum
 *    height.
 * 4. **Press is a state layer.** `hover:opacity-80` dims the tile's own
 *    content, which is M3's *disabled* signal.
 * 5. **The value is inked with the corrected slot**, not the fill token — the
 *    largest number on the tile was drawn in `var(--xen-danger)`, measured as
 *    low as 1.32:1 against the card.
 */
export const VitalStatV4 = React.forwardRef<HTMLDivElement, VitalStatV4Props>(function VitalStatV4(
  {
    variant,
    value,
    unit,
    label,
    delta,
    onPress,
    range,
    rangeLabels,
    appearance = 'classic',
    className,
    ...rest
  },
  ref
) {
  React.useEffect(() => {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
  }, []);

  const meta = VITAL_META[variant];
  const resolvedUnit = unit ?? meta.unit;
  const resolvedLabel = label ?? meta.label;

  // `Number(value)` because `value` is a ReactNode: a tile showing "120/80" has
  // no single reading to classify, and `rangeVerdict` on NaN is honest about it.
  const numeric = typeof value === 'number' ? value : Number(String(value));
  const verdict = Number.isFinite(numeric) ? rangeVerdict(numeric, range) : undefined;
  const verdictWord = verdict ? (rangeLabels?.[verdict] ?? VERDICT_LABEL[verdict]) : undefined;

  const deltaWord =
    delta == null || delta === 0 ? undefined : `${delta > 0 ? '+' : '−'}${Math.abs(delta)}`;
  const deltaInk =
    delta == null || delta === 0 ? 'text-muted-text' : delta > 0 ? TONE_INK.success : TONE_INK.danger;

  const name = spokenLine([
    resolvedLabel,
    `${String(value)}${resolvedUnit ? ` ${resolvedUnit}` : ''}`,
    verdictWord,
    deltaWord,
  ]);

  const body = (
    <>
      <span className="flex items-center gap-xs">
        <span aria-hidden className="text-base leading-none">
          {meta.glyph}
        </span>
        <span className="min-w-0 flex-1 truncate text-xs text-muted-text">{resolvedLabel}</span>
      </span>
      <span className="flex items-end gap-xs">
        <span
          className={cn(
            'text-2xl font-bold',
            verdict ? TONE_INK[VERDICT_TONE[verdict]] : 'text-on-card'
          )}
        >
          {value}
        </span>
        {resolvedUnit ? <span className="text-sm text-muted-text">{resolvedUnit}</span> : null}
      </span>
      {verdictWord ? (
        <span
          className={cn('text-xs font-semibold', TONE_INK[VERDICT_TONE[verdict as RangeVerdict]])}
        >
          {verdictWord}
        </span>
      ) : null}
      {deltaWord ? (
        <span className={cn('text-xs font-semibold', deltaInk)}>
          <span aria-hidden>{delta != null && delta > 0 ? '▲ ' : '▼ '}</span>
          {deltaWord}
        </span>
      ) : null}
    </>
  );

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-xs',
        HEALTH_TILE_CLASS,
        appearanceClass(appearance),
        className
      )}
      {...rest}
    >
      {onPress ? (
        <button
          type="button"
          aria-label={name}
          onClick={onPress}
          data-xen-v4-state=""
          style={appearanceStateVars(appearance)}
          className={cn(
            'flex flex-col gap-xs rounded-[var(--xen-radius-sm)] bg-transparent text-left',
            MIN_TAP_CLASS,
            FOCUS_RING_CLASS
          )}
        >
          {body}
        </button>
      ) : (
        body
      )}
    </div>
  );
});
