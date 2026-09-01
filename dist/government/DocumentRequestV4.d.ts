import * as React from 'react';
import type { DocumentRequestProps, DocumentRequestStatus, DocumentType } from './DocumentRequest';
export interface DocumentRequestV4Props extends DocumentRequestProps {
    /** Why the request was refused. Rendered and announced when the status is adverse. */
    reason?: string;
    /** Override the seven document words — `'Birth certificate'`, `'Transcript'`, … */
    typeLabels?: Partial<Record<DocumentType, string>>;
    /** Override the five status words — `'Requested'`, `'Denied'`, … */
    statusLabels?: Partial<Record<DocumentRequestStatus, string>>;
    /** How "Pay fee" names itself once armed. Default `'Confirm payment'`. */
    confirmPayLabel?: string;
}
/**
 * **V4 document request** — the web twin of the native `DocumentRequestV4`,
 * same props as {@link DocumentRequest} plus `reason`, `typeLabels`,
 * `statusLabels` and `confirmPayLabel`.
 *
 * ## Five changes
 *
 * 1. **A denied request says why, and announces.** `denied` is one of the
 *    module's five rejection states and none of the five interfaces had a field
 *    for the reason. `reason` renders under the header when {@link isAdverse}
 *    is true and reaches a polite live region one commit after mount — a live
 *    region announces *changes*, so text present at first paint never speaks.
 * 2. **Paying a fee takes a confirming press.** "Pay fee" was one tap on a
 *    ~32px target, with no confirm, no pending state and no undo. It arms
 *    first, renames itself, and disarms on blur.
 * 3. **The request number is labelled**, so a reader hears what "DOC-9931"
 *    identifies rather than four digits, and the fee, the paid flag and the
 *    date read as one caption rather than two spans at opposite ends of a row.
 * 4. **A document type is identity.** The leading disc was `bg-primary-50`, a
 *    ramp step that mirrors under `[data-theme="dark"]` and paints a near-white
 *    plate on a dark card, with its glyph in the `primary` **fill** used as
 *    ink. It takes the neutral identity tint and the contrast-corrected ink.
 * 5. **Both actions clear 44.** `size="sm"` is about 32px, and neither `Button`
 *    primitive sets a minimum height — so every action in this module was under
 *    the tap floor.
 */
export declare const DocumentRequestV4: React.ForwardRefExoticComponent<DocumentRequestV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DocumentRequestV4.d.ts.map