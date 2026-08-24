import * as React from 'react';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { Button } from '../primitives/Button';
import { formatMoney, type MoneyFormatter } from './internal/format';

/** Type of public document being requested. */
export type DocumentType =
  | 'birth-certificate'
  | 'marriage-certificate'
  | 'death-certificate'
  | 'property-deed'
  | 'court-record'
  | 'transcript'
  | 'other';

const DOC_TYPE: Record<DocumentType, { label: string; glyph: string }> = {
  'birth-certificate': { label: 'Birth certificate', glyph: '👶' },
  'marriage-certificate': { label: 'Marriage certificate', glyph: '💍' },
  'death-certificate': { label: 'Death certificate', glyph: '🕊️' },
  'property-deed': { label: 'Property deed', glyph: '🏠' },
  'court-record': { label: 'Court record', glyph: '⚖️' },
  transcript: { label: 'Transcript', glyph: '🎓' },
  other: { label: 'Document', glyph: '📄' },
};

/** Fulfilment status of a document request. */
export type DocumentRequestStatus = 'requested' | 'processing' | 'ready' | 'mailed' | 'denied';

const STATUS: Record<DocumentRequestStatus, { label: string; glyph: string; tone: BadgeTone }> = {
  requested: { label: 'Requested', glyph: '📨', tone: 'primary' },
  processing: { label: 'Processing', glyph: '⋯', tone: 'warn' },
  ready: { label: 'Ready', glyph: '✓', tone: 'success' },
  // Native `accent` folds to `primary` on web (no `accent` BadgeTone).
  mailed: { label: 'Mailed', glyph: '📮', tone: 'primary' },
  denied: { label: 'Denied', glyph: '✕', tone: 'danger' },
};

export interface DocumentRequestProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Type of document — drives the leading glyph + default label. */
  docType: DocumentType;
  /** Request title override (defaults to the document type label). */
  title?: string;
  /** Request reference number (e.g. "DOC-9931"). */
  requestNumber?: string;
  /** Fulfilment status (default `requested`). */
  status?: DocumentRequestStatus;
  /** Processing / copy fee in integer **cents** (0 = free). */
  feeCents?: number;
  /** Whether the fee has been paid (gates the pay action). */
  paid?: boolean;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
  /** Localized date the request was filed / updated. */
  date?: string;
  /** Fires "Pay fee" (shown only when an unpaid fee exists). */
  onPay?: () => void;
  /** Fires "Download" (shown only when status is `ready`). */
  onDownload?: () => void;
}

/**
 * A request for a public / vital record: a tinted document glyph, a status pill
 * conveyed by **text + glyph + color** (never color alone), an optional
 * integer-cents fee funnelled through `formatMoney`, and context-gated Pay /
 * Download actions (real `<button>`s). Token-bound throughout — no literal
 * colors. Web parity of the native `DocumentRequest`.
 */
export const DocumentRequest = React.forwardRef<HTMLDivElement, DocumentRequestProps>(
  function DocumentRequest(
    {
      docType,
      title,
      requestNumber,
      status = 'requested',
      feeCents,
      paid = false,
      currency = 'USD',
      formatMoney: format = formatMoney,
      date,
      onPay,
      onDownload,
      className,
      ...rest
    },
    ref
  ) {
    const dt = DOC_TYPE[docType] ?? DOC_TYPE.other;
    const sd = STATUS[status] ?? STATUS.requested;
    const fee = feeCents != null ? Math.max(0, Math.trunc(feeCents)) : undefined;
    const showPay = onPay != null && !paid && fee != null && fee > 0;
    const showDownload = onDownload != null && status === 'ready';

    return (
      <Card ref={ref} className={className} {...rest}>
        <div className="flex items-center gap-[var(--xen-space-md)]">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-primary-50">
            <Icon glyph={dt.glyph} size="xl" color="primary" aria-label={dt.label} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-bold text-on-surface">{title ?? dt.label}</p>
            {requestNumber != null ? (
              <p className="text-xs text-muted">{requestNumber}</p>
            ) : null}
          </div>
          <Badge tone={sd.tone}>
            <span aria-hidden="true">{sd.glyph}</span> {sd.label}
          </Badge>
        </div>

        {fee != null || date != null ? (
          <div className="mt-[var(--xen-space-sm)] flex items-center justify-between">
            {fee != null ? (
              <span className="text-xs text-muted">
                Fee: {fee === 0 ? 'Free' : format(fee, currency)}
                {paid && fee > 0 ? ' · paid' : ''}
              </span>
            ) : (
              <span />
            )}
            {date != null ? <span className="text-xs text-muted">{date}</span> : null}
          </div>
        ) : null}

        {showPay || showDownload ? (
          <div className="mt-[var(--xen-space-md)] flex justify-end gap-[var(--xen-space-sm)]">
            {showPay ? (
              <Button size="sm" variant="outline" onClick={onPay}>
                Pay fee
              </Button>
            ) : null}
            {showDownload ? (
              <Button size="sm" onClick={onDownload}>
                Download
              </Button>
            ) : null}
          </div>
        ) : null}
      </Card>
    );
  }
);
