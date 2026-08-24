import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { PROOF_META, TONE_TEXT, pressableProps, type ProofKind } from './internal';

export type ProofOutcome = 'delivered' | 'attempted' | 'refused';

const OUTCOME_META: Record<
  ProofOutcome,
  { glyph: string; label: string; text: string }
> = {
  delivered: { glyph: '✓', label: 'Delivered', text: 'text-success' },
  attempted: { glyph: '⏳', label: 'Attempted', text: 'text-warn' },
  refused: { glyph: '✕', label: 'Refused', text: 'text-danger' },
};

export interface DeliveryProofProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Capture kind (signature / photo / pin / contactless). */
  kind: ProofKind;
  /** Delivery outcome — glyph + word, never color alone. */
  outcome?: ProofOutcome;
  /** Person who received (or refused) the delivery. */
  recipient?: string;
  /** Human timestamp of capture. */
  time?: string;
  /** Drop location note (e.g. `Front porch`). */
  location?: string;
  /** Optional free-text note from the driver. */
  note?: string;
  /** Whether the underlying media (photo/signature) is present. Drives the placeholder. */
  hasMedia?: boolean;
  /** Loading skeleton. */
  loading?: boolean;
  /** View the full proof. */
  onClick?: () => void;
}

/**
 * Proof-of-delivery card: a captured-media placeholder (a token-tinted panel
 * stands in for the signature/photo), the recipient, timestamp, drop location
 * and an outcome carried by a glyph + word. Clickable when `onClick` is set.
 * Empty (`hasMedia={false}`) and loading states supported. All colors are theme
 * tokens. Web parity of the native `DeliveryProof`.
 */
export const DeliveryProof = React.forwardRef<HTMLDivElement, DeliveryProofProps>(
  function DeliveryProof(
    {
      kind,
      outcome = 'delivered',
      recipient,
      time,
      location,
      note,
      hasMedia = true,
      loading = false,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    const proof = PROOF_META[kind] ?? PROOF_META.signature;
    const oc = OUTCOME_META[outcome];

    if (loading) {
      return (
        <Card
          ref={ref}
          variant="outlined"
          aria-busy="true"
          aria-label="Loading proof of delivery"
          className={cn('flex flex-col gap-[var(--xen-space-sm)]', className)}
          {...rest}
        >
          <div className="h-[72px] animate-pulse rounded-[var(--xen-radius-md)] bg-neutral-100" />
          <div className="h-3 w-[60%] animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100" />
        </Card>
      );
    }

    const interactive = pressableProps(onClick);

    return (
      <Card
        ref={ref}
        variant={interactive ? 'interactive' : 'outlined'}
        aria-label={interactive ? `Proof of delivery, ${oc.label}` : undefined}
        className={cn(
          'flex flex-col gap-[var(--xen-space-sm)]',
          interactive &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          className
        )}
        {...interactive}
        {...rest}
      >
        <div
          role="img"
          aria-label={hasMedia ? `${proof.label} captured` : `No ${proof.label.toLowerCase()} captured`}
          className={cn(
            'flex h-[76px] flex-col items-center justify-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] bg-neutral-100',
            !hasMedia && 'border border-border'
          )}
        >
          <span aria-hidden="true" className={cn('text-xl', hasMedia ? TONE_TEXT[proof.tone] : 'text-muted')}>
            {proof.glyph}
          </span>
          <span className="text-xs text-muted">{hasMedia ? proof.label : `No ${proof.label.toLowerCase()}`}</span>
        </div>

        <div className="flex items-center gap-[var(--xen-space-xs)]">
          <span aria-hidden="true" className={cn('text-sm', oc.text)}>
            {oc.glyph}
          </span>
          <span className={cn('text-sm font-bold', oc.text)}>{oc.label}</span>
          {recipient ? (
            <span className="min-w-0 flex-1 truncate text-sm text-on-surface">{`· ${recipient}`}</span>
          ) : null}
        </div>

        {location || time ? (
          <p className="text-xs text-muted">{[location, time].filter(Boolean).join(' · ')}</p>
        ) : null}

        {note ? <p className="line-clamp-3 text-xs text-on-surface">{note}</p> : null}
      </Card>
    );
  }
);
