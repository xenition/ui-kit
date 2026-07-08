import * as React from 'react';
import { usePrefersReducedMotion } from '../motion/internal/reduced-motion';
import { cn } from '../primitives/cn';

export type FAQProps = React.HTMLAttributes<HTMLDivElement>;

/** Container for `FAQItem`s (divided list). */
export const FAQ = React.forwardRef<HTMLDivElement, FAQProps>(function FAQ(
  { className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      data-xen-faq=""
      className={cn('flex flex-col divide-y divide-border border-y border-border', className)}
      {...rest}
    />
  );
});

export interface FAQItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The question line (button text). */
  question: React.ReactNode;
  /** Initially expanded. */
  defaultOpen?: boolean;
}

/**
 * Accessible accordion item: a `<button aria-expanded aria-controls>`
 * toggling a labelled region, with a smooth height animation via the CSS
 * grid `0fr → 1fr` trick (no measuring). The animation is dropped under
 * `prefers-reduced-motion`.
 */
export const FAQItem = React.forwardRef<HTMLDivElement, FAQItemProps>(function FAQItem(
  { question, defaultOpen = false, className, children, ...rest },
  ref
) {
  const [open, setOpen] = React.useState(defaultOpen);
  const reduced = usePrefersReducedMotion();
  const panelId = React.useId();
  const buttonId = React.useId();

  return (
    <div ref={ref} data-xen-faq-item="" className={cn('py-[var(--xen-space-sm)]', className)} {...rest}>
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((prev) => !prev)}
          className="flex w-full items-center justify-between gap-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-left font-heading text-base font-semibold text-on-surface"
        >
          <span>{question}</span>
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn('shrink-0 text-muted', !reduced && 'transition-transform duration-200')}
            style={{ transform: open ? 'rotate(180deg)' : undefined }}
          >
            <path d="M3 6l5 5 5-5" />
          </svg>
        </button>
      </h3>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: reduced ? undefined : 'grid-template-rows 250ms ease',
        }}
      >
        <div className="overflow-hidden">
          <div
            role="region"
            id={panelId}
            aria-labelledby={buttonId}
            className="pb-[var(--xen-space-sm)] text-sm leading-relaxed text-muted"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
});
