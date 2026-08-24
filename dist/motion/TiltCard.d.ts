import * as React from 'react';
export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Maximum tilt angle in degrees (clamped to 15). */
    maxTilt?: number;
}
/**
 * Pointer-tracked 3D tilt. The tilt resets on pointer leave and is disabled
 * for touch pointers and under `prefers-reduced-motion`. State is written
 * straight to the element style (no re-render per pointer move).
 */
export declare const TiltCard: React.ForwardRefExoticComponent<TiltCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TiltCard.d.ts.map