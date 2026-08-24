import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Button } from '../primitives';
import type { MatchCelebrationProps } from './MatchCelebration';

/** Drop-in alternate design — identical props to `MatchCelebration`. */
export type MatchCelebrationV2Props = MatchCelebrationProps;

/**
 * MatchCelebration — design variant **V2**, an **immersive full-screen** moment
 * (web parity of the native V2). Instead of a small centred dialog, the whole
 * viewport becomes a deep tinted stage: two **overlapping ringed avatars** sit
 * above a filled **celebratory band** carrying the headline, with the CTAs
 * anchored below. Same `MatchCelebrationProps`; token classes only; dismissible
 * via backdrop or Escape; returns nothing when `visible` is false.
 */
export const MatchCelebrationV2 = React.forwardRef<HTMLDivElement, MatchCelebrationV2Props>(
  function MatchCelebrationV2(
    { visible, you, match, variant = 'match', title, onMessage, onKeepSwiping, onClose, messageLabel = 'Send a message', keepSwipingLabel = 'Keep swiping' },
    ref
  ) {
    const heading = title ?? (variant === 'superlike' ? 'Super Like sent!' : "It's a Match!");
    const subtitle =
      variant === 'superlike' ? `You super liked ${match.name}.` : `You and ${match.name} liked each other.`;

    if (!visible) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-lg bg-neutral-950/90 p-xl"
        onClick={() => onClose?.()}
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
          className="flex w-full max-w-md flex-col items-center gap-lg"
        >
          {/* Overlapping ringed avatars. */}
          <div className="flex items-center">
            {you ? <Avatar src={you.photoUri} name={you.name} size="xl" ring /> : null}
            <Avatar src={match.photoUri} name={match.name} size="xl" ring className={you ? '-ml-4' : undefined} />
          </div>

          {/* Celebratory band. */}
          <div className="rounded-full bg-primary px-xl py-sm">
            <p className="text-center text-2xl font-extrabold text-on-primary">{heading}</p>
          </div>

          <p className="text-center text-base text-neutral-100">{subtitle}</p>

          <div className="flex w-full flex-col gap-sm">
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
