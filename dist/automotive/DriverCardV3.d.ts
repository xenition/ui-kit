import * as React from 'react';
import type { DriverCardProps } from './DriverCard';
/** Same public contract as {@link DriverCard} — a drop-in alternate design. */
export type DriverCardV3Props = DriverCardProps;
/**
 * DriverCard, redesigned (v3): a **dense driver row**. A small avatar (online dot),
 * the name over a rating·vehicle line, a plate chip, and the ETA + a call glyph on
 * the right — hairline-bordered for a list. The opposite of v2's card. Same props,
 * token-only.
 */
export declare const DriverCardV3: React.ForwardRefExoticComponent<DriverCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DriverCardV3.d.ts.map