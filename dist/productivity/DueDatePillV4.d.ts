import * as React from 'react';
import type { DueDatePillProps } from './DueDatePill';
/** Drop-in for {@link DueDatePillProps} — same props, the V4 "flow" design. */
export type DueDatePillV4Props = DueDatePillProps;
/**
 * DueDatePill — **V4** "flow" design (web parity of the native V4). The
 * focused-workspace take on a deadline: a rounded **soft-tint** pill with a
 * leading calendar/clock glyph and the date, colored by urgency `tone`. Calm by
 * default (a gentle primary wash), escalating to danger/warn only when the date
 * demands it — and always paired with a glyph so urgency never rides on color
 * alone. Same props/behavior as {@link DueDatePillProps}; every color traces to
 * an `--xen-*` token class (no literals).
 */
export declare const DueDatePillV4: React.ForwardRefExoticComponent<DueDatePillProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=DueDatePillV4.d.ts.map