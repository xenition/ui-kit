import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { cn } from '../primitives/cn';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import type { CompanyCardProps } from './CompanyCard';
import {
  cardStateVars,
  FOCUS_RING_CLASS,
  metaLine,
  MIN_TAP_CLASS,
  spokenLine,
} from './internal/tone-v4';

export interface CompanyCardV4Props extends CompanyCardProps {
  /** Copy on the follow action. Default `'Follow'`. */
  followLabel?: string;
  /** Copy once followed. Default `'Following'`. */
  followingLabel?: string;
  /**
   * Render the headcount. Default `'51 employees'`.
   *
   * `Company.size` is a free-form string (`'51–200'`), so this is applied only
   * when it parses as a single finite number; a banded label is passed through
   * as written, because rewriting `'51–200'` into `formatEmployees(51)` would
   * throw away the upper bound.
   */
  formatEmployees?: (n: number) => string;
  /** Render the open-roles count. Default `'3 open roles'` / `'No open roles'`. */
  formatOpenRoles?: (n: number) => string;
}

/**
 * **V4 company card** — same props as {@link CompanyCard} plus `followLabel`,
 * `followingLabel`, `formatEmployees` and `formatOpenRoles`.
 *
 * ## Six changes
 *
 * 1. **Follow works from the keyboard.** It was a `<Button>` inside a
 *    `<div role="button">` carrying its own Enter/Space handler: the button's
 *    click was guarded with `stopPropagation`, its keydown was not, so the
 *    card caught the bubbled key, called `preventDefault()` — cancelling the
 *    button's own activation — and opened the company page instead. Tab to
 *    Follow, press Enter, follow nobody, navigate away. The card is a plain
 *    container now, the activation is a real `<button>` around the logo and
 *    the name, and Follow is its **sibling**.
 * 2. **`<CompanyCard company={c} following />` no longer renders a dead
 *    button.** The base showed Follow whenever *either* `following` or
 *    `onToggleFollow` was set, so a read-only card — a search result, a
 *    profile header — put a focusable control in the tab order that did
 *    nothing at all when pressed. The button exists only when there is a
 *    handler; the follow *state* without one is drawn as a chip and folded
 *    into the card's name.
 * 3. **Follow announces whether you are following.** There was no
 *    `aria-pressed` anywhere on either twin, so the only difference between
 *    the two states was the word inside the button and its variant colour —
 *    and a toggle that does not expose its state cannot be operated
 *    confidently by anyone who is not looking at it.
 * 4. **The card is one accessible name.** The base's `aria-label` sat on a
 *    `generic` element, which ARIA forbids naming, and it named only the
 *    company and industry — the headcount and the open-roles count, the two
 *    numbers a job seeker is actually scanning for, were separate stops or
 *    nothing.
 * 5. **"1 open roles" is fixed, and both counts are translatable.** The base
 *    interpolated the number into a hard-coded plural.
 * 6. **Press is a state layer and the meta line takes a text token.**
 *    `hover:opacity-95` fades the card's own content — M3's disabled signal —
 *    and `text-muted` is a fill slot with no contrast promise.
 */
export const CompanyCardV4 = React.forwardRef<HTMLDivElement, CompanyCardV4Props>(
  function CompanyCardV4(
    {
      company,
      following,
      onToggleFollow,
      onClick,
      followLabel = 'Follow',
      followingLabel = 'Following',
      formatEmployees,
      formatOpenRoles,
      className,
      ...rest
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    }, []);

    const meta = metaLine([company.industry, company.location]);

    // A banded headcount stays as written; a bare number goes through the
    // formatter. See `formatEmployees`.
    let employees: string | undefined;
    if (company.size != null && company.size !== '') {
      const parsed = Number(company.size);
      employees =
        formatEmployees && Number.isFinite(parsed)
          ? formatEmployees(parsed)
          : `${company.size} employees`;
    }

    const roles =
      typeof company.openRoles === 'number' && Number.isFinite(company.openRoles)
        ? (formatOpenRoles ??
            ((n: number) => (n > 0 ? `${n} open role${n === 1 ? '' : 's'}` : 'No open roles')))(
            Math.max(0, Math.floor(company.openRoles))
          )
        : undefined;

    const followed = !!following;
    const canFollow = onToggleFollow != null;

    const name = spokenLine([
      company.name,
      company.industry,
      company.location,
      employees,
      roles,
      // Only when there is no button to say it: a Follow button with
      // `aria-pressed` already announces the state, and saying it twice makes
      // the card sound as though there are two of them.
      !canFollow && following != null ? (followed ? followingLabel : followLabel) : undefined,
    ]);

    const summary = (
      <>
        <AvatarV4 src={company.logoUrl} name={company.name} size="lg" alt="" />
        <span className="flex min-w-0 flex-1 flex-col gap-xs text-left">
          <span className="truncate text-lg font-semibold text-on-card">{company.name}</span>
          {meta ? <span className="truncate text-sm text-muted-text">{meta}</span> : null}
        </span>
      </>
    );

    return (
      <div
        ref={ref}
        data-xen-v4-company-card=""
        className={cn(
          'flex flex-col gap-md rounded-[var(--xen-radius-lg)] border border-border',
          'bg-card p-lg text-on-card',
          className
        )}
        {...rest}
      >
        {onClick ? (
          <button
            type="button"
            aria-label={name}
            onClick={() => onClick(company)}
            data-xen-v4-state=""
            style={cardStateVars()}
            className={cn(
              'flex min-w-0 items-center gap-md rounded-[var(--xen-radius-md)] text-left',
              MIN_TAP_CLASS,
              FOCUS_RING_CLASS
            )}
          >
            {summary}
          </button>
        ) : (
          <div className="flex min-w-0 items-center gap-md">{summary}</div>
        )}

        {/*
          Hidden when the activation already names them — one fact, announced
          once — and read normally on a card with no activation at all.
        */}
        {employees || roles || (following != null && !canFollow) ? (
          <div
            aria-hidden={onClick != null || undefined}
            className="flex flex-wrap items-center gap-sm"
          >
            {employees ? <BadgeV4 tone="neutral">{employees}</BadgeV4> : null}
            {roles ? (
              <BadgeV4 tone={(company.openRoles ?? 0) > 0 ? 'primary' : 'neutral'}>{roles}</BadgeV4>
            ) : null}
            {following != null && !canFollow ? (
              <BadgeV4 tone="neutral">{followed ? followingLabel : followLabel}</BadgeV4>
            ) : null}
          </div>
        ) : null}

        {/* A sibling of the card's activation, never a descendant of it. */}
        {canFollow ? (
          <ButtonV4
            variant={followed ? 'outline' : 'primary'}
            size="sm"
            aria-pressed={followed}
            onClick={() => onToggleFollow(company)}
            className={cn('self-start', MIN_TAP_CLASS)}
          >
            {followed ? followingLabel : followLabel}
          </ButtonV4>
        ) : null}
      </div>
    );
  }
);
