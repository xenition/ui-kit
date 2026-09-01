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
import { ROW_SELECTED_CLASS, TONE_INK } from './internal/mail-v4';
import type { ReadUnreadToggleProps } from './ReadUnreadToggle';

export interface ReadUnreadToggleV4Props extends ReadUnreadToggleProps {
  /** The action offered while the message is unread. Default `'Mark as read'`. */
  readLabel?: string;
  /** The action offered while it is read. Default `'Mark as unread'`. */
  unreadLabel?: string;
}

/** 44 on both axes for the icon-only form, composed from the spacing scale. */
const TAP_SQUARE = 'min-w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]';

/**
 * **V4 read / unread toggle** — same props as {@link ReadUnreadToggle} plus
 * `readLabel` and `unreadLabel`.
 *
 * ## Five changes
 *
 * 1. **It announces what state the message is in.** The base named the
 *    *action* and stopped, so a reader tabbing a toolbar heard "Mark as read"
 *    with no way to learn whether the message was already read — and the twin
 *    announced a third thing again. Both twins now name the action and carry
 *    the state as the toggle state.
 * 2. **The zero-size `View` is gone.** It carried a comment claiming an
 *    accessibility guarantee, and the element was empty and explicitly hidden
 *    from assistive tech; it guaranteed nothing. (Native's; the web twin never
 *    had it, and this is the parity note.)
 * 3. **It clears 44.** The base was roughly 24px tall in its icon-only form —
 *    the form a compact toolbar actually uses.
 * 4. **The pill stops being a light-mode ramp step.** `bg-primary-50` is a
 *    ramp step oriented for a light page; on a dark one it painted a near-white
 *    slab. The labelled form wears `selected`/`on-selected`, the pair the
 *    theme ships for exactly this container.
 * 5. **Press is a state layer and disabled is 0.38** — `hover:opacity-70`
 *    dims the control's own content, which is how M3 draws *disabled*.
 */
export const ReadUnreadToggleV4 = React.forwardRef<HTMLButtonElement, ReadUnreadToggleV4Props>(
  function ReadUnreadToggleV4(
    {
      read = false,
      onToggle,
      iconOnly = false,
      disabled = false,
      readLabel = 'Mark as read',
      unreadLabel = 'Mark as unread',
      className,
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    // Clicking flips the state; the name is the action that flip performs.
    const nextRead = !read;
    const actionLabel = read ? unreadLabel : readLabel;

    return (
      <button
        ref={ref}
        type="button"
        aria-label={actionLabel}
        aria-pressed={read}
        disabled={disabled}
        onClick={() => onToggle?.(nextRead)}
        data-xen-v4-state=""
        style={
          stateGroundVars(
            iconOnly ? 'var(--xen-surface)' : 'var(--xen-selected)',
            'currentColor'
          ) as React.CSSProperties
        }
        className={cn(
          'inline-flex items-center justify-center gap-xs rounded-[var(--xen-radius-md)] py-xs',
          MIN_TAP_CLASS,
          iconOnly ? cn('bg-transparent px-xs', TAP_SQUARE) : cn(ROW_SELECTED_CLASS, 'px-sm'),
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          V4_DISABLED_CLASS,
          className
        )}
      >
        {/*
          Glyph AND word both change with the state, so the control survives
          greyscale — the ink is reinforcement, never the signal.
        */}
        <span
          aria-hidden="true"
          className={cn('text-base leading-none', iconOnly && (read ? TONE_INK.muted : TONE_INK.primary))}
        >
          {read ? '✉️' : '📩'}
        </span>
        {iconOnly ? null : <span className="text-sm font-semibold">{actionLabel}</span>}
      </button>
    );
  }
);
