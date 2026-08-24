import * as React from 'react';
import type { PianoKeysProps } from './PianoKeys';
/** Same public contract as {@link PianoKeys} — a drop-in alternate design. */
export type PianoKeysV2Props = PianoKeysProps;
/**
 * PianoKeys, redesigned (v2): a **chunky rounded keyboard**. Taller white keys
 * with a small gap and fully rounded bottoms; held keys fill solid primary (with
 * an on-primary label) rather than a soft tint. Black keys are rounded caps. A
 * bolder, tactile skin vs. v1's flat keys. Same props, token-only.
 */
export declare const PianoKeysV2: React.ForwardRefExoticComponent<PianoKeysProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PianoKeysV2.d.ts.map