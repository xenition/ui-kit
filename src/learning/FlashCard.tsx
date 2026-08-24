import * as React from 'react';
import { cn } from '../primitives/cn';

export interface FlashCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Prompt side content. */
  front: string;
  /** Answer side content, revealed on flip. */
  back: string;
  /** Small label above the front, e.g. "Term". */
  frontLabel?: string;
  /** Small label above the back, e.g. "Definition". */
  backLabel?: string;
  /** Controlled flipped state; omit for internal (uncontrolled) flipping. */
  flipped?: boolean;
  /** Default flipped state when uncontrolled. */
  defaultFlipped?: boolean;
  /** Fires with the next flipped value on click. */
  onFlip?: (flipped: boolean) => void;
}

/**
 * A click-to-flip study card. Shows the `front` (prompt) and flips to the `back`
 * (answer) on activation. Works controlled (via `flipped` + `onFlip`) or
 * uncontrolled (via `defaultFlipped`). Rendered as a `role="button"` element
 * (Enter/Space activation) whose label reflects the visible face. Token-only
 * colors (`--xen-*`).
 */
export const FlashCard = React.forwardRef<HTMLDivElement, FlashCardProps>(function FlashCard(
  { front, back, frontLabel = 'Term', backLabel = 'Definition', flipped, defaultFlipped = false, onFlip, className, ...rest },
  ref
) {
  const [internal, setInternal] = React.useState(defaultFlipped);
  const isControlled = flipped != null;
  const isFlipped = isControlled ? flipped : internal;

  const toggle = (): void => {
    const next = !isFlipped;
    if (!isControlled) setInternal(next);
    onFlip?.(next);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  const label = isFlipped ? backLabel : frontLabel;
  const content = isFlipped ? back : front;

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      aria-pressed={isFlipped}
      aria-label={`Flashcard, ${label}: ${content}. Activate to flip.`}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      className={cn(
        'flex min-h-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-[var(--xen-radius-lg)] border border-border p-[var(--xen-space-xl)] text-center',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        isFlipped ? 'bg-primary' : 'bg-surface',
        className
      )}
      {...rest}
    >
      <span
        className={cn(
          'text-xs font-bold uppercase tracking-wide',
          isFlipped ? 'text-on-primary' : 'text-muted'
        )}
      >
        {label}
      </span>
      <span className={cn('text-xl font-bold', isFlipped ? 'text-on-primary' : 'text-on-surface')}>
        {content}
      </span>
      <span className={cn('text-xs', isFlipped ? 'text-on-primary' : 'text-muted')}>Tap to flip</span>
    </div>
  );
});
