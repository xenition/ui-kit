import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives';
import { EmptyState } from '../commerce';
import type { ResponseSummaryProps } from './ResponseSummary';

/** Drop-in for {@link ResponseSummaryProps} — same props, the V4 "focus" design. */
export type ResponseSummaryV4Props = ResponseSummaryProps;

/**
 * ResponseSummary — **V4** "focus" design. The calm, legible read-back of the
 * respondent's answers before submit: a titled list of airy rows where the
 * question sits small and muted above its bold on-surface answer. Skipped
 * answers render muted and italic with a spoken, explicit "Skipped" marker (not
 * color-only), and each row can expose a primary `Edit` affordance when `onEdit`
 * is supplied. An empty `answers` array renders a muted {@link EmptyState}. One
 * accent (primary), no gradients. Same props/behavior as
 * {@link ResponseSummaryProps}; all colors from `--xen-*` token classes (no
 * literal colors).
 */
export const ResponseSummaryV4 = React.forwardRef<HTMLDivElement, ResponseSummaryV4Props>(
  function ResponseSummaryV4(
    { answers, title = 'Review your answers', onEdit, editLabel = 'Edit', emptyText = 'No answers to review yet.', className },
    ref
  ) {
    if (answers.length === 0) {
      return <EmptyState ref={ref} title={emptyText} className={className} />;
    }

    return (
      <Card ref={ref} className={className}>
        <div className="flex flex-col gap-md">
          <h3 className="text-lg font-extrabold text-on-surface">{title}</h3>

          <div className="flex flex-col gap-sm">
            {answers.map((a, i) => (
              <div
                key={a.id}
                aria-label={a.skipped ? `${a.question}: skipped` : `${a.question}: ${a.answer}`}
                className={cn(
                  'flex min-h-[44px] items-start gap-sm py-xs',
                  i === 0 ? '' : 'border-t border-border pt-sm'
                )}
              >
                <div className="flex flex-1 flex-col gap-0.5">
                  <span className="text-xs font-semibold text-muted">{a.question}</span>
                  {a.skipped ? (
                    <span className="flex items-center gap-xs text-base font-medium italic text-muted">
                      <span
                        aria-hidden="true"
                        className="rounded-full bg-primary/10 px-xs text-xs font-bold not-italic text-muted"
                      >
                        Skipped
                      </span>
                    </span>
                  ) : (
                    <span className="text-base font-bold text-on-surface">{a.answer}</span>
                  )}
                </div>

                {onEdit ? (
                  <button
                    type="button"
                    aria-label={`${editLabel} ${a.question}`}
                    onClick={() => onEdit(a.id)}
                    className="flex min-h-[44px] items-center px-xs text-sm font-extrabold text-primary hover:opacity-90"
                  >
                    {editLabel}
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }
);
