import * as React from 'react';
import type { PianoKeysProps } from './PianoKeys';
/** Same public contract as {@link PianoKeys} — a drop-in alternate design. */
export type PianoKeysV3Props = PianoKeysProps;
/**
 * PianoKeys, redesigned (v3): a **mini keyboard strip**. Very short, label-less
 * keys for a tight inline control; held keys light with an accent fill + a marker
 * dot (never color alone). The opposite of v2's chunky keyboard. `showLabels`
 * still honored if explicitly set. Same props, token-only.
 */
export declare const PianoKeysV3: React.ForwardRefExoticComponent<PianoKeysProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PianoKeysV3.d.ts.map