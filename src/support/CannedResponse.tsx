import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Button } from '../primitives/Button';
import { activateOnKey } from './internal';

export interface CannedResponseData {
  /** Stable id, returned to `onInsert`. */
  id: string;
  /** Short human title (e.g. "Password reset"). */
  title: string;
  /** The saved reply body. */
  body: string;
  /** Optional typed shortcut (e.g. `/reset`). Rendered as a token chip. */
  shortcut?: string;
  /** Optional grouping/category tag. */
  category?: string;
}

export interface CannedResponseProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** The saved reply to display. */
  response: CannedResponseData;
  /** How many body lines to show before truncating (default 2). */
  previewLines?: number;
  /** Fires with the response when "Insert" is pressed. */
  onInsert?: (response: CannedResponseData) => void;
  /** Fires when the card body (not the button) is activated — e.g. to expand. */
  onClick?: (response: CannedResponseData) => void;
  /** Insert-button label (default "Insert"). */
  insertLabel?: string;
}

/**
 * A saved/canned reply card for agents — title, an optional shortcut + category
 * chip, a truncated body preview, and an "Insert" action that reports the full
 * response back to the composer via `onInsert`. Activating the body fires
 * `onClick` (e.g. to preview the whole thing) with click + keyboard support.
 * All colors/spacing come from the `--xen-*` token classes — no literal hex.
 */
export const CannedResponse = React.forwardRef<HTMLDivElement, CannedResponseProps>(
  function CannedResponse(
    { response, previewLines = 2, onInsert, onClick, insertLabel = 'Insert', className, ...rest },
    ref
  ) {
    const interactive = typeof onClick === 'function';
    const activate = interactive ? () => onClick!(response) : undefined;
    const lines = Math.max(1, previewLines);

    return (
      <Card ref={ref} className={cn('p-[var(--xen-space-md)]', className)} {...rest}>
        <div
          role={interactive ? 'button' : undefined}
          tabIndex={interactive ? 0 : undefined}
          aria-label={interactive ? `Canned response: ${response.title}` : undefined}
          onClick={activate}
          onKeyDown={activate ? activateOnKey(activate) : undefined}
          className={cn(
            interactive &&
              'cursor-pointer rounded-[var(--xen-radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
          )}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="min-w-0 shrink text-base font-bold text-on-surface">{response.title}</span>
            {response.shortcut ? (
              <span className="rounded-[var(--xen-radius-sm)] bg-primary-50 px-1.5 py-px font-mono text-xs font-semibold text-primary">
                {response.shortcut}
              </span>
            ) : null}
            {response.category ? (
              <span className="text-xs text-muted">{response.category}</span>
            ) : null}
          </div>
          <p
            className="mt-1 overflow-hidden text-sm text-muted"
            style={{ display: '-webkit-box', WebkitLineClamp: lines, WebkitBoxOrient: 'vertical' }}
          >
            {response.body}
          </p>
        </div>
        <div className="mt-2 flex justify-end">
          <Button
            size="sm"
            variant="secondary"
            disabled={!onInsert}
            onClick={onInsert ? () => onInsert(response) : undefined}
          >
            {insertLabel}
          </Button>
        </div>
      </Card>
    );
  }
);
