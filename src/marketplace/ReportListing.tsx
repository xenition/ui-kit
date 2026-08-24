import * as React from 'react';
import { cn } from '../primitives/cn';
import { Input, Button } from '../primitives';
import { EmptyState } from '../commerce';

export interface ReportReason {
  /** Stable reason id passed back on submit. */
  id: string;
  /** Human-readable reason label. */
  label: string;
  /** When true, the details field becomes required for this reason. */
  requiresDetails?: boolean;
}

export interface ReportListingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSubmit'> {
  /** Selectable report reasons. */
  reasons: ReportReason[];
  /** Heading text (default "Report this listing"). */
  title?: string;
  /** Submit button label (default "Submit report"). */
  submitLabel?: string;
  /** Block submission and show a pending label (web `Button` has no spinner). */
  loading?: boolean;
  /** Fires with the chosen reason id and any details once valid. */
  onSubmit?: (reasonId: string, details?: string) => void;
  /** Fires when the cancel action is clicked. Omit to hide cancel. */
  onCancel?: () => void;
}

/**
 * A report-a-listing form — a single-select list of reasons plus a details field
 * that becomes required when the chosen reason sets `requiresDetails`. Reasons
 * render as real `<button role="radio">`s (selection carried by an accent ring,
 * a filled dot, and `aria-checked` — not color alone); submit is disabled until
 * a valid reason (and any required details) is present, and an empty `reasons`
 * list degrades to an `EmptyState`. Presentational: a valid submit calls
 * `onSubmit(reasonId, details?)`. Reuses `Input`/`Button`/`EmptyState`;
 * token-only colors.
 */
export const ReportListing = React.forwardRef<HTMLDivElement, ReportListingProps>(function ReportListing(
  { reasons, title = 'Report this listing', submitLabel = 'Submit report', loading = false, onSubmit, onCancel, className, ...rest },
  ref
) {
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [details, setDetails] = React.useState('');

  const selected = reasons.find((r) => r.id === selectedId) ?? null;
  const detailsRequired = selected?.requiresDetails === true;
  const detailsOk = !detailsRequired || details.trim().length > 0;
  const valid = selected != null && detailsOk;

  const submit = (): void => {
    if (!valid || loading || selected == null) return;
    onSubmit?.(selected.id, details.trim() ? details.trim() : undefined);
  };

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)]',
        className
      )}
      {...rest}
    >
      <p className="text-lg font-bold text-on-surface">{title}</p>

      {reasons.length === 0 ? (
        <EmptyState title="No report reasons available" />
      ) : (
        <div role="radiogroup" aria-label={title} className="flex flex-col gap-[var(--xen-space-xs)]">
          {reasons.map((reason) => {
            const isSel = reason.id === selectedId;
            return (
              <button
                key={reason.id}
                type="button"
                role="radio"
                aria-checked={isSel}
                aria-label={reason.label}
                onClick={() => setSelectedId(reason.id)}
                className={cn(
                  'flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] border px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-left',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  isSel ? 'border-primary bg-primary-50' : 'border-border bg-surface'
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[var(--xen-radius-full)] border-2',
                    isSel ? 'border-primary' : 'border-border'
                  )}
                >
                  {isSel ? <span className="h-2 w-2 rounded-[var(--xen-radius-full)] bg-primary" /> : null}
                </span>
                <span className="flex-1 text-base text-on-surface">{reason.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {selected ? (
        <label className="flex flex-col gap-[var(--xen-space-xs)]">
          <span className="text-sm font-medium text-on-surface">
            {detailsRequired ? 'Details (required)' : 'Details (optional)'}
          </span>
          <Input
            data-testid="xen-mkt-report-details"
            placeholder="Add any specifics"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            invalid={detailsRequired && !detailsOk && details.length > 0}
          />
        </label>
      ) : null}

      <div className="flex gap-[var(--xen-space-sm)]">
        {onCancel ? (
          <Button variant="ghost" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
        ) : null}
        <Button variant="danger" onClick={submit} disabled={!valid || loading} className="flex-1">
          {loading ? 'Submitting…' : submitLabel}
        </Button>
      </div>
    </div>
  );
});
