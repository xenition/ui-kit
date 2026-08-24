import * as React from 'react';
/** Inspection result — text + glyph + color (never color-alone). */
export type InspectionResult = 'pass' | 'fail' | 'na' | 'pending';
export interface InspectionRowProps {
    /** Inspection checkpoint label (e.g. "Fire extinguisher charged"). */
    label: string;
    /** Result — conveyed by text + glyph + color. */
    result: InspectionResult;
    /** Reference code shown as a meta line (e.g. "NFPA 10"). */
    code?: string;
    /** Inspector note / defect description shown under the label. */
    note?: string;
    /** Fires on row click (e.g. open the checkpoint detail). */
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * One line in an inspection checklist: a tinted result glyph disc, a
 * label/code/note stack, and a result pill. The result is conveyed redundantly
 * (glyph + label + a color that traces to a semantic token: pass → success,
 * fail → danger) so it is never color-alone. Becomes a `role="button"` surface
 * only when `onClick` is supplied. No literal colors.
 */
export declare const InspectionRow: React.ForwardRefExoticComponent<InspectionRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=InspectionRow.d.ts.map