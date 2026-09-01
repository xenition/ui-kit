import * as React from 'react';
import type { BentoGridProps, BentoCardProps } from './Bento';
/** Drop-in for {@link BentoGridProps} — same props, the V4 "showcase" design. */
export type BentoGridV4Props = BentoGridProps;
/** Drop-in for {@link BentoCardProps} — same props, the V4 "showcase" design. */
export type BentoCardV4Props = BentoCardProps;
/**
 * BentoGrid — **V4** "showcase" design (web parity of the native V4). The same
 * asymmetric 6-column bento canvas as the base `BentoGrid` where cards declare
 * their own spans, re-skinned for the image-forward showcase look: cards are
 * clean elevated surfaces on the page ground rather than the base's hover-glow
 * panels. Same props/behavior as {@link BentoGridProps} (`columns` drives the
 * `lg` grid). Token-only colors, no literals.
 */
export declare const BentoGridV4: React.ForwardRefExoticComponent<BentoGridProps & React.RefAttributes<HTMLDivElement>>;
/**
 * BentoCard — **V4** "showcase" design (web parity of the native V4). One bento
 * cell re-skinned as an elevated rounded showcase card: a floating soft-primary
 * media well carrying the `visual` (or an icon glyph placeholder when empty), a
 * soft-primary metric chip, an extra-bold tight-tracked title, muted body copy,
 * and a pinned detail line. The base's hover energy `wash` is repurposed as a
 * "featured" flag: `wash` cards get a soft-primary tint + primary ring (not a
 * full brand gradient). Honors `span`/`rowSpan` (grid geometry), `icon`,
 * `metric`, `title`, `visual`, `detail`. Same props/behavior as
 * {@link BentoCardProps}; token-only colors, no literals.
 */
export declare const BentoCardV4: React.ForwardRefExoticComponent<BentoCardProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=BentoV4.d.ts.map