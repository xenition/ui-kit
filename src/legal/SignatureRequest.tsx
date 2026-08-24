import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Avatar, Button } from '../primitives';
import { StatusPill } from './StatusPill';
import { SIGNATURE_STATUS_META, activateOnKey, type SignatureStatus } from './internal';

export type SignatureRequestVariant = 'default' | 'compact';

export interface SignatureRequestProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Document title awaiting signature. */
  document: string;
  /** Name of the party who must sign. */
  signer: string;
  /** Signer role / relationship (e.g. "Client", "Opposing counsel"). */
  signerRole?: string;
  /** Signer avatar URL (initials fallback otherwise). */
  signerAvatarUrl?: string;
  /** Request lifecycle state — glyph + word pill, never color alone. */
  status?: SignatureStatus;
  /** Pre-formatted sent / due label. */
  sentDate?: string;
  /** Pre-formatted expiry / due label. */
  dueDate?: string;
  /** Density. */
  variant?: SignatureRequestVariant;
  /**
   * Send the request for signature — renders a "Request signature" button when
   * the request is still a `draft`.
   */
  onRequest?: () => void;
  /** Send a reminder — renders "Remind" while awaiting (sent / viewed). */
  onRemind?: () => void;
  /** Sign the document — renders "Sign" while awaiting. */
  onSign?: () => void;
  /** Click handler for the whole card. */
  onClick?: () => void;
  testID?: string;
}

/**
 * An e-signature request: the document, the signer (avatar + role), and a
 * lifecycle pill (glyph + word so state never rests on color alone). A `draft`
 * shows a "Request signature" button (`onRequest`); an in-flight request
 * (`sent` / `viewed`) shows "Sign" / "Remind". Terminal states hide actions.
 * When `onClick` is set the card is an accessible `role="button"`. All colors
 * are `--xen-*` token classes — no literals.
 */
export const SignatureRequest = React.forwardRef<HTMLDivElement, SignatureRequestProps>(
  function SignatureRequest(
    {
      document,
      signer,
      signerRole,
      signerAvatarUrl,
      status = 'draft',
      sentDate,
      dueDate,
      variant = 'default',
      onRequest,
      onRemind,
      onSign,
      onClick,
      testID,
      className,
      ...rest
    },
    ref
  ) {
    const compact = variant === 'compact';
    const isDraft = status === 'draft';
    const awaiting = status === 'sent' || status === 'viewed';
    const interactive = Boolean(onClick);

    const meta = [
      sentDate ? `Sent ${sentDate}` : undefined,
      dueDate ? `Due ${dueDate}` : undefined,
    ]
      .filter(Boolean)
      .join(' · ');

    return (
      <Card
        ref={ref}
        data-testid={testID}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={interactive ? `Signature request: ${document}` : undefined}
        onClick={interactive ? onClick : undefined}
        onKeyDown={interactive ? activateOnKey(onClick) : undefined}
        className={cn(
          'flex flex-col gap-[var(--xen-space-sm)]',
          compact && 'p-[var(--xen-space-md)]',
          interactive && 'cursor-pointer',
          className
        )}
        {...rest}
      >
        <div className="flex items-center gap-[var(--xen-space-sm)]">
          <span aria-hidden="true" className="text-lg leading-none">
            ✍
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="truncate text-sm font-bold text-on-surface">{document}</span>
            {meta ? <span className="text-xs text-muted">{meta}</span> : null}
          </div>
          <StatusPill meta={SIGNATURE_STATUS_META[status]} size="sm" />
        </div>

        <div className="flex items-center gap-[var(--xen-space-sm)]">
          <Avatar size="sm" name={signer} src={signerAvatarUrl} />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="truncate text-xs font-semibold text-on-surface">{signer}</span>
            {signerRole ? <span className="text-xs text-muted">{signerRole}</span> : null}
          </div>
        </div>

        {isDraft && onRequest ? (
          <Button
            size="sm"
            variant="primary"
            className="self-start"
            onClick={(e) => {
              e.stopPropagation();
              onRequest();
            }}
          >
            Request signature
          </Button>
        ) : awaiting && (onSign || onRemind) ? (
          <div className="flex gap-[var(--xen-space-xs)]">
            {onSign ? (
              <Button
                size="sm"
                variant="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  onSign();
                }}
              >
                Sign
              </Button>
            ) : null}
            {onRemind ? (
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemind();
                }}
              >
                Remind
              </Button>
            ) : null}
          </div>
        ) : null}
      </Card>
    );
  }
);
