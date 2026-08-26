import * as React from 'react';
import { cn } from './cn';
import type { EmptyStateProps } from './EmptyState';

export type { EmptyStateProps as EmptyStateV4Props };

/**
 * The measure a line of explanation is allowed to run to.
 *
 * `2xl × 7` off the spacing scale rather than `max-w-sm`, so a seed that
 * re-scales its rhythm re-scales the measure with it. Both twins compose the
 * same expression, which is why the native one is 336 and not the base's
 * literal 320.
 */
const MEASURE = 'max-w-[calc(var(--xen-space-2xl)*7)]';

/**
 * `EmptyState`, V4 — the same props, and the action outranks the picture.
 *
 * ## §15: an empty state exists to move the user forward
 *
 * "No data." is the failure mode §15 names. The answer is three things in
 * order — what belongs here, why it matters, and what to do next — and the
 * third one is the only one that changes anything. So V4 reorders the emphasis:
 *
 * - The **illustration** keeps its familiar place at the top (§31 — use the
 *   established pattern) but loses the visual centre. It is `muted-text`,
 *   `aria-hidden`, and sits one `sm` step from the title, so it reads as a
 *   quiet mark on the heading rather than as the subject of the screen.
 * - The **title** carries the weight the icon gave up: the heading face at
 *   `lg`, which is §10's "typography before containers".
 * - The **action** is separated by the largest gap in the component. That
 *   separation is what makes it terminal — the one dominant thing §5 asks
 *   every screen to have — rather than a footnote under the copy.
 *
 * The honest limit: `icon` and `action` are caller slots, so this component
 * cannot resize what it is handed. What it can do is decide the order, the
 * colour of the slot it owns, and which element gets the room. It does all
 * three, and it does not pretend to more.
 *
 * ## The dashed box is gone
 *
 * The base draws a dashed rectangle around the whole thing. §11 asks that a
 * container earn its existence, and this one does not: an empty state already
 * occupies the region whose emptiness it is explaining, so the outline
 * describes a boundary the reader can already see. A dashed placeholder
 * rectangle is also one of §8's listed tells of generic generated UI. What
 * replaces it is space — §9, spacing as structure.
 *
 * ## Colour
 *
 * Both the icon and the description move from `muted` to `muted-text`. `muted`
 * is a decorative slot with no contrast promise; a sentence explaining what the
 * user should do next is text, and §46 puts its legibility ahead of its
 * quietness.
 */
export const EmptyStateV4 = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  function EmptyStateV4({ icon, title, description, action, className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-xen-empty-state=""
        className={cn(
          'flex flex-col items-center justify-center gap-xs px-lg py-2xl text-center',
          className
        )}
        {...rest}
      >
        {icon ? (
          <div
            data-xen-empty-icon=""
            className="mb-sm text-muted-text"
            aria-hidden="true"
          >
            {icon}
          </div>
        ) : null}
        <p className="font-heading text-lg font-semibold text-on-surface">{title}</p>
        {description ? (
          <p className={cn('font-body text-sm leading-relaxed text-muted-text', MEASURE)}>
            {description}
          </p>
        ) : null}
        {/*
          The largest gap in the component, and the reason it is here: the
          action is what the empty state is FOR (§15), so it gets the room that
          makes it read as the next step rather than as a caption.
        */}
        {action ? <div className="mt-lg">{action}</div> : null}
      </div>
    );
  }
);
