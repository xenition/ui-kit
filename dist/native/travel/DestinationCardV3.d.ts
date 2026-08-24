import * as React from 'react';
import type { DestinationCardProps } from './DestinationCard';
/**
 * Drop-in alternate design for {@link DestinationCard} — same props, new look.
 *
 * V3 is a **compact tile**: a rounded glyph chip on the left with the name /
 * country / "from" price stacked beside it — a dense horizontal cell for grids
 * and carousels, no tall media banner. Honours `appearance`. Identical
 * `DestinationCardProps`.
 */
export type DestinationCardV3Props = DestinationCardProps;
export declare function DestinationCardV3({ name, country, tagline, glyph, fromCents, currency, badge, variant, appearance, onPress, style, }: DestinationCardV3Props): React.ReactElement;
//# sourceMappingURL=DestinationCardV3.d.ts.map