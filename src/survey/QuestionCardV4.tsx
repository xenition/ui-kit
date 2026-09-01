import * as React from 'react';
import { cn } from '../primitives/cn';
import type { QuestionCardProps } from './QuestionCard';

/** Drop-in for {@link QuestionCardProps} — same props, the V4 "focus" design. */
export type QuestionCardV4Props = QuestionCardProps;

/**
 * QuestionCard — **V4** "focus" design (web parity of the native V4). The calm,
 * legible take on a survey question: an elevated rounded surface with generous
 * air, a soft-primary number pill (`N / total`), a big prompt, and a slim
 * primary focus bar down the left edge — the single signature accent that
 * anchors the eye. Required shows a spoken danger asterisk; `error` flips the
 * focus bar and message to danger. Same props/behavior as
 * {@link QuestionCardProps}; all colors from `--xen-*` token classes (no literal
 * colors). `variant="compact"` tightens the padding.
 */
export const QuestionCardV4 = React.forwardRef<HTMLDivElement, QuestionCardV4Props>(function QuestionCardV4(
  { title, helpText, number, total, required = false, error, variant = 'default', children, className },
  ref
) {
  const compact = variant === 'compact';
  const showBadge = number != null;

  return (
    <div
      ref={ref}
      data-xen-question-card=""
      className={cn(
        'flex overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface shadow-sm',
        className
      )}
    >
      {/* Slim focus bar — the single V4 accent (danger when in error). */}
      <div className={cn('w-1 shrink-0', error ? 'bg-danger' : 'bg-primary')} aria-hidden="true" />

      <div className={cn('flex flex-1 flex-col', compact ? 'gap-xs p-[var(--xen-space-md)]' : 'gap-sm p-[var(--xen-space-lg)]')}>
        {showBadge ? (
          <span className="self-start rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-xs font-extrabold tracking-wide text-primary">
            {total != null ? `${number} / ${total}` : `Q${number}`}
          </span>
        ) : null}

        <h3
          aria-label={required ? `${title}, required` : undefined}
          className={cn('font-extrabold leading-snug text-on-surface', compact ? 'text-lg' : 'text-xl')}
        >
          {title}
          {required ? <span className="text-danger"> *</span> : null}
        </h3>

        {helpText ? <p className="text-sm text-muted">{helpText}</p> : null}

        {children ? <div className="mt-xs">{children}</div> : null}

        {error ? <p className="text-sm font-bold text-danger">{error}</p> : null}
      </div>
    </div>
  );
});
