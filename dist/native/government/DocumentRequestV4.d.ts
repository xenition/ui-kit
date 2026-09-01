import * as React from 'react';
import type { DocumentRequestProps, DocumentRequestStatus, DocumentType } from './DocumentRequest';
export interface DocumentRequestV4Props extends DocumentRequestProps {
    /** Why the request was refused. Rendered when the status is adverse. */
    reason?: string;
    /** Override the seven document words (`'Birth certificate'`, `'Court record'`, …). */
    typeLabels?: Partial<Record<DocumentType, string>>;
    /** Override the five status words (`'Processing'`, `'Denied'`, …). */
    statusLabels?: Partial<Record<DocumentRequestStatus, string>>;
    /** What the pay button says once it is armed. Default `'Confirm payment'`. */
    confirmPayLabel?: string;
}
/**
 * **V4 document request** — same props as {@link DocumentRequest} plus
 * `reason`, `typeLabels`, `statusLabels` and `confirmPayLabel`.
 *
 * ## Five changes
 *
 * 1. **A denied request says why.** A refused death certificate said "Denied"
 *    and offered no field for the reason, on a card whose whole purpose is to
 *    report what happened to the request. `isAdverse()` gates the `reason`,
 *    and the line is an assertive live region.
 * 2. **Paying takes a confirming press.** "Pay fee" was one tap on a ~34pt
 *    target, with no confirm and no way back; the first press arms the button
 *    and shows `confirmPayLabel`, the second pays.
 * 3. **The request number is labelled** — it rendered as a bare "DOC-9931" —
 *    and the card is one announced object carrying the type, the status, the
 *    fee and the date rather than seven loose text nodes.
 * 4. **Both actions clear 44**, where `size="sm"` renders about 34 and neither
 *    `Button` primitive sets a floor, and the document disc's tint is
 *    composited opaquely instead of washed over whatever is behind it — a
 *    translucent tint is a different colour on every surface it lands on.
 * 5. **A stage in the queue is not an outcome.** `requested` was `primary` and
 *    `mailed` was `accent`, and the document type disc was `primary` too — a
 *    brand colour describing what kind of certificate it is. All three are
 *    `IDENTITY_TONE`, leaving `ready` and `denied` as the only two tones on
 *    the card that mean anything happened.
 */
export declare function DocumentRequestV4({ docType, title, requestNumber, status, feeCents, paid, currency, formatMoney: format, date, reason, typeLabels, statusLabels, confirmPayLabel, onPay, onDownload, style, }: DocumentRequestV4Props): React.ReactElement;
//# sourceMappingURL=DocumentRequestV4.d.ts.map