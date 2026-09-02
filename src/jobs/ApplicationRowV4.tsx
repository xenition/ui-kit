import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { AvatarV4 } from '../primitives/AvatarV4';
import { cn } from '../primitives/cn';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_CSS,
  ROW_V4_LEADING_CLASS,
  ROW_V4_STYLE_ID,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowEdgeClass,
  rowHeightClass,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../dashboard/internal/row-v4';
import type { ApplicationRowProps } from './ApplicationRow';
import { StatusPipelineV4 } from './StatusPipelineV4';
import {
  cardStateVars,
  FOCUS_RING_CLASS,
  MIN_TAP_CLASS,
  relativeLabel,
  spokenLine,
  stageSummaryV4,
} from './internal/tone-v4';

export interface ApplicationRowV4Props extends ApplicationRowProps {
  /**
   * Why the application was rejected.
   *
   * `Application.rejected` is a bare boolean with no reason and no
   * stage-of-rejection, so an applicant saw "✕ Rejected" and nothing else.
   * Rendered whenever `application.rejected` is set.
   */
  rejectionReason?: string;
  /** Render the applied age. Default `'3d ago'`, floored. */
  formatRelative?: (iso: string) => string;
  /** The last row in a list — drops the separator that would hang off the end. */
  last?: boolean;
}

/**
 * **V4 application row** — same props as {@link ApplicationRow} plus
 * `rejectionReason`, `formatRelative` and `last`.
 *
 * ## Six changes
 *
 * 1. **The stage is announced.** This is the module's headline defect and this
 *    row is where it costs the most: the row's whole purpose is to say where
 *    an application sits, and it said it nowhere. The stage arrived through a
 *    `StatusPipeline variant="compact"`, whose only accessible name hung off
 *    `role="text"` — not an ARIA role, a WebKit extension that Chrome and
 *    Firefox drop along with the `aria-label` — and the row's own label sat on
 *    a bare `<div>`, which ARIA forbids naming. So
 *    `<ApplicationRow application={{stage:'interview'}} />` announced neither
 *    the title nor the stage. One real `<button>` now carries title, company,
 *    applied age, stage and rejection as a single sentence.
 * 2. **An unknown stage is no longer reported as stage 1.** The base's
 *    `Math.max(0, indexOf(stage))` announced "Stage 1 of 5: Applied" for a
 *    withdrawn application — the most confident possible statement of the
 *    wrong thing.
 * 3. **A rejection can say why.** See `rejectionReason`.
 * 4. **The `accessory` slot is a sibling of the activation, not a child of
 *    it.** Whatever an app puts there — a chevron, a withdraw button, a menu —
 *    was nested inside `role="button"`, which makes it invalid ARIA and, if it
 *    was interactive, loses its keyboard activation to the row's own handler.
 * 5. **The applied age stops rounding up.** 25 days ago read "1mo ago"; 90
 *    minutes read "2h ago".
 * 6. **It joins the shared row family**, so an application row and a
 *    conversation row are one height with one state layer and one separator,
 *    instead of `border-b` plus `hover:opacity-95` — which fades the row's own
 *    content, the signal M3 spends on *disabled*.
 */
export const ApplicationRowV4 = React.forwardRef<HTMLDivElement, ApplicationRowV4Props>(
  function ApplicationRowV4(
    {
      application,
      onClick,
      accessory,
      rejectionReason,
      formatRelative,
      last = false,
      className,
      ...rest
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
      injectStyleOnce(ROW_V4_STYLE_ID, ROW_V4_CSS);
    }, []);

    const rejected = !!application.rejected;
    const applied = relativeLabel(application.appliedAt, formatRelative);
    const stage = stageSummaryV4(application.stage, { rejected });
    const reason = rejected ? rejectionReason : undefined;

    const name = spokenLine([
      application.jobTitle,
      application.companyName,
      applied ? `applied ${applied}` : undefined,
      stage.summary,
      reason,
    ]);

    const summary = (
      <>
        <span className={ROW_V4_LEADING_CLASS}>
          <AvatarV4 name={application.companyName} size="sm" alt="" />
        </span>
        <span className={ROW_V4_TEXT_CLASS}>
          <span className="flex items-baseline justify-between gap-sm">
            <span className="min-w-0 flex-1 truncate text-sm font-semibold text-on-card">
              {application.jobTitle}
            </span>
            {applied ? <span className="shrink-0 text-xs text-muted-text">{applied}</span> : null}
          </span>
          <span className="truncate text-xs text-muted-text">{application.companyName}</span>
        </span>
      </>
    );

    return (
      <div
        ref={ref}
        data-xen-v4-application-row=""
        data-xen-v4-row=""
        className={cn(
          ROW_V4_BASE_CLASS,
          'flex-wrap',
          rowHeightClass(true),
          !last && rowEdgeClass(),
          className
        )}
        {...rest}
      >
        {onClick ? (
          <button
            type="button"
            aria-label={name}
            onClick={() => onClick(application)}
            data-xen-v4-state=""
            style={cardStateVars()}
            className={cn(
              'flex min-w-0 flex-1 items-center gap-md rounded-[var(--xen-radius-md)] text-left',
              MIN_TAP_CLASS,
              FOCUS_RING_CLASS
            )}
          >
            {summary}
          </button>
        ) : (
          <div className="flex min-w-0 flex-1 items-center gap-md">{summary}</div>
        )}

        {/*
          The accessory is whatever the app puts there, and it is very often
          interactive. Beside the activation, never inside it.
        */}
        {accessory ? <span className={ROW_V4_TRAILING_CLASS}>{accessory}</span> : null}

        <div className="flex w-full flex-col gap-xs">
          {/*
            Hidden from the reader when the activation's name already carries
            the stage — the pipeline is then a picture of a sentence that has
            already been said.
          */}
          <StatusPipelineV4
            stage={application.stage}
            rejected={rejected}
            variant="compact"
            aria-hidden={onClick != null || undefined}
          />
          {reason ? (
            <span className="text-xs font-semibold text-danger-text">{reason}</span>
          ) : null}
        </div>
      </div>
    );
  }
);
