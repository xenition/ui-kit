import * as React from 'react';
import type { MixerProps } from './Mixer';
/** Same public contract as {@link Mixer} — a drop-in alternate design. */
export type MixerV2Props = MixerProps;
/**
 * Mixer, redesigned (v2): a **console of channel tiles**. Each strip is its own
 * bordered card in a responsive two-column grid — name header, a labelled fader,
 * and pill Mute/Solo toggles — rather than v1's flat stack. Elevated feel. Same
 * props, token-only.
 */
export declare const MixerV2: React.ForwardRefExoticComponent<MixerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MixerV2.d.ts.map