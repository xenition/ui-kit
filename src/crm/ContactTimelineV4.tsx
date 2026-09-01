import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import {
  ACTIVITY_META_V4,
  metaLine,
  PLACEHOLDER_CLASS,
  spokenLine,
  toneInkClass,
} from './internal/crm-v4';
import type { ContactTimelineProps } from './ContactTimeline';

export interface ContactTimelineV4Props extends ContactTimelineProps {
  /** A sentence under the empty title — an empty timeline needs a next step. */
  emptyDescription?: string;
}

/** How many placeholder nodes a loading timeline draws. */
const SKELETON_NODES = 3;

/**
 * **V4 contact timeline** — the web twin of the native `ContactTimelineV4`,
 * same props as {@link ContactTimeline} plus `emptyDescription`.
 *
 * ## Six changes
 *
 * 1. **Making the timeline interactive no longer destroys the list.** The item
 *    set `role="listitem"` and then spread `activate()`, whose `role: 'button'`
 *    wins because a JSX spread after an explicit prop wins — so the moment
 *    `onItemClick` was supplied, the `role="list"` had zero list items and a
 *    reader announced an empty list. The button now lives **inside** the list
 *    item, which is where it always belonged.
 * 2. **The list is a real `<ul>`/`<li>`**, so the semantics survive without a
 *    `role` at all and cannot be overwritten by a spread.
 * 3. **The last node is still a target.** The row's bottom padding dropped to
 *    `0` on the last item, leaving a 28px tap area at the end of every
 *    timeline. Every node clears 44.
 * 4. **The node chip is the same object on both twins** — the compiler's
 *    opaque `selected` container under the tone's contrast-corrected ink, in
 *    place of web's flat `bg-neutral-100` ramp step. The kind goes neutral,
 *    because a kind is identity and `success` has to keep meaning "went well".
 * 5. **Literal radii and rail widths come from the tokens.** A `14` radius and
 *    a hand-typed `2` do not follow a re-scaled seed.
 * 6. **One accessible name per node, and a press is a state layer.**
 *
 * Empty is a real {@link EmptyStateV4} with a title and a sentence, not a lone
 * grey line centred in the void.
 */
export const ContactTimelineV4 = React.forwardRef<HTMLDivElement, ContactTimelineV4Props>(
  function ContactTimelineV4(
    {
      items,
      onItemClick,
      loading = false,
      emptyLabel = 'No activity yet',
      emptyDescription,
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const list = items?.filter((item) => item?.id != null) ?? [];

    if (loading) {
      return (
        <div
          ref={ref}
          role="status"
          aria-live="polite"
          aria-label="Loading timeline"
          className={cn('flex flex-col gap-md', className)}
          {...rest}
        >
          {/* The shape it is about to be, at the node's own size. */}
          {Array.from({ length: SKELETON_NODES }).map((_, i) => (
            <div key={i} aria-hidden="true" className="flex gap-sm">
              <div
                style={{ borderRadius: 'var(--xen-radius-full)' }}
                className={cn('h-xl w-xl shrink-0', PLACEHOLDER_CLASS)}
              />
              <div className="flex flex-1 flex-col gap-xs pt-xs">
                <div className={cn('h-sm w-[60%]', PLACEHOLDER_CLASS)} />
                <div className={cn('h-sm w-[35%]', PLACEHOLDER_CLASS)} />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (list.length === 0) {
      return (
        <div ref={ref} className={className} {...rest}>
          <EmptyStateV4 title={emptyLabel} description={emptyDescription} />
        </div>
      );
    }

    return (
      <div ref={ref} className={className} {...rest}>
        <ul className="flex flex-col">
          {list.map((item, index) => {
            const meta = ACTIVITY_META_V4[item.kind];
            const isLast = index === list.length - 1;
            const caption = metaLine([item.actor, item.timestamp]);
            const label = spokenLine([
              meta.label,
              item.title,
              item.detail,
              item.actor,
              item.timestamp,
            ]);

            const node = (
              <>
                <span className="flex w-xl shrink-0 flex-col items-center self-stretch">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'flex h-xl w-xl shrink-0 items-center justify-center rounded-[var(--xen-radius-full)] border border-border bg-selected text-xs',
                      toneInkClass(meta.tone)
                    )}
                  >
                    {meta.glyph}
                  </span>
                  {/*
                    The rail is decorative and hairline-thin — `border` is the
                    only slot the theme promises for a hairline, and 1px is the
                    one bare number the line allows for one.
                  */}
                  {isLast ? null : (
                    <span aria-hidden="true" className="my-xs w-[1px] flex-1 bg-border" />
                  )}
                </span>

                <span className="flex min-w-0 flex-1 flex-col gap-xs text-left">
                  <span className="text-sm font-semibold text-on-surface">{item.title}</span>
                  {item.detail ? (
                    <span className="text-xs text-muted-text">{item.detail}</span>
                  ) : null}
                  {caption ? (
                    <span className="text-xs font-medium text-muted-text">{caption}</span>
                  ) : null}
                </span>
              </>
            );

            return (
              <li key={item.id} className="flex">
                {onItemClick ? (
                  <button
                    type="button"
                    aria-label={label}
                    onClick={() => onItemClick(item)}
                    data-xen-v4-state=""
                    style={stateGroundVars('var(--xen-surface)', 'var(--xen-on-surface)') as React.CSSProperties}
                    className={cn(
                      'flex w-full items-stretch gap-sm rounded-[var(--xen-radius-md)] text-left',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                      !isLast && 'pb-md',
                      // The last node kept its 28px height because its bottom
                      // padding dropped to 0. A target is a target at the end
                      // of a list too.
                      MIN_TAP_CLASS
                    )}
                  >
                    {node}
                  </button>
                ) : (
                  <div className={cn('flex w-full items-stretch gap-sm', !isLast && 'pb-md')}>
                    {node}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);
