import * as React from 'react';
import { type MoneyFormatter } from './internal/format';
/** Type of public document being requested. */
export type DocumentType = 'birth-certificate' | 'marriage-certificate' | 'death-certificate' | 'property-deed' | 'court-record' | 'transcript' | 'other';
/** Fulfilment status of a document request. */
export type DocumentRequestStatus = 'requested' | 'processing' | 'ready' | 'mailed' | 'denied';
export interface DocumentRequestProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
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
export declare const DocumentRequest: React.ForwardRefExoticComponent<DocumentRequestProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DocumentRequest.d.ts.map