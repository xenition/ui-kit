import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { StepsV4 } from '../primitives/StepsV4';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import type { StepItem } from '../primitives/Steps';
import type { PermitStatusProps } from './PermitStatus';
import { permitStatus, PERMIT_STAGES, PERMIT_STATUS } from './internal/status';
import {
  CARD_V4,
  isAdverse,
  labelledId,
  PLACEHOLDER_CLASS,
  spokenLine,
  statusSentence,
  tintGround,
  tintInkClass,
} from './internal/civic-v4';

export interface PermitStatusV4Props extends PermitStatusProps {
  /** Why the permit was refused. Rendered and announced when the status is adverse. */
  reason?: string;
  /** Override the status word — `'Under review'`, `'Denied'`. */
  statusLabel?: string;
  /** Build the position sentence. Default `` `${label}, step ${step} of ${total}` ``. */
  formatStep?: (label: string, step: number, total: number) => string;
  /** What the permit number is called. Default `'Permit'`. */
  referenceLabel?: string;
}

/** Happy-path stages, in order. `denied` branches off `review`. */
const STAGES: StepItem[] = PERMIT_STAGES.map((stage) => ({ title: PERMIT_STATUS[stage].label }));

/**
 * **V4 permit tracker** — the web twin of the native `PermitStatusV4`, same
 * props as {@link PermitStatus} plus `reason`, `statusLabel`, `formatStep` and
 * `referenceLabel`.
 *
 * ## Five changes
 *
 * 1. **The status always renders.** `<PermitStatus status="review" title="…" />`
 *    produced a card in which the words "Under review" appeared **nowhere in
 *    the DOM** — the only place they could surface was gated on `updatedDate`,
 *    an optional prop. An applicant heard the whole happy path, "1 Submitted 2
 *    Under review 3 Approved 4 Issued", with no indication which stage was
 *    theirs. `statusSentence()` renders the stage as a sentence whether or not
 *    a date was passed.
 * 2. **The tracker is `StepsV4`.** The base `Steps` conveyed position entirely
 *    by colour: the active marker and a pending one both draw a bare digit and
 *    differ only by `border-primary text-primary` against `border-border
 *    text-muted`. The V4 primitive already emits `aria-current="step"` and
 *    draws the walked rail as one continuous line, so a red-green deficient
 *    reader can see where they are.
 * 3. **A denial says why, and announces.** The base hard-coded the consolation
 *    "Review the notice and re-apply or appeal" and had no field for what the
 *    notice actually said. `reason` fills that, and the sentence reaches an
 *    assertive live region **one commit after mount** — a live region announces
 *    *changes*, so `role="alert"` on content present at first paint, which is
 *    what the base had, is silent in the ordinary case.
 * 4. **The permit number is labelled** — a reader heard "BLD-2026-0417" with no
 *    idea what it identified — and the denial headline takes the
 *    contrast-corrected `danger-text` ink rather than the `danger` **fill**
 *    drawn as words on a 12% tint of itself.
 * 5. **The dead `denied ? 1` branch is gone.** A denied permit renders the
 *    banner, never the tracker, so that index could not reach `Steps`; and the
 *    loading state draws the tracker's own shape instead of a grey slab off the
 *    neutral ramp, which mirrors under `[data-theme="dark"]`.
 */
export const PermitStatusV4 = React.forwardRef<HTMLDivElement, PermitStatusV4Props>(
  function PermitStatusV4(
    {
      status,
      permitNumber,
      title,
      updatedDate,
      loading = false,
      reason,
      statusLabel,
      formatStep,
      referenceLabel = 'Permit',
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const sd = permitStatus(status);
    const adverse = isAdverse(status);
    const word = statusLabel ?? sd.label;
    const reference = labelledId(referenceLabel, permitNumber);

    // Off the happy path there is no position to state, so the sentence is
    // just the word.
    const sentence = adverse
      ? word
      : statusSentence(word, sd.step, STAGES.length, formatStep);

    const announcement = spokenLine([sentence, reason]);

    // A live region reads CHANGES. Text that is already in the tree when the
    // region is created is never announced — which is exactly why the base's
    // `role="alert"` was silent in the only case that matters. Setting it in an
    // effect makes the denial arrive as a change.
    const [announced, setAnnounced] = React.useState('');
    React.useEffect(() => {
      setAnnounced(adverse && !loading ? announcement : '');
    }, [adverse, loading, announcement]);

    return (
      <CardV4 ref={ref} variant={CARD_V4} className={className} {...rest}>
        <span role="alert" aria-live="assertive" className="sr-only">
          {announced}
        </span>

        {title != null || reference != null ? (
          <div className="mb-md flex flex-col gap-xs">
            {title != null ? (
              <p className="truncate text-base font-bold text-on-surface">{title}</p>
            ) : null}
            {reference != null ? <p className="text-xs text-muted-text">{reference}</p> : null}
          </div>
        ) : null}

        {loading ? (
          // The shape it is about to be: four markers on a rail, with their
          // captions. A centred spinner collapses the card and then jumps.
          <div
            role="progressbar"
            aria-label="Loading permit status"
            className="flex w-full items-start gap-sm"
          >
            {STAGES.map((_, index) => (
              <span key={index} className="flex flex-1 flex-col items-center gap-xs">
                <span className={cn('h-xl w-xl rounded-[var(--xen-radius-full)]', PLACEHOLDER_CLASS)} />
                <span className={cn('h-sm w-full', PLACEHOLDER_CLASS)} />
              </span>
            ))}
          </div>
        ) : adverse ? (
          <div
            className="flex items-start gap-sm rounded-[var(--xen-radius-md)] border border-danger p-md"
            style={{ background: tintGround('danger') }}
          >
            <IconV4 glyph={sd.glyph} aria-hidden className={tintInkClass('danger')} />
            <div className="min-w-0 flex-1">
              {/* `danger-text`, not `danger`: the fill slot carries no contrast
                  promise as words, least of all on a 10% tint of itself. */}
              <p className={cn('text-base font-bold', tintInkClass('danger'))}>{word}</p>
              <p className="text-sm text-on-surface">
                {reason ?? 'Review the notice and re-apply or appeal.'}
              </p>
            </div>
          </div>
        ) : (
          <StepsV4 steps={STAGES} current={Math.min(sd.step, STAGES.length - 1)} />
        )}

        {!loading ? (
          <p className="mt-md text-sm font-semibold text-on-surface">
            <span aria-hidden="true">{sd.glyph}</span> {sentence}
            {updatedDate != null ? (
              <span className="font-normal text-muted-text"> · updated {updatedDate}</span>
            ) : null}
          </p>
        ) : null}
      </CardV4>
    );
  }
);
