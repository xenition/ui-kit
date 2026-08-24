import * as React from 'react';
import { cn } from '../primitives/cn';
import type { QuestionCardProps } from './QuestionCard';

/** Same public contract as {@link QuestionCard} — a drop-in alternate design. */
export type QuestionCardV3Props = QuestionCardProps;

/**
 * QuestionCard, redesigned (v3): a **minimal question block**. An inline `n.`
 * prefix runs into the prompt (danger asterisk when required), quiet help text,
 * the input children, and any error — borderless, no card chrome, for a dense
 * single-page form. The opposite of v2's panel. Same props, token-only.
 */
export const QuestionCardV3 = React.forwardRef<HTMLDivElement, QuestionCardV3Props>(function QuestionCardV3(
  { title, helpText, number, total, required = false, error, variant, children, className },
  ref
) {
  void variant;
  void total;
  return (
    <div ref={ref} data-xen-question-card="" className={cn('flex flex-col gap-2 border-l-2 border-border pl-3', className)}>
      <div>
        <h3 className="text-sm font-semibold text-on-surface">
          {typeof number === 'number' ? <span className="text-muted">{number}. </span> : null}
          {title}
          {required ? <span className="text-danger" aria-hidden> *</span> : null}
          {required ? <span className="sr-only"> (required)</span> : null}
        </h3>
        {helpText ? <p className="text-xs text-muted">{helpText}</p> : null}
      </div>
      {children}
      {error ? <p role="alert" className="text-xs font-medium text-danger">{error}</p> : null}
    </div>
  );
});
