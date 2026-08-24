import * as React from 'react';
import { cn } from '../primitives/cn';
import type { QuestionCardProps } from './QuestionCard';

/** Same public contract as {@link QuestionCard} — a drop-in alternate design. */
export type QuestionCardV2Props = QuestionCardProps;

/**
 * QuestionCard, redesigned (v2): a **bold question panel**. A primary number
 * badge (`n / total`) tops the card, the prompt is large with a danger asterisk
 * when required, help text follows, then the input children and any error — an
 * elevated, prominent survey step. Same props, token-only.
 */
export const QuestionCardV2 = React.forwardRef<HTMLDivElement, QuestionCardV2Props>(function QuestionCardV2(
  { title, helpText, number, total, required = false, error, variant, children, className },
  ref
) {
  const compact = variant === 'compact';
  return (
    <div ref={ref} data-xen-question-card="" className={cn('flex flex-col gap-3 rounded-lg bg-surface shadow-md', compact ? 'p-3' : 'p-md', className)}>
      {typeof number === 'number' ? (
        <span className="inline-flex w-fit items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
          {typeof total === 'number' ? `${number} / ${total}` : `Q${number}`}
        </span>
      ) : null}
      <div>
        <h3 className="text-lg font-bold text-on-surface">
          {title}
          {required ? <span className="text-danger" aria-hidden> *</span> : null}
          {required ? <span className="sr-only"> (required)</span> : null}
        </h3>
        {helpText ? <p className="mt-0.5 text-sm text-muted">{helpText}</p> : null}
      </div>
      {children}
      {error ? <p role="alert" className="text-sm font-medium text-danger">{error}</p> : null}
    </div>
  );
});
