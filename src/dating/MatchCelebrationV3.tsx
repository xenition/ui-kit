import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Button } from '../primitives';
import type { MatchCelebrationProps } from './MatchCelebration';

/** Drop-in alternate design — identical props to `MatchCelebration`. */
export type MatchCelebrationV3Props = MatchCelebrationProps;

/**
 * MatchCelebration — design variant **V3**, a **compact toast** (web parity of the
 * native V3). Rather than taking over the screen, it drops a small horizontal card
 * in from the top over a light dismissable scrim: two tiny overlapping avatars, a
 * two-line headline/subtitle, and an inline message button. Ideal when a full
 * celebration would be too heavy. Same `MatchCelebrationProps`; token classes
 * only; dismissible via backdrop or Escape; returns nothing when not visible.
 */
export const MatchCelebrationV3 = React.forwardRef<HTMLDivElement, MatchCelebrationV3Props>(
  function MatchCelebrationV3(
    { visible, you, match, variant = 'match', title, onMessage, onKeepSwiping, onClose, messageLabel = 'Send a message', keepSwipingLabel = 'Keep swiping' },
    ref
  ) {
    const heading = title ?? (variant === 'superlike' ? 'Super Like sent!' : "It's a Match!");
    const subtitle =
      variant === 'superlike' ? `You super liked ${match.name}.` : `You and ${match.name} liked each other.`;

    if (!visible) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex justify-center bg-neutral-950/30 p-md"
        onClick={() => (onKeepSwiping ?? onClose)?.()}
        aria-label={keepSwipingLabel}
        onKeyDown={(e) => {
          if (e.key === 'Escape') onClose?.();
        }}
      >
        <div
          ref={ref}
          role="alertdialog"
          aria-modal="true"
          aria-label={`${heading} ${subtitle}`}
          onClick={(e) => e.stopPropagation()}
          className={cn(
            'flex w-full max-w-lg items-center gap-md self-start rounded-[var(--xen-radius-lg)] border border-border bg-surface p-md shadow-lg',
            'transition-transform duration-200 motion-reduce:transition-none'
          )}
        >
          {/* Overlapping mini avatars. */}
          <div className="flex items-center">
            {you ? <Avatar src={you.photoUri} name={you.name} size="sm" ring /> : null}
            <Avatar src={match.photoUri} name={match.name} size="sm" ring className={you ? '-ml-2.5' : undefined} />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="truncate text-base font-extrabold text-primary">{heading}</span>
            <span className="truncate text-sm text-muted">{subtitle}</span>
          </div>

          <Button variant="primary" size="sm" onClick={() => onMessage?.()} aria-label={messageLabel}>
            {messageLabel}
          </Button>
        </div>
      </div>
    );
  }
);
