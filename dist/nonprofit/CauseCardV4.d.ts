import * as React from 'react';
import type { CauseCardProps } from './CauseCard';
/** Drop-in for {@link CauseCardProps} — same props, the V4 "rally" design. */
export type CauseCardV4Props = CauseCardProps;
/**
 * CauseCard — **V4** "rally" design (web parity of the native V4). The warm,
 * mission-driven browse tile for a cause: an elevated rounded card with a soft
 * shadow, a cover (image or a friendly glyph in a soft-primary well), a
 * soft-primary category chip, a bold title + blurb, and an inline
 * `CampaignProgressV4` meter when a goal is supplied. Honors all three
 * `variant`s — `default` (cover on top), `compact` (cover-less row), and
 * `featured` (larger cover + title) — identical props/behavior to
 * {@link CauseCardProps}. `onClick` makes the whole card a keyboard-activatable
 * button. All colors from `--xen-*` token classes (no literals).
 */
export declare const CauseCardV4: React.ForwardRefExoticComponent<CauseCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CauseCardV4.d.ts.map