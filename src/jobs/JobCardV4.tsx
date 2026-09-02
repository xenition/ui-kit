import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { cn } from '../primitives/cn';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import type { JobCardProps } from './JobCard';
import { EMPLOYMENT_LABEL } from './types';
import { ApplyButtonV4 } from './ApplyButtonV4';
import { SalaryRangeV4 } from './SalaryRangeV4';
import { SkillTagV4 } from './SkillTagV4';
import {
  cardStateVars,
  EMPLOYMENT_TONE_V4,
  FOCUS_RING_CLASS,
  MIN_TAP_CLASS,
  MIN_TAP_SQUARE_CLASS,
  PLACEHOLDER_CLASS,
  relativeLabel,
  salaryLabelV4,
  spokenLine,
} from './internal/tone-v4';

export interface JobCardV4Props extends JobCardProps {
  /** Names the save control when the job is not saved. Default `'Save job'`. */
  saveLabel?: string;
  /** Names it when the job is saved. Default `'Saved — tap to remove'`. */
  savedLabel?: string;
  /** Render the posted age. Default `'3d ago'`, floored. */
  formatRelative?: (iso: string) => string;
  /** Render the collapsed skill count. Default `'+6'`. */
  overflowLabel?: (n: number) => string;
}

/**
 * **V4 job card** — same props as {@link JobCard} plus `saveLabel`,
 * `savedLabel`, `formatRelative` and `overflowLabel`.
 *
 * ## Six changes
 *
 * 1. **The save star works from the keyboard.** It was a `<button>` *inside* a
 *    `<div role="button">` that carried its own Enter/Space handler. The
 *    star's click was guarded with `stopPropagation`; its keydown was not — so
 *    the card caught the bubbled key, called `preventDefault()`, which cancels
 *    the star's own activation (Enter's default action on a button **is** that
 *    click, and Space fires on keyup, already cancelled), and opened the job
 *    detail instead. A keyboard user pressing Enter on "Save job" saved
 *    nothing and navigated away. The card is now a plain container, the
 *    activation is a real `<button>` around the logo and the title, and the
 *    star, the chips and the Apply CTA are its **siblings** — the whole class
 *    of bug goes away rather than being guarded against.
 * 2. **The card is one accessible name.** ARIA forbids naming a `generic`
 *    element, and it forbids interactive content inside `role="button"`; the
 *    base did both, so on Chrome and Firefox the card announced its children
 *    as a scatter of stops with the title's own label discarded. The
 *    activation now carries title, company, location, arrangement, pay,
 *    posted age and skills as one sentence.
 * 3. **`maxSkills={0}` no longer swallows the skills entirely.** Six skills
 *    with a cap of zero rendered no chips *and* no "+6", because the overflow
 *    chip was inside the `shown.length > 0` branch — so the cap that most
 *    obviously means "collapse them all" was the one case that lost the
 *    count.
 * 4. **Employment type stops spending a status colour.** `contract → warn` and
 *    `remote → success` said a contract role is a warning and a remote one is
 *    good news. They are two of four arrangements — identity — and the word
 *    already distinguishes them.
 * 5. **The posted age stops rounding up.** `formatRelative` rounded, so a job
 *    posted 25 days ago read "1mo ago" and one posted 90 minutes ago read "2h
 *    ago". Elapsed time has passed or it has not.
 * 6. **The skeleton and the press feedback stop inverting.** The placeholders
 *    were `bg-neutral-100`, a ramp step that mirrors under a dark seed into a
 *    near-white slab; press was `hover:opacity-95`, which fades the card's
 *    content — the signal M3 spends on *disabled*.
 */
