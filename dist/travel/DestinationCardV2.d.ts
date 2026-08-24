import * as React from 'react';
import type { DestinationCardProps } from './DestinationCard';
/** Same public contract as {@link DestinationCard} — a drop-in alternate design. */
export type DestinationCardV2Props = DestinationCardProps;
/**
 * DestinationCard, redesigned (v2): a **full-bleed destination hero**. A big
 * tinted media panel with the glyph watermark, a corner badge, and the name/
 * country/tagline over a scrim, with a "from" price chip floating. Elevated,
 * hover-lift. Same props as {@link DestinationCard}, token-only.
 */
export declare const DestinationCardV2: React.ForwardRefExoticComponent<DestinationCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DestinationCardV2.d.ts.map