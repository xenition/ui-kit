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
exports.CarouselV4 = CarouselV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const useReducedMotion_1 = require("../primitives/internal/useReducedMotion");
/**
 * Carousel — **V4** "showcase" design (native mirror of the web V4). A refined
 * page-snapping slider: the same `pagingEnabled` horizontal `ScrollView` as the
 * base native `Carousel`, re-skinned with a rounded showcase track, tactile
 * ≥44px round prev/next controls, and clear dot indicators (active = a wide
 * primary pill, others = muted — never color alone; the active dot also carries
 * an `accessibilityState.selected`). As with the base native `Carousel`, the
 * web hover/focus pause has no touch analogue; `autoplay` still honors reduced
 * motion (paused) and a single-slide carousel (no-op). Honors `items`, `dots`,
 * `autoplay`, `label`. Same props/behavior as {@link CarouselProps}; token-only
 * colors, no literals.
 */
function CarouselV4({ items, dots = true, autoplay = 0, label = 'Carousel', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const count = items.length;
    const [active, setActive] = React.useState(0);
    const [width, setWidth] = React.useState(0);
    const scrollerRef = React.useRef(null);
    const goTo = React.useCallback((index) => {
        if (count === 0 || width === 0)
            return;
        const nextIndex = ((index % count) + count) % count;
        setActive(nextIndex);
        scrollerRef.current?.scrollTo({ x: nextIndex * width, animated: !reduced });
    }, [count, width, reduced]);
    React.useEffect(() => {
        if (!autoplay || autoplay <= 0 || reduced || count <= 1 || width === 0) {
            return undefined;
        }
        const id = setInterval(() => goTo(active + 1), autoplay);
        return () => clearInterval(id);
    }, [autoplay, reduced, count, width, active, goTo]);
    const onLayout = (event) => {
        setWidth(event.nativeEvent.layout.width);
    };
    const onMomentumScrollEnd = (event) => {
        if (width === 0)
            return;
        const next = Math.round(event.nativeEvent.contentOffset.x / width);
        setActive(next);
    };
    const showControls = count > 1;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-carousel", accessibilityLabel: label, style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { position: 'relative', borderRadius: tokens.radius.lg, overflow: 'hidden' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { ref: scrollerRef, horizontal: true, pagingEnabled: true, showsHorizontalScrollIndicator: false, onLayout: onLayout, onMomentumScrollEnd: onMomentumScrollEnd, children: items.map((slide, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: width || undefined }, children: slide }, i))) }), showControls ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Previous slide", onPress: () => goTo(active - 1), style: ({ pressed }) => ({
                                    position: 'absolute',
                                    left: tokens.spacing.sm,
                                    top: '50%',
                                    transform: [{ translateY: -22 }],
                                    height: 44,
                                    width: 44,
                                    borderRadius: tokens.radius.full,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderWidth: 1,
                                    borderColor: colors.border,
                                    backgroundColor: colors.surface,
                                    shadowColor: colors.onSurface,
                                    shadowOpacity: 0.12,
                                    shadowRadius: 8,
                                    shadowOffset: { width: 0, height: 2 },
                                    elevation: 3,
                                    opacity: pressed ? 0.8 : 1,
                                }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: '‹' }) }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Next slide", onPress: () => goTo(active + 1), style: ({ pressed }) => ({
                                    position: 'absolute',
                                    right: tokens.spacing.sm,
                                    top: '50%',
                                    transform: [{ translateY: -22 }],
                                    height: 44,
                                    width: 44,
                                    borderRadius: tokens.radius.full,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderWidth: 1,
                                    borderColor: colors.border,
                                    backgroundColor: colors.surface,
                                    shadowColor: colors.onSurface,
                                    shadowOpacity: 0.12,
                                    shadowRadius: 8,
                                    shadowOffset: { width: 0, height: 2 },
                                    elevation: 3,
                                    opacity: pressed ? 0.8 : 1,
                                }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: '›' }) })] })) : null] }), dots && count > 1 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-carousel-dots", style: {
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: tokens.spacing.xs,
                    marginTop: tokens.spacing.md,
                }, children: items.map((_, i) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Go to slide ${i + 1}`, accessibilityState: { selected: i === active }, hitSlop: 8, onPress: () => goTo(i), style: {
                        height: 8,
                        width: i === active ? 24 : 8,
                        borderRadius: tokens.radius.full,
                        backgroundColor: i === active ? colors.primary : (0, color_1.withAlpha)(colors.muted, 0.4),
                    } }, i))) })) : null] }));
}
//# sourceMappingURL=CarouselV4.js.map