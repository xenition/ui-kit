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
exports.BentoCardV4 = BentoCardV4;
exports.BentoGridV4 = BentoGridV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const useReducedMotion_1 = require("../primitives/internal/useReducedMotion");
/** Soft-primary media-well glyph placeholder used when a card has no `visual`. */
function MediaGlyph({ color }) {
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            height: 28,
            width: 28,
            borderRadius: 6,
            borderWidth: 2,
            borderColor: color,
        } }));
}
/**
 * BentoCard — **V4** "showcase" design (native mirror of the web V4). One bento
 * cell as an image-forward, elevated rounded showcase card: a floating
 * soft-primary media well carrying the `visual` (or a glyph placeholder when
 * empty), a soft-primary metric chip, an extra-bold tight-tracked title, muted
 * body copy, and a pinned detail line. NOT a gradient surface — a clean elevated
 * card (`colors.card` + border + soft shadow). Same props/behavior as the base
 * {@link BentoCardProps}; token-only colors, no literals.
 */
function BentoCardV4({ icon, metric, title, body, visual, detail, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const softPrimary = (0, color_1.withAlpha)(colors.primary, 0.1);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-bento-card", style: [
            {
                flex: 1,
                overflow: 'hidden',
                gap: tokens.spacing.sm,
                padding: tokens.spacing.lg,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.card,
                shadowColor: colors.onSurface,
                shadowOpacity: 0.06,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 4 },
                elevation: 2,
            },
            style,
        ], children: [icon !== undefined || metric !== undefined ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [icon !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            height: 44,
                            width: 44,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: tokens.radius.md,
                            backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.12),
                        }, children: typeof icon === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontWeight: '700' }, children: icon })) : (icon) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), metric !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: tokens.spacing.xs,
                            borderRadius: 9999,
                            backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.12),
                        }, children: typeof metric === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: metric })) : (metric) })) : null] })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    minHeight: 96,
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    borderRadius: tokens.radius.md,
                    backgroundColor: softPrimary,
                }, children: visual !== undefined ? visual : (0, jsx_runtime_1.jsx)(MediaGlyph, { color: colors.primary }) }), title !== undefined ? (typeof title === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.xl,
                    fontWeight: '800',
                    letterSpacing: -0.3,
                }, children: title })) : (title)) : null, body !== undefined ? (typeof body === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.muted,
                    fontSize: tokens.typography.scale.sm,
                    lineHeight: tokens.typography.scale.sm * 1.5,
                }, children: body })) : (body)) : null, detail !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: 'auto' }, children: typeof detail === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '500' }, children: detail })) : (detail) })) : null] }));
}
/**
 * BentoGrid — **V4** "showcase" design (native mirror of the web V4). A stacked
 * (wrapping) list of elevated `BentoCardV4`s. As with the base native `BentoGrid`,
 * the web's asymmetric span/overlap geometry has no phone analogue and is dropped
 * — cards render as a simple stack. Cards fade + rise once on mount (skipped under
 * the OS "Reduce Motion" toggle). Accepts the base's `cards` data array or
 * `BentoCardV4` children (array wins). Same props/behavior as the base
 * {@link BentoGridProps}; token-only colors, no literals.
 */
function BentoGridV4({ cards, children, style }) {
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
    const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [12, 0] });
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { testID: "xen-bento-grid", style: [{ gap: tokens.spacing.md, opacity: anim, transform: [{ translateY }] }, style], children: cards !== undefined
            ? cards.map((c, i) => (0, jsx_runtime_1.jsx)(BentoCardV4, { ...c }, i))
            : children }));
}
//# sourceMappingURL=BentoV4.js.map