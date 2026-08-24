import * as React from 'react';
import {
  Animated,
  PanResponder,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { SwipeCard, type SwipeCardProfile } from './SwipeCard';
import { LikePassButtons, type SwipeAction } from './LikePassButtons';

/** The three swipe decisions the deck emits. */
export type SwipeDecision = 'like' | 'pass' | 'superlike';

export interface SwipeDeckProps {
  /** Profiles to swipe through (top of the stack = index 0). */
  profiles?: SwipeCardProfile[];
  /** Custom card renderer; defaults to `SwipeCard`. */
  renderCard?: (profile: SwipeCardProfile, index: number) => React.ReactNode;
  /** Fires with the decision + profile whenever a card leaves the stack. */
  onSwipe?: (decision: SwipeDecision, profile: SwipeCardProfile) => void;
  /** Convenience: right swipe. */
  onSwipeRight?: (profile: SwipeCardProfile) => void;
  /** Convenience: left swipe. */
  onSwipeLeft?: (profile: SwipeCardProfile) => void;
  /** Convenience: up swipe (super like). */
  onSwipeUp?: (profile: SwipeCardProfile) => void;
  /** Fires when the last card has been swiped away. */
  onEmpty?: () => void;
  /** Show the built-in pass/super/like button row. Defaults to true. */
  showButtons?: boolean;
  /** Horizontal drag (px) needed to commit a like/pass. Defaults to 120. */
  threshold?: number;
  /** Loading skeleton. */
  loading?: boolean;
  /** Empty-state title. */
  emptyTitle?: string;
  /** Empty-state subtitle. */
  emptySubtitle?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * The swipeable card stack — the native dating deck. The top card is draggable
 * via `PanResponder`: dragging past `threshold` right = like, left = pass, up =
 * super like, and each committed swipe animates the card off-screen, advances
 * the stack, and reports through `onSwipe` (+ the directional convenience
 * callbacks). LIKE / NOPE / SUPER stamps fade in with drag progress. A built-in,
 * fully-accessible `LikePassButtons` row drives the same swipes for keyboard /
 * screen-reader users. Shows an explicit empty state once the stack is
 * exhausted. Colors derive from theme tokens via `withAlpha` — no literal
 * colors.
 */
export function SwipeDeck({
  profiles,
  renderCard,
  onSwipe,
  onSwipeRight,
  onSwipeLeft,
  onSwipeUp,
  onEmpty,
  showButtons = true,
  threshold = 120,
  loading = false,
  emptyTitle = "You're all caught up",
  emptySubtitle = 'Check back later for new people nearby.',
  style,
}: SwipeDeckProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const list = profiles ?? [];
  const [index, setIndex] = React.useState(0);
  const position = React.useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  // Newest props visible to the once-created PanResponder without re-creating it.
  const stateRef = React.useRef({ index, list, threshold });
  stateRef.current = { index, list, threshold };

  const commit = React.useCallback(
    (decision: SwipeDecision): void => {
      const { index: i, list: profs } = stateRef.current;
      const profile = profs[i];
      if (!profile) return;
      onSwipe?.(decision, profile);
      if (decision === 'like') onSwipeRight?.(profile);
      else if (decision === 'pass') onSwipeLeft?.(profile);
      else onSwipeUp?.(profile);

      const next = i + 1;
      const toValue =
        decision === 'superlike'
          ? { x: 0, y: -600 }
          : decision === 'like'
            ? { x: 600, y: 0 }
            : { x: -600, y: 0 };
      Animated.timing(position, { toValue, duration: 200, useNativeDriver: false }).start(() => {
        position.setValue({ x: 0, y: 0 });
        setIndex(next);
        if (next >= profs.length) onEmpty?.();
      });
    },
    [onSwipe, onSwipeRight, onSwipeLeft, onSwipeUp, onEmpty, position]
  );

  const responder = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_e, g) => Math.abs(g.dx) > 4 || Math.abs(g.dy) > 4,
        onPanResponderMove: (_e, g) => {
          position.setValue({ x: g.dx, y: g.dy });
        },
        onPanResponderRelease: (_e, g) => {
          const t = stateRef.current.threshold;
          if (g.dy < -t && Math.abs(g.dy) > Math.abs(g.dx)) {
            commit('superlike');
          } else if (g.dx > t) {
            commit('like');
          } else if (g.dx < -t) {
            commit('pass');
          } else {
            Animated.spring(position, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: false,
              friction: 6,
            }).start();
          }
        },
      }),
    [commit, position]
  );

  const onButton = (action: SwipeAction): void => {
    if (action === 'like') commit('like');
    else if (action === 'pass') commit('pass');
    else if (action === 'superlike') commit('superlike');
  };

  const likeOpacity = position.x.interpolate({
    inputRange: [0, threshold],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const nopeOpacity = position.x.interpolate({
    inputRange: [-threshold, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const superOpacity = position.y.interpolate({
    inputRange: [-threshold, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const rotate = position.x.interpolate({
    inputRange: [-threshold * 2, 0, threshold * 2],
    outputRange: ['-12deg', '0deg', '12deg'],
    extrapolate: 'clamp',
  });

  if (loading) {
    return (
      <View style={[{ gap: tokens.spacing.md }, style]}>
        <View
          accessibilityLabel="Loading profiles"
          style={{ width: '100%', aspectRatio: 3 / 4, borderRadius: tokens.radius.lg, backgroundColor: colors.border }}
        />
      </View>
    );
  }

  const current = list[index];
  const upcoming = list[index + 1];

  if (!current) {
    return (
      <View
        accessibilityRole="text"
        accessibilityLabel={`${emptyTitle}. ${emptySubtitle}`}
        style={[
          {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: tokens.spacing['2xl'],
            gap: tokens.spacing.xs,
          },
          style,
        ]}
      >
        <Text style={{ fontSize: tokens.typography.scale['3xl'] }} allowFontScaling={false}>
          🌟
        </Text>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
          {emptyTitle}
        </Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }}>
          {emptySubtitle}
        </Text>
      </View>
    );
  }

  const renderOne = (p: SwipeCardProfile, i: number): React.ReactNode =>
    renderCard ? renderCard(p, i) : <SwipeCard profile={p} />;

  const stamp = (
    text: string,
    slot: keyof SemanticColors,
    opacity: Animated.AnimatedInterpolation<number>,
    side: 'left' | 'right' | 'center'
  ): React.ReactElement => (
    <Animated.View
      pointerEvents="none"
      style={{
        position: 'absolute',
        top: tokens.spacing.lg,
        ...(side === 'left' ? { left: tokens.spacing.lg } : side === 'right' ? { right: tokens.spacing.lg } : { alignSelf: 'center' }),
        opacity,
        borderWidth: 3,
        borderColor: colors[slot],
        borderRadius: tokens.radius.md,
        paddingVertical: tokens.spacing.xs,
        paddingHorizontal: tokens.spacing.sm,
        backgroundColor: withAlpha(colors[slot], 0.14),
      }}
    >
      <Text style={{ color: colors[slot], fontSize: tokens.typography.scale.xl, fontWeight: '800', letterSpacing: 2 }}>
        {text}
      </Text>
    </Animated.View>
  );

  return (
    <View style={[{ gap: tokens.spacing.lg }, style]}>
      <View style={{ width: '100%', aspectRatio: 3 / 4 }}>
        {/* Peek of the next card. */}
        {upcoming ? (
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, transform: [{ scale: 0.96 }], opacity: 0.7 }}>
            {renderOne(upcoming, index + 1)}
          </View>
        ) : null}

        {/* Draggable top card. */}
        <Animated.View
          {...responder.panHandlers}
          accessibilityLabel={`Profile ${index + 1} of ${list.length}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            transform: [{ translateX: position.x }, { translateY: position.y }, { rotate }],
          }}
        >
          {renderOne(current, index)}
          {stamp('LIKE', 'success', likeOpacity, 'left')}
          {stamp('NOPE', 'danger', nopeOpacity, 'right')}
          {stamp('SUPER', 'accent', superOpacity, 'center')}
        </Animated.View>
      </View>

      {showButtons ? (
        <LikePassButtons actions={['pass', 'superlike', 'like']} onAction={onButton} />
      ) : null}
    </View>
  );
}
