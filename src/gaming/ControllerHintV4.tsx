import * as React from 'react';
import { cn } from '../primitives/cn';
import type { ControllerHintItem, ControllerHintProps, ControllerHintSize } from './ControllerHint';
import { spokenLine } from './internal/arcade-v4';

export interface ControllerHintV4Props extends ControllerHintProps {}

/** Only the type scale changes with `size`; the cap's box is derived from it. */
const CAP_TEXT: Record<ControllerHintSize, string> = { sm: 'text-xs', md: 'text-sm' };

/**
 * The key cap's box, in **`em`**.
 *
 * The base pinned it at `h-5 min-w-[20px]` and `h-[26px] min-w-[26px]` — two
 * absolute boxes around text that is free to grow. A reader at 200% type got
 * an `A` overflowing a 20px cap, or clipped by it. One and a half times the
 * glyph's own size tracks whatever the user has asked for.
 */
const CAP_BOX = 'min-h-[1.5em] min-w-[1.5em]';

/**
 * **V4 controller hint** — the same props as {@link ControllerHint}.
 *
 * ## Three changes
 *
 * 1. **The hint is announced in the order it is drawn.** The label was
 *    `` `${action}: ${button}` `` — so a sighted player read "Ⓐ Jump" and a
 *    screen-reader user heard "Jump: A", the mapping backwards. In a HUD strip
 *    of six hints that is six inverted sentences to reassemble. It is built
 *    with `spokenLine()` now, button first, in the reading order.
 * 2. **The key cap scales with Dynamic Type.** See {@link CAP_BOX}: the box
 *    was two hand-picked pixel heights around text that grows with the user's
 *    type setting, so a large-type player got a clipped glyph.
 * 3. **A strip of hints is a list.** It was a bare `flex` of `role="img"`
 *    spans with no container, so a reader had no count and no way to move
 *    through the mapping one hint at a time.
 */
export const ControllerHintV4 = React.forwardRef<HTMLDivElement, ControllerHintV4Props>(
  function ControllerHintV4(
    { button, action, hints, variant = 'pill', size = 'md', className },
    ref
  ) {
    const list: ControllerHintItem[] =
      hints && hints.length > 0
        ? hints
        : button != null
          ? [{ button, action: action ?? '' }]
          : [];

    if (list.length === 0) return null;

    const renderHint = (hint: ControllerHintItem, key: React.Key): React.ReactElement => (
      <span
        key={key}
        role="img"
        // Button first: the order it is read on screen.
        aria-label={spokenLine([hint.button, hint.action])}
        className={cn(
          'inline-flex items-center gap-xs',
          CAP_TEXT[size],
          variant === 'pill' && 'rounded-full border border-border bg-surface px-sm py-xs'
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            'inline-flex items-center justify-center rounded-[var(--xen-radius-sm)]',
            'bg-primary px-xs font-bold text-on-primary',
            CAP_BOX
          )}
        >
          {hint.button}
        </span>
        {hint.action ? (
          <span aria-hidden="true" className="text-on-surface">
            {hint.action}
          </span>
        ) : null}
      </span>
    );

    if (list.length === 1) {
      return (
        <div ref={ref} className={className}>
          {renderHint(list[0]!, 'h0')}
        </div>
      );
    }

    return (
      <div ref={ref} className={className}>
        <ul className="flex flex-wrap gap-sm">
          {list.map((hint, index) => (
            <li key={`h${index}`}>{renderHint(hint, `h${index}`)}</li>
          ))}
        </ul>
      </div>
    );
  }
);
