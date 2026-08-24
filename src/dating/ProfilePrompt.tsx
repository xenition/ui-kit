import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives';

export type ProfilePromptVariant = 'card' | 'quote' | 'plain';

export interface ProfilePromptProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** The prompt question (e.g. "A perfect Sunday is…"). */
  prompt: string;
  /** The person's answer. When absent, the placeholder/empty copy shows. */
  answer?: string;
  /** Presentation. Defaults to `card`. */
  variant?: ProfilePromptVariant;
  /** Optional glyph beside the prompt. */
  glyph?: string;
  /** Show a like affordance on the answer (dating "like this prompt"). */
  liked?: boolean;
  /** Fires when the whole prompt is clicked (e.g. to like/comment). */
  onClick?: () => void;
  /** Fires the heart affordance. Rendering it requires this handler. */
  onLike?: () => void;
  /** Copy when there is no answer yet. */
  emptyLabel?: string;
}

/**
 * A profile prompt + answer block — the web parity of a dating "prompt" card
 * ("My simple pleasures → …"). The prompt is styled quietly, the answer is the
 * emphasis. The optional like affordance is a real `<button>` whose pressed state
 * is surfaced via `aria-pressed`, not color. When `onClick` is set the whole block
 * becomes a keyboard-operable `role="button"` container so the nested like button
 * stays independently focusable. Token classes only — graceful empty state when
 * the answer is missing.
 */
export const ProfilePrompt = React.forwardRef<HTMLDivElement, ProfilePromptProps>(
  function ProfilePrompt(
    { prompt, answer, variant = 'card', glyph, liked = false, onClick, onLike, emptyLabel = 'No answer yet', className, ...rest },
    ref
  ) {
    const hasAnswer = answer != null && answer.trim().length > 0;

    const body = (
      <div className="flex flex-col gap-xs">
        <div className="flex items-center gap-xs">
          {glyph ? <span aria-hidden="true" className="text-sm">{glyph}</span> : null}
          <span className="text-sm font-semibold text-muted">{prompt}</span>
        </div>
        <div className="flex items-start justify-between gap-sm">
          <span
            className={cn(
              'flex-1 font-medium',
              variant === 'quote' ? 'text-xl italic' : 'text-lg',
              hasAnswer ? 'text-on-surface' : 'text-muted'
            )}
          >
            {hasAnswer ? (variant === 'quote' ? `“${answer}”` : answer) : emptyLabel}
          </span>
          {onLike ? (
            <button
              type="button"
              aria-label={liked ? 'Unlike prompt' : 'Like prompt'}
              aria-pressed={liked}
              onClick={(e) => {
                e.stopPropagation();
                onLike();
              }}
              className={cn('text-lg leading-none', liked ? 'text-danger' : 'text-muted')}
            >
              {liked ? '♥' : '♡'}
            </button>
          ) : null}
        </div>
      </div>
    );

    const shellClass =
      variant === 'quote'
        ? cn('rounded-[var(--xen-radius-md)] border-l-[3px] border-primary bg-primary-50 px-md py-sm', className)
        : className;

    const content =
      variant === 'card' ? (
        <Card className={cn('p-md', className)}>{body}</Card>
      ) : (
        <div className={shellClass}>{body}</div>
      );

    if (onClick) {
      return (
        <div
          ref={ref}
          role="button"
          tabIndex={0}
          aria-label={`${prompt}. ${hasAnswer ? answer : emptyLabel}`}
          onClick={onClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onClick();
            }
          }}
          className="cursor-pointer rounded-[var(--xen-radius-lg)] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
          {...rest}
        >
          {content}
        </div>
      );
    }

    return (
      <div ref={ref} {...rest}>
        {content}
      </div>
    );
  }
);
