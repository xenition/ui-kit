import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { SparklineV4 } from '../charts/SparklineV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { TONE_INK } from '../primitives/internal/tone-v4';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import { rangeVerdict, type HealthRange, type RangeVerdict } from './goal-v4';
import type { BodyMetricCardProps, BodyMetricVariant } from './BodyMetricCard';
import {
  appearanceClass,
  appearanceStateVars,
  FOCUS_RING_CLASS,
  HEALTH_CARD_CLASS,
  spokenLine,
  VERDICT_LABEL,
  VERDICT_TONE,
  type Appearance,
} from './internal/tone-v4';

export interface BodyMetricCardV4Props extends BodyMetricCardProps {
  /** The reading's normal band. Given one, tone and a word follow the verdict. */
  range?: HealthRange;
  /** Override the variant's default name. */
  label?: string;
  /** Override the three verdict words. */
  rangeLabels?: Partial<Record<RangeVerdict, string>>;
  /** Surface preset, matching the native twin. Default `'classic'`. */
  appearance?: Appearance;
}

interface BodyMeta {
  glyph: string;
  label: string;
  unit: string;
}

/** Identity only. A body metric is a subject, not a status. */
const BODY_META: Record<BodyMetricVariant, BodyMeta> = {
  weight: { glyph: '⚖️', label: 'Weight', unit: 'kg' },
  bmi: { glyph: '📊', label: 'BMI', unit: '' },
  'body-fat': { glyph: '📉', label: 'Body fat', unit: '%' },
  muscle: { glyph: '💪', label: 'Muscle mass', unit: 'kg' },
  waist: { glyph: '📏', label: 'Waist', unit: 'cm' },
  'blood-sugar': { glyph: '🩸', label: 'Blood sugar', unit: 'mg/dL' },
};

/**
 * **V4 body metric card** — same props as {@link BodyMetricCard} plus `range`,
 * `label`, `rangeLabels` and `appearance` (`unit` was already there).
 *
 * ## Five changes
 *
 * 1. **The drop the card exists to show never reached a screen reader.** The
 *    delta was computed, tinted and drawn, and then left out of the accessible
 *    name — and because the whole card was a `role="button"`, that name
 *    *replaced* its contents. So "▼ 1.2 kg", the entire point of a weight card,
 *    was sighted-only.
 * 2. **A fasting glucose of 260 mg/dL rendered identically to 95.** There was
 *    no way to express a normal band at all. Pass a `range` and the reading
 *    takes its tone and a word from `rangeVerdict`; with none, nothing changes.
 * 3. **The sparkline is a sibling, not a descendant.** Inside `role="button"`
 *    it was pruned along with everything else, so the trend it draws had no
 *    name of its own. It now sits beside the activation and keeps one.
 * 4. **The activation is a real `<button>` that clears 44.** `div` +
 *    `role="button"` + `tabIndex` + a hand-written Enter/Space handler is three
 *    approximations of a button.
 * 5. **Press is a state layer and the ink is the corrected slot.**
 *    `hover:opacity-90` is M3's disabled band spent on hover, and
 *    `text-success` is a fill token doing a text colour's job.
 */
export const BodyMetricCardV4 = React.forwardRef<HTMLDivElement, BodyMetricCardV4Props>(
  function BodyMetricCardV4(
    {
      variant,
      value,
      unit,
      delta,
      lowerIsBetter = false,
      trend,
      onPress,
      range,
      label,
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

    const meta = BODY_META[variant];
    const resolvedUnit = unit ?? meta.unit;
    const resolvedLabel = label ?? meta.label;

    const numeric = typeof value === 'number' ? value : Number(String(value));
    const verdict = Number.isFinite(numeric) ? rangeVerdict(numeric, range) : undefined;
    const verdictWord = verdict ? (rangeLabels?.[verdict] ?? VERDICT_LABEL[verdict]) : undefined;

    // A delta's direction genuinely is good or bad news, so this is a status
    // colour spent on a status — unlike the variant tints change 2 retires.
    const change = delta != null && delta !== 0 ? delta : undefined;
    const good = change === undefined ? false : lowerIsBetter ? change < 0 : change > 0;
    const deltaText =
      change === undefined
        ? undefined
        : `${change > 0 ? '+' : '−'}${Math.abs(change)}${resolvedUnit ? ` ${resolvedUnit}` : ''}`;

    const name = spokenLine([
      resolvedLabel,
      `${String(value)}${resolvedUnit ? ` ${resolvedUnit}` : ''}`,
      verdictWord,
      deltaText,
    ]);

    const head = (
      <>
        <span className="flex items-center gap-xs">
          <span aria-hidden className="text-base leading-none">
            {meta.glyph}
          </span>
          <span className="text-sm text-muted-text">{resolvedLabel}</span>
        </span>
        <span className="flex items-end gap-xs">
          <span
            className={cn(
              'text-3xl font-bold',
              verdict ? TONE_INK[VERDICT_TONE[verdict]] : 'text-on-card'
            )}
          >
            {value}
          </span>
          {resolvedUnit ? <span className="text-base text-muted-text">{resolvedUnit}</span> : null}
        </span>
        {verdictWord ? (
          <span
            className={cn('text-xs font-semibold', TONE_INK[VERDICT_TONE[verdict as RangeVerdict]])}
          >
            {verdictWord}
          </span>
        ) : null}
        {deltaText ? (
          <span
            className={cn('text-sm font-semibold', good ? TONE_INK.success : TONE_INK.danger)}
          >
            <span aria-hidden>{change !== undefined && change > 0 ? '▲ ' : '▼ '}</span>
            {deltaText}
          </span>
        ) : null}
      </>
    );

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-sm',
          HEALTH_CARD_CLASS,
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
              'flex flex-col gap-xs rounded-[var(--xen-radius-md)] bg-transparent text-left',
              MIN_TAP_CLASS,
              FOCUS_RING_CLASS
            )}
          >
            {head}
          </button>
        ) : (
          <span className="flex flex-col gap-xs">{head}</span>
        )}

        {/* Beside the activation, so the trend keeps a name of its own. */}
        {trend && trend.length > 0 ? (
          <SparklineV4
            data={trend}
            tone={change === undefined ? undefined : good ? 'success' : 'danger'}
            aria-label={`${resolvedLabel} trend over ${trend.length} readings`}
          />
        ) : null}
      </div>
    );
  }
);
