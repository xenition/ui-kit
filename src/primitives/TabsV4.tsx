import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from './cn';
import { MIN_TAP_CLASS, NAV_V4_CSS, useMovingIndicator } from './internal/nav-v4';
import type { TabItem, TabsProps } from './Tabs';

export type { TabsProps as TabsV4Props, TabItem };

/**
 * **V4 tabs** — the web twin of the native `TabsV4`, same props as
 * {@link Tabs}, a different design line.
 *
 * ## The selected state is the whole job
 *
 * A tab bar answers one question — *which section am I in* — and §32 says the
 * user should recognise the answer, not reconstruct it. So the answer is said
 * three times over, in three channels that fail independently:
 *
 * 1. **An underline** in `--xen-primary`. A 2px rule is a UI boundary, judged
 *    at 3:1 rather than 4.5:1, so the vivid fill slot is the correct one here —
 *    unlike the label.
 * 2. **The label's colour**, `text-primary-text` — the compiler's brand hue
 *    walked until it clears AA on `surface`. The base tab bar used
 *    `text-primary` for this, which is a FILL colour and carries no promise as
 *    text; on a light-primary seed the selected tab was the least readable
 *    thing in the row, the exact inverse of what it was trying to say.
 * 3. **Weight.** 600 selected against 500 unselected — the one channel that
 *    survives a colour-blind reader and a greyscale screenshot.
 *
 * Nothing else changes: no pill, no fill, no shadow. §8 lists excessive
 * pill-shaped controls among the tells of generic AI UI, and a tab that gains a
 * container has stopped being a tab.
 *
 * ## Why the underline moves
 *
 * §36.5 asks that related states preserve continuity of position. Two tabs are
 * two states of one question, so the underline is ONE absolutely-positioned
 * element that slides between them rather than a border that blinks off one
 * button and on to another. `useMovingIndicator` measures the row and hands
 * back the transform; the transition is dropped under
 * `prefers-reduced-motion` (§36.10), and with no layout engine at all — jsdom,
 * SSR — the indicator simply is not rendered and the colour and weight carry
 * the state on their own.
 *
 * ## Reach
 *
 * Every tab clears the 44px target, composed from the spacing scale rather
 * than remembered. The base row was `py-2` around a 14px label — about 30px,
 * and a miss on a touchscreen (§30).
 */
export const TabsV4 = React.forwardRef<HTMLDivElement, TabsProps>(function TabsV4(
  { className, items, value, onValueChange, onChange, ...rest },
  ref
) {
  injectStyleOnce('xen-v4-nav-styles', NAV_V4_CSS);
  // Two spellings, one callback: the original wins when both are passed, so a
  // caller who has migrated half a file never gets the change reported twice.
  const emit = onValueChange ?? onChange;
  const indicator = useMovingIndicator<HTMLButtonElement>(value, items.length);

  return (
    <div
      ref={ref}
      role="tablist"
      className={cn('relative flex border-b border-border', className)}
      {...rest}
    >
      {items.map((it) => {
        const active = it.value === value;
        return (
          <button
            key={it.value}
            ref={indicator.itemRef(it.value)}
            type="button"
            role="tab"
            data-xen-v4-nav-item=""
            aria-selected={active}
            onClick={() => emit?.(it.value)}
            className={cn(
              'inline-flex items-center justify-center whitespace-nowrap px-lg py-sm text-sm font-body',
              'focus-visible:outline-none',
              MIN_TAP_CLASS,
              active ? 'font-semibold text-primary-text' : 'font-medium text-muted-text'
            )}
          >
            {it.label}
          </button>
        );
      })}

      {indicator.style !== null && (
        <span
          data-xen-v4-nav-indicator=""
          aria-hidden="true"
          // Sits ON the container's hairline rather than above it, so the rule
          // and the indicator read as one line with a lit segment.
          className="absolute bottom-[-1px] left-0 h-0.5 rounded-[var(--xen-radius-full)] bg-primary"
          style={indicator.style}
        />
      )}
    </div>
  );
});
