import * as React from 'react';
import { cn } from '../primitives/cn';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import type { QuickRepliesProps } from './QuickReplies';

export interface QuickRepliesV4Props extends QuickRepliesProps {
  /**
   * Wrap the chips instead of scrolling them. Default `true`.
   *
   * §7 is explicit: chips wrap and are never clipped, because a user cannot
   * choose what they cannot see. The base scrolled them horizontally, so the
   * last reply was off-screen with nothing saying so.
   */
  wrap?: boolean;
  /** Accessible name for the group. Default `'Quick replies'`. */
  groupLabel?: string;
}

/**
 * **V4 quick replies** — the web twin of the native `QuickRepliesV4`, same
 * props as {@link QuickReplies} plus `wrap` and `groupLabel`.
 *
 * ## Three changes
 *
 * 1. **The chips wrap.** See `wrap`.
 * 2. **Every chip clears 44** and hovers with the shared state layer.
 * 3. **The set is a real list with a name**, so a reader hears "Quick
 *    replies, 3 items" instead of three unrelated buttons.
 *
 * **Renders nothing for an empty list** (§4.5).
 */
export const QuickRepliesV4 = React.forwardRef<HTMLDivElement, QuickRepliesV4Props>(
  function QuickRepliesV4(
    { replies, wrap = true, groupLabel = 'Quick replies', onSelect, className, ...rest },
    ref
  ) {
    const list = replies?.filter((r) => r?.label) ?? [];
    if (list.length === 0) return null;

    // The base's props extend `HTMLAttributes<HTMLDivElement>`, so the root
    // stays a `<div>` and the list lives inside it.
    return (
      <div ref={ref} data-xen-quick-replies="" className={className} {...rest}>
        <ul
          aria-label={groupLabel}
          className={cn(
            'flex gap-sm',
            wrap
              ? 'flex-wrap'
              : 'overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
          )}
        >
          {list.map((reply) => (
            <li key={reply.id} className={cn(!wrap && 'shrink-0')}>
              <button
                type="button"
                onClick={() => onSelect?.(reply.id)}
                data-xen-v4-chrome="on-surface"
                className={cn(
                  'inline-flex items-center rounded-full border border-border bg-card px-md text-sm font-semibold text-on-card',
                  MIN_TAP_CLASS
                )}
              >
                {reply.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
