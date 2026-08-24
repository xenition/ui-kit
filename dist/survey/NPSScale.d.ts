import * as React from 'react';
/** NPS bucket for a 0-10 score. */
export type NPSBucket = 'detractor' | 'passive' | 'promoter';
/** Classify a 0-10 score into its Net Promoter bucket. */
export declare function npsBucket(score: number): NPSBucket;
export interface NPSScaleProps {
    /** Selected score 0-10. `null`/`undefined` → nothing selected. */
    value?: number | null;
    /** Fires with the chosen 0-10 score. */
    onChange?: (value: number) => void;
    /** Anchor under the 0 end. Default `'Not at all likely'`. */
    minLabel?: string;
    /** Anchor under the 10 end. Default `'Extremely likely'`. */
    maxLabel?: string;
    /**
     * Color each cell by its NPS bucket (detractor=danger, passive=warn,
     * promoter=success) instead of the flat primary fill. Default `false`.
     */
    colorByBucket?: boolean;
    /** Accessible name for the scale. Default `'Likelihood to recommend, 0 to 10'`. */
    'aria-label'?: string;
    disabled?: boolean;
    className?: string;
}
/**
 * The 0-10 Net Promoter Score picker — eleven `radio` cells in a `radiogroup`
 * with anchor labels under the extremes. Each cell announces its bucket
 * (detractor / passive / promoter) so the meaning is never conveyed by color
 * alone; `colorByBucket` additionally tints selected cells by bucket using the
 * danger / warn / success tokens. Selection uses the primary token otherwise.
 * No literal colors.
 */
export declare const NPSScale: React.ForwardRefExoticComponent<NPSScaleProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=NPSScale.d.ts.map