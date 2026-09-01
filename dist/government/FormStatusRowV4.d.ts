import * as React from 'react';
import type { FormStatusRowProps, FormStatusValue } from './FormStatusRow';
export interface FormStatusRowV4Props extends FormStatusRowProps {
    /** Why the form was rejected, or what action it needs. Rendered when adverse. */
    reason?: string;
    /** Override the six status words — `'Action needed'`, `'Rejected'`, … */
    statusLabels?: Partial<Record<FormStatusValue, string>>;
}
/**
 * **V4 form status row** — the web twin of the native `FormStatusRowV4`, same
 * props as {@link FormStatusRow} plus `reason` and `statusLabels`.
 *
 * ## Five changes
 *
 * 1. **"Action needed" can say what action.** `action-needed` and `rejected`
 *    are the two states this row exists to communicate and the prop interface
 *    had no field for why — the status that stops an application was a pill and
 *    nothing else. `reason` renders under the title and joins the row's name
 *    whenever {@link isAdverse} is true.
 * 2. **An interactive row is a real `<button>`.** The base was a `div` with
 *    `role="button"`, `tabIndex` and a hand-written Enter/Space handler: three
 *    approximations of what a button already does, and the mechanism behind the
 *    Space bug on `ServiceCard`.
 * 3. **One name carrying the agency and the date.** The fixed
 *    `` `Form ${n}, ${title}, ${status}` `` template dropped the agency that
 *    owns the form and the date it was filed — and `role="button"` makes the
 *    subtree presentational, so nothing else was reachable either.
 * 4. **The form number is labelled**, so a reader hears what "APP-77412"
 *    identifies rather than a string of digits, and the agency stops being
 *    glued on with a bare `·` span.
 * 5. **It joins the shared row family** — one height, one 44 leading slot, one
 *    state layer — so a form list, a complaint list and a settings list are one
 *    rhythm. `hover:opacity-80` is M3's *disabled* signal, `ring-primary-300`
 *    is a ramp step, and the leading disc's ink was the `success` / `danger`
 *    **fill** used as a glyph on a tint of itself.
 *
 * The reason is **not** put in a live region here, deliberately: this is a list
 * row, and twenty rejected forms queueing twenty announcements is the failure
 * mode `role="alert"` warnings exist to prevent. `PermitStatusV4` — one permit,
 * one screen — is where the announcement belongs.
 */
export declare const FormStatusRowV4: React.ForwardRefExoticComponent<FormStatusRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FormStatusRowV4.d.ts.map