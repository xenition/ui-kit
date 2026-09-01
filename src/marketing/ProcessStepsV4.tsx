import * as React from 'react';
import { cn } from '../primitives/cn';
import type { ProcessStepsProps } from './ProcessSteps';

/** Drop-in for {@link ProcessStepsProps} — same props, the V4 "showcase" design. */
export type ProcessStepsV4Props = ProcessStepsProps;

/**
 * ProcessSteps — **V4** "showcase" design (web parity of the native V4). A
 * refined numbered "how it works" flow: each step opens with a big soft-primary
 * numbered token (a `bg-primary/10` circle carrying the bold step number, or
 * the step's `icon`), connected to the next by a hairline rule (a column line
 * on desktop, a vertical line on mobile). Bold step `title` and muted
 * `description`. Horizontal on desktop / vertical on mobile, as the base. A
 * content section, so NOT a gradient surface. Every `step` (`title`,
 * `description`, `icon`) honored. Same props/behavior as
 * {@link ProcessStepsProps}; token-only colors, no literals.
 */
export const ProcessStepsV4 = React.forwardRef<HTMLOListElement, ProcessStepsV4Props>(
  function ProcessStepsV4({ steps, className, ...rest }, ref) {
    return (
      <ol
        ref={ref}
        data-xen-process-steps=""
        className={cn(
          'flex flex-col gap-[var(--xen-space-lg)] md:flex-row md:items-start',
          className
        )}
        {...rest}
      >
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          return (
            <li
              key={index}
              data-xen-process-step=""
              className="relative flex flex-1 gap-[var(--xen-space-md)] md:flex-col md:text-center"
            >
              <div className="flex flex-col items-center md:w-full md:flex-row md:items-center">
                <span
                  data-xen-process-number=""
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--xen-radius-full)] bg-primary/10 font-heading text-lg font-extrabold text-primary md:mx-auto"
                >
                  {step.icon ?? index + 1}
                </span>
                {!isLast ? (
                  <span
                    aria-hidden="true"
                    data-xen-process-connector=""
                    className="mt-[var(--xen-space-xs)] w-px flex-1 bg-border md:mt-0 md:ml-[var(--xen-space-sm)] md:h-px md:w-auto md:flex-1"
                  />
                ) : null}
              </div>
              <div className="flex flex-col gap-[var(--xen-space-xs)] pb-[var(--xen-space-md)] md:pb-0">
                <h3 className="font-heading text-lg font-extrabold tracking-tight text-on-surface">
                  {step.title}
                </h3>
                {step.description !== undefined ? (
                  <p className="text-sm leading-relaxed text-muted">{step.description}</p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    );
  }
);
