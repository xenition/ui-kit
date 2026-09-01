import * as React from 'react';
import type { FeedingScheduleProps } from './FeedingSchedule';
/** Drop-in for {@link FeedingScheduleProps} — same props, the V4 "companion" design. */
export type FeedingScheduleV4Props = FeedingScheduleProps;
/**
 * FeedingSchedule — **V4** "companion" design. The warm, friendly take on a daily
 * feeding checklist: an elevated rounded card with a soft shadow, a title +
 * fed/total summary, and one restyled row per meal — the meal-time glyph in a
 * soft-primary tinted well, food + time/portion meta, and a tappable checkbox
 * that toggles served/fed. Same props/behavior as {@link FeedingScheduleProps};
 * every `meal.type` reads via a glyph and fed state via a check glyph + a11y
 * state (never color alone). Token-only colors via `useXenitionTheme()`; rows
 * keep ≥44px tap targets. Web/native parity.
 */
export declare function FeedingScheduleV4({ meals, title, onToggle, emptyLabel, style, }: FeedingScheduleV4Props): React.ReactElement;
//# sourceMappingURL=FeedingScheduleV4.d.ts.map