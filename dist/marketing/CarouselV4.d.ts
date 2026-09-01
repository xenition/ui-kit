import * as React from 'react';
import type { CarouselProps } from './Carousel';
/** Drop-in for {@link CarouselProps} — same props, the V4 "showcase" design. */
export type CarouselV4Props = CarouselProps;
/**
 * Carousel — **V4** "showcase" design (web parity of the native V4). A refined
 * slider: the same scroll-snapping, keyboard-navigable, autoplay-honoring track
 * as the base `Carousel`, re-skinned as a rounded showcase surface with tactile
 * ≥44px round prev/next controls and clear dot indicators (active = a wide
 * primary pill, others = muted — never color alone; the active dot also carries
 * `aria-selected`). Honors `autoplay` (paused on hover/focus and under reduced
 * motion), `arrows`, `dots`, `label`, and `items`/children. Same props/behavior
 * as {@link CarouselProps}; token-only colors, no literals.
 */
export declare const CarouselV4: React.ForwardRefExoticComponent<CarouselProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CarouselV4.d.ts.map