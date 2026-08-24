import * as React from 'react';
import { cn } from '../primitives/cn';

export type PullQuoteVariant = 'bordered' | 'block' | 'large';

export interface PullQuoteProps extends React.HTMLAttributes<HTMLElement> {
  /** The quoted text (without surrounding quotation marks — added visually). */
  quote: string;
  /** Optional attribution, e.g. `'Ada Lovelace'`. */
  attribution?: string;
  /**
   * - `bordered` — accent left rule + italic quote (default).
   * - `block`    — filled surface card.
   * - `large`    — oversized display quote, centered.
   */
  variant?: PullQuoteVariant;
}

const CONTAINER: Record<PullQuoteVariant, string> = {
  bordered: 'border-l-[3px] border-accent pl-[var(--xen-space-md)] py-[var(--xen-space-xs)]',
  block: 'border border-border bg-surface rounded-[var(--xen-radius-lg)] p-[var(--xen-space-lg)]',
  large: 'py-[var(--xen-space-lg)] text-center',
};

/**
 * A pull quote / block quote for long-form articles — the visually emphasized
 * excerpt lifted out of the body. Web (React DOM) mirror of the native
 * `PullQuote`. Three token-bound variants: a `bordered` left-rule quote, a
 * filled `block` card, and an oversized centered `large` display quote.
 * Rendered as a semantic `<figure><blockquote>`; all colors from `--xen-*`.
 */
export const PullQuote = React.forwardRef<HTMLElement, PullQuoteProps>(
  function PullQuote({ quote, attribution, variant = 'bordered', className, ...rest }, ref) {
    const large = variant === 'large';
    return (
      <figure
        ref={ref}
        aria-label={`Quote: ${quote}${attribution ? `, ${attribution}` : ''}`}
        className={cn(CONTAINER[variant], className)}
        {...rest}
      >
        <blockquote
          className={cn(
            'text-on-surface',
            large ? 'text-2xl font-bold leading-snug' : 'text-xl font-medium italic leading-snug'
          )}
        >
          {`“${quote}”`}
        </blockquote>
        {attribution ? (
          <figcaption
            className={cn(
              'mt-[var(--xen-space-sm)] text-sm font-semibold text-muted',
              large && 'text-center'
            )}
          >
            {`— ${attribution}`}
          </figcaption>
        ) : null}
      </figure>
    );
  }
);
