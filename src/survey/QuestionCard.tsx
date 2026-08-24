import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives';

export type QuestionCardVariant = 'default' | 'numbered' | 'compact';

export interface QuestionCardProps {
  /** The question prompt. */
  title: string;
  /** Optional clarifying line under the prompt. */
  helpText?: string;
  /** 1-based position, shown as a badge when `variant='numbered'`. */
  number?: number;
  /** Total questions, rendered as `number / total` when both are set. */
  total?: number;
  /** Marks the question required → danger asterisk + a11y hint. */
  required?: boolean;
  /** Validation message shown under the input in the danger tone. */
  error?: string;
  /** Surface treatment. `compact` tightens padding. Default `'default'`. */
  variant?: QuestionCardVariant;
  /** The input control(s) for this question. */
  children?: React.ReactNode;
  className?: string;
}

/**
 * Framed container for one survey question — a token-bound {@link Card} with a
 * prompt, optional help line, an optional position badge (`numbered`), a
 * required marker, and a slot for the answer control. `compact` tightens the
 * padding for dense forms. The prompt is a `heading`; the required state is
 * spoken via `aria-label` (asterisk color is never the sole signal). No literal
 * colors — every value traces to a `--xen-*` token class.
 */
export const QuestionCard = React.forwardRef<HTMLDivElement, QuestionCardProps>(
  function QuestionCard(
    { title, helpText, number, total, required = false, error, variant = 'default', children, className },
    ref
  ) {
    const compact = variant === 'compact';
    const showBadge = variant === 'numbered' && number != null;

    return (
      <Card
        ref={ref}
        className={cn(compact && '!p-[var(--xen-space-sm)]', className)}
      >
        <div className={cn('flex flex-col', compact ? 'gap-xs' : 'gap-sm')}>
          {showBadge ? (
            <span className="text-xs font-bold tracking-widest text-primary">
              {total != null ? `${number} / ${total}` : `Q${number}`}
            </span>
          ) : null}

          <h3
            aria-label={required ? `${title}, required` : undefined}
            className={cn('font-bold text-on-surface', compact ? 'text-base' : 'text-lg')}
          >
            {title}
            {required ? <span className="text-danger"> *</span> : null}
          </h3>

          {helpText ? <p className="text-sm text-muted">{helpText}</p> : null}

          {children ? <div className="mt-xs">{children}</div> : null}

          {error ? (
            <p className="text-sm font-semibold text-danger">{error}</p>
          ) : null}
        </div>
      </Card>
    );
  }
);
