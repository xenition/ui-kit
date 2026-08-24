import * as React from 'react';
import type { SetlistRowProps } from './SetlistRow';
/** Same public contract as {@link SetlistRow} — a drop-in alternate design. */
export type SetlistRowV3Props = SetlistRowProps;
/**
 * SetlistRow, redesigned (v3): a **dense numbered playlist line** — a fixed
 * position number, the title with an inline muted artist, and a right-aligned
 * duration, all on one tight row with no card chrome. `playing` swaps the
 * number for a ♪ marker and bolds the title (never color alone). An empty slot
 * dims to a placeholder line. Tapping fires `onPress`; the optional play button
 * fires `onPlay`. Token-only styling. Distinct at a glance from v1. Same props.
 */
export declare function SetlistRowV3({ song, index, playing, variant, emptyLabel, onPress, onPlay, style, }: SetlistRowV3Props): React.ReactElement;
//# sourceMappingURL=SetlistRowV3.d.ts.map