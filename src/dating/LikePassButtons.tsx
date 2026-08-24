import * as React from 'react';
import { cn } from '../primitives/cn';

/** The swipe/deck actions a user can take on a profile. */
export type SwipeAction = 'rewind' | 'pass' | 'superlike' | 'like' | 'boost';

export type LikePassSize = 'sm' | 'md' | 'lg';

export interface LikePassButtonsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Which actions to show, left→right. Defaults to pass · superlike · like. */
  actions?: SwipeAction[];
  /** Fires with the clicked action. */
  onAction?: (action: SwipeAction) => void;
  /** Per-action disable set (e.g. rewind with nothing to undo). */
  disabledActions?: SwipeAction[];
  /** Button scale. Defaults to `md`. */
  size?: LikePassSize;
}

interface ActionSpec {
  glyph: string;
  label: string;
  /** Token color class applied to text + border. */
  color: string;
}

const SPEC: Record<SwipeAction, ActionSpec> = {
  rewind: { glyph: '↺', label: 'Rewind', color: 'text-warn border-warn' },
  pass: { glyph: '✕', label: 'Pass', color: 'text-danger border-danger' },
  superlike: { glyph: '★', label: 'Super like', color: 'text-accent border-accent' },
  like: { glyph: '♥', label: 'Like', color: 'text-success border-success' },
  boost: { glyph: '⚡', label: 'Boost', color: 'text-primary border-primary' },
};

const DIAMETER: Record<LikePassSize, string> = {
  sm: 'h-11 w-11 text-lg',
  md: 'h-14 w-14 text-xl',
  lg: 'h-16 w-16 text-2xl',
};

const DEFAULT_ACTIONS: SwipeAction[] = ['pass', 'superlike', 'like'];

/**
 * The circular action row under a swipe deck — the web parity of the native
 * like/pass controls. Each action is a round, real `<button>` carrying a glyph
 * AND an `aria-label`, so it is never identified by color alone. `onAction`
 * reports which control was clicked. Token color classes only — no literal colors.
 */
export const LikePassButtons = React.forwardRef<HTMLDivElement, LikePassButtonsProps>(
  function LikePassButtons({ actions = DEFAULT_ACTIONS, onAction, disabledActions, size = 'md', className, ...rest }, ref) {
    const disabledSet = React.useMemo(() => new Set(disabledActions ?? []), [disabledActions]);
    const list = actions.length > 0 ? actions : DEFAULT_ACTIONS;

    return (
      <div
        ref={ref}
        role="toolbar"
        className={cn('flex items-center justify-center gap-md', className)}
        {...rest}
      >
        {list.map((action) => {
          const spec = SPEC[action];
          const disabled = disabledSet.has(action);
          return (
            <button
              key={action}
              type="button"
              aria-label={spec.label}
              disabled={disabled}
              onClick={() => onAction?.(action)}
              className={cn(
                'inline-flex items-center justify-center rounded-full border-2 bg-surface font-bold transition-colors',
                'hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
                'disabled:pointer-events-none disabled:opacity-40',
                DIAMETER[size],
                spec.color
              )}
            >
              <span aria-hidden="true">{spec.glyph}</span>
            </button>
          );
        })}
      </div>
    );
  }
);
