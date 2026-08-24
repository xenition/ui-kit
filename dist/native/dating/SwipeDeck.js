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
exports.SwipeDeck = SwipeDeck;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const SwipeCard_1 = require("./SwipeCard");
const LikePassButtons_1 = require("./LikePassButtons");
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
function SwipeDeck({ profiles, renderCard, onSwipe, onSwipeRight, onSwipeLeft, onSwipeUp, onEmpty, showButtons = true, threshold = 120, loading = false, emptyTitle = "You're all caught up", emptySubtitle = 'Check back later for new people nearby.', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
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
        onSwipe?.(decision, profile);
        if (decision === 'like')
            onSwipeRight?.(profile);
        else if (decision === 'pass')
            onSwipeLeft?.(profile);
        else
            onSwipeUp?.(profile);
        const next = i + 1;
        const toValue = decision === 'superlike'
            ? { x: 0, y: -600 }
            : decision === 'like'
                ? { x: 600, y: 0 }
                : { x: -600, y: 0 };
        react_native_1.Animated.timing(position, { toValue, duration: 200, useNativeDriver: false }).start(() => {
            position.setValue({ x: 0, y: 0 });
            setIndex(next);
            if (next >= profs.length)
                onEmpty?.();
        });
    }, [onSwipe, onSwipeRight, onSwipeLeft, onSwipeUp, onEmpty, position]);
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
    }), [commit, position]);
    const onButton = (action) => {
        if (action === 'like')
            commit('like');
        else if (action === 'pass')
            commit('pass');
        else if (action === 'superlike')
            commit('superlike');
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
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ gap: tokens.spacing.md }, style], children: (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading profiles", style: { width: '100%', aspectRatio: 3 / 4, borderRadius: tokens.radius.lg, backgroundColor: colors.border } }) }));
    }
    const current = list[index];
    const upcoming = list[index + 1];
    if (!current) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: `${emptyTitle}. ${emptySubtitle}`, style: [
                {
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: tokens.spacing['2xl'],
                    gap: tokens.spacing.xs,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale['3xl'] }, allowFontScaling: false, children: "\uD83C\uDF1F" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: emptyTitle }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }, children: emptySubtitle })] }));
    }
    const renderOne = (p, i) => renderCard ? renderCard(p, i) : (0, jsx_runtime_1.jsx)(SwipeCard_1.SwipeCard, { profile: p });
    const stamp = (text, slot, opacity, side) => ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { pointerEvents: "none", style: {
            position: 'absolute',
            top: tokens.spacing.lg,
            ...(side === 'left' ? { left: tokens.spacing.lg } : side === 'right' ? { right: tokens.spacing.lg } : { alignSelf: 'center' }),
            opacity,
            borderWidth: 3,
            borderColor: colors[slot],
            borderRadius: tokens.radius.md,
            paddingVertical: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.sm,
            backgroundColor: (0, color_1.withAlpha)(colors[slot], 0.14),
        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[slot], fontSize: tokens.typography.scale.xl, fontWeight: '800', letterSpacing: 2 }, children: text }) }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.lg }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width: '100%', aspectRatio: 3 / 4 }, children: [upcoming ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, transform: [{ scale: 0.96 }], opacity: 0.7 }, children: renderOne(upcoming, index + 1) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { ...responder.panHandlers, accessibilityLabel: `Profile ${index + 1} of ${list.length}`, style: {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            transform: [{ translateX: position.x }, { translateY: position.y }, { rotate }],
                        }, children: [renderOne(current, index), stamp('LIKE', 'success', likeOpacity, 'left'), stamp('NOPE', 'danger', nopeOpacity, 'right'), stamp('SUPER', 'accent', superOpacity, 'center')] })] }), showButtons ? ((0, jsx_runtime_1.jsx)(LikePassButtons_1.LikePassButtons, { actions: ['pass', 'superlike', 'like'], onAction: onButton })) : null] }));
}
//# sourceMappingURL=SwipeDeck.js.map