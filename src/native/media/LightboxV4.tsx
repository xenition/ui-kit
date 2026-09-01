import * as React from 'react';
import { Image, Modal, PanResponder, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useXenitionTheme } from '../theme';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { useReducedMotion } from '../primitives/internal/useReducedMotion';
import { minTap } from '../primitives/internal/chrome-v4';
import { scrimColor } from '../primitives/internal/surface-v4';
import { withAlpha } from '../primitives/internal/color';
import { isVideo, posterUri } from './internal/media-v4';
import type { LightboxProps } from './Lightbox';

export interface LightboxV4Props extends LightboxProps {
  /**
   * Fires when a video's play affordance is pressed.
   *
   * The kit ships no video player and must not — the dependency is the host's
   * decision. The lightbox shows the poster and hands the intent over; without
   * this the play badge is a picture of a button, so it is only drawn when the
   * handler exists.
   */
  onPlay?: (index: number) => void;
  /** Accessible name for the play affordance. Default `'Play video'`. */
  playLabel?: string;
  /** Build the position line. Default `'3 / 12'`. */
  formatCounter?: (position: number, total: number) => string;
}

/** How far a horizontal drag must travel to count as a swipe. Geometric. */
const SWIPE_THRESHOLD = 48;

/** Drag under this is a tap, not a gesture. */
const DRAG_SLOP = 12;

/**
 * The ink on the overlay.
 *
 * This is the one place reading a **ramp** directly is correct rather than a
 * defect. Everywhere else in this pass a ramp step was the wrong choice
 * *because* it does not invert with the scheme; here the surface underneath is
 * a scrim that is dark in both schemes by construction, so the ink on it must
 * be light in both schemes — which is exactly the property `ramps.neutral[50]`
 * has and `colors.surface` does not.
 */
const OVERLAY_INK = 50 as const;

/**
 * **V4 lightbox** — same props as {@link Lightbox} plus `onPlay`, `playLabel`
 * and `formatCounter`.
 *
 * ## Five changes
 *
 * 1. **A video shows its poster, and can be played.** The base rendered
 *    `<Image source={{ uri: item.url }} />` for every item, so opening a clip
 *    showed a broken image at full screen.
 * 2. **The media box is not a 320×320 square.** The base pinned both
 *    dimensions, so a panorama and a portrait were letterboxed into the same
 *    square. It now fills the available space and keeps its ratio.
 * 3. **The controls clear 44 and are vertically centred properly.** They were
 *    40×40 pinned at `top: '45%'` — a magic number that lands off-centre at
 *    every aspect ratio.
 * 4. **The overlay pays the safe-area inset**, so the close button is not
 *    under the notch and the caption is not under the home indicator.
 * 5. **The scrim comes from `scrimColor()`**, the same one every V4 overlay
 *    uses, rather than this component's own ramp-and-alpha expression.
 *
 * Swipe-to-navigate, `loop`, and the reduced-motion check are the base's and
 * are kept. Needs a `SafeAreaProvider` above it, which Expo mounts by default.
 */
