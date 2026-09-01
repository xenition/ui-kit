import * as React from 'react';
import type { BentoCardProps, BentoGridProps } from './Bento';
/** Drop-in for {@link BentoCardProps} — same props, the V4 "showcase" design. */
export type BentoCardV4Props = BentoCardProps;
/** Drop-in for {@link BentoGridProps} — same props, the V4 "showcase" design. */
export type BentoGridV4Props = BentoGridProps;
/**
 * BentoCard — **V4** "showcase" design (native mirror of the web V4). One bento
 * cell as an image-forward, elevated rounded showcase card: a floating
 * soft-primary media well carrying the `visual` (or a glyph placeholder when
 * empty), a soft-primary metric chip, an extra-bold tight-tracked title, muted
 * body copy, and a pinned detail line. NOT a gradient surface — a clean elevated
 * card (`colors.card` + border + soft shadow). Same props/behavior as the base
 * {@link BentoCardProps}; token-only colors, no literals.
 */
export declare function BentoCardV4({ icon, metric, title, body, visual, detail, style, }: BentoCardV4Props): React.ReactElement;
/**
 * BentoGrid — **V4** "showcase" design (native mirror of the web V4). A stacked
 * (wrapping) list of elevated `BentoCardV4`s. As with the base native `BentoGrid`,
 * the web's asymmetric span/overlap geometry has no phone analogue and is dropped
 * — cards render as a simple stack. Cards fade + rise once on mount (skipped under
 * the OS "Reduce Motion" toggle). Accepts the base's `cards` data array or
 * `BentoCardV4` children (array wins). Same props/behavior as the base
 * {@link BentoGridProps}; token-only colors, no literals.
 */
export declare function BentoGridV4({ cards, children, style }: BentoGridV4Props): React.ReactElement;
//# sourceMappingURL=BentoV4.d.ts.map