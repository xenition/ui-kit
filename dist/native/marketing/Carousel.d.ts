import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface CarouselProps {
    /** Slides to render, one per page (mirrors the web `items`/children). */
    items: React.ReactNode[];
    /** Show the dot pager. */
    dots?: boolean;
    /**
     * Auto-advance interval in ms (0 disables). Honors reduced motion (paused)
     * and a single-slide carousel (no-op).
     */
    autoplay?: number;
    /** Accessible label for the carousel region. */
    label?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Horizontal, page-snapping slider — the native mirror of the web `Carousel`.
 * The web version scroll-snaps a flex row; native uses a `pagingEnabled`
 * horizontal `ScrollView` where each slide is one page wide. Swiping drives the
 * active dot, and tapping a dot pages to that slide. The web prev/next arrows
 * and hover/focus pause are dropped (touch has no hover); autoplay still honors
 * reduced motion. Token-only.
 */
export declare function Carousel({ items, dots, autoplay, label, style, }: CarouselProps): React.ReactElement;
//# sourceMappingURL=Carousel.d.ts.map