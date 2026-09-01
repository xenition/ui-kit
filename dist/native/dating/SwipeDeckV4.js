"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwipeDeckV4 = SwipeDeckV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const useReducedMotion_1 = require("../primitives/internal/useReducedMotion");
const motion_v4_1 = require("../primitives/internal/motion-v4");
const SwipeCardV4_1 = require("./SwipeCardV4");
const LikePassButtonsV4_1 = require("./LikePassButtonsV4");
const deck_v4_1 = require("../../dating/deck-v4");
const profile_v4_1 = require("./internal/profile-v4");
/** How far off-screen a committed card flies. */
const EXIT = 600;
/** The peek card's scale — depth by size, not by fading it out. */
const PEEK_SCALE = 0.94;
const DEFAULT_ACTIONS = ['pass', 'superlike', 'like'];
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
function SwipeDeckV4({ profiles, renderCard, onSwipe, onSwipeRight, onSwipeLeft, onSwipeUp, onEmpty, onRewind, showButtons = true, threshold = 120, loading = false, emptyTitle = "You're all caught up", emptySubtitle = 'Check back later for new people nearby.', rewindLabel = 'Undo', actions = DEFAULT_ACTIONS, emptyAction, formatPosition, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const list = profiles ?? [];
    const [index, setIndex] = React.useState(0);
    const position = React.useRef(new react_native_1.Animated.ValueXY({ x: 0, y: 0 })).current;
    // Newest props visible to the once-created PanResponder without re-creating it.
    const stateRef = React.useRef({ index, list, threshold });
    stateRef.current = { index, list, threshold };
    const commit = React.useCallback((decision) => {
        const { index: i, list: profs } = stateRef.current;
        const profile = profs[i];
        if (!profile)
            return;
        // Outside the updater, deliberately: a state updater must be pure, and
        // React calls it twice in StrictMode — which is exactly how the web twin
        // came to emit every like and every pass a second time.
        onSwipe?.(decision, profile);
        if (decision === 'like')
            onSwipeRight?.(profile);
        else if (decision === 'pass')
            onSwipeLeft?.(profile);
        else
            onSwipeUp?.(profile);
        const next = i + 1;
        const toValue = decision === 'superlike'
            ? { x: 0, y: -EXIT }
            : decision === 'like'
                ? { x: EXIT, y: 0 }
                : { x: -EXIT, y: 0 };
        react_native_1.Animated.timing(position, {
            toValue,
            // Settled, not frozen: the card still leaves, it just does not travel.
            duration: reduced ? motion_v4_1.V4_MOTION.instant : motion_v4_1.V4_MOTION.standard,
            useNativeDriver: false,
        }).start(() => {
            position.setValue({ x: 0, y: 0 });
            setIndex(next);
            if (next >= profs.length)
                onEmpty?.();
        });
    }, [onSwipe, onSwipeRight, onSwipeLeft, onSwipeUp, onEmpty, position, reduced]);
    const rewind = React.useCallback(() => {
        // The undo the base could not express: hand the decision back to the
        // caller AND put the card back, which is the half a caller cannot do.
        onRewind?.();
        setIndex((i) => Math.max(0, i - 1));
    }, [onRewind]);
    const responder = React.useMemo(() => react_native_1.PanResponder.create({
        onMoveShouldSetPanResponder: (_e, g) => Math.abs(g.dx) > 4 || Math.abs(g.dy) > 4,
        onPanResponderMove: (_e, g) => {
            position.setValue({ x: g.dx, y: g.dy });
        },
        onPanResponderRelease: (_e, g) => {
            const t = stateRef.current.threshold;
            if (g.dy < -t && Math.abs(g.dy) > Math.abs(g.dx)) {
                commit('superlike');
            }
            else if (g.dx > t) {
                commit('like');
            }
            else if (g.dx < -t) {
                commit('pass');
            }
            else {
                react_native_1.Animated.spring(position, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: false,
                    friction: 6,
                }).start();
            }
        },
        // A gesture the OS takes away mid-drag (a call, a system sheet) left
        // the card frozen part-way across the screen.
        onPanResponderTerminate: () => {
            react_native_1.Animated.spring(position, {
                toValue: { x: 0, y: 0 },
                useNativeDriver: false,
                friction: 6,
            }).start();
        },
    }), [commit, position]);
    const onButton = (action) => {
        if (action === 'like')
            commit('like');
        else if (action === 'pass')
            commit('pass');
        else if (action === 'superlike')
            commit('superlike');
        else if (action === 'rewind')
            rewind();
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
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityLabel: "Loading profiles", style: [{ gap: tokens.spacing.lg }, style], children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    width: '100%',
                    aspectRatio: 3 / 4,
                    borderRadius: tokens.radius.lg,
                    overflow: 'hidden',
                    backgroundColor: (0, profile_v4_1.skeletonFill)(theme),
                    justifyContent: 'flex-end',
                    padding: tokens.spacing.md,
                    gap: tokens.spacing.xs,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            height: tokens.typography.scale.xl,
                            width: '55%',
                            borderRadius: tokens.radius.sm,
                            backgroundColor: (0, profile_v4_1.skeletonFill)(theme),
                        } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            height: tokens.typography.scale.sm,
                            width: '80%',
                            borderRadius: tokens.radius.sm,
                            backgroundColor: (0, profile_v4_1.skeletonFill)(theme),
                        } })] }) }));
    }
    const current = list[index];
    const upcoming = list[index + 1];
    if (!current) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
                {
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: tokens.spacing['2xl'],
                    gap: tokens.spacing.xs,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "3xl", allowFontScaling: false, children: "\uD83C\uDF1F" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { accessibilityRole: "header", size: "lg", weight: "bold", tone: "onSurface", align: "center", children: emptyTitle }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", align: "center", children: emptySubtitle }), emptyAction ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.sm }, children: emptyAction }) : null] }));
    }
    const renderOne = (p, i) => renderCard ? renderCard(p, i) : (0, jsx_runtime_1.jsx)(SwipeCardV4_1.SwipeCardV4, { profile: p });
    const rewindable = (0, deck_v4_1.canRewind)(list.slice(0, index));
    const disabledActions = rewindable ? [] : ['rewind'];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.lg }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width: '100%', aspectRatio: 3 / 4 }, children: [upcoming ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                            position: 'absolute',
                            top: tokens.spacing.sm,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            transform: [{ scale: PEEK_SCALE }],
                        }, children: renderOne(upcoming, index + 1) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { ...responder.panHandlers, style: {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            transform: [{ translateX: position.x }, { translateY: position.y }, { rotate }],
                        }, children: [renderOne(current, index), (0, jsx_runtime_1.jsx)(SwipeCardV4_1.SwipeStampV4, { overlay: "like", opacity: likeOpacity }), (0, jsx_runtime_1.jsx)(SwipeCardV4_1.SwipeStampV4, { overlay: "nope", opacity: nopeOpacity }), (0, jsx_runtime_1.jsx)(SwipeCardV4_1.SwipeStampV4, { overlay: "superlike", opacity: superOpacity })] })] }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { accessibilityRole: "text", accessibilityLiveRegion: "polite", size: "xs", tone: "mutedText", align: "center", numeric: "tabular", children: (0, deck_v4_1.deckPosition)(index, list.length, formatPosition) }), showButtons ? ((0, jsx_runtime_1.jsx)(LikePassButtonsV4_1.LikePassButtonsV4, { actions: actions, disabledActions: disabledActions, actionLabels: { rewind: rewindLabel }, onAction: onButton })) : null] }));
}
//# sourceMappingURL=SwipeDeckV4.js.map