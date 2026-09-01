import * as React from 'react';
import type { SetlistRowProps } from './SetlistRow';
/** Drop-in for {@link SetlistRowProps} — same props, the V4 "session" design. */
export type SetlistRowV4Props = SetlistRowProps;
/**
 * SetlistRow — **V4** "session" design. The tactile DAW take on a setlist row: a
 * rounded control surface where the playing row lights with a soft-primary fill,
 * a primary border, a leading `♪` marker and a left accent bar (never color
 * alone), the title reads bold, and the key/BPM/duration meta sits on one line.
 * Honors both `variant`s (`full` / `compact`) and the empty-slot state, identical
 * props/behavior to {@link SetlistRowProps}. The optional play button is a
 * satisfying ≥44px round control. Token-only colors via `useXenitionTheme()`.
 */
export declare function SetlistRowV4({ song, index, playing, variant, emptyLabel, onPress, onPlay, style, }: SetlistRowV4Props): React.ReactElement;
//# sourceMappingURL=SetlistRowV4.d.ts.map