import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';

export interface CarouselPhoto {
  /** Remote image URI. */
  uri: string;
  /** Alt text announced to screen readers. */
  alt?: string;
}

export type PhotoCarouselRatio = 'portrait' | 'square' | 'landscape';

export interface PhotoCarouselProps {
  /** Ordered photos. */
  photos?: CarouselPhoto[];
  /** Controlled active index. */
  index?: number;
  /** Fires when the active photo changes. */
  onIndexChange?: (index: number) => void;
  /** Aspect ratio of the frame. Defaults to `portrait`. */
  ratio?: PhotoCarouselRatio;
  /** Rounded corners. Defaults to true. */
  rounded?: boolean;
  /** Loading skeleton. */
  loading?: boolean;
  /** Empty-state copy when there are no photos. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

const RATIO: Record<PhotoCarouselRatio, number> = { portrait: 4 / 5, square: 1, landscape: 3 / 2 };

/**
 * Swipeable photo pager for a profile — the native photo carousel. Tapping the
 * left/right half of the frame steps between photos (mobile-friendly, no gesture
 * library) with a segmented progress bar and dot indicators on top. Supports
 * controlled (`index`/`onIndexChange`) and uncontrolled use, plus explicit
 * empty and loading states. All colors/overlays derive from theme tokens via
 * `withAlpha` — no literal colors. Array access is guarded.
 */
export function PhotoCarousel({
  photos,
  index,
  onIndexChange,
  ratio = 'portrait',
  rounded = true,
  loading = false,
  emptyLabel = 'No photos yet',
  style,
}: PhotoCarouselProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const list = photos ?? [];
  const controlled = index != null;
  const [internal, setInternal] = React.useState(0);
  const active = Math.max(0, Math.min(list.length - 1, controlled ? (index as number) : internal));
  const radius = rounded ? tokens.radius.lg : 0;

  const go = (next: number): void => {
    const clamped = Math.max(0, Math.min(list.length - 1, next));
    if (!controlled) setInternal(clamped);
    if (clamped !== active) onIndexChange?.(clamped);
  };

  const frame: ViewStyle = {
    width: '100%',
    aspectRatio: RATIO[ratio],
    borderRadius: radius,
    overflow: 'hidden',
    backgroundColor: colors.border,
  };

  if (loading) {
    return <View accessibilityLabel="Loading photos" style={[frame, style]} />;
  }

  if (list.length === 0) {
    return (
      <View
        accessibilityRole="text"
        accessibilityLabel={emptyLabel}
        style={[frame, { alignItems: 'center', justifyContent: 'center' }, style]}
      >
        <Text style={{ fontSize: tokens.typography.scale['2xl'] }} allowFontScaling={false}>
          📷
        </Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, marginTop: tokens.spacing.xs }}>
          {emptyLabel}
        </Text>
      </View>
    );
  }

  const current = list[active] ?? list[0]!;

  return (
    <View style={[frame, style]}>
      <Image source={{ uri: current.uri }} resizeMode="cover" style={{ width: '100%', height: '100%' }} />

      {/* Tap zones — left half = previous, right half = next. */}
      <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, flexDirection: 'row' }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Previous photo"
          disabled={active === 0}
          onPress={() => go(active - 1)}
          style={{ flex: 1 }}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Next photo"
          disabled={active >= list.length - 1}
          onPress={() => go(active + 1)}
          style={{ flex: 1 }}
        />
      </View>

      {/* Segmented indicators. */}
      <View
        accessibilityRole="text"
        accessibilityLabel={`Photo ${active + 1} of ${list.length}${current.alt ? `: ${current.alt}` : ''}`}
        style={{
          position: 'absolute',
          top: tokens.spacing.sm,
          left: tokens.spacing.sm,
          right: tokens.spacing.sm,
          flexDirection: 'row',
          gap: tokens.spacing.xs,
        }}
      >
        {list.map((p, i) => (
          <View
            key={`${p.uri}-${i}`}
            style={{
              flex: 1,
              height: 3,
              borderRadius: tokens.radius.full,
              backgroundColor: i <= active ? withAlpha(colors.surface, 0.95) : withAlpha(colors.onSurface, 0.35),
            }}
          />
        ))}
      </View>
    </View>
  );
}
