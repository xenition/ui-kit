import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';

export type BookmarkButtonVariant = 'icon' | 'labeled';

export interface BookmarkButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onToggle'> {
  /** Whether the article is currently bookmarked (controlled). */
  bookmarked: boolean;
  /** Called with the next bookmarked state when the user clicks. */
  onToggle: (next: boolean) => void;
  /**
   * - `icon`    — just the bookmark glyph (default).
   * - `labeled` — glyph + "Save"/"Saved" text.
   */
  variant?: BookmarkButtonVariant;
  /** Blocks clicks (e.g. while a save request is in flight). */
  disabled?: boolean;
}

/**
 * A toggle for saving / bookmarking an article — the web (React DOM) mirror of
 * the native `BookmarkButton`. Controlled: it reflects the `bookmarked` prop and
 * calls `onToggle(!bookmarked)` on click — the parent owns the state. Filled
 * accent glyph when saved, muted outline glyph when not. Exposes
 * `aria-pressed`/label to screen readers. Two variants (`icon` / `labeled`).
 * All colors from `--xen-*` token classes.
 */
export const BookmarkButton = React.forwardRef<HTMLButtonElement, BookmarkButtonProps>(
  function BookmarkButton(
    { bookmarked, onToggle, variant = 'icon', disabled = false, className, ...rest },
    ref
  ) {
    const labeled = variant === 'labeled';
    const glyph = bookmarked ? '★' : '☆';
    const label = bookmarked ? 'Saved' : 'Save';

    return (
      <button
        ref={ref}
        type="button"
        aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark article'}
        aria-pressed={bookmarked}
        disabled={disabled}
        onClick={() => onToggle(!bookmarked)}
        className={cn(
          'inline-flex items-center gap-[var(--xen-space-xs)] rounded-full py-[var(--xen-space-xs)] transition-opacity',
          labeled
            ? 'border border-border px-[var(--xen-space-sm)]'
            : 'px-[var(--xen-space-xs)]',
          'disabled:opacity-50 hover:opacity-80',
          className
        )}
        {...rest}
      >
        <Icon glyph={glyph} size="lg" color={bookmarked ? 'primary' : 'muted'} />
        {labeled ? (
          <span
            className={cn('text-sm font-semibold', bookmarked ? 'text-accent' : 'text-on-surface')}
          >
            {label}
          </span>
        ) : null}
      </button>
    );
  }
);
