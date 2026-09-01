import * as React from 'react';
import type { FeedingScheduleProps } from './FeedingSchedule';
/** Drop-in for {@link FeedingScheduleProps} — same props, the V4 "companion" design. */
export type FeedingScheduleV4Props = FeedingScheduleProps;
/**
 * FeedingSchedule — **V4** "companion" design (web parity of the native V4). The
 * warm, friendly take on a daily feeding checklist: an elevated rounded card with
 * a soft shadow, a title + fed/total summary, and one restyled row per meal — the
 * meal-time glyph in a soft-primary tinted well, food + time/portion meta, and a
 * tappable `role="checkbox"` control that toggles served/fed. Same props/behavior
 * as {@link FeedingScheduleProps}; every `meal.type` reads via a glyph and fed
 * state via a check glyph + `aria-checked` (never color alone). All colors from
 * `--xen-*` token classes (no literals); rows keep ≥44px tap targets.
 */
export declare const FeedingScheduleV4: React.ForwardRefExoticComponent<FeedingScheduleProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FeedingScheduleV4.d.ts.map