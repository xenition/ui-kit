import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives';
import { EmptyState } from '../commerce';
import type { SurveyAnswer } from './types';

export interface ResponseSummaryProps {
  /** The answered questions to review. Empty renders the empty state. */
  answers: SurveyAnswer[];
  /** Optional heading. Default `'Review your answers'`. */
  title?: string;
  /** Fires when a row's Edit affordance is clicked (enables per-answer edit). */
  onEdit?: (id: string) => void;
  /** Label for the edit affordance. Default `'Edit'`. */
  editLabel?: string;
  /** Copy for the empty state. Default `'No answers to review yet.'`. */
  emptyText?: string;
  className?: string;
}

/**
 * A read-back of the respondent's answers before submit — a titled list of
 * question/answer rows inside a token `Card`. Skipped answers render in the
 * muted tone and are announced as skipped (not color-only). When `onEdit` is
 * supplied each row exposes an `Edit` button. An empty `answers` array renders a
 * muted {@link EmptyState}. No literal colors.
 */
export const ResponseSummary = React.forwardRef<HTMLDivElement, ResponseSummaryProps>(
  function ResponseSummary(
    { answers, title = 'Review your answers', onEdit, editLabel = 'Edit', emptyText = 'No answers to review yet.', className },
    ref
  ) {
    if (answers.length === 0) {
      return <EmptyState ref={ref} title={emptyText} className={className} />;
    }

    return (
      <Card ref={ref} className={className}>
        <div className="flex flex-col gap-md">
          <h3 className="text-lg font-bold text-on-surface">{title}</h3>

          <div className="flex flex-col gap-sm">
            {answers.map((a, i) => (
              <div
                key={a.id}
                aria-label={a.skipped ? `${a.question}: skipped` : `${a.question}: ${a.answer}`}
                className={cn(
                  'flex items-start gap-sm',
                  i === 0 ? '' : 'border-t border-border pt-sm'
                )}
              >
                <div className="flex flex-1 flex-col gap-0.5">
                  <span className="text-xs font-semibold text-muted">{a.question}</span>
                  <span
                    className={cn(
                      'text-base',
                      a.skipped ? 'font-normal italic text-muted' : 'font-semibold text-on-surface'
                    )}
                  >
                    {a.skipped ? 'Skipped' : a.answer}
                  </span>
                </div>

                {onEdit ? (
                  <button
                    type="button"
                    aria-label={`${editLabel} ${a.question}`}
                    onClick={() => onEdit(a.id)}
                    className="text-sm font-bold text-primary hover:opacity-90"
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
