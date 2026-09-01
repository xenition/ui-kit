import * as React from 'react';
import type { CarouselProps } from './Carousel';
/** Drop-in for {@link CarouselProps} — same props, the V4 "showcase" design. */
export type CarouselV4Props = CarouselProps;
/**
 * Carousel — **V4** "showcase" design (native mirror of the web V4). A refined
 * page-snapping slider: the same `pagingEnabled` horizontal `ScrollView` as the
 * base native `Carousel`, re-skinned with a rounded showcase track, tactile
 * ≥44px round prev/next controls, and clear dot indicators (active = a wide
 * primary pill, others = muted — never color alone; the active dot also carries
 * an `accessibilityState.selected`). As with the base native `Carousel`, the
 * web hover/focus pause has no touch analogue; `autoplay` still honors reduced
 * motion (paused) and a single-slide carousel (no-op). Honors `items`, `dots`,
 * `autoplay`, `label`. Same props/behavior as {@link CarouselProps}; token-only
 * colors, no literals.
 */
export declare function CarouselV4({ items, dots, autoplay, label, style, }: CarouselV4Props): React.ReactElement;
//# sourceMappingURL=CarouselV4.d.ts.map