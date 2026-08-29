import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { IconV4 } from '../primitives/IconV4';
import { StatusDotV4 } from '../primitives/StatusDotV4';
import { TextV4 } from '../primitives/TextV4';
import type { IconName } from '../primitives/icon-names';
import type { NotificationItemProps } from './NotificationItem';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_CSS,
  ROW_V4_LEADING_CLASS,
  ROW_V4_STYLE_ID,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowGroundClass,
  rowHeightClass,
  rowStateVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from './internal/row-v4';

/**
 * The tones §4.7 lets a row's leading badge wear.
 *
 * Deliberately four and not the ten `IconColor` offers: §4.7 says the colour
 * "comes from the semantic family the row belongs to — `primary` by default,
 * `success` for positive money, `warn` / `danger` only when the row genuinely
 * is a warning". A notification badge in `onPrimary` or `muted` is not a
 * decision the brief leaves open, so the type does not offer it. The same four,
 * spelled identically, are the native twin's union and `ListRowV4`'s.
 */
export type NotificationBadgeTone = 'primary' | 'success' | 'warn' | 'danger';

/**
 * The category badge a notification wears when the caller names none.
 *
 * §4.3 retires the bare 8px dot outright and §5 says the dot "becomes a 44
 * tinted circular badge carrying a category `icon`" — so the replacement has to
 * be the *default*, not an opt-in, or every caller that renders a notification
 * today loses its leading treatment and the list's titles go ragged. `bell` is
 * the set's name for "a notification", which is what an unlabelled one is.
 *
 * §4.7's warning against "a list of twenty identical badges" is real and the
 * answer to it is `icon` — a notification list that knows its categories should
 * pass them. A caller that wants the slot genuinely empty passes
 * `leading={null}`; see {@link NotificationItemV4Props.leading}.
 */
const DEFAULT_ICON: IconName = 'bell';

export interface NotificationItemV4Props extends NotificationItemProps {
  /**
   * A named glyph for the leading slot, drawn as §4.3's **tinted circular
   * badge** (`IconV4 badge="soft"`, which is already the §4.7 44 circle).
   *
   * This is the notification's *category* — a message, a payment, a warning —
   * and it is what replaces the 8px dot the base row painted. Defaults to
   * `'bell'`.
   */
  icon?: IconName;
  /** Semantic family of the {@link NotificationItemV4Props.icon} badge. Default `'primary'`. */
  iconTone?: NotificationBadgeTone;
  /**
   * Take over the 44 leading slot entirely — an `AvatarV4` when the
   * notification is *from a person*, which is the other half of §4.3's leading
   * anatomy and the half a category glyph cannot express.
   *
   * Tested with `!== undefined` rather than `??`, so `leading={null}` is a
   * meaningful answer: it means **no leading slot at all**, which is §4.3's
   * third option and §4.7's escape from a homogeneous list of identical
   * badges. `leading={undefined}` (the default) still gets the badge.
   */
  leading?: React.ReactNode;
  /**
   * Paint the §4.3 `selected` ground independently of `unread` — for a
   * notification that is the one currently open in a detail pane. Default
   * `false`.
   *
   * `unread` already paints the same ground, so this is the *second* sense the
   * one token covers rather than a second tint.
   */
  selected?: boolean;
}

/**
 * **V4 notification row** — the notification member of the V4 row family.
 *
 * Every metric, class and state recipe comes from `internal/row-v4.ts`; this
 * file decides *content* and nothing else. That is the point of the pass: the
 * base row, `ListRow`, `SettingsRow` and `ActivityFeed` were four components
 * with three paddings, two min-heights, two press feedbacks and three leading
 * treatments between them, and a user scrolling from a people list into a
 * notification list could see the seam. Not one metric is typed here.
 *
 * What changes against the base row:
 *
 * 1. **The dot becomes a badge.** The base painted an `h-2 w-2` dot with a
 *    `mt-1.5` — three literals brief §1 names outright — as its entire leading
 *    treatment. §4.3 retires the bare dot: the leading slot is the family's
 *    fixed 44 square ({@link ROW_V4_LEADING_CLASS}) holding an
 *    `IconV4 badge="soft"` for a category or the caller's own `leading` node
 *    for a person.
 *
 * 2. **The unread ground is the compiler's `selected` pair.** `bg-neutral-100`
 *    — a raw Tailwind ramp step, and the one the native twin had already fixed
 *    — is deleted, not translated. {@link rowGroundClass} paints
 *    `--xen-selected` with `--xen-on-selected` beside it, so the title keeps a
 *    *guaranteed* contrast pair rather than inheriting `on-surface` onto a tint
 *    nobody measured. One token now covers both senses the family needs: an
 *    unread notification and a persistently highlighted row.
 *
 * 3. **Unread is said three ways, none of them a colour on the title.** A bold
 *    title, the `selected` ground, and a trailing `StatusDotV4` — a *state*
 *    mark, which §4.7 says is exactly what a dot is for, at the trailing edge
 *    where §4.3's anatomy puts an affordance. The accessible name still carries
 *    ", unread" for a reader that sees none of the three.
 *
 * 4. **Text is typeset, not styled.** Title `TextV4 size="base"
 *    weight="semibold"` (`bold` while unread) `tone="onSurface"`, body
 *    `size="sm" tone="mutedText"`, timestamp `size="xs" tone="mutedText"`.
 *    `mutedText`, not `muted`: `muted` is a *fill*, and using it as an ink is
 *    the bug the shadcn pass closed and this module kept.
 *
 * 5. **The timestamp top-aligns on a two-line row** (§4.3). It is a stamp on
 *    the row's first line, not a value centred against a paragraph — centred,
 *    it drifts below the title exactly when the body arrives and the list's
 *    right edge goes ragged.
 *
 * 6. **Press is the state layer.** `hover:opacity-80` is deleted, not
 *    translated. The row carries `data-xen-v4-state` and the opaque
 *    `card`/`on-card` pair from {@link rowStateVars}, so the layer tints the
 *    container and leaves the title at full strength — dimming the *content* is
 *    what M3 spends 0.38 on to mean **disabled**, which is what `hover:opacity`
 *    was accidentally saying.
 *
 * 7. **The ground is otherwise transparent and the radius is gone.** The base
 *    painted its own `rounded-[var(--xen-radius-md)]` card on `bg-surface`, so
 *    a notification list was a stack of little cards with the page showing
 *    through the gaps. §4.3: the *container* owns the card.
 *
 * Renders `null` when there is nothing to show (§4.5) — no title, no body, no
 * timestamp. A row with an empty title is a blank 56px band in the middle of a
 * list, and a blank box is the one thing §4.5 forbids. A default badge does not
 * count as content: a bell over nothing is not a notification.
 */
