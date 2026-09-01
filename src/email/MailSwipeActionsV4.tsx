import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { TONE_BG, TONE_VAR } from '../primitives/internal/tone-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import { TONE_ON } from './internal/mail-v4';
import type { MailSwipeActionsProps } from './MailSwipeActions';

export interface MailSwipeActionsV4Props extends MailSwipeActionsProps {
  /**
   * Ids of actions that destroy something. Each needs a second, confirming
   * press before its `onClick` fires.
   */
  destructiveIds?: string[];
  /** How the armed state is named. Default `` (label) => `Confirm ${label}` ``. */
  confirmLabel?: (label: string) => string;
  /** The rail's accessible name. Default `'Message actions'`. */
  toolbarLabel?: string;
}

/** The rail's panel width — `2xl + 2xl` at the kit's scale, not a typed 72. */
const PANEL_WIDTH = 'min-w-[calc(var(--xen-space-2xl)_+_var(--xen-space-2xl))]';

/**
 * **V4 mail swipe rail** — same props as {@link MailSwipeActions} plus
 * `destructiveIds`, `confirmLabel` and `toolbarLabel`.
 *
 * ## Four changes
 *
 * 1. **Delete asks first.** A single tap on the rail destroyed a message with
 *    no confirmation, no undo, and no prop through which a caller could
 *    express either — on a control that is revealed by a *gesture*, so the tap
 *    that reveals it and the tap that deletes are the same motion a few pixels
 *    apart. An action listed in `destructiveIds` arms on the first press,
 *    renames itself through `confirmLabel` so the change is announced, and
 *    fires on the second.
 * 2. **Tab order follows the eye.** `side="trailing"` reversed the *paint*
 *    with `flex-row-reverse` and left the DOM alone, so on a rail whose last
 *    action is typically Delete, the first thing a keyboard reached was the
 *    rightmost panel. The trailing rail now reverses the list itself and lays
 *    out forwards: same picture, and the order a reader walks is the order a
 *    user sees.
 * 3. **The glyph and its word are the same colour.** A `neutral` panel drew an
 *    `onSurface` glyph over a `text-surface` label on a `muted` fill — three
 *    slots, none of them paired with the fill underneath. Both now take the
 *    tone's guaranteed pair.
 * 4. **The rail has a name, clears 44 and answers with a state layer**, rather
 *    than dimming itself at the band that means disabled.
 */
export const MailSwipeActionsV4 = React.forwardRef<HTMLDivElement, MailSwipeActionsV4Props>(
  function MailSwipeActionsV4(
    {
      actions,
      side = 'trailing',
      destructiveIds,
      confirmLabel = (value: string) => `Confirm ${value}`,
      toolbarLabel = 'Message actions',
      className,
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const [armedId, setArmedId] = React.useState<string | null>(null);

    const safe = actions ?? [];
    if (safe.length === 0) return null;

    // The trailing rail paints right-to-left. Reversing the LIST rather than
    // the flex direction keeps the picture and fixes the tab order.
    const ordered = side === 'leading' ? safe : [...safe].reverse();
    const destructive = new Set(destructiveIds ?? []);

    return (
      <div
        ref={ref}
        role="toolbar"
        aria-label={toolbarLabel}
        aria-orientation="horizontal"
        className={cn('flex items-stretch', className)}
      >
        {ordered.map((action) => {
          const tone = action.tone ?? 'neutral';
          const armed = armedId === action.id;
          const needsConfirm = destructive.has(action.id);
          const name = armed ? confirmLabel(action.label) : action.label;

          return (
            <button
              key={action.id}
              type="button"
              aria-label={name}
              onClick={() => {
                if (needsConfirm && !armed) {
                  setArmedId(action.id);
                  return;
                }
                setArmedId(null);
                action.onClick?.();
              }}
              // Walking away from an armed action disarms it, so a rail left
              // open does not sit one stray tap from deleting a message.
              onBlur={() => setArmedId((current) => (current === action.id ? null : current))}
              data-xen-v4-state=""
              style={stateGroundVars(TONE_VAR[tone], 'currentColor') as React.CSSProperties}
              className={cn(
                'flex flex-col items-center justify-center gap-xs px-md py-md',
                PANEL_WIDTH,
                MIN_TAP_CLASS,
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                TONE_BG[tone],
                TONE_ON[tone]
              )}
            >
              <span aria-hidden="true" className="text-lg leading-none">
                {armed ? '?' : action.glyph}
              </span>
              {/* The visible word changes with the armed state too — the
                  confirmation is not carried by the accessible name alone. */}
              <span className="truncate text-xs font-semibold">{name}</span>
            </button>
          );
        })}
      </div>
    );
  }
);
