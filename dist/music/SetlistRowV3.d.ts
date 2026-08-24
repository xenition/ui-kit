import * as React from 'react';
import type { SetlistRowProps } from './SetlistRow';
/** Same public contract as {@link SetlistRow} — a drop-in alternate design. */
export type SetlistRowV3Props = SetlistRowProps;
/**
 * SetlistRow, redesigned (v3): a **dense playlist line**. The index leads as a
 * tabular number, the title·artist share one line, the duration pins right, and a
 * quiet play glyph trails — hairline-bordered for a long set. A ♪ marks the
 * playing row (never color alone). The opposite of v2's card. Same props,
 * token-only.
 */
export declare const SetlistRowV3: React.ForwardRefExoticComponent<SetlistRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SetlistRowV3.d.ts.map