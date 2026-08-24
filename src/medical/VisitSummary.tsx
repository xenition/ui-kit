import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { EmptyState } from '../commerce';

export interface VisitSummarySection {
  /** Section heading, e.g. "Assessment". */
  heading: string;
  /** Section body text. */
  body: string;
}

export interface VisitSummaryProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Visit title, e.g. "Follow-up visit". */
  title: string;
  /** Provider name. */
  provider?: string;
  /** Visit date line. */
  date?: string;
  /** Primary diagnosis / reason, highlighted at the top. */
  diagnosis?: string;
  /** Structured note sections (assessment, plan, instructions, …). */
  sections?: VisitSummarySection[];
  /** Skeleton placeholder while the summary loads. */
  loading?: boolean;
  /** Message shown when there is no content. */
  emptyLabel?: string;
}

/**
 * A visit / encounter summary card — the web mirror of the native
 * `VisitSummary`. Shows the title, provider + date, a highlighted diagnosis
 * chip, and any number of structured note sections (assessment, plan,
 * instructions). Renders loading and empty (`EmptyState`) states. Composes
 * `Card`; token-only colors. Informational UI only — not a medical device.
 */
export const VisitSummary = React.forwardRef<HTMLDivElement, VisitSummaryProps>(
  function VisitSummary(
    { title, provider, date, diagnosis, sections, loading = false, emptyLabel = 'No visit notes available', className, ...rest },
    ref
  ) {
    const list = sections ?? [];
    const meta = [provider, date].filter(Boolean) as string[];

    if (loading) {
      return (
        <Card
          ref={ref}
          data-xen-visit-summary=""
          aria-label="Loading visit summary"
          aria-busy="true"
          className={cn('flex flex-col gap-[var(--xen-space-md)]', className)}
          {...rest}
        >
          <div className="h-4 w-[55%] rounded-[var(--xen-radius-sm)] bg-neutral-100" />
          <div className="h-3 w-[80%] rounded-[var(--xen-radius-sm)] bg-neutral-100" />
          <div className="h-3 w-[70%] rounded-[var(--xen-radius-sm)] bg-neutral-100" />
        </Card>
      );
    }

    return (
      <Card
        ref={ref}
        data-xen-visit-summary=""
        aria-label={`Visit summary: ${title}`}
        className={cn('flex flex-col gap-[var(--xen-space-md)]', className)}
        {...rest}
      >
        <div className="flex flex-col gap-0.5">
          <span className="text-lg font-bold text-on-surface">{title}</span>
          {meta.length ? <span className="text-sm text-muted">{meta.join('  ·  ')}</span> : null}
        </div>

        {diagnosis ? (
          <span className="self-start rounded-full bg-primary-50 px-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-sm font-bold text-primary">
            🩺 {diagnosis}
          </span>
        ) : null}

        {list.length === 0 && !diagnosis ? (
          <EmptyState data-xen-visit-empty="" title={emptyLabel} />
        ) : (
          list.map((s, i) => (
            <div key={`${s.heading}-${i}`} className="flex flex-col gap-0.5">
              <span className="text-xs font-bold uppercase text-on-surface">{s.heading}</span>
              <span className="text-sm text-on-surface">{s.body}</span>
            </div>
          ))
        )}
      </Card>
    );
  }
);
