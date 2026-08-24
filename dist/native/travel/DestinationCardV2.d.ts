import * as React from 'react';
import type { DestinationCardProps } from './DestinationCard';
/**
 * Drop-in alternate design for {@link DestinationCard} — same props, new look.
 *
 * V2 is a **full-bleed poster**: a tall media placeholder with the glyph
 * enlarged behind, and the name / country / "from" price stacked over a
 * bottom-anchored scrim (stacked translucent token washes standing in for a
 * gradient — no literal color). The badge rides the top-left. Identical
 * `DestinationCardProps`.
 */
export type DestinationCardV2Props = DestinationCardProps;
export declare function DestinationCardV2({ name, country, tagline, glyph, fromCents, currency, badge, variant, appearance, onPress, style, }: DestinationCardV2Props): React.ReactElement;
//# sourceMappingURL=DestinationCardV2.d.ts.map