export const NotificationItemV4 = React.forwardRef<HTMLElement, NotificationItemV4Props>(
  function NotificationItemV4(
    {
      title,
      body,
      time,
      unread = false,
      onClick,
      className,
      icon = DEFAULT_ICON,
      iconTone = 'primary',
      leading,
      selected = false,
    },
    ref
  ) {
    // Both sheets, from the one import — a row's press feedback IS the shared
    // state layer, so `V4_STATE_CSS` is not optional for a row.
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    injectStyleOnce(ROW_V4_STYLE_ID, ROW_V4_CSS);

    const navigates = onClick !== undefined;
    const supporting = body !== undefined && body !== '';
    const titled = title.trim() !== '';
    const stamped = time !== undefined && time !== '';

    // §4.5: nothing to show, so show nothing.
    if (!titled && !supporting && !stamped) return null;

    const leadingNode =
      leading !== undefined ? (
        leading
      ) : (
        <IconV4 name={icon} color={iconTone} badge="soft" size="base" />
      );

    const inner = (
      <>
        {leadingNode != null ? (
          <span className={ROW_V4_LEADING_CLASS}>{leadingNode}</span>
        ) : null}
        <span className={ROW_V4_TEXT_CLASS}>
          {titled ? (
            <TextV4
              size="base"
              weight={unread ? 'bold' : 'semibold'}
              tone="onSurface"
              numberOfLines={1}
            >
              {title}
            </TextV4>
          ) : null}
          {supporting ? (
            <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
              {body}
            </TextV4>
          ) : null}
        </span>
        {stamped || unread ? (
          <span
            className={cn(
              ROW_V4_TRAILING_CLASS,
              // §4.3: a timestamp top-aligns on a two-line row. On a one-line
              // row there is only one line to align to, so centring is correct
              // and `self-start` would push the stamp against the padding.
              supporting && 'self-start'
            )}
          >
            {stamped ? (
              <TextV4 size="xs" tone="mutedText">
                {time}
              </TextV4>
            ) : null}
            {/*
              A state mark, not a leading treatment — §4.7's sanctioned use of a
              dot. `pulse={false}`: the echo means "live, right now", and a list
              of unread notifications pulsing in unison is a distraction rather
              than a signal. The name is carried by the row's `aria-label`, so
              the dot itself stays decorative and is not announced twice.
            */}
            {unread ? <StatusDotV4 tone="primary" pulse={false} /> : null}
          </span>
        ) : null}
      </>
    );

    const classes = cn(
      ROW_V4_BASE_CLASS,
      rowHeightClass(supporting),
      rowGroundClass(unread || selected),
      className
    );
    const label = `${title}${unread ? ', unread' : ''}`;

    if (!navigates) {
      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          data-xen-v4-row=""
          data-interactive="false"
          aria-label={label}
          className={classes}
        >
          {inner}
        </div>
      );
    }
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        data-xen-v4-row=""
        data-interactive="true"
        data-xen-v4-state=""
        aria-label={label}
        onClick={onClick}
        className={classes}
        // Inline rather than left to the sheet: `ROW_V4_STYLE_ID` is shared by
        // every row in the family, so whichever injects first wins the
        // document. Naming the pair here is both the precise spelling the
        // module documents and immune to that race.
        style={rowStateVars()}
      >
        {inner}
      </button>
    );
  }
);
