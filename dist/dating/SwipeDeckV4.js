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
exports.SwipeDeckV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const deck_v4_1 = require("./deck-v4");
const profile_v4_1 = require("./internal/profile-v4");
const LikePassButtonsV4_1 = require("./LikePassButtonsV4");
const SwipeCardV4_1 = require("./SwipeCardV4");
const DEFAULT_ACTIONS = ['pass', 'superlike', 'like'];
/**
 * **V4 swipe deck** — the web twin of the native `SwipeDeckV4`, same props as
 * {@link SwipeDeck} plus `onRewind`, `rewindLabel`, `actions`, `emptyAction`
 * and `formatPosition`.
 *
 * ## Seven changes
 *
 * 1. **Every like and pass was emitted twice.** `onSwipe`, `onSwipeRight`,
 *    `onSwipeLeft` and `onEmpty` were called from **inside a `setIndex`
 *    updater**. An updater must be pure, and React deliberately invokes it
 *    twice in StrictMode to catch exactly this — so in development every swipe
 *    fired the caller's handler twice, and a deck wired to an API sent two
 *    likes for one card. They now fire after the state is set, which is what
 *    the native twin already did.
 * 2. **A pass is recoverable.** The deck hard-coded
 *    `actions={['pass','superlike','like']}` and `onButton` tested exactly
 *    three strings, letting `'rewind'` fall through to nothing — so the undo
 *    control `LikePassButtons` has always shipped could not be reached from
 *    the one component that needs it. `actions` opens the row, `'rewind'`
 *    routes to `onRewind` **and steps the index back**, and it is disabled
 *    rather than dead when there is nothing to undo.
 * 3. **A custom card keeps its decision stamps.** `renderCard` computed
 *    `activeOverlay` and `overlayProgress` and then discarded both in that
 *    branch, so a caller who supplied their own card got no LIKE/NOPE feedback
 *    and no way to add it. The stamp is a sibling of the card now — native's
 *    arrangement — so it survives whichever card is rendered.
 * 4. **A lost pointer capture no longer freezes the card.** Scroll the page
 *    mid-drag, drag out of the window, take a phone call: the browser fires
 *    `pointercancel` or `lostpointercapture` and never `pointerup`, so the
 *    card stayed translated and rotated under a drag that had ended, with the
 *    stamp still up. Both events settle it.
 * 5. **The position is announced.** `Profile 3 of 12` was built and hung on a
 *    role-less `<div>`, where a reader ignored it, and it was never
 *    re-announced when the deck moved. It is a live region.
 * 6. **The empty state has somewhere to go.** It was a headline and a sentence
 *    and no next step — see `emptyAction`.
 * 7. **Loading is the shape it is about to be**, announced, and the peek card
 *    behind the top one is set back rather than faded: `opacity: 0.7` is not
 *    depth, and 0.38 of it is M3's *disabled* band, so a stack drawn in
 *    opacity reads as a stack of unavailable cards.
 */
