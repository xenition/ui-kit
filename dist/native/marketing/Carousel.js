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
exports.Carousel = Carousel;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const useReducedMotion_1 = require("../primitives/internal/useReducedMotion");
/**
 * Horizontal, page-snapping slider — the native mirror of the web `Carousel`.
 * The web version scroll-snaps a flex row; native uses a `pagingEnabled`
 * horizontal `ScrollView` where each slide is one page wide. Swiping drives the
 * active dot, and tapping a dot pages to that slide. The web prev/next arrows
 * and hover/focus pause are dropped (touch has no hover); autoplay still honors
 * reduced motion. Token-only.
 */
function Carousel({ items, dots = true, autoplay = 0, label = 'Carousel', style, }) {
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
        scrollerRef.current?.scrollTo({
            x: nextIndex * width,
            animated: !reduced,
        });
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
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-carousel", accessibilityLabel: label, style: style, children: [(0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { ref: scrollerRef, horizontal: true, pagingEnabled: true, showsHorizontalScrollIndicator: false, onLayout: onLayout, onMomentumScrollEnd: onMomentumScrollEnd, children: items.map((slide, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: width || undefined }, children: slide }, i))) }), dots && count > 1 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-carousel-dots", style: {
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: tokens.spacing.xs,
                    marginTop: tokens.spacing.md,
                }, children: items.map((_, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "button", accessibilityLabel: `Go to slide ${i + 1}`, accessibilityState: { selected: i === active }, onTouchEnd: () => goTo(i), style: {
                        height: 8,
                        width: i === active ? 20 : 8,
                        borderRadius: tokens.radius.full,
                        backgroundColor: i === active ? colors.primary : tokens.ramps.neutral[300],
                    } }, i))) })) : null] }));
}
//# sourceMappingURL=Carousel.js.map