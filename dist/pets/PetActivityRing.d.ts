import * as React from 'react';
import type { ChartColor } from '../charts';
export type PetActivityVariant = 'walk' | 'play' | 'exercise' | 'steps' | 'calories';
export interface PetActivityRingProps {
    /** Activity type; drives the icon, label, unit and default color. */
    variant: PetActivityVariant;
    /** Current value toward the goal. */
    value: number;
    /** Goal / full-ring value. Non-positive renders a "No goal set" state. */
    goal: number;
    /** Ring diameter in px. */
    size?: number;
    /** Override the variant's accent color (a chart color token). */
    color?: ChartColor;
    /** Show the label + value line beneath the ring. */
    showCaption?: boolean;
    /** Extra classes on the root. */
    className?: string;
}
/**
 * A single activity goal ring for a pet (walk / play / steps …), built on the
 * charts {@link ProgressRing}. The center shows the percentage; an optional
 * caption repeats the label and raw value/goal. Guards a non-positive goal with
 * a muted "No goal set" note. Token-only colors.
 */
export declare const PetActivityRing: React.ForwardRefExoticComponent<PetActivityRingProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PetActivityRing.d.ts.map