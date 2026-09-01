import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { metaLine } from '../primitives/internal/tone-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import type { NoticeCategory, PublicNoticeCardProps } from './PublicNoticeCard';
import {
  BADGE_V4,
  CARD_V4,
  IDENTITY_TONE,
  spokenLine,
  tintGround,
  tintInkClass,
} from './internal/civic-v4';

export interface PublicNoticeCardV4Props extends PublicNoticeCardProps {
  /** Override the seven category words — `'Public hearing'`, `'Roadwork'`, … */
  categoryLabels?: Partial<Record<NoticeCategory, string>>;
  /** What the unread flag is called. Default `'New'`. */
  newLabel?: string;
}

/**
 * Category → word and glyph, with **no tone**.
 *
 * A notice category is identity — the same thing a department or a document
 * type is — so it takes the neutral chip and its glyph. The base spent `warn`
 * on Roadwork and the brand colour on four more, which put a category in the
 * same palette the module uses for Denied, Rejected and Urgent.
 */
const CATEGORY_V4: Record<NoticeCategory, { label: string; glyph: string }> = {
  hearing: { label: 'Public hearing', glyph: '⚖️' },
  meeting: { label: 'Meeting', glyph: '📋' },
  roadwork: { label: 'Roadwork', glyph: '🚧' },
  election: { label: 'Election', glyph: '🗳️' },
  ordinance: { label: 'Ordinance', glyph: '📜' },
  bid: { label: 'Bid / RFP', glyph: '📑' },
  general: { label: 'Notice', glyph: '📢' },
};

/**
 * **V4 public notice** — the web twin of the native `PublicNoticeCardV4`, same
 * props as {@link PublicNoticeCard} plus `categoryLabels` and `newLabel`.
 *
 * ## Four changes
 *
 * 1. **The date and the venue are in the name.** A hearing notice's date is the
 *    legally operative field — miss it and you have lost the right to be heard
 *    — and the card's fixed `` `${category}: ${title}` `` name pruned it, along
 *    with the agency and the location, because `role="button"` renders its own
 *    subtree presentational. All of it joins the name now.
 * 2. **"New" stops being `danger`.** Unread is not a hazard, and `danger` is
 *    the same tone this module spends on Denied, Rejected and Urgent — so an
 *    unread roadwork notice read, at a glance, as a rejection. It takes
 *    `primary` — the module's tone for open and just-arrived, and not one of
 *    the three status colours the rule protects — with a dot and a word beside
 *    it, so unread still stands out against the neutral category chip.
 * 3. **A category is not a status either.** Roadwork wore `warn` and four more
 *    wore the brand colour; the leading disc was `bg-neutral-100` or a `-50`
 *    ramp step, both of which mirror under `[data-theme="dark"]`. Category
 *    takes the neutral identity tint and its glyph, and the tint's own
 *    contrast-corrected ink rather than a fill token used as one.
 * 4. **An interactive card is a real `<button>`** that clears 44 and answers
 *    with a state layer, not a `div` with `role="button"`, a hand-written
 *    Enter/Space handler, `hover:opacity-90` — M3's *disabled* signal — and a
 *    `primary-300` focus ring off the neutral ramp.
 */
export const PublicNoticeCardV4 = React.forwardRef<HTMLDivElement, PublicNoticeCardV4Props>(
  function PublicNoticeCardV4(
    {
      category,
      title,
      body,
      agency,
      date,
      location,
      isNew = false,
      onClick,
      categoryLabels,
      newLabel = 'New',
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    if (!title) return null;

    const cat = CATEGORY_V4[category] ?? CATEGORY_V4.general;
    const catWord = categoryLabels?.[category] ?? cat.label;
    const meta = metaLine([agency, location, date]);

    const content = (
      <>
        <span className="flex items-center gap-sm">
          <span
            aria-hidden
            className="flex h-[calc(var(--xen-space-xl)_+_var(--xen-space-sm))] w-[calc(var(--xen-space-xl)_+_var(--xen-space-sm))] shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]"
            style={{ background: tintGround(IDENTITY_TONE) }}
          >
            <IconV4 glyph={cat.glyph} className={tintInkClass(IDENTITY_TONE)} />
          </span>
          <span className="flex flex-1 flex-wrap items-center gap-xs">
            <BadgeV4 tone={IDENTITY_TONE} {...BADGE_V4}>
              {catWord}
            </BadgeV4>
            {isNew ? (
              // `primary`, not the neutral identity chip: two neutral pills
              // side by side would hide the unread flag entirely, which is the
              // opposite of the fix. `primary` is not one of the three status
              // colours the rule protects.
              <BadgeV4 tone="primary" dot {...BADGE_V4}>
                {newLabel}
              </BadgeV4>
            ) : null}
          </span>
        </span>

        <span className="mt-sm block text-base font-bold text-on-surface">{title}</span>

        {body != null ? (
          <span className="mt-xs line-clamp-3 text-sm text-on-surface">{body}</span>
        ) : null}

        {meta !== '' ? (
          <span className="mt-sm block text-xs text-muted-text">{meta}</span>
        ) : null}
      </>
    );

    return (
      <CardV4 ref={ref} variant={CARD_V4} className={className} {...rest}>
        {onClick != null ? (
          <button
            type="button"
            onClick={onClick}
            aria-label={spokenLine([
              catWord,
              isNew ? newLabel : undefined,
              title,
              date,
              location,
              agency,
              body,
            ])}
            data-xen-v4-state=""
            style={stateGroundVars('var(--xen-surface)', 'var(--xen-on-surface)') as React.CSSProperties}
            className={cn(
              'flex w-full flex-col rounded-[var(--xen-radius-md)] text-left',
              MIN_TAP_CLASS,
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
          >
            {content}
          </button>
        ) : (
          <div className="flex w-full flex-col">{content}</div>
        )}
      </CardV4>
    );
  }
);
