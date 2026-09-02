import * as React from 'react';
import { BadgeV4 } from '../primitives/BadgeV4';
import { StepsV4 } from '../primitives/StepsV4';
import { cn } from '../primitives/cn';
import type { StatusPipelineProps } from './StatusPipeline';
import type { ApplicationStage } from './types';
import { APPLICATION_STAGES, STAGE_LABEL } from './types';
import { stageSummaryV4, TABULAR_CLASS } from './internal/tone-v4';

export interface StatusPipelineV4Props extends StatusPipelineProps {
  /** Override any stage's word. Unlisted stages keep {@link STAGE_LABEL}. */
  stageLabels?: Partial<Record<ApplicationStage, string>>;
  /** Render the position. Default `'3 of 5'`. */
  formatPosition?: (index: number, total: number) => string;
  /** Said when the stage is not in the pipeline. Default `'Stage unknown'`. */
  unknownStageLabel?: string;
}

/**
 * **V4 status pipeline** — same props as {@link StatusPipeline} plus
 * `stageLabels`, `formatPosition` and `unknownStageLabel`.
 *
 * ## Five changes
 *
 * 1. **The stage was announced nowhere.** `compact` — the variant every
 *    `ApplicationRow` in the module renders — hung its entire accessible name
 *    off `role="text"`. That is not an ARIA role; it is a WebKit extension,
 *    and Chrome and Firefox drop it *and* the `aria-label` with it. The `full`
 *    variant was no better: it put `aria-label` on a bare `<div>`, and ARIA
 *    forbids naming a `generic` element. Where an application actually sits —
 *    the reason the component exists — reached nobody. It is now ordinary
 *    visible text in `compact`, and a named `role="group"` around the step
 *    track in `full`.
 * 2. **An unknown stage is admitted rather than guessed at.** The base's
 *    `Math.max(0, indexOf(stage))` turned "not found" into the first stage, so
 *    a withdrawn or archived application announced "Stage 1 of 5: Applied"
 *    with total confidence — and the two twins picked *different* fallback
 *    words for the same input. `stageParts` reports the miss; this says
 *    `unknownStageLabel` and draws an empty track, which is the honest picture
 *    of not knowing.
 * 3. **The current step carries `aria-current="step"`,** through `StepsV4`, so
 *    "where am I" is a state a reader can query and not a fill colour.
 * 4. **The position is drawn as well as spoken.** `full` showed five markers
 *    and left the reader to count them; the `n of m` line is now beside the
 *    track in both variants.
 * 5. **Status words stop being inked with fill tokens.** `text-danger` and
 *    `text-muted` are the fill slots — the compiler guarantees contrast for
 *    `on-danger` against `danger`, and nothing at all for `muted`. The
 *    rejection line and the position take `danger-text` and `muted-text`.
 */
export const StatusPipelineV4 = React.forwardRef<HTMLDivElement, StatusPipelineV4Props>(
  function StatusPipelineV4(
    {
      stage,
      rejected = false,
      variant = 'full',
      stageLabels,
      formatPosition,
      unknownStageLabel = 'Stage unknown',
      className,
      ...rest
    },
    ref
  ) {
    const parts = stageSummaryV4(stage, {
      stageLabels,
      formatPosition,
      unknownStageLabel,
      rejected,
    });

    if (variant === 'compact') {
      // Rejection is a genuine status and keeps `danger`; `hired` is the good
      // terminal state; an unknown stage is not a status at all, so it stays
      // neutral rather than borrowing one.
      const tone = rejected
        ? 'danger'
        : !parts.known
          ? 'neutral'
          : stage === 'hired'
            ? 'success'
            : 'primary';

      return (
        <div
          ref={ref}
          data-xen-v4-status-pipeline="compact"
          className={cn('inline-flex items-center gap-sm', className)}
          {...rest}
        >
          {/*
            No `aria-label` anywhere: the words are on screen, so they are
            already the accessible name. `aria-current` is a global attribute
            and rides the badge, which is the element that means "here".
          */}
          <BadgeV4
            tone={tone}
            aria-current={parts.known && !rejected ? 'step' : undefined}
          >
            {rejected ? `${parts.label} · Rejected` : parts.label}
          </BadgeV4>
          {parts.position ? (
            <span className={cn('text-xs text-muted-text', TABULAR_CLASS)}>{parts.position}</span>
          ) : null}
        </div>
      );
    }

    return (
      // `role="group"` and not a bare `div`: a group is one of the few roles
      // ARIA allows an author to name, which is exactly what the base was
      // trying and failing to do with a label on a `generic`.
      <div
        ref={ref}
        data-xen-v4-status-pipeline="full"
        role="group"
        aria-label={parts.summary}
        className={cn('flex flex-col gap-sm', className)}
        {...rest}
      >
        {/*
          `current={-1}` when the stage is unknown: nothing is done, nothing is
          current, and no step wears `aria-current`. An empty track is what not
          knowing looks like — the base filled the first one in.
        */}
        <StepsV4
          steps={APPLICATION_STAGES.map((s) => ({ title: stageLabels?.[s] ?? STAGE_LABEL[s] }))}
          current={parts.known ? parts.index : -1}
        />
        {parts.position ? (
          <span className={cn('text-xs text-muted-text', TABULAR_CLASS)}>{parts.position}</span>
        ) : (
          <span className="text-xs font-semibold text-warn-text">{unknownStageLabel}</span>
        )}
        {rejected ? (
          <span className="text-xs font-semibold text-danger-text">
            <span aria-hidden="true">✕ </span>
            {`Rejected at ${parts.label}`}
          </span>
        ) : null}
      </div>
    );
  }
);
