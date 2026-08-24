import * as React from 'react';
import type { TrackPadProps } from './TrackPad';
/** Same public contract as {@link TrackPad} — a drop-in alternate design. */
export type TrackPadV3Props = TrackPadProps;
/**
 * TrackPad, redesigned (v3): a **compact minimal grid** of small flat cells —
 * no card, no shadow, hairline separators only. A lit pad (`activePadIds`)
 * reads through a tiny filled beacon plus a bolder label (never color alone);
 * empty slots dim out and stop responding. Built for a tight strip above a
 * timeline. Accents trace to semantic token slots; no literals. Distinct at a
 * glance from v1's larger labelled squares. Same props.
 */
export declare function TrackPadV3({ pads, columns, variant, activePadIds, label, emptyLabel, onPadPress, style, }: TrackPadV3Props): React.ReactElement;
//# sourceMappingURL=TrackPadV3.d.ts.map