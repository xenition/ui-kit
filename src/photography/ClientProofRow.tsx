import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button, Badge, type BadgeTone } from '../primitives';

/** Client decision on a proof. */
export type ProofDecision = 'pending' | 'approved' | 'rejected';

const DECISION: Record<ProofDecision, { label: string; tone: BadgeTone }> = {
  pending: { label: 'Pending', tone: 'neutral' },
  approved: { label: 'Approved', tone: 'success' },
  rejected: { label: 'Rejected', tone: 'danger' },
};

export interface ClientProofRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Photo / file name (e.g. "IMG_0421.jpg"). */
  filename: string;
  /** Thumbnail URL. When absent a token-tinted placeholder is drawn. */
  thumbUrl?: string;
  /** Client's decision (default `pending`). */
  decision?: ProofDecision;
  /** Whether the proof is selected for a batch action. */
  selected?: boolean;
  /** Toggles selection when the row body is pressed. */
  onToggleSelect?: () => void;
  /** Approve handler; renders an approve button when pending. */
  onApprove?: () => void;
  /** Reject handler; renders a reject button when pending. */
  onReject?: () => void;
  /** Approve button label (default `Approve`). */
  approveLabel?: string;
  /** Reject button label (default `Reject`). */
  rejectLabel?: string;
}

/**
 * A client-proofing row — thumbnail, filename, and a decision `Badge`, with
 * approve/reject actions while the proof is `pending`. The row body is a
 * keyboard-operable `checkbox` when `onToggleSelect` is provided (selection
 * carries an `aria-checked` state, never color alone). The action `<button>`s
 * stop propagation. Composes `Button` and `Badge`. Token-only colors.
 */
export const ClientProofRow = React.forwardRef<HTMLDivElement, ClientProofRowProps>(
  function ClientProofRow(
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
            'h-11 w-11 shrink-0 overflow-hidden rounded-[var(--xen-radius-sm)] bg-neutral-100',
            selected && 'ring-2 ring-accent'
          )}
        >
          {thumbUrl ? <img src={thumbUrl} alt="" className="h-full w-full object-cover" /> : null}
        </div>
        <div className="flex flex-1 flex-col gap-0.5">
          <p className="truncate text-sm font-semibold text-on-surface">{filename}</p>
          <Badge tone={meta.tone}>{meta.label}</Badge>
        </div>
      </div>
    );

    const actions =
      decision === 'pending' && (onApprove || onReject) ? (
        <div className="flex gap-[var(--xen-space-xs)]">
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
          'flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-border bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
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
            className="flex flex-1 cursor-pointer items-center rounded-[var(--xen-radius-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
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
