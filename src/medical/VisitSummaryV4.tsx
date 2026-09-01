import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';
import type { VisitSummaryProps } from './VisitSummary';

/** Drop-in for {@link VisitSummaryProps} — same props, the V4 "clinic" design. */
export type VisitSummaryV4Props = VisitSummaryProps;

/**
 * VisitSummary — **V4** "clinic" design (web parity of the native V4). The
 * calm, clinical take on a visit / encounter summary, and the ONE reserved
 * gradient moment of the medical V4 "clinic" line: the header (visit title,
 * provider, visit date) rides a brand-gradient ground
 * (`bg-gradient-to-br from-primary-500 to-primary-700`) in near-white ink
 * (`text-primary-50`/`text-primary-100`), with the diagnosis carried as a
 * frosted glass chip (`bg-primary-50/15 border border-primary-50/30`). The body
 * — the structured note sections — stays on the plain surface with clear
 * labelled rows. Renders loading and empty (`EmptyState`) states. Identical
 * props/behavior to {@link VisitSummaryProps}. Token-only colors (`--xen-*` /
 * gradient utilities), no literals. Informational UI only — not a medical
 * device.
 */
export const VisitSummaryV4 = React.forwardRef<HTMLDivElement, VisitSummaryV4Props>(
  function VisitSummaryV4(
    { title, provider, date, diagnosis, sections, loading = false, emptyLabel = 'No visit notes available', className, ...rest },
    ref
  ) {
    const list = sections ?? [];
    const meta = [provider, date].filter(Boolean) as string[];
    const shell = 'flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';

    if (loading) {
      return (
        <div
          ref={ref}
          data-xen-visit-summary=""
          aria-label="Loading visit summary"
          aria-busy="true"
          className={cn(shell, className)}
          {...rest}
        >
          <div className="flex flex-col gap-[var(--xen-space-sm)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-lg)]">
            <div className="h-4 w-[55%] rounded-[var(--xen-radius-sm)] bg-primary-50/25" />
            <div className="h-3 w-[70%] rounded-[var(--xen-radius-sm)] bg-primary-50/20" />
          </div>
          <div className="flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]">
            <div className="h-3 w-[80%] rounded-[var(--xen-radius-sm)] bg-neutral-100" />
            <div className="h-3 w-[65%] rounded-[var(--xen-radius-sm)] bg-neutral-100" />
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        data-xen-visit-summary=""
        aria-label={`Visit summary: ${title}`}
        className={cn(shell, className)}
        {...rest}
      >
        {/* Reserved gradient moment: the visit-summary hero header. */}
        <div className="flex flex-col gap-[var(--xen-space-sm)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-lg)] text-primary-50">
          <div className="flex flex-col gap-0.5">
            <span className="text-xl font-bold text-primary-50">{title}</span>
            {meta.length ? <span className="text-sm text-primary-100">{meta.join('  ·  ')}</span> : null}
          </div>

          {diagnosis ? (
            <span className="inline-flex self-start items-center gap-[var(--xen-space-xs)] rounded-full border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-sm font-bold text-primary-50">
              <span aria-hidden="true">🩺</span>
              {diagnosis}
            </span>
          ) : null}
        </div>

        {/* Clean body: labelled section rows on the plain surface. */}
        <div className="flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]">
          {list.length === 0 ? (
            <EmptyState data-xen-visit-empty="" title={emptyLabel} />
          ) : (
            list.map((s, i) => (
              <div key={`${s.heading}-${i}`} className="flex flex-col gap-0.5">
                <span className="text-xs font-bold uppercase text-muted">{s.heading}</span>
                <span className="text-sm text-on-surface">{s.body}</span>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
);
