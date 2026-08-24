import * as React from 'react';
import type { EpisodeRowProps } from './EpisodeRow';
/** Same public contract as {@link EpisodeRow} — a drop-in alternate design. */
export type EpisodeRowV3Props = EpisodeRowProps;
/**
 * EpisodeRow, redesigned (v3): a **dense playlist line**. A compact play glyph,
 * the title over a show·date·duration line, a thin resume underline, and an
 * optional download — hairline-bordered for a long feed. The opposite of v2's
 * card. Same props, token-only.
 */
export declare const EpisodeRowV3: React.ForwardRefExoticComponent<EpisodeRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EpisodeRowV3.d.ts.map