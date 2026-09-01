import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { RatingV4 } from '../primitives/RatingV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { ratingParts } from '../primitives/internal/tone-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import type { SpeakerCardProps } from './SpeakerCard';
import { BADGE_V4, spokenLine } from './internal/event-v4';

export interface SpeakerCardV4Props extends SpeakerCardProps {}

const CARD_STATE = stateGroundVars(
  'var(--xen-card)',
  'var(--xen-on-card)'
) as React.CSSProperties;

/**
 * **V4 speaker card** — the web twin of the native `SpeakerCardV4`, same props
 * as {@link SpeakerCard}.
 *
 * ## Four changes
 *
 * 1. **The card's activation is a real `<button>`.** The base was a `div` with
 *    `role="button"`, a `tabIndex` and a hand-written Enter/Space handler that
 *    ended in `e.preventDefault(); currentTarget.click()` — a synthesised click
 *    standing in for the one a real button dispatches for free.
 * 2. **The name carries the speaker.** `aria-label={name}` replaced the
 *    subtree, and `role="button"` makes a subtree presentational anyway — so
 *    the role, the company, the rating and every topic tag were unreachable to
 *    a screen reader. `spokenLine()` joins them.
 * 3. **`rating` is clamped before it reaches `Rating`.** A caller passing a
 *    0–10 score, or a `-1` from an unrated speaker, drew more or fewer than the
 *    five glyphs the component promises; `ratingParts()` bounds it and gives
 *    the stars the numeral a low-vision reader actually compares.
 * 4. **Press is a state layer and the tags are drawn the same way on both
 *    twins.** `hover:opacity-95` dims the card's own content, which is M3's
 *    *disabled* signal; the badges take the module's one `soft`/`sm` shape
 *    rather than this twin's solid `md` and native's soft `sm`.
 */
export const SpeakerCardV4 = React.forwardRef<HTMLDivElement, SpeakerCardV4Props>(
  function SpeakerCardV4(
    {
      name,
      role,
      company,
      avatarUrl,
      bio,
      rating,
      tags = [],
      variant = 'row',
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    if (!name) return null;

    const stacked = variant === 'stacked';
    const interactive = typeof onClick === 'function';

    // The base types `onClick` against the card's `div`; the activation is a
    // real `<button>` now, and the two element types are unrelated.
    const activate = onClick as unknown as React.MouseEventHandler<HTMLButtonElement> | undefined;

    const roleLine = [role, company].filter(Boolean).join(' · ');
    const stars = typeof rating === 'number' ? ratingParts({ value: rating }) : undefined;

    const body = (
      <>
        <AvatarV4 src={avatarUrl} name={name} alt="" size={stacked ? 'lg' : 'md'} />
        <span
          className={cn(
            'flex flex-col gap-xs',
            stacked ? 'items-center text-center' : 'min-w-0 flex-1 items-start text-left'
          )}
        >
          <span className="font-heading text-lg font-bold text-on-card">{name}</span>
          {roleLine ? <span className="text-sm text-muted-text">{roleLine}</span> : null}
          {stars && stars.text != null ? (
            <RatingV4
              value={Number(stars.text)}
              max={stars.total}
              size="sm"
              showValue
              label={stars.label}
            />
          ) : null}
          {bio ? (
            <span
              className={cn(
                'text-sm text-on-card',
                stacked ? 'line-clamp-3' : 'line-clamp-2'
              )}
            >
              {bio}
            </span>
          ) : null}
          {tags.length > 0 ? (
            <span
              className={cn(
                'flex flex-row flex-wrap gap-xs',
                stacked ? 'justify-center' : 'justify-start'
              )}
            >
              {tags.map((t, i) => (
                <BadgeV4 key={`${t}-${i}`} {...BADGE_V4} tone="neutral">
                  {t}
                </BadgeV4>
              ))}
            </span>
          ) : null}
        </span>
      </>
    );

    const inner = cn(
      'flex w-full gap-md p-lg',
      stacked ? 'flex-col items-center' : 'flex-row items-start'
    );

    return (
      <div
        ref={ref}
        className={cn(
          'overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-card text-on-card',
          className
        )}
        {...rest}
      >
        {interactive ? (
          <button
            type="button"
            onClick={activate}
            aria-label={spokenLine([name, role, company, stars?.label, ...tags])}
            data-xen-v4-state=""
            style={CARD_STATE}
            className={cn(
              inner,
              MIN_TAP_CLASS,
              'text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
          >
            {body}
          </button>
        ) : (
          <div className={inner}>{body}</div>
        )}
      </div>
    );
  }
);
