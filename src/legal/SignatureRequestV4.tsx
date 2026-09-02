import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Button } from '../primitives';
import { StatusPill } from './StatusPill';
import { SIGNATURE_STATUS_META, activateOnKey } from './internal';
import type { SignatureRequestProps } from './SignatureRequest';

/** Drop-in for {@link SignatureRequestProps} — same props, the V4 "chambers" design. */
export type SignatureRequestV4Props = SignatureRequestProps;

/**
 * SignatureRequest — **V4** "chambers" design (web parity of the native V4). The
 * distinguished, chambers take on an e-signature request: an elevated rounded
 * card with a soft shadow, a signature glyph + document title, a sent / due meta
 * line, a labelled glyph + word lifecycle pill (never color alone), and the
 * signer (avatar + role) in a soft-primary well. A `draft` shows a "Request
 * signature" button; an in-flight request (`sent` / `viewed`) shows "Sign" /
 * "Remind"; terminal states hide actions. When `onClick` is set the card is a
 * keyboard-activable `role="button"`. Reuses the base `variant`
 * (`default` / `compact`). All colors from `--xen-*` token classes (no literals).
 */
export const SignatureRequestV4 = React.forwardRef<HTMLDivElement, SignatureRequestV4Props>(function SignatureRequestV4(
  { document, signer, signerRole, signerAvatarUrl, status = 'draft', sentDate, dueDate, variant = 'default', onRequest, onRemind, onSign, onClick, testID, className, ...rest },
  ref
) {
  const compact = variant === 'compact';
  const isDraft = status === 'draft';
  const awaiting = status === 'sent' || status === 'viewed';
  const interactive = Boolean(onClick);
  const meta = [sentDate ? `Sent ${sentDate}` : undefined, dueDate ? `Due ${dueDate}` : undefined].filter(Boolean).join(' · ');

  return (
    <div
      ref={ref}
      data-testid={testID}
      data-xen-signature-request=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `Signature request: ${document}` : undefined}
      onClick={interactive ? onClick : undefined}
      onKeyDown={interactive ? activateOnKey(onClick) : undefined}
      className={cn(
        'flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm',
        compact ? 'p-[var(--xen-space-md)]' : 'p-[var(--xen-space-lg)]',
        interactive && 'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...rest}
    >
      <div className="flex items-center gap-[var(--xen-space-sm)]">
        <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-primary/10 text-lg leading-none">✍</span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-sm font-bold text-on-surface">{document}</span>
          {meta ? <span className="text-xs text-muted">{meta}</span> : null}
        </div>
        <StatusPill meta={SIGNATURE_STATUS_META[status]} variant="soft" size="sm" />
      </div>

      <div className="flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] bg-primary/5 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]">
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
    </div>
  );
});
