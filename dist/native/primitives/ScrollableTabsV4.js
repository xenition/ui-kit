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
exports.ScrollableTabsV4 = ScrollableTabsV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const v4_depth_1 = require("../../primitives/internal/v4-depth");
const color_1 = require("../../theme/color");
const compile_1 = require("../../theme/compile");
const nav_v4_1 = require("./internal/nav-v4");
const useReducedMotion_1 = require("./internal/useReducedMotion");
const state_v4_1 = require("./internal/state-v4");
/** How much `onSurface` an idle count chip carries. A ground, not a fill. */
const CHIP_MIX = 0.12;
/**
 * **V4 scrollable tabs** — same props as {@link ScrollableTabs}, a different
 * design line.
 *
 * Everything `TabsV4` does, plus the two things that only matter once the row
 * is longer than the screen.
 *
 * ## The selected tab comes to you
 *
 * A scrolling tab bar can put the answer to "where am I" off-screen, which
 * makes §32 unsatisfiable: there is nothing to recognise. So the row scrolls
 * the selected tab into view whenever the selection changes — including when
 * it changes from somewhere else, which is the case the user cannot fix by
 * scrolling because they never saw it happen.
 *
 * The scroll is animated for the same reason the underline slides (§36.5): the
 * bar moving under a stationary finger explains where the content went, while
 * a jump replaces one screen with another and leaves the reader to work out
 * what changed. Reduce Motion jumps instead (§36.10) — the tab still arrives.
 *
 * ## The count chip owns its ground
 *
 * The base bar filled the active chip with `primary` and labelled it
 * `colors.surface` — two slots with no contrast relationship at all; on a pale
 * primary that is white on near-white. The idle chip was worse: `muted` as a
 * FILL with `surface` text, which is a contrast pair by coincidence in light
 * and not at all in dark.
 *
 * V4 gives each chip a ground it owns. Active is `primary` with its guaranteed
 * `onPrimary`. Idle is `onSurface` composited OPAQUELY into `surface` at 12% —
 * opaque because a translucent tint borrows whatever is behind it, and the
 * label's promise was never about that. The label is then re-measured against
 * the ground the chip actually painted, exactly as `BadgeV4` does.
 */
function ScrollableTabsV4({ items, value, onValueChange, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const activeIndex = items.findIndex((it) => it.value === value);
    const indicator = (0, nav_v4_1.useMovingIndicator)(activeIndex);
    const scroller = React.useRef(null);
    // Measured tab boxes, kept here as well as in the indicator hook: the hook
    // owns the underline's position, this owns "is the selected tab visible".
    const boxes = React.useRef({});
    const viewport = React.useRef(0);
    const offset = React.useRef(0);
    const revealActive = React.useCallback(() => {
        const box = boxes.current[activeIndex];
        if (box === undefined || viewport.current === 0)
            return;
        const left = offset.current;
        const right = left + viewport.current;
        if (box.x >= left && box.x + box.w <= right)
            return;
        // Land the tab a comfortable gutter inside the edge it was hiding behind,
        // so it reads as "in view" rather than "clipped at the boundary".
        const gutter = tokens.spacing.lg;
        const target = box.x < left ? box.x - gutter : box.x + box.w - viewport.current + gutter;
        scroller.current?.scrollTo({ x: Math.max(target, 0), animated: !reduced });
    }, [activeIndex, reduced, tokens.spacing.lg]);
    React.useEffect(() => {
        revealActive();
    }, [revealActive]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.ScrollView, { ref: scroller, horizontal: true, showsHorizontalScrollIndicator: false, accessibilityRole: "tablist", onLayout: (event) => {
            viewport.current = event.nativeEvent.layout.width;
            revealActive();
        }, onScroll: (event) => {
            offset.current = event.nativeEvent.contentOffset.x;
        }, scrollEventThrottle: nav_v4_1.NAV_MOTION.reveal, style: [{ borderBottomWidth: 1, borderBottomColor: colors.border }, style], contentContainerStyle: { alignItems: 'stretch' }, children: [items.map((it, index) => {
                const active = it.value === value;
                const chipBg = active ? colors.primary : (0, v4_depth_1.mixToken)(colors.surface, colors.onSurface, CHIP_MIX);
                const chipFg = (0, color_1.ensureContrast)(active ? colors.onPrimary : colors.onSurface, chipBg, compile_1.MIN_CONTRAST);
                return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "tab", accessibilityState: { selected: active }, onLayout: (event) => {
                        const { x, width } = event.nativeEvent.layout;
                        boxes.current[index] = { x, w: width };
                        indicator.onItemLayout(index)(event);
                        if (active)
                            revealActive();
                    }, onPress: () => onValueChange(it.value), style: ({ pressed }) => ({
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: tokens.spacing.sm,
                        minHeight: (0, nav_v4_1.minTap)(tokens.spacing),
                        paddingHorizontal: tokens.spacing.lg,
                        paddingVertical: tokens.spacing.sm,
                        backgroundColor: pressed ? (0, state_v4_1.pressLayer)(theme) : 'transparent',
                    }), children: [typeof it.label === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                color: active ? colors.primaryText : colors.mutedText,
                                fontSize: tokens.typography.scale.sm,
                                fontFamily: tokens.typography.fontBody,
                                fontWeight: active ? '600' : '500',
                            }, children: it.label })) : (it.label), it.badge != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                minWidth: tokens.spacing.lg,
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingHorizontal: tokens.spacing.xs,
                                paddingVertical: tokens.spacing.xs / 2,
                                borderRadius: tokens.radius.full,
                                backgroundColor: chipBg,
                            }, children: typeof it.badge === 'string' || typeof it.badge === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: chipFg,
                                    fontSize: tokens.typography.scale.xs,
                                    fontWeight: '600',
                                }, children: it.badge })) : (it.badge) })) : null] }, it.value));
            }), (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", pointerEvents: "none", style: {
                    position: 'absolute',
                    bottom: 0,
                    height: 2,
                    left: indicator.left,
                    width: indicator.width,
                    backgroundColor: colors.primary,
                    borderRadius: tokens.radius.full,
                    opacity: indicator.measured && activeIndex >= 0 ? 1 : 0,
                } })] }));
}
//# sourceMappingURL=ScrollableTabsV4.js.map