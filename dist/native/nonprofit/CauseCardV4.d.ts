import * as React from 'react';
import type { CauseCardProps } from './CauseCard';
/** Drop-in for {@link CauseCardProps} — same props, the V4 "rally" design. */
export type CauseCardV4Props = CauseCardProps;
/**
 * CauseCard — **V4** "rally" design. The warm, mission-driven browse tile for a
 * cause: an elevated rounded card with a soft shadow, a cover (image or a
 * friendly glyph in a soft-primary well), a soft-primary category chip, a bold
 * title + blurb, and an inline `CampaignProgressV4` meter when a goal is
 * supplied. Honors all three `variant`s — `default`, `compact`, `featured` —
 * identical props/behavior to {@link CauseCardProps}; the whole card is pressable
 * via `onPress`. Token-only colors via `useXenitionTheme()`.
 */
export declare function CauseCardV4({ title, description, imageUrl, imageAlt, category, raisedCents, goalCents, currency, variant, onPress, loading, style, }: CauseCardV4Props): React.ReactElement;
//# sourceMappingURL=CauseCardV4.d.ts.map