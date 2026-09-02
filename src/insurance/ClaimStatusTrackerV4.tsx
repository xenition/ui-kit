import * as React from 'react';
import { cn } from '../primitives/cn';
import { claimStatus } from './internal/status';
import { isAdverse } from './coverage-v4';
import { spokenLine, toneGroundStyle, toneInkClass } from './internal/tone-v4';
import type { ClaimStatusTrackerProps } from './ClaimStatusTracker';

/**
 * The happy-path stages of a claim, in order.
 *
 * Named rather than positional, because `stageLabels` has to be translatable
 * without the caller counting indexes — and because `denied` is not a stage,
 * it is what happens instead of one.
 */
export type ClaimStage = 'filed' | 'review' | 'approved' | 'paid';

const STAGE_ORDER: readonly ClaimStage[] = ['filed', 'review', 'approved', 'paid'];

const STAGE_DEFAULT_LABEL: Record<ClaimStage, string> = {
  filed: 'Filed',
  review: 'In review',
  approved: 'Approved',
  paid: 'Paid',
};

/**
 * The word each stage's position gets, so the position is never carried by a
 * ring alone.
 */
const STAGE_STATE_LABEL = {
  done: 'Completed',
  current: 'Current stage',
  upcoming: 'Not started',
} as const;

export interface ClaimStatusTrackerV4Props extends ClaimStatusTrackerProps {
  /**
   * Why the claim was denied — the carrier's own sentence.
   *
   * The single most important prop in this module. See change 1.
   */
  denialReason?: string;
  /** Rename any stage. Defaults `'Filed'`, `'In review'`, `'Approved'`, `'Paid'`. */
  stageLabels?: Partial<Record<ClaimStage, string>>;
  /** The denial heading. Default `'Claim denied'`. */
  deniedLabel?: string;
}

/**
 * **V4 claim status tracker** — same props as {@link ClaimStatusTracker} plus
 * `denialReason`, `stageLabels` and `deniedLabel`.
 *
 * ## Four changes
 *
 * 1. **It no longer invents a denial reason.** The base hard-coded *"Reviewed
 *    after filing. Contact your agent to appeal."* as the body of the denial
 *    banner, and its props carried only `status` and `updated`. A claim denied
 *    because the damage predates policy inception, or because the vehicle was
 *    not on the policy, or because the deductible exceeds the loss, rendered
 *    that same sentence — the screen asserted a reason the caller never
 *    supplied and had no way to correct. The reason is now `denialReason`, and
 *    when the caller has none the banner says the claim was denied and stops,
 *    which is the truth.
 * 2. **The stages are real, ordered, announced positions.** The base delegated
 *    to the `Steps` primitive, which has no accessibility at all — no
 *    `aria-current="step"`, and an active step and a future step are both an
 *    outlined circle with the same numeral, so the only thing distinguishing
 *    "you are here" from "this has not happened" was a border colour. The
 *    tracker draws its own ordered list, marks the current stage with
 *    `aria-current="step"`, and gives every stage a word — Completed, Current
 *    stage, Not started — so the position survives greyscale, and survives a
 *    reader that ignores `aria-current`.
 * 3. **The denial is announced, once, as an alert.** It is the one genuinely
 *    urgent thing in the module: a decision the claimant has a deadline to
 *    appeal. The banner's heading is a real heading rather than a `<p>`, and
 *    the `aria-label` that used to replace the banner's contents — deleting
 *    the sentence under it — is gone.
 * 4. **Every stage word is a prop**, and the banner is a tinted ground mixed
 *    from the tone rather than `bg-danger/10` over `border-danger`, so it
 *    follows `[data-theme]` instead of being a pale plate on a dark page.
 */
export const ClaimStatusTrackerV4 = React.forwardRef<HTMLDivElement, ClaimStatusTrackerV4Props>(
  function ClaimStatusTrackerV4(
    { status, updated, denialReason, stageLabels, deniedLabel = 'Claim denied', className, ...rest },
    ref
  ) {
    const sd = claimStatus(status);
    const labelFor = (stage: ClaimStage): string =>
      stageLabels?.[stage] ?? STAGE_DEFAULT_LABEL[stage];

    if (isAdverse(status)) {
      return (
        <div ref={ref} className={cn('flex flex-col gap-sm', className)} {...rest}>
          <div
            role="alert"
            className="flex items-start gap-sm rounded-[var(--xen-radius-md)] border border-danger px-md py-sm"
            style={toneGroundStyle('danger')}
          >
            <span aria-hidden="true" className={cn('text-base', toneInkClass('danger'))}>
              {sd.glyph}
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-bold text-danger-text">{deniedLabel}</h3>
              {denialReason != null && denialReason !== '' ? (
                <p className="text-xs text-on-card">{denialReason}</p>
              ) : null}
            </div>
          </div>
          {updated != null ? <p className="text-xs text-muted-text">Updated {updated}</p> : null}
        </div>
      );
    }

    // `paid` completes the final stage, so the cursor sits one past the end.
    const currentIndex = status === 'paid' ? STAGE_ORDER.length : sd.step;

    return (
      <div ref={ref} className={cn('flex flex-col gap-sm', className)} {...rest}>
        <ol
          aria-label={spokenLine([
            'Claim progress',
            sd.label,
            updated != null ? `Updated ${updated}` : undefined,
          ])}
          className="flex items-start gap-xs"
        >
          {STAGE_ORDER.map((stage, index) => {
            const done = index < currentIndex;
            const current = index === currentIndex;
            const state = done ? 'done' : current ? 'current' : 'upcoming';
            return (
              <li
                key={stage}
                aria-current={current ? 'step' : undefined}
                className="flex min-w-0 flex-1 flex-col items-center gap-xs"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'flex h-lg w-lg items-center justify-center rounded-[var(--xen-radius-full)] text-xs font-bold',
                    done || current
                      ? 'bg-primary text-on-primary'
                      : cn('border border-border', toneInkClass('muted'))
                  )}
                >
                  {done ? '✓' : index + 1}
                </span>
                <span
                  className={cn(
                    'w-full truncate text-center text-xs',
                    current ? 'font-semibold text-on-card' : 'text-muted-text'
                  )}
                >
                  {labelFor(stage)}
                </span>
                {/*
                  The position in words. `Steps` carried it in a border colour
                  alone, and `aria-current` is not spoken by every reader in
                  every mode.
                */}
                <span className="sr-only">{STAGE_STATE_LABEL[state]}</span>
              </li>
            );
          })}
        </ol>
        <p className="text-center text-xs text-muted-text">
          <span aria-hidden="true">{sd.glyph}</span> {sd.label}
          {updated != null ? ` · Updated ${updated}` : ''}
        </p>
      </div>
    );
  }
);
