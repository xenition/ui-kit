import * as React from 'react';
import type { RecordButtonProps } from './RecordButton';
/** Drop-in for {@link RecordButtonProps} — same props, the V4 "session" design. */
export type RecordButtonV4Props = RecordButtonProps;
/**
 * RecordButton — **V4** "session" design (web parity of the native V4). The
 * tactile arm/record control: a round `danger`-token button whose glyph
 * **morphs from a ● dot (idle) to a rounded ■ square (recording)** and adds a
 * leading `●` marker + "Rec"/"Stop" label in the `labeled` variant — the state
 * is surfaced by shape, marker and label, **never color alone**. Honors every
 * `variant` (`ring` outlined, `solid` filled, `labeled` ring + text/timer) and
 * `size` (`sm`/`md`/`lg`, its own ≥44px scale). Pressing fires `onToggle(next)`;
 * the `labeled` variant shows the `elapsedSeconds` timer while recording. No
 * gradient — clean/tactile. All colors from `--xen-*` token classes.
 */
export declare const RecordButtonV4: React.ForwardRefExoticComponent<RecordButtonProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RecordButtonV4.d.ts.map