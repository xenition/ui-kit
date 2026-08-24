import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Composition variants — accepted for parity with the web `GenerativeCover`. */
export type CoverForm = 'arc' | 'bands' | 'orbit' | 'grid' | 'wave' | 'stack';
export interface GenerativeCoverProps {
    /** Stable seed — same seed yields the same cover (product slug/title). */
    seed: string | number;
    /** Optional label rendered over the art (product initials fallback). */
    label?: string;
    /**
     * Composition — accepted for parity with the web cover. Native renders a
     * seeded gradient (no SVG), so `form` only varies the gradient direction
     * rather than the full geometric composition.
     */
    form?: CoverForm;
    /** Foreground color role (e.g. `primary-700`, `accent`) → the gradient's far stop. */
    ink?: string;
    /** Background color role (e.g. `neutral-100`, `surface`) → the gradient's near stop. */
    paper?: string;
    style?: StyleProp<ViewStyle>;
}
export declare function GenerativeCover({ seed, label, form, ink, paper, style, }: GenerativeCoverProps): React.ReactElement;
//# sourceMappingURL=GenerativeCover.d.ts.map