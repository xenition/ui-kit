import * as React from 'react';
import { Animated, PanResponder, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { useReducedMotion } from '../primitives/internal/useReducedMotion';
import { V4_MOTION } from '../primitives/internal/motion-v4';
import { SwipeCardV4, SwipeStampV4 } from './SwipeCardV4';
import { LikePassButtonsV4 } from './LikePassButtonsV4';
import type { SwipeAction } from './LikePassButtons';
import type { SwipeCardProfile } from './SwipeCard';
import { canRewind, deckPosition } from '../../dating/deck-v4';
import { skeletonFill } from './internal/profile-v4';
import type { SwipeDeckProps, SwipeDecision } from './SwipeDeck';

export interface SwipeDeckV4Props extends SwipeDeckProps {
  /**
   * Fires when the user asks for the last decision back. Supplying it is what
   * makes `'rewind'` in `actions` do anything.
   */
  onRewind?: () => void;
  /** Name for the rewind control. Default `'Undo'`. */
  rewindLabel?: string;
  /** Which controls the built-in row shows. Default pass · superlike · like. */
  actions?: SwipeAction[];
  /** A next step rendered under the empty state — "Widen your filters". */
  emptyAction?: React.ReactNode;
  /** Build the announced position. Default `'Profile 3 of 12'`. */
  formatPosition?: (index: number, total: number) => string;
}

/** How far off-screen a committed card flies. */
const EXIT = 600;
/** The peek card's scale — depth by size, not by fading it out. */
const PEEK_SCALE = 0.94;

const DEFAULT_ACTIONS: SwipeAction[] = ['pass', 'superlike', 'like'];

/**
 * **V4 swipe deck** — same props as {@link SwipeDeck} plus `onRewind`,
 * `rewindLabel`, `actions`, `emptyAction` and `formatPosition`.
 *
 * ## Six changes
 *
 * 1. **Pass is recoverable.** The deck hard-coded
 *    `actions={['pass', 'superlike', 'like']}` and its `onButton` tested only
 *    those three, so `'rewind'` — an action `LikePassButtons` has always
 *    shipped — fell through to nothing and no caller could add it anyway.
 *    Meanwhile a single 120px flick was enough to lose someone permanently,
 *    with no toast, no undo and no announcement. V4 takes `actions`, routes
 *    `'rewind'` to `onRewind` **and steps the index back**, and disables the
 *    control while there is nothing to undo.
 * 2. **The position is announced, and re-announced.** `deckPosition()` built
 *    the string and the base hung it on a role-less `Animated.View`, where it
 *    was ignored; it is a polite live region now, so a reader learns that a
 *    card has gone.
 * 3. **The empty state is not a dead end.** "You're all caught up" with
 *    nothing to do next is a wall; `emptyAction` puts the next step in it,
 *    and the headline is a heading rather than a run of text.
 * 4. **Loading is the shape of what is coming.** The base drew one
 *    `border`-filled rectangle. It is a card-shaped skeleton with the info
 *    block sketched in, on the opaque skeleton ground, and it says it is
 *    loading.
 * 5. **The peek card has depth, not 70% opacity.** A flat `opacity: 0.7`
 *    reads as *disabled* — M3's disabled band starts at 0.38 and everything
 *    below full reads along that scale. The card behind is scaled and inset
 *    instead, which is what "further away" looks like.
 * 6. **Reduced Motion settles the deck rather than freezing it.** The fly-off
 *    collapses to `instant` and the drag rotation is dropped, so the card
 *    still leaves — it just does not travel.
 *
 * Native already fired `onSwipe` / `onSwipeRight` / `onSwipeLeft` / `onEmpty`
 * **outside** the `setIndex` updater, which is the correct shape and the one
 * the web twin had to be moved to; it is kept exactly as it was here.
 */
export function SwipeDeckV4({
  profiles,
  renderCard,
  onSwipe,
  onSwipeRight,
  onSwipeLeft,
  onSwipeUp,
  onEmpty,
  onRewind,
  showButtons = true,
  threshold = 120,
  loading = false,
  emptyTitle = "You're all caught up",
  emptySubtitle = 'Check back later for new people nearby.',
  rewindLabel = 'Undo',
  actions = DEFAULT_ACTIONS,
  emptyAction,
  formatPosition,
  style,
}: SwipeDeckV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  const reduced = useReducedMotion();

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
      // Outside the updater, deliberately: a state updater must be pure, and
      // React calls it twice in StrictMode — which is exactly how the web twin
      // came to emit every like and every pass a second time.
      onSwipe?.(decision, profile);
      if (decision === 'like') onSwipeRight?.(profile);
      else if (decision === 'pass') onSwipeLeft?.(profile);
      else onSwipeUp?.(profile);

      const next = i + 1;
      const toValue =
        decision === 'superlike'
          ? { x: 0, y: -EXIT }
          : decision === 'like'
            ? { x: EXIT, y: 0 }
            : { x: -EXIT, y: 0 };
      Animated.timing(position, {
        toValue,
        // Settled, not frozen: the card still leaves, it just does not travel.
        duration: reduced ? V4_MOTION.instant : V4_MOTION.standard,
        useNativeDriver: false,
      }).start(() => {
        position.setValue({ x: 0, y: 0 });
        setIndex(next);
        if (next >= profs.length) onEmpty?.();
      });
    },
    [onSwipe, onSwipeRight, onSwipeLeft, onSwipeUp, onEmpty, position, reduced]
  );

  const rewind = React.useCallback((): void => {
    // The undo the base could not express: hand the decision back to the
    // caller AND put the card back, which is the half a caller cannot do.
    onRewind?.();
    setIndex((i) => Math.max(0, i - 1));
  }, [onRewind]);

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
        // A gesture the OS takes away mid-drag (a call, a system sheet) left
        // the card frozen part-way across the screen.
        onPanResponderTerminate: () => {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
            friction: 6,
          }).start();
        },
      }),
    [commit, position]
  );

  const onButton = (action: SwipeAction): void => {
    if (action === 'like') commit('like');
    else if (action === 'pass') commit('pass');
    else if (action === 'superlike') commit('superlike');
    else if (action === 'rewind') rewind();
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
    outputRange: reduced ? ['0deg', '0deg', '0deg'] : ['-12deg', '0deg', '12deg'],
    extrapolate: 'clamp',
  });

  if (loading) {
    return (
      <View
        accessibilityRole="progressbar"
        accessibilityLabel="Loading profiles"
        style={[{ gap: tokens.spacing.lg }, style]}
      >
        <View
          style={{
            width: '100%',
            aspectRatio: 3 / 4,
            borderRadius: tokens.radius.lg,
            overflow: 'hidden',
            backgroundColor: skeletonFill(theme),
            justifyContent: 'flex-end',
            padding: tokens.spacing.md,
            gap: tokens.spacing.xs,
          }}
        >
          {/* The shape it is about to be: a name line and a tagline. */}
          <View
            style={{
              height: tokens.typography.scale.xl,
              width: '55%',
              borderRadius: tokens.radius.sm,
              backgroundColor: skeletonFill(theme),
            }}
          />
          <View
            style={{
              height: tokens.typography.scale.sm,
              width: '80%',
              borderRadius: tokens.radius.sm,
              backgroundColor: skeletonFill(theme),
            }}
          />
        </View>
      </View>
    );
  }

  const current = list[index];
  const upcoming = list[index + 1];

  if (!current) {
    return (
      <View
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
        <TextV4 size="3xl" allowFontScaling={false}>
          🌟
        </TextV4>
        <TextV4 accessibilityRole="header" size="lg" weight="bold" tone="onSurface" align="center">
          {emptyTitle}
        </TextV4>
        <TextV4 size="sm" tone="mutedText" align="center">
          {emptySubtitle}
        </TextV4>
        {emptyAction ? <View style={{ marginTop: tokens.spacing.sm }}>{emptyAction}</View> : null}
      </View>
    );
  }

  const renderOne = (p: SwipeCardProfile, i: number): React.ReactNode =>
    renderCard ? renderCard(p, i) : <SwipeCardV4 profile={p} />;

  const rewindable = canRewind(list.slice(0, index));
  const disabledActions: SwipeAction[] = rewindable ? [] : ['rewind'];

  return (
    <View style={[{ gap: tokens.spacing.lg }, style]}>
      <View style={{ width: '100%', aspectRatio: 3 / 4 }}>
        {/* Peek of the next card — depth by scale, never by fading it out. */}
        {upcoming ? (
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={{
              position: 'absolute',
              top: tokens.spacing.sm,
              left: 0,
              right: 0,
              bottom: 0,
              transform: [{ scale: PEEK_SCALE }],
            }}
          >
            {renderOne(upcoming, index + 1)}
          </View>
        ) : null}

        {/* Draggable top card. */}
        <Animated.View
          {...responder.panHandlers}
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
          {/* Siblings of the card, not children of it — a caller who supplies
              `renderCard` keeps the drag feedback either way. */}
          <SwipeStampV4 overlay="like" opacity={likeOpacity} />
          <SwipeStampV4 overlay="nope" opacity={nopeOpacity} />
          <SwipeStampV4 overlay="superlike" opacity={superOpacity} />
        </Animated.View>
      </View>

      {/* The position the base built and then hung on a role-less element. */}
      <TextV4
        accessibilityRole="text"
        accessibilityLiveRegion="polite"
        size="xs"
        tone="mutedText"
        align="center"
        numeric="tabular"
      >
        {deckPosition(index, list.length, formatPosition)}
      </TextV4>

      {showButtons ? (
        <LikePassButtonsV4
          actions={actions}
          disabledActions={disabledActions}
          actionLabels={{ rewind: rewindLabel }}
          onAction={onButton}
        />
      ) : null}
    </View>
  );
}
