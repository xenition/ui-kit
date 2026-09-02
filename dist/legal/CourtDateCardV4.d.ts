import * as React from 'react';
import type { CourtDateCardProps } from './CourtDateCard';
/** Drop-in for {@link CourtDateCardProps} — same props, the V4 "chambers" design. */
export type CourtDateCardV4Props = CourtDateCardProps;
/**
 * CourtDateCard — **V4** "chambers" design (web parity of the native V4). The
 * distinguished, chambers take on a court date / filing deadline: an elevated
 * rounded card with a soft shadow, a leading soft-primary event-glyph block, the
 * date + time, event-type and urgency pills (each a glyph + word so nothing rests
 * on color alone), an optional toned countdown, and venue / judge / case
 * metadata. A `today` / `soon` urgency tints the countdown for triage. When
 * `onClick` is set the card is a keyboard-activable `role="button"`. Reuses the
 * base `variant` (`default` / `compact`). All colors from `--xen-*` token classes
 * (no literals).
 */
export declare const CourtDateCardV4: React.ForwardRefExoticComponent<CourtDateCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CourtDateCardV4.d.ts.map