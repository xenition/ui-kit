import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { StepsV4 } from '../primitives/StepsV4';
import { TextV4 } from '../primitives/TextV4';
import { stageParts } from '../../jobs/hiring-v4';
import type { ApplicationStage } from './types';
import { APPLICATION_STAGES, STAGE_LABEL } from './types';
import { spokenName, type ToneV4 } from './internal/tone-v4';
import type { StatusPipelineProps, StatusPipelineVariant } from './StatusPipeline';

export type { StatusPipelineVariant };

export interface StatusPipelineV4Props extends StatusPipelineProps {
  /** Re-word one or more stages. Defaults to the module's `STAGE_LABEL`. */
  stageLabels?: Partial<Record<ApplicationStage, string>>;
  /** Render the position. Default `'Stage 2 of 5'`. */
  formatPosition?: (index: number, total: number) => string;
  /** Said instead of a position when the stage is not in the pipeline. */
  unknownStageLabel?: string;
}

/** Called out as text, never as a hue alone. */
const REJECTED = 'Rejected';

/**
 * **V4 status pipeline** — same props as {@link StatusPipeline} plus
 * `stageLabels`, `formatPosition` and `unknownStageLabel`.
 *
 * ## Four changes
 *
 * 1. **The stage is spoken.** The base put its summary on a `View` that was
 *    never `accessible` (and, on the web twin, on `role="text"` — not an ARIA
 *    role at all). So `<ApplicationRow application={{stage:'interview'}} />`
 *    announced the job title and nothing else: where the application actually
 *    stands, the entire reason the row exists, was silent on both platforms.
 * 2. **An unknown stage is admitted, not invented.** `Math.max(0,
 *    indexOf(stage))` turned "not found" into the first stage, so a withdrawn
 *    application announced "Stage 1 of 5: Applied" with total confidence.
 *    `stageParts` reports the miss; the track then draws no current marker and
 *    the name says `unknownStageLabel` instead of a position it does not know.
 * 3. **The two twins stopped disagreeing.** For an unrecognised stage the base
 *    fell back to the label `'Applied'` on web and to the raw union member
 *    `'applied'` on native — the same input, two different sentences, one of
 *    them an internal identifier read out loud. Neither survives: an unknown
 *    stage is named by `unknownStageLabel` on both twins.
 * 4. **The position is a real value, not a caption.** The track is a drawn
 *    progress indicator, so it carries `accessibilityRole="progressbar"` with
 *    an `accessibilityValue` — which is what lets a reader say "3 of 5"
 *    without the user having to parse a row of circles.
 *
 * Colour still means status here and only here: `danger` for a rejection,
 * `success` for hired, `primary` for in-flight. The employment *type* tinting
 * this module also carried — `contract → warn`, `remote → success` — was
 * identity wearing a status colour, and is gone from `JobCardV4` and
 * `SavedJobRowV4`.
 */
export function StatusPipelineV4({
  stage,
  rejected = false,
  variant = 'full',
  stageLabels,
  formatPosition = (index: number, total: number) => `Stage ${index + 1} of ${total}`,
  unknownStageLabel = 'Stage unknown',
  style,
}: StatusPipelineV4Props): React.ReactElement {
  const { tokens } = useXenitionTheme();

  const { index, total, known } = stageParts(stage, APPLICATION_STAGES);
  const label = known ? (stageLabels?.[stage] ?? STAGE_LABEL[stage]) : unknownStageLabel;
  const position = known ? formatPosition(index, total) : unknownStageLabel;

  const summary = rejected
    ? spokenName([REJECTED, position, label])
    : spokenName([position, label]);

  // Only claim a value when there is one. A progressbar reporting `now: 1` for
  // a stage nobody recognised is the same lie the base told in words.
  const progress = {
    accessibilityRole: 'progressbar' as const,
    accessibilityValue: known
      ? { min: 1, max: total, now: index + 1, text: summary }
      : { text: summary },
  };

  if (variant === 'compact') {
    const tone: ToneV4 = rejected ? 'danger' : stage === 'hired' ? 'success' : 'primary';
    return (
      <View
        accessible
        accessibilityLabel={summary}
        {...progress}
        style={[{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, style]}
      >
        <BadgeV4 tone={known ? tone : 'neutral'} size="sm">
          {rejected ? `${label} · ${REJECTED}` : label}
        </BadgeV4>
        <TextV4 size="xs" tone="mutedText" numeric="tabular">
          {position}
        </TextV4>
      </View>
    );
  }

  return (
    <View
      accessible
      accessibilityLabel={summary}
      {...progress}
      style={[{ gap: tokens.spacing.sm }, style]}
    >
      <StepsV4
        steps={APPLICATION_STAGES.map((s) => ({ title: stageLabels?.[s] ?? STAGE_LABEL[s] }))}
        // `-1` marks nothing done and nothing current, which is the honest
        // drawing of "we do not know where this is".
        current={known ? index : -1}
      />
      {rejected ? (
        <TextV4 size="xs" weight="semibold" tone="dangerText">
          {`✕ ${REJECTED} at ${label}`}
        </TextV4>
      ) : null}
    </View>
  );
}
