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
exports.PhotoCarousel = PhotoCarousel;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const RATIO = { portrait: 4 / 5, square: 1, landscape: 3 / 2 };
/**
 * Swipeable photo pager for a profile — the native photo carousel. Tapping the
 * left/right half of the frame steps between photos (mobile-friendly, no gesture
 * library) with a segmented progress bar and dot indicators on top. Supports
 * controlled (`index`/`onIndexChange`) and uncontrolled use, plus explicit
 * empty and loading states. All colors/overlays derive from theme tokens via
 * `withAlpha` — no literal colors. Array access is guarded.
 */
function PhotoCarousel({ photos, index, onIndexChange, ratio = 'portrait', rounded = true, loading = false, emptyLabel = 'No photos yet', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const list = photos ?? [];
    const controlled = index != null;
    const [internal, setInternal] = React.useState(0);
    const active = Math.max(0, Math.min(list.length - 1, controlled ? index : internal));
    const radius = rounded ? tokens.radius.lg : 0;
    const go = (next) => {
        const clamped = Math.max(0, Math.min(list.length - 1, next));
        if (!controlled)
            setInternal(clamped);
        if (clamped !== active)
            onIndexChange?.(clamped);
    };
    const frame = {
        width: '100%',
        aspectRatio: RATIO[ratio],
        borderRadius: radius,
        overflow: 'hidden',
        backgroundColor: colors.border,
    };
    if (loading) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading photos", style: [frame, style] });
    }
    if (list.length === 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: emptyLabel, style: [frame, { alignItems: 'center', justifyContent: 'center' }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale['2xl'] }, allowFontScaling: false, children: "\uD83D\uDCF7" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, marginTop: tokens.spacing.xs }, children: emptyLabel })] }));
    }
    const current = list[active] ?? list[0];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [frame, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: current.uri }, resizeMode: "cover", style: { width: '100%', height: '100%' } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, flexDirection: 'row' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Previous photo", disabled: active === 0, onPress: () => go(active - 1), style: { flex: 1 } }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Next photo", disabled: active >= list.length - 1, onPress: () => go(active + 1), style: { flex: 1 } })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: `Photo ${active + 1} of ${list.length}${current.alt ? `: ${current.alt}` : ''}`, style: {
                    position: 'absolute',
                    top: tokens.spacing.sm,
                    left: tokens.spacing.sm,
                    right: tokens.spacing.sm,
                    flexDirection: 'row',
                    gap: tokens.spacing.xs,
                }, children: list.map((p, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        flex: 1,
                        height: 3,
                        borderRadius: tokens.radius.full,
                        backgroundColor: i <= active ? (0, color_1.withAlpha)(colors.surface, 0.95) : (0, color_1.withAlpha)(colors.onSurface, 0.35),
                    } }, `${p.uri}-${i}`))) })] }));
}
//# sourceMappingURL=PhotoCarousel.js.map