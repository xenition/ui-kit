import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { TagV4 } from '../primitives/TagV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import type { TagListProps } from './TagList';
import { TONE_INK } from './internal/reading-v4';

export interface TagListV4Props extends TagListProps {
  /** Build a tag button's accessible name. Default ``(label) => `Tag ${label}` ``. */
  formatTagLabel?: (label: string) => string;
  /**
   * Build the overflow chip's spoken form. Default
   * ``(count) => `${count} more tags` ``.
   */
  formatOverflow?: (count: number) => string;
}

/**
 * **V4 tag list** — the web twin of the native `TagListV4`, same props as
 * {@link TagList} plus `formatTagLabel` and `formatOverflow`.
 *
 * ## Four changes
 *
 * 1. **The empty branch keeps the caller's props.** The populated branch
 *    spread `{...rest}` and the empty one did not, so every `id`, `data-*` and
 *    handler an app hung on the list vanished at exactly the moment the list
 *    was empty — the state hardest to notice in development and easiest to hit
 *    in production. Native dropped `style` the same way.
 * 2. **A list has list items.** `role="list"` with bare buttons under it has
 *    zero items, and a reader announces an empty list.
 * 3. **A tag button clears 44.** They were roughly 20px — the height of the
 *    word inside them.
 * 4. **The `+N` chip is reachable and says what the N are.** It was an
 *    unfocusable chip reading "plus three", with no way to learn which three.
 */
export const TagListV4 = React.forwardRef<HTMLDivElement, TagListV4Props>(function TagListV4(
  {
    tags,
    onTagClick,
    max,
    emptyLabel = 'No tags',
    formatTagLabel = (label: string) => `Tag ${label}`,
    formatOverflow = (count: number) => `${count} more tags`,
    className,
    ...rest
  },
  ref
) {
  injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

  if (tags.length === 0) {
    if (emptyLabel == null) return null;
    // `{...rest}` here too — this is the whole first change.
    return (
      <div ref={ref} className={className} {...rest}>
        <p className={cn('text-sm', TONE_INK.muted)}>{emptyLabel}</p>
      </div>
    );
  }

  const visible = typeof max === 'number' && max >= 0 ? tags.slice(0, max) : tags;
  const overflow = tags.length - visible.length;

  /*
    The root stays a `<div>`, because the base's props extend
    `HTMLAttributes<HTMLDivElement>` and its ref is one; the `<ul>` goes inside.
    Swapping the root for a list element would break every caller holding the
    ref or passing a div attribute.
  */
  return (
    <div ref={ref} className={className} {...rest}>
      <ul className="flex flex-wrap gap-xs">
        {visible.map((tag, index) => (
          <li key={`${tag}-${index}`} className="flex">
            {onTagClick ? (
              <button
                type="button"
                aria-label={formatTagLabel(tag)}
                onClick={() => onTagClick(tag, index)}
                data-xen-v4-state=""
                style={
                  stateGroundVars(
                    'var(--xen-surface)',
                    'var(--xen-on-surface)'
                  ) as React.CSSProperties
                }
                className={cn(
                  'inline-flex items-center rounded-[var(--xen-radius-sm)] px-xs',
                  // The HIG floor, composed from the spacing scale — not a typed 44.
                  MIN_TAP_CLASS,
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                )}
              >
                <TagV4 tone="neutral">{`#${tag}`}</TagV4>
              </button>
            ) : (
              <span className="inline-flex items-center px-xs">
                <TagV4 tone="neutral">{`#${tag}`}</TagV4>
              </span>
            )}
          </li>
        ))}

        {overflow > 0 ? (
          <li className="flex">
            {/*
              Focusable on purpose. The chip is the only trace of the tags the
              cap removed, and a reader that cannot land on it never learns the
              list was truncated at all.
            */}
            <span
              tabIndex={0}
              role="note"
              aria-label={formatOverflow(overflow)}
              className={cn(
                'inline-flex items-center rounded-[var(--xen-radius-sm)] px-xs',
                MIN_TAP_CLASS,
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
              )}
            >
              <TagV4 tone="primary">{`+${overflow}`}</TagV4>
            </span>
          </li>
        ) : null}
      </ul>
    </div>
  );
});
