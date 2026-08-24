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
exports.SwipeDeck = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
const SwipeCard_1 = require("./SwipeCard");
const LikePassButtons_1 = require("./LikePassButtons");
/**
 * The swipeable card stack — the web parity of the native dating deck. Unlike the
 * native pan-gesture deck, swipes here are driven by the built-in, fully
 * accessible {@link LikePassButtons} row (keyboard + screen-reader friendly) and
 * an optional pointer drag on the top card: dragging past `threshold` right = like,
 * left = pass, up = super like. Each committed swipe advances the stack and reports
 * through `onSwipe` (+ the directional convenience callbacks). LIKE / NOPE / SUPER
 * stamps fade in with drag progress. Shows an explicit {@link EmptyState} once the
 * stack is exhausted. Token classes only — no literal colors.
 */
exports.SwipeDeck = React.forwardRef(function SwipeDeck({ profiles, renderCard, onSwipe, onSwipeRight, onSwipeLeft, onSwipeUp, onEmpty, showButtons = true, threshold = 120, loading = false, emptyTitle = "You're all caught up", emptySubtitle = 'Check back later for new people nearby.', className, ...rest }, ref) {
    const list = profiles ?? [];
    const [index, setIndex] = React.useState(0);
    const [offset, setOffset] = React.useState({ x: 0, y: 0 });
    const dragStart = React.useRef(null);
    const commit = React.useCallback((decision) => {
        setIndex((i) => {
            const profile = list[i];
            if (!profile)
                return i;
            onSwipe?.(decision, profile);
            if (decision === 'like')
                onSwipeRight?.(profile);
            else if (decision === 'pass')
                onSwipeLeft?.(profile);
            else
                onSwipeUp?.(profile);
            const next = i + 1;
            if (next >= list.length)
                onEmpty?.();
            return next;
        });
        setOffset({ x: 0, y: 0 });
    }, [list, onSwipe, onSwipeRight, onSwipeLeft, onSwipeUp, onEmpty]);
    const onButton = (action) => {
        if (action === 'like')
            commit('like');
        else if (action === 'pass')
            commit('pass');
        else if (action === 'superlike')
            commit('superlike');
    };
    const onPointerDown = (e) => {
        dragStart.current = { x: e.clientX, y: e.clientY };
        e.currentTarget.setPointerCapture?.(e.pointerId);
    };
    const onPointerMove = (e) => {
        if (!dragStart.current)
            return;
        setOffset({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
    };
    const onPointerUp = () => {
        if (!dragStart.current)
            return;
        dragStart.current = null;
        const { x, y } = offset;
        if (y < -threshold && Math.abs(y) > Math.abs(x))
            commit('superlike');
        else if (x > threshold)
            commit('like');
        else if (x < -threshold)
            commit('pass');
        else
            setOffset({ x: 0, y: 0 });
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-md', className), ...rest, children: (0, jsx_runtime_1.jsx)("div", { "aria-label": "Loading profiles", className: "aspect-[3/4] w-full rounded-[var(--xen-radius-lg)] bg-neutral-200" }) }));
    }
    const current = list[index];
    const upcoming = list[index + 1];
    if (!current) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { icon: (0, jsx_runtime_1.jsx)("span", { className: "text-3xl", children: "\uD83C\uDF1F" }), title: emptyTitle, description: emptySubtitle }) }));
    }
    const renderOne = (p, i) => renderCard ? renderCard(p, i) : (0, jsx_runtime_1.jsx)(SwipeCard_1.SwipeCard, { profile: p });
    const activeOverlay = offset.y < -threshold / 2 && Math.abs(offset.y) > Math.abs(offset.x)
        ? 'superlike'
        : offset.x > threshold / 2
            ? 'like'
            : offset.x < -threshold / 2
                ? 'nope'
                : null;
    const overlayProgress = Math.min(1, Math.max(Math.abs(offset.x), Math.abs(offset.y)) / Math.max(1, threshold));
    const rotate = Math.max(-12, Math.min(12, (offset.x / Math.max(1, threshold)) * 12));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-lg', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative aspect-[3/4] w-full select-none", children: [upcoming ? ((0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 scale-95 opacity-70", children: renderOne(upcoming, index + 1) })) : null, (0, jsx_runtime_1.jsx)("div", { "aria-label": `Profile ${index + 1} of ${list.length}`, onPointerDown: onPointerDown, onPointerMove: onPointerMove, onPointerUp: onPointerUp, className: "absolute inset-0 cursor-grab touch-none active:cursor-grabbing", style: { transform: `translate(${offset.x}px, ${offset.y}px) rotate(${rotate}deg)` }, children: renderCard ? (renderCard(current, index)) : ((0, jsx_runtime_1.jsx)(SwipeCard_1.SwipeCard, { profile: current, overlay: activeOverlay, overlayOpacity: overlayProgress })) })] }), showButtons ? (0, jsx_runtime_1.jsx)(LikePassButtons_1.LikePassButtons, { actions: ['pass', 'superlike', 'like'], onAction: onButton }) : null] }));
});
//# sourceMappingURL=SwipeDeck.js.map