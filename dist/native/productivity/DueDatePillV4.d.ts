import * as React from 'react';
import type { DueDatePillProps } from './DueDatePill';
/** Drop-in for {@link DueDatePillProps} — same props, the V4 "flow" design. */
export type DueDatePillV4Props = DueDatePillProps;
/**
 * DueDatePill — **V4** "flow" design. The focused-workspace take on a deadline:
 * a rounded **soft-tint** pill with a leading calendar/clock glyph and the date,
 * colored by urgency `tone`. Calm by default (a gentle primary wash), escalating
 * to danger/warn only when the date demands it — and always paired with a glyph
 * so urgency never rides on color alone. Same props/behavior as
 * {@link DueDatePillProps}; token-only colors via `useXenitionTheme()`.
 */
export declare function DueDatePillV4({ label, tone, glyph, style }: DueDatePillV4Props): React.ReactElement;
//# sourceMappingURL=DueDatePillV4.d.ts.map