import * as React from 'react';
import type { SetlistRowProps } from './SetlistRow';
/** Drop-in for {@link SetlistRowProps} — same props, the V4 "session" design. */
export type SetlistRowV4Props = SetlistRowProps;
/**
 * SetlistRow — **V4** "session" design (web parity of the native V4). The
 * tactile DAW take on a setlist row: a rounded control surface where the playing
 * row lights with a soft-primary fill, a primary ring, and a leading `♪` marker
 * (never color alone), the title reads bold, and the key/BPM/duration meta sits
 * in a tabular-nums line. Honors both `variant`s (`full` / `compact`) and the
 * empty-slot state, identical props/behavior to {@link SetlistRowProps}. The
 * optional play button is a satisfying round control. All colors from `--xen-*`
 * token classes (no literals).
 */
export declare const SetlistRowV4: React.ForwardRefExoticComponent<SetlistRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SetlistRowV4.d.ts.map