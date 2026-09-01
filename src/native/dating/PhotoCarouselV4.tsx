import * as React from 'react';
import { Image, Pressable, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import {
  PHOTO_INK,
  PHOTO_SCRIM,
  PHOTO_SCRIM_STRONG,
  placeholderGround,
  spokenLine,
} from './internal/profile-v4';
import type { PhotoCarouselProps, PhotoCarouselRatio } from './PhotoCarousel';

export interface PhotoCarouselV4Props extends PhotoCarouselProps {
  /** Name for the step-back control. Default `'Previous photo'`. */
  previousLabel?: string;
  /** Name for the step-forward control. Default `'Next photo'`. */
  nextLabel?: string;
  /** Build the position line. Default `'Photo 2 of 6'`. */
  formatPosition?: (index: number, total: number) => string;
  /** Draw visible step controls over the frame. Default `true`. */
  showControls?: boolean;
}

const RATIO: Record<PhotoCarouselRatio, number> = { portrait: 4 / 5, square: 1, landscape: 3 / 2 };

/** The segmented indicator's thickness. A rail, not a hairline. */
const SEGMENT = 3;

/**
 * **V4 photo carousel** — same props as {@link PhotoCarousel} plus
 * `previousLabel`, `nextLabel`, `formatPosition` and `showControls`.
 *
 * ## Five changes
 *
 * 1. **The pager has controls you can see.** Both twins shipped two
 *    `Pressable`s with **no children** — invisible halves of the frame. A
 *    sighted user was given nothing that said the photo was steppable, and
 *    discovered it by accident or not at all. V4 draws two round chevron
 *    buttons over the frame, each clearing 44, each disabled at its end of the
 *    strip. The invisible halves stay (tap-anywhere is the gesture people
 *    expect on a profile) but are taken out of the accessibility tree when the
 *    real controls are drawn, so a reader gets one control per direction
 *    rather than two.
 * 2. **`alt` reaches the image.** `CarouselPhoto.alt` was documented, accepted
 *    and never passed to the native `Image` — every profile photo in the kit
 *    was silent on a phone. It is the image's accessible name now, with the
 *    position line beside it.
 * 3. **Nothing over a photograph is themed.** The indicator drew its unplayed
 *    segments from `withAlpha(colors.onSurface, 0.35)`, which is a *light*
 *    wash in a dark theme — so on a dark scheme the whole strip read as
 *    played. Segments and control grounds are the fixed photo scrim and photo
 *    ink, which mean the same thing in both schemes because a photograph does.
 * 4. **A step that goes nowhere does nothing.** `go()` set the internal index
 *    unconditionally and reported only a real move, so a tap at either end of
 *    the strip re-rendered the pager to say that nothing had happened.
 * 5. **Loading is a skeleton and empty says what to do.** The base's loading
 *    frame was a `border`-filled rectangle with a label and no role.
 */
export function PhotoCarouselV4({
  photos,
  index,
  onIndexChange,
  ratio = 'portrait',
  rounded = true,
  loading = false,
  emptyLabel = 'No photos yet',
  previousLabel = 'Previous photo',
  nextLabel = 'Next photo',
  formatPosition,
  showControls = true,
  style,
}: PhotoCarouselV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { tokens } = theme;

  const list = photos ?? [];
  const controlled = index != null;
  const [internal, setInternal] = React.useState(0);
  const active = Math.max(0, Math.min(list.length - 1, controlled ? (index as number) : internal));
  const radius = rounded ? tokens.radius.lg : 0;

  const go = (next: number): void => {
    const clamped = Math.max(0, Math.min(list.length - 1, next));
    // The base set internal state unconditionally and reported only a real
    // move, so a tap at either end of the strip re-rendered the pager to say
    // nothing had happened. Either the index moved or nothing did.
    if (clamped === active) return;
    if (!controlled) setInternal(clamped);
    onIndexChange?.(clamped);
  };

  const frame: ViewStyle = {
    width: '100%',
    aspectRatio: RATIO[ratio],
    borderRadius: radius,
    overflow: 'hidden',
    backgroundColor: placeholderGround(theme),
  };

  if (loading) {
    return (
      <View
        accessibilityRole="progressbar"
        accessibilityLabel="Loading photos"
        style={[frame, style]}
      />
    );
  }

  if (list.length === 0) {
    return (
      <View
        accessible
        accessibilityRole="summary"
        accessibilityLabel={emptyLabel}
        style={[frame, { alignItems: 'center', justifyContent: 'center' }, style]}
      >
        <TextV4 size="2xl" allowFontScaling={false}>
          📷
        </TextV4>
        <TextV4 size="sm" tone="mutedText" style={{ marginTop: tokens.spacing.xs }}>
          {emptyLabel}
        </TextV4>
      </View>
    );
  }

  const current = list[active] ?? list[0]!;
  const position = (formatPosition ?? ((i: number, n: number) => `Photo ${i + 1} of ${n}`))(
    active,
    list.length
  );
  const atStart = active === 0;
  const atEnd = active >= list.length - 1;

  const control = (
    label: string,
    mark: string,
    disabled: boolean,
    onPress: () => void,
    side: 'left' | 'right'
  ): React.ReactElement => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => ({
        position: 'absolute',
        top: '50%',
        left: side === 'left' ? tokens.spacing.sm : undefined,
        right: side === 'right' ? tokens.spacing.sm : undefined,
        marginTop: -minTap(tokens.spacing) / 2,
        width: minTap(tokens.spacing),
        height: minTap(tokens.spacing),
        borderRadius: minTap(tokens.spacing) / 2,
        alignItems: 'center',
        justifyContent: 'center',
        // Fixed, not themed: this disc sits on a photograph, and a scrim built
        // from `onSurface` washes near-white in a dark scheme.
        backgroundColor: pressed || disabled ? PHOTO_SCRIM_STRONG : PHOTO_SCRIM,
        opacity: disabled ? theme.state.disabledContent : 1,
      })}
    >
      <TextV4 size="lg" weight="bold" allowFontScaling={false} style={{ color: PHOTO_INK }}>
        {mark}
      </TextV4>
    </Pressable>
  );

  return (
    <View style={[frame, style]}>
      <Image
        accessible
        accessibilityRole="image"
        // The prop existed, was documented, and never arrived. Without a name
        // the position line is all a reader gets about a person's photo.
        accessibilityLabel={spokenLine([current.alt, position])}
        source={{ uri: current.uri }}
        resizeMode="cover"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Tap-anywhere halves. One reader stop per direction, so these step
          out of the tree whenever the drawn controls are there to take it. */}
      <View
        accessibilityElementsHidden={showControls}
        importantForAccessibility={showControls ? 'no-hide-descendants' : 'yes'}
        style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, flexDirection: 'row' }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={previousLabel}
          disabled={atStart}
          onPress={() => go(active - 1)}
          style={{ flex: 1 }}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={nextLabel}
          disabled={atEnd}
          onPress={() => go(active + 1)}
          style={{ flex: 1 }}
        />
      </View>

      {showControls ? control(previousLabel, '‹', atStart, () => go(active - 1), 'left') : null}
      {showControls ? control(nextLabel, '›', atEnd, () => go(active + 1), 'right') : null}

      {/* Segmented indicators — decorative; the position is on the image. */}
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
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
              height: SEGMENT,
              borderRadius: tokens.radius.full,
              backgroundColor: i <= active ? PHOTO_INK : PHOTO_SCRIM_STRONG,
            }}
          />
        ))}
      </View>
    </View>
  );
}
