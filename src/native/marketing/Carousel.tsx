import * as React from 'react';
import {
  ScrollView,
  View,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import { useReducedMotion } from '../primitives/internal/useReducedMotion';

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
export function Carousel({
  items,
  dots = true,
  autoplay = 0,
  label = 'Carousel',
  style,
}: CarouselProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const reduced = useReducedMotion();
  const count = items.length;
  const [active, setActive] = React.useState(0);
  const [width, setWidth] = React.useState(0);
  const scrollerRef = React.useRef<ScrollView>(null);

  const goTo = React.useCallback(
    (index: number) => {
      if (count === 0 || width === 0) return;
      const nextIndex = ((index % count) + count) % count;
      setActive(nextIndex);
      scrollerRef.current?.scrollTo({
        x: nextIndex * width,
        animated: !reduced,
      });
    },
    [count, width, reduced]
  );

  React.useEffect(() => {
    if (!autoplay || autoplay <= 0 || reduced || count <= 1 || width === 0) {
      return undefined;
    }
    const id = setInterval(() => goTo(active + 1), autoplay);
    return () => clearInterval(id);
  }, [autoplay, reduced, count, width, active, goTo]);

  const onLayout = (event: LayoutChangeEvent): void => {
    setWidth(event.nativeEvent.layout.width);
  };

  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
    if (width === 0) return;
    const next = Math.round(event.nativeEvent.contentOffset.x / width);
    setActive(next);
  };

  return (
    <View testID="xen-carousel" accessibilityLabel={label} style={style}>
      <ScrollView
        ref={scrollerRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onLayout={onLayout}
        onMomentumScrollEnd={onMomentumScrollEnd}
      >
        {items.map((slide, i) => (
          <View key={i} style={{ width: width || undefined }}>
            {slide}
          </View>
        ))}
      </ScrollView>

      {dots && count > 1 ? (
        <View
          testID="xen-carousel-dots"
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: tokens.spacing.xs,
            marginTop: tokens.spacing.md,
          }}
        >
          {items.map((_, i) => (
            <View
              key={i}
              accessibilityRole="button"
              accessibilityLabel={`Go to slide ${i + 1}`}
              accessibilityState={{ selected: i === active }}
              onTouchEnd={() => goTo(i)}
              style={{
                height: 8,
                width: i === active ? 20 : 8,
                borderRadius: tokens.radius.full,
                backgroundColor: i === active ? colors.primary : tokens.ramps.neutral[300],
              }}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}
