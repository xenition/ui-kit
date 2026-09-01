import * as React from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  View,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { useReducedMotion } from '../primitives/internal/useReducedMotion';
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
export function CarouselV4({
  items,
  dots = true,
  autoplay = 0,
  label = 'Carousel',
  style,
}: CarouselV4Props): React.ReactElement {
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
      scrollerRef.current?.scrollTo({ x: nextIndex * width, animated: !reduced });
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

  const showControls = count > 1;

  return (
    <View testID="xen-carousel" accessibilityLabel={label} style={style}>
      <View style={{ position: 'relative', borderRadius: tokens.radius.lg, overflow: 'hidden' }}>
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

        {showControls ? (
          <>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Previous slide"
              onPress={() => goTo(active - 1)}
              style={({ pressed }) => ({
                position: 'absolute',
                left: tokens.spacing.sm,
                top: '50%',
                transform: [{ translateY: -22 }],
                height: 44,
                width: 44,
                borderRadius: tokens.radius.full,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                shadowColor: colors.onSurface,
                shadowOpacity: 0.12,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 2 },
                elevation: 3,
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>{'‹'}</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Next slide"
              onPress={() => goTo(active + 1)}
              style={({ pressed }) => ({
                position: 'absolute',
                right: tokens.spacing.sm,
                top: '50%',
                transform: [{ translateY: -22 }],
                height: 44,
                width: 44,
                borderRadius: tokens.radius.full,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                shadowColor: colors.onSurface,
                shadowOpacity: 0.12,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 2 },
                elevation: 3,
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>{'›'}</Text>
            </Pressable>
          </>
        ) : null}
      </View>

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
            <Pressable
              key={i}
              accessibilityRole="button"
              accessibilityLabel={`Go to slide ${i + 1}`}
              accessibilityState={{ selected: i === active }}
              hitSlop={8}
              onPress={() => goTo(i)}
              style={{
                height: 8,
                width: i === active ? 24 : 8,
                borderRadius: tokens.radius.full,
                backgroundColor: i === active ? colors.primary : withAlpha(colors.muted, 0.4),
              }}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}