export const JobCardV4 = React.forwardRef<HTMLDivElement, JobCardV4Props>(function JobCardV4(
  {
    job,
    saved,
    onSave,
    applyState,
    onApply,
    onWithdraw,
    applyLoading,
    onClick,
    loading = false,
    maxSkills = 4,
    saveLabel = 'Save job',
    savedLabel = 'Saved — tap to remove',
    formatRelative,
    overflowLabel,
    className,
    ...rest
  },
  ref
) {
  React.useEffect(() => {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
  }, []);

  const surface = cn(
    'flex flex-col gap-md rounded-[var(--xen-radius-lg)] border border-border',
    'bg-card p-lg text-on-card',
    className
  );

  if (loading) {
    return (
      <div
        ref={ref}
        data-xen-v4-job-card="loading"
        role="status"
        aria-live="polite"
        aria-label="Loading job"
        className={surface}
        {...rest}
      >
        {/* The shape it is about to be, not a spinner that collapses the row. */}
        <div className="flex items-center gap-md">
          <div className={cn('h-xl w-xl shrink-0 rounded-[var(--xen-radius-md)]', PLACEHOLDER_CLASS)} />
          <div className="flex flex-1 flex-col gap-xs">
            <div className={cn('h-md w-[70%]', PLACEHOLDER_CLASS)} />
            <div className={cn('h-sm w-[45%]', PLACEHOLDER_CLASS)} />
          </div>
        </div>
        <div className={cn('h-sm w-[55%]', PLACEHOLDER_CLASS)} />
      </div>
    );
  }

  const skills = job.skills ?? [];
  const shown = skills.slice(0, Math.max(0, Math.floor(maxSkills)));
  const overflow = skills.length - shown.length;
  const overflowText = (overflowLabel ?? ((n: number) => `+${n}`))(overflow);
  const showApply = applyState != null || onApply != null;
  const posted = relativeLabel(job.postedAt, formatRelative);
  const typeLabel = EMPLOYMENT_LABEL[job.type];
  const pay = salaryLabelV4(job.salary).text;

  const name = spokenLine([
    job.title,
    job.companyName,
    job.location,
    typeLabel,
    pay,
    posted,
    ...shown,
    overflow > 0 ? overflowText : undefined,
    saved ? savedLabel : undefined,
  ]);

  const summary = (
    <>
      <AvatarV4 src={job.companyLogoUrl} name={job.companyName} size="md" alt="" />
      <span className="flex min-w-0 flex-1 flex-col gap-xs text-left">
        <span className="line-clamp-2 text-base font-semibold text-on-card">{job.title}</span>
        <span className="truncate text-sm text-muted-text">
          {job.companyName}
          {job.location ? ` · ${job.location}` : ''}
        </span>
      </span>
    </>
  );

  return (
    <div ref={ref} data-xen-v4-job-card="" className={surface} {...rest}>
      <div className="flex items-start gap-md">
        {onClick ? (
          <button
            type="button"
            aria-label={name}
            onClick={() => onClick(job)}
            data-xen-v4-state=""
            style={cardStateVars()}
            className={cn(
              'flex min-w-0 flex-1 items-start gap-md rounded-[var(--xen-radius-md)] text-left',
              MIN_TAP_CLASS,
              FOCUS_RING_CLASS
            )}
          >
            {summary}
          </button>
        ) : (
          <div className="flex min-w-0 flex-1 items-start gap-md">{summary}</div>
        )}

        {/*
          A sibling of the card's activation. Nothing to stop propagating,
          because nothing bubbles anywhere it should not.
        */}
        {onSave ? (
          <button
            type="button"
            aria-label={saved ? savedLabel : saveLabel}
            aria-pressed={!!saved}
            onClick={() => onSave(job)}
            data-xen-v4-state=""
            style={cardStateVars()}
            className={cn(
              'flex shrink-0 items-center justify-center rounded-[var(--xen-radius-full)]',
              'text-lg leading-none',
              saved ? 'text-primary-text' : 'text-muted-text',
              MIN_TAP_SQUARE_CLASS,
              FOCUS_RING_CLASS
            )}
          >
            <span aria-hidden="true">{saved ? '★' : '☆'}</span>
          </button>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-sm">
        <BadgeV4 tone={EMPLOYMENT_TONE_V4[job.type]}>{typeLabel}</BadgeV4>
        {posted ? <span className="text-xs text-muted-text">{posted}</span> : null}
      </div>

      {job.salary ? <SalaryRangeV4 salary={job.salary} size="sm" /> : null}

      {/*
        Hidden from the reader because the activation's name already carries
        every chip and the overflow count: one fact, announced once, rather
        than four more stops between the title and the Apply button.
      */}
      {shown.length > 0 || overflow > 0 ? (
        <div aria-hidden="true" className="flex flex-wrap gap-xs">
          {shown.map((s, i) => (
            <SkillTagV4 key={`${s}-${i}`} label={s} />
          ))}
          {overflow > 0 ? (
            <span
              className={cn(
                'inline-flex items-center self-start rounded-[var(--xen-radius-sm)]',
                'border border-border bg-card px-sm py-xs text-xs font-medium text-on-card'
              )}
            >
              {overflowText}
            </span>
          ) : null}
        </div>
      ) : null}

      {showApply ? (
        <ApplyButtonV4
          state={applyState}
          loading={applyLoading}
          onApply={onApply ? () => onApply(job) : undefined}
          onWithdraw={onWithdraw ? () => onWithdraw(job) : undefined}
          block
        />
      ) : null}
    </div>
  );
});
