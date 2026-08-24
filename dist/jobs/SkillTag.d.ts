import * as React from 'react';
export type SkillTagVariant = 'default' | 'matched' | 'missing';
export interface SkillTagProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'onClick' | 'children'> {
    /** Skill label, e.g. `'TypeScript'`. */
    label: string;
    /**
     * Visual emphasis:
     * - `default` — a neutral keyword chip.
     * - `matched` — the applicant has this skill (success tones + ✓ marker).
     * - `missing` — required but not on the résumé (danger tones + ! marker).
     */
    variant?: SkillTagVariant;
    /** Marks the chip as selected (e.g. an active filter). */
    selected?: boolean;
    /** Makes the chip pressable (toggle a filter, open detail). `onPress` → `onClick`. */
    onClick?: () => void;
    /** Renders a × affordance that calls this. */
    onRemove?: () => void;
}
/**
 * A skill / keyword chip for job cards and résumé matching. Mirrors the
 * primitive `Tag` shape but adds a jobs-specific `variant` axis (`matched` /
 * `missing`) that pairs a token color with a leading glyph marker. Optionally
 * pressable (`onClick`) and removable (`onRemove`). Token-only.
 */
export declare const SkillTag: React.ForwardRefExoticComponent<SkillTagProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=SkillTag.d.ts.map