import * as React from 'react';
import type { MixerProps } from './Mixer';
/** Same public contract as {@link Mixer} — a drop-in alternate design. */
export type MixerV3Props = MixerProps;
/**
 * Mixer, redesigned (v3): a **compact fader list**. Each channel is one thin row
 * — name on the left, a bare inline fader filling the middle, and a small mute
 * dot toggle on the right — for embedding many strips in a tight panel. The
 * opposite of v2's tile grid. Same props, token-only.
 */
export declare const MixerV3: React.ForwardRefExoticComponent<MixerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MixerV3.d.ts.map