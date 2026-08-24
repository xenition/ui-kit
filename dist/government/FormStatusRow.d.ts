import * as React from 'react';
import { type FormStatusValue } from './internal/status';
export type { FormStatusValue };
export interface FormStatusRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'> {
    /** Form / application reference (e.g. "APP-77412"). */
    formNumber: string;
    /** Short title of the form (e.g. "Homestead exemption"). */
    title: string;
    /** Submission lifecycle status — conveyed by text + glyph + color. */
    status: FormStatusValue;
    /** Agency / department that owns the form. */
    agency?: string;
    /** Localized date (submitted / last updated, already formatted). */
    date?: string;
    /** Fires on row click (e.g. open form detail / continue). */
    onClick?: () => void;
}
/**
 * One line in a list of submitted civic forms / applications: a tinted status
 * glyph disc, a title/number stack, and a status pill. Status is conveyed
 * redundantly (glyph + label + a color that traces to a semantic token slot:
 * complete → success, rejected/action-needed → danger) — never color alone.
 * Becomes a keyboard-operable button only when `onClick` is supplied. Web parity
 * of the native `FormStatusRow`.
 */
export declare const FormStatusRow: React.ForwardRefExoticComponent<FormStatusRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FormStatusRow.d.ts.map