import * as React from 'react';
import { cn } from './cn';
import { TONE_SLOTS, tintArbitrary } from './internal/feedback-v4';
import { SpinnerV4 } from './SpinnerV4';
import type { StatusMessageProps, StatusMessageState } from './StatusMessage';

export type { StatusMessageProps as StatusMessageV4Props, StatusMessageState };

const DEFAULTS: Record<StatusMessageState, string> = {
  loading: 'Loading…',
  empty: 'Nothing here yet.',
  error: 'Something went wrong.',
};

/** The failure panel: the `danger` tone at 10%, opaque, behind a neutral edge. */
const ERROR_PANEL = `bg-[${tintArbitrary(TONE_SLOTS.danger.fill)}]`;

/**
 * **V4 status message** — the web twin of the native `StatusMessageV4`, same
 * props as {@link StatusMessage}, a different design line.
 *
 * One component covering three of the states `design.md` §14 says every screen
 * owes the user. V4 treats them as three different jobs rather than three
 * colours of the same centred line of small grey text.
 *
 * ## `loading` — say only what is known
 *
 * `SpinnerV4` replaces the hand-rolled ring this component injected for itself,
 * so there is one spinner in the kit instead of two that drift. It stays
 * indeterminate: §36.7 forbids fabricating precision, and this component has a
 * message and nothing else — no fraction, no stages. A bar here would be
 * inventing a number.
 *
 * ## `empty` — an empty state that whispers is one the eye skips
 *
 * §15 is emphatic that an empty state must help the user progress: what belongs
 * here, why it matters, what to do next. The base rendered that copy in
 * `text-muted-text` at `text-sm` — the *quietest* type in the kit for the one screen
 * whose entire purpose is to be read. V4 promotes it to `text-on-surface` at
 * `text-base`. Nothing else changes, because nothing else can: **these props
 * carry no action.** When an empty state has a next step, `ResultV4` is the
 * component — it takes `actionLabel`, and §15 is really a demand for a button.
 *
 * ## `error` — a failure needs a body
 *
 * The base drew red text in the middle of a void. Red text alone reads as a
 * caption; §38 asks an error to help recovery and it cannot do that unnoticed.
 * V4 gives it the feedback line's tinted panel — the `danger` tone mixed into
 * `surface` at 10%, opaque so it holds its colour on any ground, behind the
 * neutral hairline that says "container" (the tint already says which kind).
 * The label is the compiler's contrast-safe `danger-text`, not the raw fill.
 */
export const StatusMessageV4 = React.forwardRef<HTMLDivElement, StatusMessageProps>(
  function StatusMessageV4({ state, message, className, ...rest }, ref) {
    const base = cn(
      'flex flex-col items-center justify-center text-center',
      'gap-[var(--xen-space-sm)] py-[var(--xen-space-xl)]',
      className
    );

    if (state === 'loading') {
      return (
        <div
          ref={ref}
          role="status"
          aria-live="polite"
          aria-busy="true"
          data-xen-v4-status-message="loading"
          className={base}
          {...rest}
        >
          {/*
            The block already announces itself as a polite busy region, so the
            spinner is decoration to a screen reader — two "Loading" nodes in
            one live region is one announcement too many.
          */}
          <SpinnerV4 size="md" role={undefined} aria-label={undefined} aria-hidden="true" />
          {message ? <span className="text-sm text-muted-text">{message}</span> : null}
        </div>
      );
    }

    if (state === 'error') {
      return (
        <div
          ref={ref}
          role="alert"
          data-xen-v4-status-message="error"
          className={base}
          {...rest}
        >
          <div
            className={cn(
              'w-full rounded-[var(--xen-radius-md)] border border-border',
              'px-[var(--xen-space-lg)] py-[var(--xen-space-md)]',
              'text-sm text-danger-text',
              ERROR_PANEL
            )}
          >
            {message ?? DEFAULTS.error}
          </div>
        </div>
      );
    }

    return (
      <div ref={ref} data-xen-v4-status-message="empty" className={base} {...rest}>
        {/*
          `text-on-surface` at the base step, not `text-muted-text` at the small one.
          §15 asks this copy to move the user forward; the base set it in the
          quietest type the kit has.
        */}
        <span className="text-base text-on-surface">{message ?? DEFAULTS.empty}</span>
      </div>
    );
  }
);
