import * as React from 'react';
import { cn } from '../primitives/cn';

export interface ProcessStep {
  /** Step headline. */
  title: React.ReactNode;
  /** Supporting copy under the title. */
  description?: React.ReactNode;
  /** Optional icon rendered inside the numbered marker instead of the number. */
  icon?: React.ReactNode;
}

export interface ProcessStepsProps extends React.HTMLAttributes<HTMLOListElement> {
  /** Ordered "how it works" steps. */
  steps: ProcessStep[];
}

/** Numbered "how it works" flow — horizontal on desktop, vertical on mobile, with connectors. */
export const ProcessSteps = React.forwardRef<HTMLOListElement, ProcessStepsProps>(
  function ProcessSteps({ steps, className, ...rest }, ref) {
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
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--xen-radius-full)] bg-primary text-on-primary font-heading text-base font-semibold md:mx-auto"
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
                <h3 className="font-heading text-lg font-semibold text-on-surface">{step.title}</h3>
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
