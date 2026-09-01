import * as React from 'react';
import type { BreathingGuideProps } from './BreathingGuide';
export type BreathingGuideV4Props = BreathingGuideProps;
/**
 * BreathingGuideV4 — the "calm" restyle of {@link BreathingGuide}. The Animated
 * scale, the phase timer, and the reduced-motion behavior are copied exactly, so
 * the same props, callbacks (`onPhaseChange`/`onCycleComplete`) and a11y hold;
 * only the visuals change: the breathing circle is a soft gradient surface with
 * the phase caption in near-white ink and the sub-caption in `mutedText`.
 */
export declare function BreathingGuideV4({ pattern, steps, running, size, onPhaseChange, onCycleComplete, label, style, }: BreathingGuideV4Props): React.ReactElement;
//# sourceMappingURL=BreathingGuideV4.d.ts.map