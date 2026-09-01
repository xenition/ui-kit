import * as React from 'react';
import { cn } from '../primitives/cn';
import { activateOnKey } from './internal';
import type { CannedResponseProps } from './CannedResponse';

/** Drop-in for {@link CannedResponseProps} — same props, the V4 "calm console" design. */
export type CannedResponseV4Props = CannedResponseProps;

/**
 * CannedResponse — **V4** "calm console" design (web parity of the native V4).
 * A saved-reply card reimagined as an elevated rounded surface: title with an
 * optional shortcut/category chip, the body preview set on a calm inset panel,
 * and a full-width-friendly primary **Insert** affordance (≥44px tap target).
 * Activating the body fires `onClick` (click + keyboard); **Insert** reports the
 * full response via `onInsert`. One accent = primary; selection/hover use a
 * soft-primary tint. Same props/behavior as {@link CannedResponseProps}; all
 * colors from `--xen-*` token classes (no literal hex). Dark-mode safe.
 */
export const CannedResponseV4 = React.forwardRef<HTMLDivElement, CannedResponseV4Props>(
  function CannedResponseV4(
    { response, previewLines = 2, onInsert, onClick, insertLabel = 'Insert', className, ...rest },
    ref
  ) {
    const interactive = typeof onClick === 'function';
    const activate = interactive ? () => onClick!(response) : undefined;
    const lines = Math.max(1, previewLines);

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-3 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-4 shadow-sm',
          className
        )}
        {...rest}
      >
        <div
          role={interactive ? 'button' : undefined}
          tabIndex={interactive ? 0 : undefined}
          aria-label={interactive ? `Canned response: ${response.title}` : undefined}
          onClick={activate}
          onKeyDown={activate ? activateOnKey(activate) : undefined}
          className={cn(
            'flex flex-col gap-2',
            interactive &&
              'cursor-pointer rounded-[var(--xen-radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 hover:bg-primary/10'
          )}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="min-w-0 shrink text-base font-bold text-on-surface">{response.title}</span>
            {response.shortcut ? (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 font-mono text-xs font-semibold text-primary">
                {response.shortcut}
              </span>
            ) : null}
            {response.category ? (
              <span className="text-xs text-muted">{response.category}</span>
            ) : null}
          </div>
          {/* Preview snippet on a calm inset surface. */}
          <p
            className="overflow-hidden rounded-[var(--xen-radius-md)] bg-on-surface/[0.03] px-3 py-2 text-sm leading-relaxed text-muted"
            style={{ display: '-webkit-box', WebkitLineClamp: lines, WebkitBoxOrient: 'vertical' }}
          >
            {response.body}
          </p>
        </div>
        <button
          type="button"
          disabled={!onInsert}
          onClick={onInsert ? () => onInsert(response) : undefined}
          className={cn(
            'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[var(--xen-radius-md)] bg-primary px-4 text-sm font-bold text-on-primary',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
            onInsert ? 'hover:opacity-90' : 'cursor-not-allowed opacity-50'
          )}
        >
          {insertLabel}
        </button>
      </div>
    );
  }
);
