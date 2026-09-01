import * as React from 'react';
import type { AmenityRowProps } from './AmenityRow';
/** Drop-in for {@link AmenityRowProps} — same props, the V4 "journey" design. */
export type AmenityRowV4Props = AmenityRowProps;
/**
 * AmenityRow — **V4** "journey" design. The boarding-pass take on a property's
 * amenities: each amenity leads with a small brand-gradient glyph disc (the
 * signature V4 touch), the name, and a trailing availability indicator — a `✓`
 * in the success tone when offered, a muted `✕` (with the label struck) when
 * not, so availability never rides on color alone. Honors `variant` — `list`
 * stacks one disc-led row each; `wrap` lays the discs out as inline chips.
 * Renders an empty hint when the list is empty. Same props/behavior as
 * {@link AmenityRowProps}; token-only colors via `useXenitionTheme()`.
 */
export declare function AmenityRowV4({ amenities, variant, style }: AmenityRowV4Props): React.ReactElement;
//# sourceMappingURL=AmenityRowV4.d.ts.map