export function LightboxV4({
  items,
  index,
  onClose,
  onPrev,
  onNext,
  onPlay,
  loop = false,
  label = 'Media viewer',
  closeLabel = 'Close',
  prevLabel = 'Previous',
  nextLabel = 'Next',
  playLabel = 'Play video',
  formatCounter,
}: LightboxV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const reduced = useReducedMotion();
  const insets = useSafeAreaInsets();
  const tap = minTap(tokens.spacing);

  const open = index !== null && index >= 0 && index < items.length;

  const hasPrev = open && (loop || (index as number) > 0);
  const hasNext = open && (loop || (index as number) < items.length - 1);

  // Latest handlers/flags read by the PanResponder without re-creating it.
  const nav = React.useRef({ onPrev, onNext, hasPrev, hasNext });
  nav.current = { onPrev, onNext, hasPrev, hasNext };

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_evt, g) =>
          Math.abs(g.dx) > DRAG_SLOP && Math.abs(g.dx) > Math.abs(g.dy),
        onPanResponderRelease: (_evt, g) => {
          const n = nav.current;
          if (g.dx <= -SWIPE_THRESHOLD && n.hasNext) n.onNext?.();
          else if (g.dx >= SWIPE_THRESHOLD && n.hasPrev) n.onPrev?.();
        },
      }),
    []
  );

  if (!open) return null;
  const position = index as number;
  const item = items[position]!;
  const ink = tokens.ramps.neutral[OVERLAY_INK];
  const uri = posterUri(item);
  const video = isVideo(item);
  const counter = (formatCounter ?? ((n: number, of: number) => `${n} / ${of}`))(
    position + 1,
    items.length
  );

  const control = (
    name: 'close' | 'chevron-left' | 'chevron-right',
    controlLabel: string,
    onPress: (() => void) | undefined,
    position_: object
  ): React.ReactElement => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={controlLabel}
      onPress={onPress}
      style={({ pressed }) => ({
        position: 'absolute',
        width: tap,
        height: tap,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: tokens.radius.full,
        // A control floating over arbitrary artwork owns no ground, so its
        // press layer is a translucent wash rather than an opaque mix.
        backgroundColor: withAlpha(colors.surface, pressed ? 0.75 : 1),
        ...position_,
      })}
    >
      <IconV4 name={name} size="lg" color="onSurface" />
    </Pressable>
  );

  return (
    <Modal
      visible
      transparent
      animationType={reduced ? 'none' : 'fade'}
      onRequestClose={onClose}
      accessibilityViewIsModal
    >
      <View
        accessibilityRole="none"
        accessibilityLabel={label}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: tokens.spacing.lg + insets.top,
          paddingBottom: tokens.spacing.lg + insets.bottom,
          paddingHorizontal: tokens.spacing.lg + Math.max(insets.left, insets.right),
          backgroundColor: scrimColor(theme, 0.88),
        }}
      >
        {/* Backdrop press-to-close (behind the figure). */}
        <Pressable
          accessibilityLabel={`${closeLabel} backdrop`}
          onPress={onClose}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        />

        {control('close', closeLabel, onClose, {
          right: tokens.spacing.lg,
          top: tokens.spacing.lg + insets.top,
        })}

        {hasPrev
          ? control('chevron-left', prevLabel, onPrev, {
              left: tokens.spacing.lg,
              // Centred by transform rather than a `top: '45%'` guess.
              top: '50%',
              marginTop: -tap / 2,
            })
          : null}

        <View
          {...panResponder.panHandlers}
          style={{
            flex: 1,
            alignSelf: 'stretch',
            alignItems: 'center',
            justifyContent: 'center',
            gap: tokens.spacing.sm,
          }}
        >
          <View
            style={{
              flex: 1,
              alignSelf: 'stretch',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {uri ? (
              <Image
                source={{ uri }}
                accessible
                accessibilityLabel={item.alt ?? item.caption ?? ''}
                resizeMode="contain"
                style={{ width: '100%', height: '100%', borderRadius: tokens.radius.md }}
              />
            ) : null}

            {video && onPlay ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={playLabel}
                onPress={() => onPlay(position)}
                style={({ pressed }) => ({
                  position: 'absolute',
                  width: tap * 1.5,
                  height: tap * 1.5,
                  borderRadius: tokens.radius.full,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: withAlpha(colors.surface, pressed ? 0.75 : 0.92),
                })}
              >
                <IconV4 glyph="▶" size="2xl" color="onSurface" />
              </Pressable>
            ) : null}
          </View>

          {item.caption ? (
            <TextV4 size="sm" align="center" style={{ color: ink }}>
              {item.caption}
            </TextV4>
          ) : null}
          <TextV4
            testID="xen-lightbox-counter"
            size="xs"
            numeric="tabular"
            style={{ color: ink }}
          >
            {counter}
          </TextV4>
        </View>

        {hasNext
          ? control('chevron-right', nextLabel, onNext, {
              right: tokens.spacing.lg,
              top: '50%',
              marginTop: -tap / 2,
            })
          : null}
      </View>
    </Modal>
  );
}
