import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type SkillTagVariant = 'default' | 'matched' | 'missing';
export interface SkillTagProps {
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
    /** Makes the chip pressable (toggle a filter, open detail). */
    onPress?: () => void;
    /** Renders a × affordance that calls this. */
    onRemove?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A skill / keyword chip for job cards and résumé matching. Mirrors the
 * primitive `Tag` shape but adds a jobs-specific `variant` axis (`matched` /
 * `missing`) that pairs a token color with a leading glyph marker — so the
 * meaning survives for color-blind users and in monochrome. Optionally pressable
 * (`onPress`) and removable (`onRemove`). No literal colors.
 */
export declare function SkillTag({ label, variant, selected, onPress, onRemove, style, }: SkillTagProps): React.ReactElement;
//# sourceMappingURL=SkillTag.d.ts.map