exports.SwipeDeckV4 = React.forwardRef(function SwipeDeckV4({ profiles, renderCard, onSwipe, onSwipeRight, onSwipeLeft, onSwipeUp, onEmpty, onRewind, rewindLabel = 'Undo', actions = DEFAULT_ACTIONS, emptyAction, formatPosition, showButtons = true, threshold = 120, loading = false, emptyTitle = "You're all caught up", emptySubtitle = 'Check back later for new people nearby.', className, ...rest }, ref) {
    const list = profiles ?? [];
    const [index, setIndex] = React.useState(0);
    const [offset, setOffset] = React.useState({ x: 0, y: 0 });
    const dragStart = React.useRef(null);
    const commit = (decision) => {
        const profile = list[index];
        if (!profile)
            return;
        const next = index + 1;
        setIndex(next);
        setOffset({ x: 0, y: 0 });
        // Outside the updater, deliberately. See change 1.
        onSwipe?.(decision, profile);
        if (decision === 'like')
            onSwipeRight?.(profile);
        else if (decision === 'pass')
            onSwipeLeft?.(profile);
        else
            onSwipeUp?.(profile);
        if (next >= list.length)
            onEmpty?.();
    };
    const rewindable = (0, deck_v4_1.canRewind)(list.slice(0, index));
    const rewind = () => {
        if (!rewindable)
            return;
        setIndex(index - 1);
        setOffset({ x: 0, y: 0 });
        onRewind?.();
    };
    const onButton = (action) => {
        if (action === 'like' || action === 'pass' || action === 'superlike')
            commit(action);
        else if (action === 'rewind')
            rewind();
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
    /** The drag ended without a `pointerup`. Settle, do not decide. See change 4. */
    const onDragLost = () => {
        if (!dragStart.current)
            return;
        dragStart.current = null;
        setOffset({ x: 0, y: 0 });
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "status", "aria-busy": "true", "aria-label": "Loading profiles", className: (0, cn_1.cn)('flex flex-col gap-lg', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "aspect-[3/4] w-full overflow-hidden rounded-[var(--xen-radius-lg)]", children: (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('block h-full w-full', profile_v4_1.PLACEHOLDER_CLASS) }) }), showButtons ? ((0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: "flex items-center justify-center gap-md", children: [0, 1, 2].map((i) => ((0, jsx_runtime_1.jsx)("span", { className: "block h-[calc(var(--xen-space-2xl)_+_var(--xen-space-sm))] w-[calc(var(--xen-space-2xl)_+_var(--xen-space-sm))] overflow-hidden rounded-full", children: (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('block h-full w-full', profile_v4_1.PLACEHOLDER_CLASS) }) }, i))) })) : null] }));
    }
    const current = list[index];
    const upcoming = list[index + 1];
    if (!current) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { icon: (0, jsx_runtime_1.jsx)("span", { className: "text-3xl", children: "\uD83C\uDF1F" }), title: emptyTitle, description: emptySubtitle, action: emptyAction }) }));
    }
    const renderOne = (p, i) => renderCard ? renderCard(p, i) : (0, jsx_runtime_1.jsx)(SwipeCardV4_1.SwipeCardV4, { profile: p });
    const activeOverlay = offset.y < -threshold / 2 && Math.abs(offset.y) > Math.abs(offset.x)
        ? 'superlike'
        : offset.x > threshold / 2
            ? 'like'
            : offset.x < -threshold / 2
                ? 'nope'
                : null;
    const overlayProgress = Math.min(1, Math.max(Math.abs(offset.x), Math.abs(offset.y)) / Math.max(1, threshold));
    const rotate = Math.max(-12, Math.min(12, (offset.x / Math.max(1, threshold)) * 12));
    const position = (0, deck_v4_1.deckPosition)(index, list.length, formatPosition);
    const disabledActions = actions.includes('rewind') && !rewindable ? ['rewind'] : [];
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-lg', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative aspect-[3/4] w-full select-none", children: [upcoming ? ((0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: "absolute inset-0 scale-95 translate-y-sm", children: renderOne(upcoming, index + 1) })) : null, (0, jsx_runtime_1.jsxs)("div", { onPointerDown: onPointerDown, onPointerMove: onPointerMove, onPointerUp: onPointerUp, onPointerCancel: onDragLost, onLostPointerCapture: onDragLost, className: "absolute inset-0 cursor-grab touch-none active:cursor-grabbing", style: { transform: `translate(${offset.x}px, ${offset.y}px) rotate(${rotate}deg)` }, children: [renderOne(current, index), activeOverlay ? ((0, jsx_runtime_1.jsx)(SwipeCardV4_1.SwipeStampV4, { overlay: activeOverlay, opacity: overlayProgress })) : null] })] }), showButtons ? ((0, jsx_runtime_1.jsx)(LikePassButtonsV4_1.LikePassButtonsV4, { actions: actions, disabledActions: disabledActions, actionLabels: { rewind: rewindLabel }, onAction: onButton })) : null, (0, jsx_runtime_1.jsx)("span", { role: "status", "aria-live": "polite", className: "sr-only", children: position })] }));
});
//# sourceMappingURL=SwipeDeckV4.js.map