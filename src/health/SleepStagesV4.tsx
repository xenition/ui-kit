import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import {
  appearanceClass,
  HEALTH_CARD_CLASS,
  spokenLine,
  type Appearance,
} from './internal/tone-v4';

/** The four stages a night is scored into. */
export type SleepStage = 'deep' | 'rem' | 'light' | 'awake';

/** One measured stretch of a night. */
export interface SleepStageSegment {
  /** Which stage. */
  stage: SleepStage;
  /** How long it lasted, in minutes. */
  minutes: number;
}

export interface SleepStagesV4Props extends React.HTMLAttributes<HTMLDivElement> {
  /** The night, in the order it was slept. Zero and negative stretches are dropped. */
  stages: SleepStageSegment[];
  /** Override the four stage words. */
  stageLabels?: Partial<Record<SleepStage, string>>;
  /** Render a duration. Default `'1h 20m'`. */
  formatDuration?: (minutes: number) => string;
  /** Draw the legend under the bar. Default `true`. */
  showLegend?: boolean;
  /** Copy when there is nothing to draw. Default `'No sleep stages recorded'`. */
  emptyLabel?: string;
  /** A next step under the empty title. */
  emptyDescription?: string;
  /** The figure's accessible name. Default `'Sleep stages'`. */
  label?: string;
  /** Surface preset, matching the native twin. Default `'classic'`. */
  appearance?: Appearance;
}

/** Drawn outermost-first, deepest to lightest — the order a hypnogram reads in. */
const STAGE_ORDER: readonly SleepStage[] = ['deep', 'rem', 'light', 'awake'];

const STAGE_LABEL: Record<SleepStage, string> = {
  deep: 'Deep',
  rem: 'REM',
  light: 'Light',
  awake: 'Awake',
};

/**
 * The four fills.
 *
 * **Identity, not status**, so none of them is `success`, `warn` or `danger`:
 * REM is not a warning and being briefly awake is not an error. Two brand slots
 * plus two derived steps of the card's own ink give four fills that stay
 * distinguishable in either scheme, and every one of them is named in words in
 * the legend so the chart never rests on hue alone.
 */
const STAGE_FILL: Record<SleepStage, string> = {
  deep: 'var(--xen-primary)',
  rem: 'var(--xen-accent)',
  light: 'color-mix(in srgb, var(--xen-primary) 45%, var(--xen-card))',
  awake: 'color-mix(in srgb, var(--xen-on-card) 20%, var(--xen-card))',
};

/** `95` → `'1h 35m'`; `40` → `'40m'`. */
function defaultDuration(minutes: number): string {
  const whole = Math.max(Math.round(minutes), 0);
  const hours = Math.floor(whole / 60);
  const rest = whole % 60;
  return hours > 0 ? `${hours}h ${rest}m` : `${rest}m`;
}

/**
 * **V4 sleep stages** — deep, REM, light and awake across one night, with a
 * legend and a single spoken sentence.
 *
 * There is no base component. This is the piece the `health` line kept needing
 * and did not have.
 *
 * ## Why it exists
 *
 * 1. **`SleepBar` collapses a whole night to one number and one adjective.**
 *    "7.5h, Good" cannot distinguish a night of unbroken deep sleep from seven
 *    and a half hours of light sleep broken eleven times, which is the
 *    difference a sleep screen exists to show.
 * 2. **A stacked band is the one chart that needs no axis.** Each stretch is
 *    drawn at its true share of the night, so the picture is the proportion —
 *    and the same proportions are printed as words and minutes in the legend,
 *    because a band of four colours with no numbers is decoration.
 * 3. **The stages take no status colour.** Being briefly awake is not an error
 *    and REM is not a warning; spending `warn` on either is what left the rest
 *    of the module unable to say when something genuinely was wrong.
 * 4. **A night with nothing in it says so.** An empty `stages` array renders a
 *    real empty state rather than a bar of width nought.
 */
export const SleepStagesV4 = React.forwardRef<HTMLDivElement, SleepStagesV4Props>(
  function SleepStagesV4(
    {
      stages,
      stageLabels,
      formatDuration,
      showLegend = true,
      emptyLabel = 'No sleep stages recorded',
      emptyDescription,
      label = 'Sleep stages',
      appearance = 'classic',
      className,
      ...rest
    },
    ref
  ) {
    const show = formatDuration ?? defaultDuration;
    const word = (stage: SleepStage): string => stageLabels?.[stage] ?? STAGE_LABEL[stage];

    const drawn = stages.filter(
      (segment) => Number.isFinite(segment.minutes) && segment.minutes > 0
    );
    const total = drawn.reduce((sum, segment) => sum + segment.minutes, 0);

    const shell = cn(
      'flex flex-col gap-sm',
      HEALTH_CARD_CLASS,
      appearanceClass(appearance),
      className
    );

    if (total <= 0) {
      return (
        <div ref={ref} className={shell} {...rest}>
          <EmptyStateV4 title={emptyLabel} description={emptyDescription} />
        </div>
      );
    }

    // Totalled per stage, because a night interleaves them: five separate
    // stretches of light sleep are one fact about the night, not five.
    const totals = STAGE_ORDER.map((stage) => ({
      stage,
      minutes: drawn
        .filter((segment) => segment.stage === stage)
        .reduce((sum, segment) => sum + segment.minutes, 0),
    })).filter((entry) => entry.minutes > 0);

    const summary = spokenLine([
      label,
      show(total),
      ...totals.map((entry) => {
        const share = Math.round((entry.minutes / total) * 100);
        return `${word(entry.stage)} ${show(entry.minutes)}, ${share}%`;
      }),
    ]);

    return (
      <div ref={ref} className={shell} {...rest}>
        <div className="flex items-baseline justify-between gap-sm">
          <span className="text-xs text-muted-text">{label}</span>
          <span className="text-base font-semibold text-on-card">{show(total)}</span>
        </div>

        {/*
          One figure, one sentence: the bar is the only thing here that speaks,
          and the legend below repeats it verbatim for the eye, so the legend is
          hidden from the reader rather than said twice.
        */}
        <div
          role="img"
          aria-label={summary}
          className="flex h-3 w-full overflow-hidden rounded-full"
        >
          {drawn.map((segment, index) => (
            <span
              key={index}
              className="h-full"
              style={{
                width: `${(segment.minutes / total) * 100}%`,
                backgroundColor: STAGE_FILL[segment.stage],
              }}
            />
          ))}
        </div>

        {showLegend ? (
          <ul aria-hidden className="flex flex-wrap gap-md">
            {totals.map((entry) => (
              <li key={entry.stage} className="flex items-center gap-xs">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: STAGE_FILL[entry.stage] }}
                />
                <span className="text-xs text-on-card">{word(entry.stage)}</span>
                <span className="text-xs text-muted-text">{show(entry.minutes)}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }
);
