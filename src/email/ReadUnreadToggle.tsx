import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';

export interface ReadUnreadToggleProps {
  /** Current read state; `false` means the message is unread. */
  read?: boolean;
  /** Fires with the next read value when clicked. */
  onToggle?: (read: boolean) => void;
  /** Hide the text label and render icon-only (compact toolbars). */
  iconOnly?: boolean;
  /** Block interaction and dim. */
  disabled?: boolean;
  className?: string;
}

/**
 * A control that flips a message between read and unread. A real `<button>`
 * whose glyph (open vs. filled envelope) and word label both change with state,
 * and whose accessible label announces the *action* ("Mark as read" / "Mark as
 * unread") so it never relies on color alone. Controlled via `read` /
 * `onToggle`. No literal colors.
 */
export const ReadUnreadToggle = React.forwardRef<HTMLButtonElement, ReadUnreadToggleProps>(
  function ReadUnreadToggle({ read = false, onToggle, iconOnly = false, disabled = false, className }, ref) {
    // Clicking toggles: if currently read → mark unread, and vice-versa.
    const nextRead = !read;
    const actionLabel = nextRead ? 'Mark as read' : 'Mark as unread';

    return (
      <button
        ref={ref}
        type="button"
        aria-label={actionLabel}
        disabled={disabled}
        onClick={() => onToggle?.(nextRead)}
        className={cn(
          'inline-flex items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] py-[var(--xen-space-xs)] transition-opacity',
          iconOnly ? 'bg-transparent px-[var(--xen-space-xs)]' : 'bg-primary-50 px-[var(--xen-space-sm)]',
          'hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          'disabled:pointer-events-none disabled:opacity-50',
          className
        )}
      >
        <Icon glyph={read ? '✉️' : '📩'} size="base" color={read ? 'muted' : 'primary'} />
        {iconOnly ? null : (
          <span className={cn('text-sm font-semibold', read ? 'text-muted' : 'text-primary')}>
            {actionLabel}
          </span>
        )}
      </button>
    );
  }
);
