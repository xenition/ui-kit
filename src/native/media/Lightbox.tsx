import * as React from 'react';
import {
  Image,
  Modal,
  PanResponder,
  Pressable,
  Text,
  View,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import { useReducedMotion } from '../primitives/internal/useReducedMotion';
import { withAlpha } from '../primitives/internal/color';
import type { MediaItem } from '../../media/types';

export interface LightboxProps {
  /** The full item set. */
  items: MediaItem[];
  /** Index of the open item, or `null`/out-of-range to render nothing (closed). */
  index: number | null;
  /** Close the overlay (backdrop press, close button, Android back). */
  onClose: () => void;
  /** Go to the previous item (prev button / swipe right). */
  onPrev?: () => void;
  /** Go to the next item (next button / swipe left). */
  onNext?: () => void;
  /** Wrap around at the ends (default false). */
  loop?: boolean;
  /** Accessible name for the dialog (default `Media viewer`). */
  label?: string;
  closeLabel?: string;
  prevLabel?: string;
  nextLabel?: string;
}

// Horizontal swipe distance (px) that commits to a prev/next navigation.
const SWIPE_THRESHOLD = 60;

/**
 * Fullscreen overlay media viewer — the native mirror of the web `Lightbox`.
 * A transparent RN `Modal` (`animationType` fade, dropped to `none` under the
 * OS "Reduce Motion" setting) with a token-styled backdrop derived from the
 * darkest neutral token, prev/next `Pressable` controls, and horizontal swipe
 * navigation via `PanResponder` (RN core — no extra gesture dependency). The
 * Android hardware back button routes through `onRequestClose` → `onClose`.
 * Renders nothing when `index` is `null` or out of range. Presentational — the
 * parent owns `index` and the prev/next handlers.
 */
export function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
  loop = false,
  label = 'Media viewer',
  closeLabel = 'Close',
  prevLabel = 'Previous',
  nextLabel = 'Next',
}: LightboxProps): React.ReactElement | null {
  const { colors, tokens } = useXenitionTheme();
  const reduced = useReducedMotion();

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
          Math.abs(g.dx) > 12 && Math.abs(g.dx) > Math.abs(g.dy),
        onPanResponderRelease: (_evt, g) => {
          const n = nav.current;
          if (g.dx <= -SWIPE_THRESHOLD && n.hasNext) n.onNext?.();
          else if (g.dx >= SWIPE_THRESHOLD && n.hasPrev) n.onPrev?.();
        },
      }),
    []
  );

  if (!open) return null;
  const item = items[index as number]!;

  const controlStyle = {
    width: 40,
    height: 40,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderRadius: tokens.radius.full,
    backgroundColor: colors.surface,
  };
  const controlText = { color: colors.onSurface, fontSize: tokens.typography.scale.lg };

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
          padding: tokens.spacing.lg,
          backgroundColor: withAlpha(tokens.ramps.neutral[950], 0.88),
        }}
      >
        {/* Backdrop press-to-close (behind the figure). */}
        <Pressable
          accessibilityLabel={`${closeLabel} backdrop`}
          onPress={onClose}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        />

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={closeLabel}
          onPress={onClose}
          style={{
            position: 'absolute',
            right: tokens.spacing.lg,
            top: tokens.spacing.lg,
            ...controlStyle,
          }}
        >
          <Text style={controlText}>×</Text>
        </Pressable>

        {hasPrev ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={prevLabel}
            onPress={onPrev}
            style={{ position: 'absolute', left: tokens.spacing.lg, top: '45%', ...controlStyle }}
          >
            <Text style={controlText}>‹</Text>
          </Pressable>
        ) : null}

        <View
          {...panResponder.panHandlers}
          style={{ alignItems: 'center', gap: tokens.spacing.sm, maxWidth: '100%' }}
        >
          <Image
            source={{ uri: item.url }}
            accessible
            accessibilityLabel={item.alt ?? item.caption ?? ''}
            resizeMode="contain"
            style={{
              width: 320,
              height: 320,
              maxWidth: '100%',
              borderRadius: tokens.radius.md,
            }}
          />
          {item.caption ? (
            <Text
              style={{
                textAlign: 'center',
                color: tokens.ramps.neutral[50],
                fontSize: tokens.typography.scale.sm,
              }}
            >
              {item.caption}
            </Text>
          ) : null}
          <Text
            testID="xen-lightbox-counter"
            style={{ color: tokens.ramps.neutral[50], fontSize: tokens.typography.scale.xs }}
          >
            {(index as number) + 1} / {items.length}
          </Text>
        </View>

        {hasNext ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={nextLabel}
            onPress={onNext}
            style={{ position: 'absolute', right: tokens.spacing.lg, top: '45%', ...controlStyle }}
          >
            <Text style={controlText}>›</Text>
          </Pressable>
        ) : null}
      </View>
    </Modal>
  );
}
