import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { Salary } from './types';
export type SalaryRangeSize = 'sm' | 'md' | 'lg';
export interface SalaryRangeProps {
    /** The salary band. Either bound may be omitted. */
    salary?: Salary | null;
    /** Text size from the type scale. Default `'md'`. */
    size?: SalaryRangeSize;
    /** Override the rendered label (bypasses the built-in formatter). */
    format?: (salary: Salary) => string;
    /** Shown when the band has no bounds. Default `'Salary not disclosed'`. */
    emptyLabel?: string;
    /** Leading glyph. Default `'💰'`; pass `null` to hide. */
    glyph?: string | null;
    style?: StyleProp<ViewStyle>;
}
/**
 * Inline salary-band label — e.g. `💰 $90k – $120k/yr`. Data-only: pass a
 * {@link Salary} and it formats a compact range, a `From …`/`Up to …` label for
 * a single bound, or the `emptyLabel` when nothing is disclosed. All colors come
 * from theme tokens (`onSurface` for the amount, `muted` for the empty hint).
 */
export declare function SalaryRange({ salary, size, format, emptyLabel, glyph, style, }: SalaryRangeProps): React.ReactElement;
//# sourceMappingURL=SalaryRange.d.ts.map