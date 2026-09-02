import * as React from 'react';
import { cn } from '../primitives/cn';
import type { FlashCardProps } from './FlashCard';

/** Drop-in for {@link FlashCardProps} — same props, the V4 "campus" design. */
export type FlashCardV4Props = FlashCardProps;

/**
 * FlashCard — **V4** "campus" design (web parity of the native V4). A
 * click-to-flip study card on an elevated rounded surface with a soft shadow:
 * shows the `front` (prompt) and flips to the `back` (answer). The flipped face
 * reads on a soft-primary ground with a "Definition" label; the face label and a
 * "Tap to flip" hint keep the state legible without color. Works controlled (via
 * `flipped` + `onFlip`) or uncontrolled. Rendered as a keyboard-operable
 * `role="button"`. Identical props/behavior to {@link FlashCardProps}. All colors
 * from `--xen-*` token classes (no literals).
 */
export const FlashCardV4 = React.forwardRef<HTMLDivElement, FlashCardV4Props>(function FlashCardV4(
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
      data-xen-flash-card=""
      tabIndex={0}
      aria-pressed={isFlipped}
      aria-label={`Flashcard, ${label}: ${content}. Activate to flip.`}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      className={cn(
        'flex min-h-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-[var(--xen-radius-lg)] border border-border p-[var(--xen-space-xl)] text-center shadow-sm transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        isFlipped ? 'bg-primary/10' : 'bg-surface',
        className
      )}
      {...rest}
    >
      <span className={cn('rounded-full px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-xs font-bold uppercase tracking-wide', isFlipped ? 'bg-primary/10 text-primary' : 'bg-neutral-100 text-muted')}>
        {label}
      </span>
      <span className="text-xl font-bold text-on-surface">{content}</span>
      <span className="text-xs text-muted">Tap to flip</span>
    </div>
  );
});
