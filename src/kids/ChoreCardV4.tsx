import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import { needsExplanation } from './family-v4';
import type { ChoreCardProps, ChoreStatus } from './ChoreCard';
import {
  captionLine,
  cardStateVars,
  FOCUS_RING_CLASS,
  KIDS_CARD_CLASS,
  KIDS_CARD_GROUND_CLASS,
  spokenLine,
  type IdentityTone,
} from './internal/tone-v4';
import type { ToneV4 } from '../primitives/internal/tone-v4';

export interface ChoreCardV4Props extends ChoreCardProps {
  /** Why the chore was skipped — a neutral explanation, not a reprimand. */
  reason?: string;
  /** Replace the four status words. They were hard-coded English. */
  statusLabels?: Partial<Record<ChoreStatus, string>>;
  /** Copy on the completion action. Default `'Mark done'`. */
  completeLabel?: string;
}

/** Glyph, default word and chip tone per status. */
const STATUS_META_V4: Record<ChoreStatus, { glyph: string; label: string; tone: ToneV4 }> = {
  todo: { glyph: '⬜', label: 'To do', tone: 'neutral' },
  'in-progress': { glyph: '🔄', label: 'In progress', tone: 'primary' },
  // `done` is the one genuine status here: the task succeeded.
  done: { glyph: '✅', label: 'Done', tone: 'success' },
  // `warn` on the base. A child skipping a chore is not a system warning; it
  // is a fact that wants a reason, which is what `reason` is for.
  skipped: { glyph: '⏭️', label: 'Skipped', tone: 'neutral' },
};

/** Reward points are a category, not a status — the brand's second slot. */
const POINTS_TONE: IdentityTone = 'accent';

/**
 * **V4 chore card** — same props as {@link ChoreCard} plus `reason`,
 * `statusLabels` and `completeLabel`.
 *
 * ## Six changes
 *
 * 1. **A keyboard user can finally mark a chore done.** The card was a
 *    `role="button"` `div` with "Mark done" nested inside it. The inner
 *    button's *click* was guarded with `stopPropagation` and its *keydown* was
 *    not, so the card's handler caught the bubbled keydown, ran
 *    `preventDefault()` and cancelled the button's own activation — Enter's
 *    default action **is** that click — then navigated instead. A mouse user
 *    never saw it. The card is now a plain container, the activation wraps only
 *    the icon-and-text region, and the action is its sibling.
 * 2. **`{...rest}` is spread first.** It was spread after `onClick`, so a
 *    caller passing any handler through silently replaced the card's own.
 * 3. **A skipped chore is not a warning.** `skipped → warn` painted a child's
 *    day in the vocabulary the kit reserves for something going wrong. It is a
 *    neutral chip with a glyph and a word, and `reason` gives the explanation
 *    somewhere to live — a status that needs one and has nowhere to put it is
 *    how a chore log turns into a tally of failures.
 * 4. **The four status words are replaceable**, as is the action's label. They
 *    were hard-coded English in a component that ships to every locale.
 * 5. **Badges converge on `soft`.** Every native call passed `variant="soft"`,
 *    no web call passed `variant` at all, and web defaults to `solid` — the
 *    same props drawing two visual weights. The points chip also moves to
 *    `accent`, matching the native twin, which the stale "web Badge has no
 *    accent" comment had been holding back.
 * 6. **Tokens and targets.** `hover:bg-neutral-50` is a light-scheme ramp step
 *    that paints a near-white slab on a dark page, and press is a state layer
 *    rather than a tint; the skeleton is opaque and card-relative; the
 *    activation clears 44.
 */
export const ChoreCardV4 = React.forwardRef<HTMLDivElement, ChoreCardV4Props>(function ChoreCardV4(
  {
    title,
    assignee,
    points,
    due,
    icon = '🧹',
    status = 'todo',
    loading = false,
    reason,
    statusLabels,
    completeLabel = 'Mark done',
    onComplete,
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
        data-xen-chore-card=""
        role="status"
        aria-live="polite"
        aria-label={title}
        className={shell}
      >
        <SkeletonV4 className="h-4 w-3/5" />
        <SkeletonV4 className="h-3 w-2/5" />
      </div>
    );
  }

  if (!title) return null;

  const meta = STATUS_META_V4[status];
  const statusWord = statusLabels?.[status] ?? meta.label;
  const isDone = status === 'done';
  const caption = captionLine([assignee, due]);
  // A neutral explanation is only offered where the status actually owes one.
  const explanation = needsExplanation(status) ? reason : undefined;

  const name = spokenLine([title, assignee, due, statusWord, explanation]);

  // The star is NOT `aria-hidden`: it is the only thing that says what the
  // numeral counts, and inventing the English word "points" here would be a
  // string this component has no prop to let a caller replace.
  const pointsChip =
    typeof points === 'number' ? (
      <BadgeV4 tone={POINTS_TONE} variant="soft" size="sm">
        <span>{`⭐ ${points}`}</span>
      </BadgeV4>
    ) : null;

  const head = (
    <span className="flex w-full items-center gap-md">
      <span aria-hidden="true" className="text-2xl leading-none">
        {icon}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-xs text-left">
        <span
          className={cn('truncate text-base font-semibold text-on-card', isDone && 'line-through')}
        >
          {title}
        </span>
        {caption ? <span className="truncate text-xs text-muted-text">{caption}</span> : null}
      </span>
    </span>
  );

  return (
    <div {...rest} ref={ref} data-xen-chore-card="" className={shell}>
      {onClick ? (
        <button
          type="button"
          aria-label={name}
          onClick={() => onClick()}
          data-xen-v4-state=""
          style={cardStateVars()}
          className={cn(
            'flex items-center rounded-[var(--xen-radius-md)] bg-transparent text-left',
            MIN_TAP_CLASS,
            FOCUS_RING_CLASS
          )}
        >
          {head}
        </button>
      ) : (
        head
      )}

      {explanation ? <p className="text-sm text-muted-text">{explanation}</p> : null}

      {/*
        Siblings of the activation, never descendants: nesting a button inside
        `role="button"` is invalid ARIA and, on this card, cost the keyboard
        user the action outright.
      */}
      <div className="flex flex-wrap items-center gap-sm">
        <BadgeV4 tone={meta.tone} variant="soft" size="sm">
          <span aria-hidden="true">{meta.glyph}</span>
          <span>{statusWord}</span>
        </BadgeV4>
        {pointsChip}
        {!isDone && onComplete ? (
          <ButtonV4
            size="sm"
            variant="primary"
            className="ml-auto"
            onClick={() => onComplete()}
          >
            {completeLabel}
          </ButtonV4>
        ) : null}
      </div>
    </div>
  );
});
