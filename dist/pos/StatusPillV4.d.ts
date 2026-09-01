import * as React from 'react';
import type { StatusPillProps } from './StatusPill';
/** Drop-in for {@link StatusPillProps} — same props, the V4 "register" design. */
export type StatusPillV4Props = StatusPillProps;
/**
 * StatusPill — **V4** "register" design (web parity of the native V4). A refined,
 * tactile status chip: the same **glyph + word** contract (state never by color
 * alone), rendered as a crisp soft-tint rounded pill with a touch more presence —
 * slightly bolder label, a hair more padding for legibility at the counter. Color
 * always resolves from a `--xen-*` token class for the base's tone. `inline`
 * drops the pill chrome for dense rows; `solid` fills. Same props/behavior as
 * {@link StatusPillProps} (tones + sizes preserved); no literals.
 */
export declare const StatusPillV4: React.ForwardRefExoticComponent<StatusPillProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=StatusPillV4.d.ts.map