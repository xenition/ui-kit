import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
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
    /** Fires on row press (e.g. open the checkpoint detail). */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * One line in an inspection checklist: a tinted result glyph disc, a
 * label/code/note stack, and a result pill. The result is conveyed redundantly
 * (glyph + label + a color that traces to a `SemanticColors` slot: pass →
 * success, fail → danger) so it is never color-alone. Becomes a button only
 * when `onPress` is supplied. No literal colors.
 */
export declare function InspectionRow({ label, result, code, note, onPress, style, }: InspectionRowProps): React.ReactElement;
//# sourceMappingURL=InspectionRow.d.ts.map