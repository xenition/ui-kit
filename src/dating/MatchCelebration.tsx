import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Button } from '../primitives';

export type MatchCelebrationVariant = 'match' | 'superlike';

export interface MatchCelebrationPerson {
  name: string;
  photoUri?: string;
}

export interface MatchCelebrationProps {
  /** Controls the overlay. When false, nothing renders. */
  visible: boolean;
  /** The current user (left avatar). */
  you?: MatchCelebrationPerson;
  /** The matched person (right avatar). */
  match: MatchCelebrationPerson;
  /** `match` (default) or a `superlike` celebration. */
  variant?: MatchCelebrationVariant;
  /** Headline override. */
  title?: string;
  /** Fires the primary "send a message" CTA. */
  onMessage?: () => void;
  /** Fires "keep swiping" / dismiss. */
  onKeepSwiping?: () => void;
  /** Fires on backdrop / Escape / close. */
  onClose?: () => void;
  /** Message CTA label. */
  messageLabel?: string;
  /** Dismiss label. */
  keepSwipingLabel?: string;
}

/**
 * The "It's a Match!" celebration overlay — the web parity of the native match
 * modal. Presents the two matched avatars with a heart between them and two clear
 * next steps (message / keep swiping). The dialog is a `role="dialog"` with
 * `aria-modal`, dismissible via the token-scrim backdrop or Escape. Token classes
 * only — no literal colors. Returns nothing when `visible` is false.
 */
export const MatchCelebration = React.forwardRef<HTMLDivElement, MatchCelebrationProps>(
  function MatchCelebration(
    { visible, you, match, variant = 'match', title, onMessage, onKeepSwiping, onClose, messageLabel = 'Send a message', keepSwipingLabel = 'Keep swiping' },
    ref
  ) {
    const heading = title ?? (variant === 'superlike' ? 'Super Like sent!' : "It's a Match!");
    const subtitle =
      variant === 'superlike' ? `You super liked ${match.name}.` : `You and ${match.name} liked each other.`;

    if (!visible) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900 p-xl"
        onClick={() => onClose?.()}
        onKeyDown={(e) => {
          if (e.key === 'Escape') onClose?.();
        }}
      >
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label={`${heading} ${subtitle}`}
          onClick={(e) => e.stopPropagation()}
          className={cn(
            'flex w-full max-w-sm flex-col items-center gap-md rounded-[var(--xen-radius-lg)] border border-border bg-surface p-xl'
          )}
        >
          <p className="text-2xl font-extrabold text-primary">{heading}</p>

          <div className="flex items-center gap-md">
            {you ? (
              <Avatar src={you.photoUri} name={you.name} size="lg" className="ring-2 ring-primary ring-offset-2" />
            ) : null}
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-danger text-lg text-on-danger" aria-hidden="true">
              ♥
            </span>
            <Avatar src={match.photoUri} name={match.name} size="lg" className="ring-2 ring-primary ring-offset-2" />
          </div>

          <p className="text-center text-sm text-muted">{subtitle}</p>

          <div className="mt-xs flex w-full flex-col gap-sm">
            <Button variant="primary" onClick={() => onMessage?.()}>
              {messageLabel}
            </Button>
            <Button variant="ghost" onClick={() => (onKeepSwiping ?? onClose)?.()}>
              {keepSwipingLabel}
            </Button>
          </div>
        </div>
      </div>
    );
  }
);
