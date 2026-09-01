import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { CardV4 } from '../primitives/CardV4';
import { MIN_TAP_SQUARE_CLASS } from '../primitives/internal/nav-v4';
import {
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
  stateGroundVars,
} from '../primitives/internal/v4-state';
import { spokenLine } from './internal/profile-v4';
import type { ProfilePromptProps } from './ProfilePrompt';

export interface ProfilePromptV4Props extends ProfilePromptProps {
  /** Name for the like affordance. Default `'Like this answer'`. */
  likeLabel?: string;
}

/**
 * **V4 profile prompt** — the web twin of the native `ProfilePromptV4`, same
 * props as {@link ProfilePrompt} plus `likeLabel`.
 *
 * ## Four changes
 *
 * 1. **The like button is a sibling, not a child of a button.** Setting
 *    `onClick` wrapped the whole block in a `<div role="button" tabIndex={0}>`
 *    with the heart *inside* it — a control nested in a control, which is
 *    invalid, which is why the heart needed `stopPropagation` to work at all,
 *    and which leaves a screen reader announcing a button whose name already
 *    contains the answer and whose only child is another button. The two are
 *    now siblings inside a plain container: the answer is a real `<button>`,
 *    the heart is a real `<button>`, and neither has to defend itself from the
 *    other.
 * 2. **The heart is hittable.** It was a bare glyph at roughly 18px, with no
 *    focus ring, on the one affordance the component is named for.
 * 3. **Liking something is not `danger`.** The filled heart wore the error slot.
 * 4. **Press is a state layer.** `hover:opacity-90` on the outer container
 *    faded the answer itself, which is the signal M3 spends on *disabled*.
 *
 * `liked` keeps carrying its state through `aria-pressed` — one name plus a
 * pressed state, rather than a label that changes out from under the user.
 */
export const ProfilePromptV4 = React.forwardRef<HTMLDivElement, ProfilePromptV4Props>(
  function ProfilePromptV4(
    {
      prompt,
      answer,
      variant = 'card',
      glyph,
      liked = false,
      onClick,
      onLike,
      likeLabel = 'Like this answer',
      emptyLabel = 'No answer yet',
      className,
      ...rest
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    }, []);

    const hasAnswer = answer != null && answer.trim().length > 0;
    const text = hasAnswer ? (variant === 'quote' ? `“${answer}”` : answer) : emptyLabel;

    const body = (
      <span className="flex flex-1 flex-col gap-xs text-left">
        <span className="flex items-center gap-xs">
          {glyph ? (
            <span aria-hidden="true" className="text-sm">
              {glyph}
            </span>
          ) : null}
          <span className="text-sm font-semibold text-muted-text">{prompt}</span>
        </span>
        <span
          className={cn(
            'font-medium',
            variant === 'quote' ? 'text-xl italic' : 'text-lg',
            hasAnswer ? 'text-on-surface' : 'text-muted-text'
          )}
        >
          {text}
        </span>
      </span>
    );

    const inner = onClick ? (
      <button
        type="button"
        aria-label={spokenLine([prompt, text])}
        onClick={onClick}
        data-xen-v4-state=""
        style={stateGroundVars('var(--xen-card)', 'var(--xen-on-card)')}
        className={cn(
          'flex min-w-0 flex-1 rounded-[var(--xen-radius-md)] text-left',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
        )}
      >
        {body}
      </button>
    ) : (
      body
    );

    const content = (
      <div className="flex items-start justify-between gap-sm">
        {inner}
        {onLike ? (
          <button
            type="button"
            aria-label={likeLabel}
            aria-pressed={liked}
            onClick={() => onLike()}
            data-xen-v4-state=""
            style={stateGroundVars('var(--xen-card)', 'var(--xen-on-card)')}
            className={cn(
              'inline-flex shrink-0 items-center justify-center rounded-full text-lg leading-none',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              MIN_TAP_SQUARE_CLASS,
              liked ? 'text-primary-text' : 'text-muted-text'
            )}
          >
            <span aria-hidden="true">{liked ? '♥' : '♡'}</span>
          </button>
        ) : null}
      </div>
    );

    if (variant === 'card') {
      return (
        <div ref={ref} {...rest}>
          <CardV4 padding="md" className={className}>
            {content}
          </CardV4>
        </div>
      );
    }

    if (variant === 'quote') {
      return (
        <div ref={ref} {...rest}>
          <div
            className={cn(
              'rounded-[var(--xen-radius-md)] border-l-[length:var(--xen-space-xs)] border-primary px-md py-sm',
              'bg-[color-mix(in_srgb,var(--xen-primary)_10%,var(--xen-surface))]',
              className
            )}
          >
            {content}
          </div>
        </div>
      );
    }

    return (
      <div ref={ref} {...rest}>
        <div className={className}>{content}</div>
      </div>
    );
  }
);
