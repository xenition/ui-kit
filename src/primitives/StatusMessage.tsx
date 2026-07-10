import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from './cn';

export type StatusMessageState = 'loading' | 'empty' | 'error';

export interface StatusMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Which feedback state to render. */
  state: StatusMessageState;
  /** Copy shown to the user. Optional for `loading` (spinner alone is valid). */
  message?: string;
}

/**
 * The spinner ring is token-only (`border` track, `primary` head) and rotates
 * via CSS; `prefers-reduced-motion` freezes it (the ring still reads as a busy
 * indicator). No colors here — only transform.
 */
const STATUS_MESSAGE_CSS = `
@keyframes xen-spin { to { transform: rotate(360deg); } }
[data-xen-spinner] {
  display: inline-block; width: 1.25rem; height: 1.25rem; border-radius: 9999px;
  border: 2px solid var(--xen-border); border-top-color: var(--xen-primary);
  animation: xen-spin 0.7s linear infinite;
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-spinner] { animation: none; }
}
`;

const DEFAULTS: Record<StatusMessageState, string> = {
  loading: 'Loading…',
  empty: 'Nothing here yet.',
  error: 'Something went wrong.',
};

/**
 * Loading / empty / error feedback — the templates' hand-rolled `Status` block
 * as a token-only primitive. `loading` shows a CSS spinner (reduced-motion
 * safe) with an optional message and is announced via `role="status"`;
 * `empty` is a muted message; `error` is a `danger`-token message announced via
 * `role="alert"`. Pairs with `@xenition/ui/data`'s `useResource`.
 */
export const StatusMessage = React.forwardRef<HTMLDivElement, StatusMessageProps>(
  function StatusMessage({ state, message, className, ...rest }, ref) {
    injectStyleOnce('xen-status-message-styles', STATUS_MESSAGE_CSS);

    const base = cn(
      'flex flex-col items-center justify-center gap-[var(--xen-space-sm)] py-[var(--xen-space-xl)] text-center text-sm',
      className
    );

    if (state === 'loading') {
      return (
        <div
          ref={ref}
          role="status"
          aria-live="polite"
          aria-busy="true"
          data-xen-status-message="loading"
          className={cn(base, 'text-muted')}
          {...rest}
        >
          <span data-xen-spinner="" aria-hidden="true" />
          {message ? <span>{message}</span> : null}
        </div>
      );
    }

    if (state === 'error') {
      return (
        <div
          ref={ref}
          role="alert"
          data-xen-status-message="error"
          className={cn(base, 'text-danger')}
          {...rest}
        >
          <span>{message ?? DEFAULTS.error}</span>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        data-xen-status-message="empty"
        className={cn(base, 'text-muted')}
        {...rest}
      >
        <span>{message ?? DEFAULTS.empty}</span>
      </div>
    );
  }
);
