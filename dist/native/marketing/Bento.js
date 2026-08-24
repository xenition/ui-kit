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
exports.BentoCard = BentoCard;
exports.BentoGrid = BentoGrid;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const useReducedMotion_1 = require("../primitives/internal/useReducedMotion");
/**
 * One bento cell — the native mirror of the web `BentoCard`: an icon tile +
 * metric chip header, a title, body copy, an optional micro-visual slot, and a
 * pinned detail line. The web hover glow + radial "energy wash" are hover-only
 * effects with no touch analogue and are dropped; the ramp-gradient icon tile
 * degrades to a flat token-tinted square. All slots optional. Token-only.
 */
function BentoCard({ icon, metric, title, body, visual, detail, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-bento-card", style: [
            {
                flex: 1,
                overflow: 'hidden',
                gap: tokens.spacing.sm,
                padding: tokens.spacing.lg,
                borderRadius: tokens.radius.lg,
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
            },
            style,
        ], children: [icon !== undefined || metric !== undefined ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }, children: [icon !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            height: 44,
                            width: 44,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: tokens.radius.md,
                            backgroundColor: tokens.ramps.primary[600],
                        }, children: typeof icon === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onPrimary, fontWeight: '700' }, children: icon })) : (icon) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), metric !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: tokens.spacing.xs,
                            borderRadius: 9999,
                            borderWidth: 1,
                            borderColor: tokens.ramps.accent[300],
                            backgroundColor: tokens.ramps.accent[50],
                        }, children: typeof metric === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: colors.accent,
                                fontSize: tokens.typography.scale.xs,
                                fontWeight: '700',
                            }, children: metric })) : (metric) })) : null] })) : null, title !== undefined ? (typeof title === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.xl,
                    fontWeight: '700',
                }, children: title })) : (title)) : null, body !== undefined ? (typeof body === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: body })) : (body)) : null, visual !== undefined ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: visual }) : null, detail !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: 'auto' }, children: typeof detail === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        color: colors.primary,
                        fontSize: tokens.typography.scale.xs,
                        fontWeight: '500',
                    }, children: detail })) : (detail) })) : null] }));
}
/**
 * Bento feature grid — the native mirror of the web `BentoGrid` + `BentoCard`.
 *
 * The web version is an asymmetric 6-column CSS grid where cards declare their
 * own column/row spans and overlap into the classic bento rhythm. React Native
 * has no CSS grid and phones are single-column, so native **drops the spans and
 * overlap entirely** and renders the cards as a simple stacked (wrapping) list
 * — the same simplification `FeatureGrid` makes. The web hover glow/energy wash
 * are hover-only and are dropped. Cards fade + rise once on mount (skipped when
 * the OS "Reduce Motion" toggle is on). Token-only.
 */
function BentoGrid({ cards, children, style }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const anim = React.useRef(new react_native_1.Animated.Value(0)).current;
    React.useEffect(() => {
        if (reduced) {
            anim.setValue(1);
            return;
        }
        const animation = react_native_1.Animated.timing(anim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
        });
        animation.start();
        return () => animation.stop();
    }, [anim, reduced]);
    const translateY = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [12, 0],
    });
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { testID: "xen-bento-grid", style: [
            {
                gap: tokens.spacing.md,
                opacity: anim,
                transform: [{ translateY }],
            },
            style,
        ], children: cards !== undefined
            ? cards.map((c, i) => (0, jsx_runtime_1.jsx)(BentoCard, { ...c }, i))
            : children }));
}
//# sourceMappingURL=Bento.js.map