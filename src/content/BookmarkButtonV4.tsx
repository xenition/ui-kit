import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  stateGroundVars,
  V4_DISABLED_CLASS,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import type { BookmarkButtonProps } from './BookmarkButton';
import { TONE_INK } from './internal/reading-v4';

export interface BookmarkButtonV4Props extends BookmarkButtonProps {
  /** The `labeled` variant's word when the article is not saved. Default `'Save'`. */
  saveLabel?: string;
  /** The `labeled` variant's word when it is. Default `'Saved'`. */
  savedLabel?: string;
  /** The control's accessible name when it will add a bookmark. Default `'Bookmark article'`. */
  addLabel?: string;
  /** The control's accessible name when it will remove one. Default `'Remove bookmark'`. */
  removeLabel?: string;
}

/**
 * **V4 bookmark button** — the web twin of the native `BookmarkButtonV4`, same
 * props as {@link BookmarkButton} plus `saveLabel`, `savedLabel`, `addLabel`
 * and `removeLabel`.
 *
 * ## Four changes
 *
 * 1. **One tone, on both twins.** Web painted the saved star `primary` and the
 *    word beside it `accent` — two brand colours inside one control — while
 *    native painted the star `accent`. Both twins now say `primary` for the
 *    glyph *and* the word, and both draw it with `primaryText`: `primary` is a
 *    fill slot with no contrast promise as ink.
 * 2. **It clears 44.** The button was roughly 26px on web with no recourse,
 *    and 26px on native rescued only by `hitSlop` — which does nothing for a
 *    pointer or a switch control.
 * 3. **Press is the state layer and disabled is 0.38.** The base invented
 *    `0.5` for disabled and `0.8` for hover; `0.5` sits inside M3's disabled
 *    band, so a hovered bookmark and a dead one looked alike.
 * 4. **The on-screen English is a prop.** `'Save'` and `'Saved'` were rendered
 *    text with no way to translate them.
 */
export const BookmarkButtonV4 = React.forwardRef<HTMLButtonElement, BookmarkButtonV4Props>(
  function BookmarkButtonV4(
    {
      bookmarked,
      onToggle,
      variant = 'icon',
      disabled = false,
      saveLabel = 'Save',
      savedLabel = 'Saved',
      addLabel = 'Bookmark article',
      removeLabel = 'Remove bookmark',
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const labeled = variant === 'labeled';
    const word = bookmarked ? savedLabel : saveLabel;

    return (
      <button
        ref={ref}
        type="button"
        aria-label={bookmarked ? removeLabel : addLabel}
        aria-pressed={bookmarked}
        disabled={disabled}
        onClick={() => onToggle(!bookmarked)}
        data-xen-v4-state=""
        style={stateGroundVars('var(--xen-surface)', 'var(--xen-on-surface)') as React.CSSProperties}
        className={cn(
          'inline-flex items-center justify-center gap-xs rounded-[var(--xen-radius-full)]',
          // The HIG floor, composed from the spacing scale — not a typed 44.
          MIN_TAP_CLASS,
          labeled
            ? 'border border-border px-md'
            : 'w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]',
          V4_DISABLED_CLASS,
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          className
        )}
        {...rest}
      >
        {/*
          Drawn as text rather than through `Icon`, whose `primary` slot resolves
          to the FILL. A star is the only thing this control shows in the `icon`
          variant, so it is held to the ink bar like the word beside it.
        */}
        <span
          aria-hidden
          className={cn('text-lg leading-none', bookmarked ? TONE_INK.primary : TONE_INK.muted)}
        >
          {bookmarked ? '★' : '☆'}
        </span>
        {labeled ? (
          <span
            className={cn(
              'text-sm font-semibold',
              bookmarked ? TONE_INK.primary : 'text-on-surface'
            )}
          >
            {word}
          </span>
        ) : null}
      </button>
    );
  }
);
