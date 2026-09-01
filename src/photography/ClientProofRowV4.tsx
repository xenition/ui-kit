import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button, Badge, type BadgeTone } from '../primitives';
import type { ClientProofRowProps, ProofDecision } from './ClientProofRow';

/** Drop-in for {@link ClientProofRowProps} — same props, the V4 "studio" design. */
export type ClientProofRowV4Props = ClientProofRowProps;

const DECISION: Record<ProofDecision, { label: string; tone: BadgeTone; glyph: string }> = {
  pending: { label: 'Pending', tone: 'neutral', glyph: '⏳' },
  approved: { label: 'Approved', tone: 'success', glyph: '✅' },
  rejected: { label: 'Rejected', tone: 'danger', glyph: '⛔' },
};

/**
 * ClientProofRow — **V4** "studio" design (web parity of the native V4). The
 * matted proofing row: an elevated clean-surface row whose thumbnail floats
 * inside a thin neutral **mat** (a soft-primary selection ring when picked for a
 * batch), a bold filename, and a labelled decision `Badge` carrying glyph + token
 * tone + label (never color alone). While `pending` the base's approve/reject
 * actions render as trailing `Button`s that stop propagation so they never toggle
 * selection. The row body is a keyboard-operable `checkbox` when `onToggleSelect`
 * is provided (selection carries `aria-checked`, never color alone). Identical
 * props/behavior to {@link ClientProofRowProps}; all colors from `--xen-*`
 * token classes.
 */
export const ClientProofRowV4 = React.forwardRef<HTMLDivElement, ClientProofRowV4Props>(
  function ClientProofRowV4(
    {
      filename,
      thumbUrl,
      decision = 'pending',
      selected = false,
      onToggleSelect,
      onApprove,
      onReject,
      approveLabel = 'Approve',
      rejectLabel = 'Reject',
      className,
      ...rest
    },
    ref
  ) {
    const meta = DECISION[decision];
    const selectable = typeof onToggleSelect === 'function';

    const body = (
      <div className="flex flex-1 items-center gap-[var(--xen-space-md)]">
        <div
          className={cn(
            'h-11 w-11 shrink-0 overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100 ring-1 ring-inset ring-border',
            selected && 'ring-2 ring-accent'
          )}
        >
          {thumbUrl ? (
            <img src={thumbUrl} alt="" loading="lazy" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-lg text-muted" aria-hidden="true">
              🖼
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-[var(--xen-space-xs)]">
          <p className="truncate text-sm font-bold text-on-surface">{filename}</p>
          <span className="inline-flex w-fit">
            <Badge tone={meta.tone} variant="soft">
              <span aria-hidden="true">{meta.glyph}</span> {meta.label}
            </Badge>
          </span>
        </div>
      </div>
    );

    const actions =
      decision === 'pending' && (onApprove || onReject) ? (
        <div className="flex shrink-0 gap-[var(--xen-space-xs)]">
          {onReject ? (
            <Button
              size="sm"
              variant="danger"
              onClick={(e) => {
                e.stopPropagation();
                onReject();
              }}
            >
              {rejectLabel}
            </Button>
          ) : null}
          {onApprove ? (
            <Button
              size="sm"
              variant="primary"
              onClick={(e) => {
                e.stopPropagation();
                onApprove();
              }}
            >
              {approveLabel}
            </Button>
          ) : null}
        </div>
      ) : null;

    return (
      <div
        ref={ref}
        data-xen-client-proof-row=""
        className={cn(
          'flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)] text-on-surface shadow-md',
          className
        )}
        {...rest}
      >
        {selectable ? (
          <div
            role="checkbox"
            aria-checked={selected}
            aria-label={`${filename}, ${meta.label}`}
            tabIndex={0}
            onClick={onToggleSelect}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onToggleSelect?.();
              }
            }}
            className="flex flex-1 cursor-pointer items-center rounded-[var(--xen-radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {body}
          </div>
        ) : (
          body
        )}
        {actions}
      </div>
    );
  }
);
