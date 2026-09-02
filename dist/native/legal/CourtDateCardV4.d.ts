import * as React from 'react';
import type { CourtDateCardProps } from './CourtDateCard';
/** Drop-in for {@link CourtDateCardProps} — same props, the V4 "chambers" design. */
export type CourtDateCardV4Props = CourtDateCardProps;
/**
 * CourtDateCard — **V4** "chambers" design (native twin of the web V4). An
 * elevated rounded card with a soft shadow, a leading soft-primary event-glyph
 * block, the date + time, event-type and urgency pills (each a glyph + word so
 * nothing rests on color alone), an optional toned countdown, and venue / judge /
 * case metadata. A `today` / `soon` urgency tints the countdown for triage.
 * Tappable when `onPress` is set. Reuses the base `variant` (`default` /
 * `compact`). Token-only colors via `useXenitionTheme()`.
 */
export declare function CourtDateCardV4({ type, date, time, court, judge, caseNumber, urgency, countdown, variant, onPress, testID, style, }: CourtDateCardV4Props): React.ReactElement;
//# sourceMappingURL=CourtDateCardV4.d.ts.map