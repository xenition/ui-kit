import * as React from 'react';
import { cn } from '../primitives/cn';
import type { PullQuoteProps, PullQuoteVariant } from './PullQuote';
import { TONE_INK } from './internal/reading-v4';

export interface PullQuoteV4Props extends PullQuoteProps {
  /**
   * Replace the whole figure's spoken form with one line.
   *
   * Omitted by default, and that default is the fix: the figure carries no
   * label, so the `<blockquote>` and its `<figcaption>` are read once, in
   * order, with real quotation semantics. Supply this only when the quote
   * needs different words spoken than shown — the subtree is then hidden, so
   * it is still read exactly once.
   */
  formatQuote?: (quote: string, attribution?: string) => string;
}

const CONTAINER: Record<PullQuoteVariant, string> = {
  bordered: 'border-l-[3px] border-accent pl-md py-xs',
  block: 'rounded-[var(--xen-radius-lg)] border border-border bg-surface p-lg',
  large: 'py-lg text-center',
};

/**
 * **V4 pull quote** — the web twin of the native `PullQuoteV4`, same props as
 * {@link PullQuote} plus `formatQuote`.
 *
 * ## Two changes
 *
 * 1. **The quote is read once.** The base put an `aria-label` duplicating the
 *    quote onto a `<figure>` that then rendered the same words in a
 *    `<blockquote>`. Because a native label *replaces* its subtree and a web
 *    one is announced *beside* it, the same props read the quote a different
 *    number of times per platform — twice on web, once on native. The label is
 *    gone; `formatQuote` is the deliberate way back to a single spoken line,
 *    and it hides the subtree when used.
 * 2. **The attribution takes `mutedText`**, the contrast-corrected ink slot,
 *    where the base inked it with the `muted` fill.
 */
export const PullQuoteV4 = React.forwardRef<HTMLElement, PullQuoteV4Props>(
  function PullQuoteV4(
    { quote, attribution, variant = 'bordered', formatQuote, className, ...rest },
    ref
  ) {
    if (!quote) return null;

    const large = variant === 'large';
    const spoken = formatQuote?.(quote, attribution);

    return (
      <figure
        ref={ref}
        aria-label={spoken}
        className={cn(CONTAINER[variant], className)}
        {...rest}
      >
        {/*
          Hidden only when the caller has supplied their own spoken line. Left
          readable otherwise, so the reader hears a quotation rather than a
          label that happens to contain one.
        */}
        <blockquote
          aria-hidden={spoken != null || undefined}
          className={cn(
            'text-on-surface',
            large ? 'text-2xl font-bold leading-snug' : 'text-xl font-medium italic leading-snug'
          )}
        >
          {`“${quote}”`}
        </blockquote>
        {attribution ? (
          <figcaption
            aria-hidden={spoken != null || undefined}
            className={cn('mt-sm text-sm font-semibold', TONE_INK.muted, large && 'text-center')}
          >
            {`— ${attribution}`}
          </figcaption>
        ) : null}
      </figure>
    );
  }
);
