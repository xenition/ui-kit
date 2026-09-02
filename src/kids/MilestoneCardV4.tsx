import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import type { ToneV4 } from '../primitives/internal/tone-v4';
import { needsExplanation } from './family-v4';
import type { MilestoneCardProps, MilestoneCategory } from './MilestoneCard';
import {
  captionLine,
  cardStateVars,
  FOCUS_RING_CLASS,
  KIDS_CARD_CLASS,
  KIDS_CARD_GROUND_CLASS,
  spokenLine,
} from './internal/tone-v4';

/**
 * Where a milestone stands.
 *
 * The base carried `achieved?: boolean`, which has no way to say the third
 * thing a parent actually wants said — that a milestone is *late* — so a
 * delayed one was indistinguishable from one that is simply still ahead.
 * Declared identically on both twins.
 */
export type MilestoneStatus = 'upcoming' | 'achieved' | 'delayed';

export interface MilestoneCardV4Props extends MilestoneCardProps {
  /** Where the milestone stands. Defaults to `achieved ? 'achieved' : 'upcoming'`. */
  status?: MilestoneStatus;
  /** A neutral note — what a delay is about, in the parent's own words. */
  note?: string;
  /** Replace the three status words. They were hard-coded English. */
  statusLabels?: Partial<Record<MilestoneStatus, string>>;
}

/** Glyph and default word per developmental category. */
const CATEGORY_META_V4: Record<MilestoneCategory, { glyph: string; label: string }> = {
  physical: { glyph: '🏃', label: 'Physical' },
  cognitive: { glyph: '🧠', label: 'Cognitive' },
  social: { glyph: '🤝', label: 'Social' },
  language: { glyph: '💬', label: 'Language' },
  emotional: { glyph: '❤️', label: 'Emotional' },
  other: { glyph: '🌟', label: 'Milestone' },
};

/**
 * Glyph, default word and chip tone per status.
 *
 * `delayed` is **neutral**, and that is the point of the whole component. A
 * child who has not walked yet is not a warning and not an error; the kit's
 * `warn` and `danger` mean something has gone wrong with the system, and a
 * developmental band is a range, not a deadline. The delay is said in a word
 * and explained in `note`.
 */
const STATUS_META_V4: Record<MilestoneStatus, { glyph: string; label: string; tone: ToneV4 }> = {
  upcoming: { glyph: '◦', label: 'Upcoming', tone: 'neutral' },
  achieved: { glyph: '✓', label: 'Achieved', tone: 'success' },
  delayed: { glyph: '…', label: 'Taking longer', tone: 'neutral' },
};

/**
 * **V4 milestone card** — same props as {@link MilestoneCard} plus `status`,
 * `note` and `statusLabels`.
 *
 * ## Six changes
 *
 * 1. **A milestone can say it is late without saying it is wrong.** `achieved`
 *    was a boolean, so "still ahead" and "overdue" were the same card. `status`
 *    adds `delayed`, and it is drawn in a **neutral** chip with a word and a
 *    `note` — never `warn`, never `danger`. A developmental band is a range;
 *    the kit's status colours mean the system has failed, and nothing about a
 *    child's pace belongs in that vocabulary.
 * 2. **The card's accessible name reached nobody.** It was an `aria-label` on a
 *    plain `div` for every non-activatable card, which browsers ignore — and it
 *    dropped the date and the age band entirely. The full name now belongs to a
 *    real `<button>`.
 * 3. **The activation is a real `<button>`.** A `div` with `role="button"`,
 *    `tabIndex={0}` and a hand-written Enter/Space handler is three
 *    approximations of what a button already does, and it swallowed the status
 *    chip into one stop.
 * 4. **`{...rest}` is spread first.** It was spread after `onClick`, so a
 *    caller passing any handler through silently replaced the card's own.
 * 5. **Badges converge on `soft`**, matching every native call site; web took
 *    the `solid` default, so one call drew two visual weights.
 * 6. **Tokens.** `hover:bg-neutral-50` is a light-scheme ramp step that paints
 *    a near-white slab on a dark page, press is the M3 state layer, the
 *    skeleton is opaque and card-relative rather than `bg-neutral-200`, and the
 *    card sits on `card`/`on-card` so it still reads as raised in dark mode.
 */
export const MilestoneCardV4 = React.forwardRef<HTMLDivElement, MilestoneCardV4Props>(
  function MilestoneCardV4(
    {
      title,
      category = 'other',
      date,
      ageLabel,
      description,
      achieved = false,
      loading = false,
      status,
      note,
      statusLabels,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    }, []);

    const shell = cn('flex flex-col gap-md', KIDS_CARD_CLASS, KIDS_CARD_GROUND_CLASS, className);

    if (loading) {
      return (
        <div
          {...rest}
          ref={ref}
          data-xen-milestone-card=""
          role="status"
          aria-live="polite"
          aria-label={title}
          className={shell}
        >
          <SkeletonV4 className="h-4 w-1/2" />
          <SkeletonV4 className="h-3 w-2/5" />
        </div>
      );
    }

    if (!title) return null;

    const meta = CATEGORY_META_V4[category];
    // `status` wins; without it the card behaves exactly as it does today.
    const state: MilestoneStatus = status ?? (achieved ? 'achieved' : 'upcoming');
    const stateMeta = STATUS_META_V4[state];
    const stateWord = statusLabels?.[state] ?? stateMeta.label;
    const caption = captionLine([meta.label, ageLabel, date]);
    // A neutral explanation is offered only where the status actually owes one.
    const explanation = needsExplanation(state) ? note : undefined;

    const label = spokenLine([title, meta.label, ageLabel, date, stateWord, explanation]);

    const head = (
      <span className="flex w-full items-center gap-md">
        <span aria-hidden="true" className="text-2xl leading-none">
          {meta.glyph}
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-xs text-left">
          <span className="line-clamp-2 text-base font-semibold text-on-card">{title}</span>
          <span className="truncate text-xs text-muted-text">{caption}</span>
        </span>
      </span>
    );

    return (
      <div {...rest} ref={ref} data-xen-milestone-card="" className={shell}>
        <div className="flex items-center gap-sm">
          {onClick ? (
            <button
              type="button"
              aria-label={label}
              onClick={() => onClick()}
              data-xen-v4-state=""
              style={cardStateVars()}
              className={cn(
                'flex min-w-0 flex-1 items-center rounded-[var(--xen-radius-md)] bg-transparent text-left',
                MIN_TAP_CLASS,
                FOCUS_RING_CLASS
              )}
            >
              {head}
            </button>
          ) : (
            <span className="flex min-w-0 flex-1 items-center">{head}</span>
          )}

          {/* A sibling of the activation: a chip inside `role="button"` is lost. */}
          <BadgeV4 tone={stateMeta.tone} variant="soft" size="sm">
            <span aria-hidden="true">{stateMeta.glyph}</span>
            <span>{stateWord}</span>
          </BadgeV4>
        </div>

        {explanation ? <p className="text-sm text-muted-text">{explanation}</p> : null}
        {description ? <p className="text-sm text-muted-text">{description}</p> : null}
      </div>
    );
  }
);
