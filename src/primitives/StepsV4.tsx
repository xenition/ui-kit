import * as React from 'react';
import { cn } from './cn';
import type { StepItem, StepsProps } from './Steps';

export type { StepsProps as StepsV4Props, StepItem };

/** The rail behind the markers: `primary` once walked, `border` before. */
const rail = (filled: boolean): string =>
  cn('absolute top-1/2 h-0.5 -translate-y-1/2', filled ? 'bg-primary' : 'bg-border');

/**
 * **V4 steps** — the web twin of the native `StepsV4`, same props as
 * {@link Steps}, a different design line.
 *
 * ## The connector is the component
 *
 * The base drew a row of disconnected circles. That is a set of badges, not a
 * progress indicator: it says which markers are filled and leaves the reader to
 * infer that they form a sequence at all. §29 asks that navigation reflect the
 * user's mental model, and the model of a checkout is a **path** — so V4 draws
 * the path.
 *
 * The rail runs behind the markers and is split at each one, which makes the
 * completed portion a single continuous filled line ending exactly at where you
 * are. That is the whole answer to "how far along am I", available without
 * counting circles (§32, §33).
 *
 * ## Three states, three shapes
 *
 * - **Done** is filled with `primary` and carries a check in `on-primary` — a
 *   compiler-guaranteed pair.
 * - **Now** is an outlined marker on `surface`, ringed in `primary`, with its
 *   number in `primary-text`. It is the only hollow marker inside the filled
 *   run, so it reads as the head of the path rather than another completed step.
 * - **Later** is the same outline in `border` with a `muted` number: present,
 *   plainly not reached.
 *
 * The number is `primary-text` rather than `primary`, because a numeral is text
 * and the fill slot carries no contrast promise as text. The current step also
 * carries `aria-current="step"`, so the state is not colour-only.
 *
 * ## Still a progress indicator, not an instruction list
 *
 * Each step takes `flex-1` of the row, so this is at its best with three or
 * four one-word titles ("Cart · Shipping · Pay") and falls apart past that. If
 * what you have is content — a recipe method, a setup guide — reach for
 * `StepList`, the vertical sibling. `Steps` answers "where am I in this flow";
 * `StepList` answers "here are the instructions".
 */
export function StepsV4({ steps, current, className }: StepsProps): React.ReactElement {
  const lastIndex = steps.length - 1;

  return (
    <ol aria-label="Progress" className={cn('flex w-full items-start', className)}>
      {steps.map((step, index) => {
        const done = index < current;
        const active = index === current;
        // The segment INTO this step is complete once you have reached it; the
        // segment OUT of it is complete once you have left it.
        const railInFilled = index <= current;
        const railOutFilled = index < current;

        return (
          <li
            key={index}
            aria-current={active ? 'step' : undefined}
            className="flex flex-1 flex-col items-center"
          >
            <div className="relative flex h-xl w-full items-center justify-center">
              {index > 0 && <span aria-hidden="true" className={cn(rail(railInFilled), 'left-0 right-1/2')} />}
              {index < lastIndex && (
                <span aria-hidden="true" className={cn(rail(railOutFilled), 'left-1/2 right-0')} />
              )}

              <span
                className={cn(
                  'relative z-10 flex h-xl w-xl items-center justify-center',
                  'rounded-[var(--xen-radius-full)] font-body text-xs font-semibold',
                  done
                    ? 'bg-primary text-on-primary'
                    : active
                      ? // `primary-text`, not `primary`: a numeral is text, and
                        // the fill slot carries no contrast promise as one.
                        'border-2 border-primary bg-surface text-primary-text'
                      : 'border-2 border-border bg-surface text-muted-text'
                )}
              >
                {done ? '✓' : index + 1}
              </span>
            </div>

            <div className="mt-xs px-xs text-center">
              <div
                className={cn(
                  'font-body text-xs',
                  // Where you are is the only title at full weight.
                  active ? 'font-semibold' : done ? 'font-medium' : 'font-normal',
                  active || done ? 'text-on-surface' : 'text-muted-text'
                )}
              >
                {step.title}
              </div>
              {step.description != null && (
                <div className="text-xs text-muted-text">{step.description}</div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
