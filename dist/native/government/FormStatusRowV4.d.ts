import * as React from 'react';
import type { FormStatusRowProps, FormStatusValue } from './FormStatusRow';
export interface FormStatusRowV4Props extends FormStatusRowProps {
    /** Why the form was rejected or what action it needs. Rendered when the status is adverse. */
    reason?: string;
    /** Override the six status words (`'Action needed'`, `'Rejected'`, …). */
    statusLabels?: Partial<Record<FormStatusValue, string>>;
}
/**
 * **V4 form status row** — same props as {@link FormStatusRow} plus `reason`
 * and `statusLabels`.
 *
 * ## Four changes
 *
 * 1. **`action-needed` and `rejected` can say why.** The two states that exist
 *    to make somebody act carried no field for what to do or what went wrong —
 *    the row said "Action needed" and left the applicant to phone the agency.
 *    `isAdverse()` decides when the `reason` renders, and the line is an
 *    assertive live region so a status that changes under a reader is heard.
 * 2. **The form number is labelled.** It rendered as a bare "APP-77412",
 *    visibly and in the spoken name, with nothing saying what it identified.
 * 3. **The row is one name carrying the agency and the date.** The base's
 *    three-field template — number, title, status — pruned exactly the two
 *    fields an applicant chasing a form needs.
 * 4. **It is a row from the shared row line**, with the family's 44 leading
 *    slot, its metrics and its state layer, instead of `opacity: 0.7` — an
 *    opacity that dims the row's content the way M3 marks a *disabled* one.
 *    The status disc takes the contrast-corrected ink on a ground composited
 *    against an opaque ground, not a fill slot washed over whatever is behind
 *    it — a translucent tint is a different colour on every surface it lands on.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
export declare function FormStatusRowV4({ formNumber, title, status, agency, date, reason, statusLabels, onPress, style, }: FormStatusRowV4Props): React.ReactElement | null;
//# sourceMappingURL=FormStatusRowV4.d.ts.map