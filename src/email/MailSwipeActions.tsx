import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, type IconColor } from '../primitives';

export type SwipeActionTone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger';

const TONE_BG: Record<SwipeActionTone, string> = {
  neutral: 'bg-muted',
  primary: 'bg-primary',
  success: 'bg-success',
  warn: 'bg-warn',
  danger: 'bg-danger',
};

const TONE_FG: Record<SwipeActionTone, string> = {
  neutral: 'text-surface',
  primary: 'text-on-primary',
  success: 'text-on-success',
  warn: 'text-on-warn',
  danger: 'text-on-danger',
};

const TONE_ICON: Record<SwipeActionTone, IconColor> = {
  neutral: 'onSurface',
  primary: 'onPrimary',
  success: 'onSuccess',
  warn: 'onWarn',
  danger: 'onDanger',
};

export interface SwipeAction {
  id: string;
  /** Glyph rendered above the label. */
  glyph: string;
  /** Short label (e.g. "Archive", "Delete"). */
  label: string;
  /** Color tone of the action panel. Default `'neutral'`. */
  tone?: SwipeActionTone;
  onClick?: () => void;
}

export interface MailSwipeActionsProps {
  /** Action panels to render (leading or trailing swipe reveal). */
  actions: SwipeAction[];
  /** Which edge these belong to — affects fill direction. Default `'trailing'`. */
  side?: 'leading' | 'trailing';
  className?: string;
}

/**
 * The revealed action panels behind a swipeable mail row (this is the static
 * action rail — the host supplies the gesture/animation). Each action is a
 * full-height, toned real `<button>` with a glyph + label; tones map to
 * semantic slots (danger for delete, warn for snooze, etc). The container is a
 * `role="toolbar"`. Renders nothing when `actions` is empty. No literal colors.
 */
export const MailSwipeActions = React.forwardRef<HTMLDivElement, MailSwipeActionsProps>(
  function MailSwipeActions({ actions, side = 'trailing', className }, ref) {
    const safe = actions ?? [];
    if (safe.length === 0) return null;

    return (
      <div
        ref={ref}
        role="toolbar"
        className={cn(
          'flex items-stretch',
          side === 'leading' ? 'flex-row' : 'flex-row-reverse',
          className
        )}
      >
        {safe.map((a) => {
          const tone = a.tone ?? 'neutral';
          return (
            <button
              key={a.id}
              type="button"
              aria-label={a.label}
              onClick={a.onClick}
              className={cn(
                'flex min-w-[72px] flex-col items-center justify-center gap-[var(--xen-space-xs)] px-[var(--xen-space-md)] py-[var(--xen-space-md)] transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                TONE_BG[tone]
              )}
            >
              <Icon glyph={a.glyph} size="lg" color={TONE_ICON[tone]} />
              <span className={cn('truncate text-xs font-semibold', TONE_FG[tone])}>{a.label}</span>
            </button>
          );
        })}
      </div>
    );
  }
);
