import * as React from 'react';
import { usePrefersReducedMotion } from '../motion/internal/reduced-motion';
import { cn } from '../primitives/cn';
import type { FAQProps, FAQItemProps } from './FAQ';

/** Drop-in for {@link FAQProps} — same props, the V4 "showcase" design. */
export type FAQV4Props = FAQProps;

/** Drop-in for {@link FAQItemProps} — same props, the V4 "showcase" design. */
export type FAQItemV4Props = FAQItemProps;

/**
 * FAQ — **V4** "showcase" design (web parity of the native V4). An elegant
 * accordion container: a clean vertical stack of `FAQItemV4` rows separated by
 * hairlines, on the page ground (NOT a gradient surface). Same props/behavior
 * as {@link FAQProps}; token-only colors, no literals.
 */
export const FAQV4 = React.forwardRef<HTMLDivElement, FAQV4Props>(function FAQV4(
  { className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      data-xen-faq=""
      className={cn('flex flex-col gap-[var(--xen-space-sm)]', className)}
      {...rest}
    />
  );
});

/**
 * FAQItem — **V4** "showcase" design (web parity of the native V4). One clean
 * accordion row: an extra-bold question and a chevron on a full-width
 * `≥44px` toggle button, smooth grid `0fr → 1fr` expand (dropped under
 * `prefers-reduced-motion`), and — when open — a subtle soft-primary
 * (`bg-primary/5`) tint with a soft-primary chevron. `question` and
 * `defaultOpen` honored exactly. `aria-expanded`/`aria-controls` a11y
 * preserved. Same props/behavior as {@link FAQItemProps}; token-only colors,
 * no literals.
 */
export const FAQItemV4 = React.forwardRef<HTMLDivElement, FAQItemV4Props>(function FAQItemV4(
  { question, defaultOpen = false, className, children, ...rest },
  ref
) {
  const [open, setOpen] = React.useState(defaultOpen);
  const reduced = usePrefersReducedMotion();
  const panelId = React.useId();
  const buttonId = React.useId();

  return (
    <div
      ref={ref}
      data-xen-faq-item=""
      className={cn(
        'rounded-[var(--xen-radius-lg)] border border-border bg-surface px-[var(--xen-space-md)]',
        open && 'bg-primary/5',
        className
      )}
      {...rest}
    >
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((prev) => !prev)}
          className="flex min-h-[44px] w-full items-center justify-between gap-[var(--xen-space-md)] py-[var(--xen-space-md)] text-left font-heading text-base font-extrabold tracking-tight text-on-surface"
        >
          <span>{question}</span>
          <span
            aria-hidden="true"
            className={cn(
              'flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--xen-radius-full)] bg-primary/10 text-primary',
              !reduced && 'transition-transform duration-200'
            )}
            style={{ transform: open ? 'rotate(180deg)' : undefined }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6l5 5 5-5" />
            </svg>
          </span>
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
            className="pb-[var(--xen-space-md)] text-sm leading-relaxed text-muted"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
});
