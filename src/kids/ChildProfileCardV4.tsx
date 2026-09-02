import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import type { ChildMood, ChildProfileCardProps } from './ChildProfileCard';
import {
  captionLine,
  cardStateVars,
  FOCUS_RING_CLASS,
  KIDS_CARD_CLASS,
  KIDS_CARD_GROUND_CLASS,
  spokenLine,
  type IdentityTone,
} from './internal/tone-v4';

export interface ChildProfileCardV4Props extends ChildProfileCardProps {
  /** Replace the six mood words. They were hard-coded English. */
  moodLabels?: Partial<Record<ChildMood, string>>;
}

/** Glyph and default word per mood. A mood is identity, so it takes no tone. */
const MOOD_META_V4: Record<ChildMood, { glyph: string; label: string }> = {
  happy: { glyph: '😊', label: 'Happy' },
  excited: { glyph: '🤩', label: 'Excited' },
  calm: { glyph: '😌', label: 'Calm' },
  sad: { glyph: '😢', label: 'Sad' },
  tired: { glyph: '😴', label: 'Tired' },
  sick: { glyph: '🤒', label: 'Not well' },
};

/** An interest is a tag. The brand's second slot, matching the native twin. */
const INTEREST_TONE: IdentityTone = 'accent';

/**
 * **V4 child profile card** — same props as {@link ChildProfileCard} plus
 * `moodLabels`.
 *
 * ## Six changes
 *
 * 1. **The card's accessible name was being dropped on the floor.** It was an
 *    `aria-label` on a `div` with no role — which browsers ignore outright —
 *    for every card without an `onClick`, which is most of them. The name now
 *    belongs to a real `<button>` when the card is activatable, and to nothing
 *    at all when it is not, because the visible text is already the name.
 * 2. **The activation is a real `<button>`.** A `div` with `role="button"`,
 *    `tabIndex={0}` and a hand-written Enter/Space handler is three
 *    approximations of what a button already does — and it wrapped the whole
 *    card, so the interest chips and the mood block were swallowed into one
 *    stop.
 * 3. **`{...rest}` is spread first.** It was spread after `onClick`, so a
 *    caller passing any handler through silently replaced the card's own.
 * 4. **A mood is not a status and a sad child is not an error.** The mood
 *    block keeps its glyph and gains a replaceable word; nothing about it is
 *    carried by colour.
 * 5. **The interest chips match their native twin.** Native drew them
 *    `accent`/`soft`/`sm`, web drew them `primary`/`solid`/`md` — one call,
 *    two chips — because of a comment claiming the web `Badge` has no `accent`
 *    tone. It has had one for a while.
 * 6. **Tokens and targets.** `hover:bg-neutral-50` is a light-scheme ramp step
 *    that paints a near-white slab on a dark page; press is the M3 state layer;
 *    the skeleton is opaque and card-relative rather than `bg-neutral-200`; the
 *    card sits on `card`/`on-card`; the activation clears 44.
 */
export const ChildProfileCardV4 = React.forwardRef<HTMLDivElement, ChildProfileCardV4Props>(
  function ChildProfileCardV4(
    {
      name,
      photoUrl,
      age,
      grade,
      birthday,
      mood,
      interests,
      loading = false,
      moodLabels,
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
          data-xen-child-profile-card=""
          role="status"
          aria-live="polite"
          aria-label={name}
          className={shell}
        >
          <div className="flex items-center gap-md">
            <SkeletonV4 className="h-14 w-14 shrink-0 rounded-full" />
            <div className="flex min-w-0 flex-1 flex-col gap-sm">
              <SkeletonV4 className="h-4 w-1/2" />
              <SkeletonV4 className="h-3 w-2/5" />
            </div>
          </div>
        </div>
      );
    }

    if (!name) return null;

    const moodMeta = mood ? MOOD_META_V4[mood] : undefined;
    const moodWord = mood ? (moodLabels?.[mood] ?? MOOD_META_V4[mood].label) : undefined;
    const caption = captionLine([age, grade]);
    const label = spokenLine([name, age, grade, birthday, moodWord]);

    const head = (
      <span className="flex w-full items-center gap-md">
        <AvatarV4 size="lg" src={photoUrl} name={name} alt="" />
        <span className="flex min-w-0 flex-1 flex-col gap-xs text-left">
          <span className="truncate text-xl font-bold text-on-card">{name}</span>
          {caption ? <span className="truncate text-sm text-muted-text">{caption}</span> : null}
          {birthday ? (
            <span className="truncate text-xs text-muted-text">
              <span aria-hidden="true">🎂 </span>
              {birthday}
            </span>
          ) : null}
        </span>
        {moodMeta ? (
          <span className="flex shrink-0 flex-col items-center gap-xs">
            <span aria-hidden="true" className="text-xl leading-none">
              {moodMeta.glyph}
            </span>
            <span className="text-xs text-muted-text">{moodWord}</span>
          </span>
        ) : null}
      </span>
    );

    return (
      <div {...rest} ref={ref} data-xen-child-profile-card="" className={shell}>
        {onClick ? (
          <button
            type="button"
            aria-label={label}
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

        {/* A sibling of the activation: chips inside `role="button"` are lost. */}
        {interests && interests.length > 0 ? (
          <ul className="flex flex-wrap gap-xs">
            {interests.map((interest, index) => (
              <li key={`${interest}-${index}`}>
                <BadgeV4 tone={INTEREST_TONE} variant="soft" size="sm">
                  {interest}
                </BadgeV4>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }
);
