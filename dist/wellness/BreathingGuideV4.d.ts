import * as React from 'react';
import type { BreathingGuideProps } from './BreathingGuide';
export type BreathingGuideV4Props = BreathingGuideProps;
/**
 * BreathingGuideV4 — the "calm" restyle of {@link BreathingGuide}. The CSS
 * `transform` transition, the phase timer, and the reduced-motion kill switch are
 * copied exactly, so the same props, callbacks (`onPhaseChange`/`onCycleComplete`)
 * and a11y hold; only the visuals change: the breathing circle is a soft gradient
 * surface (`bg-gradient-to-br from-primary-400 to-primary-700`) with the phase
 * caption in near-white ink (`text-on-primary`) and the sub-caption in `text-muted`.
 * Token-only colors.
 */
export declare const BreathingGuideV4: React.ForwardRefExoticComponent<BreathingGuideProps & React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BreathingGuideV4.d.ts.map