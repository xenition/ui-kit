import * as React from 'react';
import type { SetlistRowProps } from './SetlistRow';
/** Same public contract as {@link SetlistRow} — a drop-in alternate design. */
export type SetlistRowV2Props = SetlistRowProps;
/**
 * SetlistRow, redesigned (v2): an **elevated track card**. A numbered medallion
 * leads (primary-filled when playing), the title/artist head the body over a
 * key·BPM·duration meta line, and a circular play button hangs on the right.
 * Distinct from v1's flat row. Same props, token-only.
 */
export declare const SetlistRowV2: React.ForwardRefExoticComponent<SetlistRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SetlistRowV2.d.ts.map