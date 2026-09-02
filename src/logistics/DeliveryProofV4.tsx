import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { PROOF_META, TONE_TEXT, pressableProps } from './internal';
import type { DeliveryProofProps, ProofOutcome } from './DeliveryProof';

/** Drop-in for {@link DeliveryProofProps} — same props, the V4 "dispatch" design. */
export type DeliveryProofV4Props = DeliveryProofProps;

const OUTCOME_META: Record<ProofOutcome, { glyph: string; label: string; tone: BadgeTone; text: string }> = {
  delivered: { glyph: '✓', label: 'Delivered', tone: 'success', text: 'text-success' },
  attempted: { glyph: '⏳', label: 'Attempted', tone: 'warn', text: 'text-warn' },
  refused: { glyph: '✕', label: 'Refused', tone: 'danger', text: 'text-danger' },
};

/**
 * DeliveryProof — **V4** "dispatch" design (web parity of the native V4). The
 * confident, operations-desk take on a proof-of-delivery record: an elevated
 * rounded card with a soft shadow, a captured-media placeholder (a soft-primary
 * panel stands in for the signature/photo — no media dependency), a labelled
 * glyph + word outcome badge (never color alone), the recipient, drop location
 * and timestamp, and an optional driver note. Clickable when `onClick` is set.
 * Empty (`hasMedia={false}`) and loading states supported. Identical
 * props/behavior to {@link DeliveryProofProps}. All colors from `--xen-*` token
 * classes (no literals).
 */
export const DeliveryProofV4 = React.forwardRef<HTMLDivElement, DeliveryProofV4Props>(function DeliveryProofV4(
  { kind, outcome = 'delivered', recipient, time, location, note, hasMedia = true, loading = false, onClick, className, ...rest },
  ref
) {
  const proof = PROOF_META[kind] ?? PROOF_META.signature;
  const oc = OUTCOME_META[outcome];
  const shell = 'rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';

  if (loading) {
    return (
      <div
        ref={ref}
        data-xen-delivery-proof=""
        aria-label="Loading proof of delivery"
        aria-busy="true"
        className={cn(shell, 'flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]', className)}
        {...rest}
      >
        <div className="h-[84px] rounded-[var(--xen-radius-md)] bg-neutral-100" />
        <div className="h-3 w-3/5 rounded-[var(--xen-radius-sm)] bg-neutral-100" />
      </div>
    );
  }

  const interactive = pressableProps(onClick);

  return (
    <div
      ref={ref}
      data-xen-delivery-proof=""
      aria-label={interactive ? `Proof of delivery, ${oc.label}` : undefined}
      className={cn(
        shell,
        'flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]',
        interactive &&
          'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...interactive}
      {...rest}
    >
      <div
        role="img"
        aria-label={hasMedia ? `${proof.label} captured` : `No ${proof.label.toLowerCase()} captured`}
        className={cn(
          'flex h-[88px] flex-col items-center justify-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)]',
          hasMedia ? 'bg-primary/10' : 'border border-dashed border-border bg-neutral-100'
        )}
      >
        <span aria-hidden="true" className={cn('text-2xl', hasMedia ? TONE_TEXT[proof.tone] : 'text-muted')}>
          {proof.glyph}
        </span>
        <span className="text-xs text-muted">{hasMedia ? proof.label : `No ${proof.label.toLowerCase()}`}</span>
      </div>

      <div className="flex items-center gap-[var(--xen-space-sm)]">
        <Badge tone={oc.tone} variant="soft" size="sm">
          <span aria-hidden="true">{oc.glyph}</span> {oc.label}
        </Badge>
        {recipient ? <span className="min-w-0 flex-1 truncate text-sm font-semibold text-on-surface">{recipient}</span> : null}
      </div>

      {location || time ? (
        <p className="text-xs text-muted">{[location, time].filter(Boolean).join('  ·  ')}</p>
      ) : null}

      {note ? <p className="line-clamp-3 text-xs text-on-surface">{note}</p> : null}
    </div>
  );
});
