import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { Button } from '../primitives';

export interface PostComposerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Composing author's avatar URL; falls back to initials from `authorName`. */
  authorAvatarUrl?: string;
  /** Composing author's name (initials fallback + avatar a11y label). */
  authorName?: string;
  /** Current draft text (controlled). */
  value: string;
  /** Fires with the next draft text on every keystroke. */
  onChangeText: (text: string) => void;
  /** Alias for {@link onChangeText}; fires with the raw change event. */
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Field placeholder (default `What's on your mind?`). */
  placeholder?: string;
  /** Fires when the primary Post CTA is pressed. */
  onPost?: () => void;
  /** When `true`, the Post CTA shows a busy state and is disabled. */
  posting?: boolean;
  /** Hard character cap; drives the counter + danger state + disabled Post. */
  maxLength?: number;
  /** Fires when the add-photo action glyph is pressed. */
  onAddPhoto?: () => void;
  /** Fires when the add-poll action glyph is pressed. */
  onAddPoll?: () => void;
  /** Fires when the add-emoji action glyph is pressed. */
  onAddEmoji?: () => void;
}

/**
 * PostComposer — the compose-a-post card for the social V4 "feed" line. A clean
 * surface card pairs the author avatar with a growing text field, a row of
 * soft-primary action glyph buttons (photo / poll / emoji), a live character
 * counter that flips to danger when over `maxLength`, and a primary Post CTA that
 * disables while empty, over the limit, or `posting`. Presentational only —
 * controlled `value` + callbacks. Token-only colors via `--xen-*` classes; the
 * ≥44px controls stay keyboard-operable and dark-mode safe.
 */
export const PostComposer = React.forwardRef<HTMLDivElement, PostComposerProps>(function PostComposer(
  {
    authorAvatarUrl,
    authorName,
    value,
    onChangeText,
    onChange,
    placeholder = "What's on your mind?",
    onPost,
    posting = false,
    maxLength,
    onAddPhoto,
    onAddPoll,
    onAddEmoji,
    className,
    ...rest
  },
  ref
) {
  const length = value.length;
  const overLimit = maxLength != null && length > maxLength;
  const empty = value.trim().length === 0;
  const disabled = empty || overLimit || posting;

  const Action = ({ label, glyph, onPress }: { label: string; glyph: string; onPress?: () => void }) =>
    onPress ? (
      <button
        type="button"
        aria-label={label}
        onClick={onPress}
        className="flex h-11 w-11 items-center justify-center rounded-[var(--xen-radius-md)] bg-primary-50 text-lg text-primary transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
      >
        {glyph}
      </button>
    ) : null;

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)] shadow-sm',
        className
      )}
      {...rest}
    >
      <div className="flex items-start gap-[var(--xen-space-sm)]">
        <Avatar src={authorAvatarUrl} name={authorName} size="md" className="mt-[2px] shrink-0" />
        <textarea
          value={value}
          onChange={(e) => {
            onChange?.(e);
            onChangeText(e.target.value);
          }}
          placeholder={placeholder}
          aria-label={placeholder}
          rows={3}
          className="min-h-[72px] flex-1 resize-none border-0 bg-transparent text-base leading-relaxed text-on-surface placeholder:text-muted focus:outline-none"
        />
      </div>

      <div className="flex items-center justify-between gap-[var(--xen-space-sm)]">
        <div className="flex items-center gap-[var(--xen-space-sm)]">
          <Action label="Add photo" glyph="🖼️" onPress={onAddPhoto} />
          <Action label="Add poll" glyph="📊" onPress={onAddPoll} />
          <Action label="Add emoji" glyph="😊" onPress={onAddEmoji} />
        </div>

        <div className="flex items-center gap-[var(--xen-space-sm)]">
          {maxLength != null ? (
            <span
              aria-live="polite"
              className={cn('text-xs font-semibold tabular-nums', overLimit ? 'text-danger' : 'text-muted')}
            >
              {length}/{maxLength}
            </span>
          ) : null}
          <Button
            variant="primary"
            size="md"
            onClick={onPost}
            disabled={disabled}
            aria-label="Post"
            aria-busy={posting}
            className="min-h-[44px]"
          >
            {posting ? 'Posting…' : 'Post'}
          </Button>
        </div>
      </div>
    </div>
  );
});
