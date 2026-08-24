import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type FormStatusValue } from './internal/status';
export type { FormStatusValue };
export interface FormStatusRowProps {
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
    /** Fires on row press (e.g. open form detail / continue). */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * One line in a list of submitted civic forms / applications: a tinted status
 * glyph disc, a title/number stack, and a status pill. Status is conveyed
 * redundantly (glyph + label + a color that traces to a `SemanticColors` slot:
 * complete → success, rejected/action-needed → danger) — never color alone.
 * Becomes a button only when `onPress` is supplied.
 */
export declare function FormStatusRow({ formNumber, title, status, agency, date, onPress, style, }: FormStatusRowProps): React.ReactElement;
//# sourceMappingURL=FormStatusRow.d.ts.map