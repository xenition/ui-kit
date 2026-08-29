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
exports.FloatButtonV4 = FloatButtonV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
const theme_1 = require("../theme");
const Gradient_1 = require("../commerce/internal/Gradient");
const motion_1 = require("./internal/motion");
const v4_depth_1 = require("../../primitives/internal/v4-depth");
/**
 * A {@link GradientToken} angle (degrees clockwise from up) as the `start`/`end`
 * unit points `expo-linear-gradient` wants. Mirrors `ButtonV4`'s copy — kept
 * here rather than hard-coding `{0,0}→{1,1}`, so the compiler stays the single
 * owner of the gradient's direction.
 */
function angleToPoints(angle) {
    const radians = (angle * Math.PI) / 180;
    // Screen space: y grows downwards, so "up" is -cos.
    const dx = Math.sin(radians);
    const dy = -Math.cos(radians);
    return {
        start: { x: 0.5 - dx / 2, y: 0.5 - dy / 2 },
        end: { x: 0.5 + dx / 2, y: 0.5 + dy / 2 },
    };
}
/** RN shadow style from an {@link ElevationToken}. `held` sits it back down. */
function elevationStyle(token, held) {
    const k = held ? 0.5 : 1;
    return {
        shadowColor: token.color,
        shadowOpacity: token.opacity * k,
        shadowRadius: token.radius * k,
        shadowOffset: { width: 0, height: token.offsetY * k },
        elevation: Math.round(token.android * k),
    };
}
/**
 * **V4 floating action button** — same props as {@link FloatButton}, a
 * different design line.
 *
 * §35.11 asks that gradients stay rare and purposeful, and §5 asks every screen
 * for exactly one dominant action. A FAB is both of those things at once: it is
 * the single primary action, and it is literally floating above the content. If
 * a brand gradient and `elevation.action` are right anywhere in this kit, they
 * are right here — and nowhere else in the identity group has earned either.
 *
 * So:
 *
 * - **The fill is `gradient.brand`**, resolved for the active scheme, run
 *   through {@link gradientInk} so the label and the icon clear AA against
 *   **both** stops rather than against the one flat colour `onPrimary` was
 *   measured on. `from` doubles as the opaque layer under the sweep, so the
 *   shadow has something real to fall from — and a `depth: 'flat'` seed, where
 *   the compiler has already collapsed both stops to one colour, lands on a
 *   solid `primary` FAB with no branch anywhere in this file.
 * - **The lift is `elevation.action`**, the seed's own decision, instead of the
 *   hand-picked `shadowOpacity: 0.3 / radius 8 / offset 4` the base carried —
 *   which also took its colour from `tokens.ramps.neutral[950]`, the LIGHT
 *   orientation in both schemes. A shadow on a dark page needs MORE opacity,
 *   not a lighter colour, and only the compiled token knows that.
 * - **The press is a press.** The base dipped opacity to 0.85, which reads as
 *   "disabled" rather than "pushed". V4 scales through `usePressScale` — which
 *   is reduced-motion aware by construction (§36.10), so with Reduce Motion on
 *   the scale stays at 1 — and drops the elevation to half, so the button sits
 *   back down whether or not the animation runs.
 *
 * Everything else is unchanged: the anchor offsets, the safe-area lift over the
 * home indicator, and the pill-when-labelled shape. 56pt clears the 44pt touch
 * minimum with room to spare, which is the one number a FAB must never lose.
 */
function FloatButtonV4({ onPress, onPressIn, onPressOut, icon, label, placement = 'bottom-right', disabled = false, accessibilityLabel, style, ...rest }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens, gradient, elevation } = theme;
    const insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    const press = (0, motion_1.usePressScale)();
    const [held, setHeld] = React.useState(false);
    const spacing = tokens.spacing;
    // 56 from the scale, not from a literal — and comfortably past the 44 a
    // finger needs.
    const size = spacing['2xl'] + spacing.sm;
    // Legible stops plus the ink that reads on both. Untouched when the
    // compiler's own pair already clears AA, which is the common case.
    const brand = (0, v4_depth_1.gradientInk)(gradient.brand, colors.onPrimary, {
        darkest: tokens.ramps.neutral[950],
        lightest: tokens.ramps.neutral[50],
    });
    const points = angleToPoints(gradient.brand.angle);
    const anchor = placement === 'bottom-left'
        ? { left: spacing.lg }
        : placement === 'bottom-center'
            ? { alignSelf: 'center', left: 0, right: 0 }
            : { right: spacing.lg };
    const handlePressIn = (event) => {
        setHeld(true);
        press.onPressIn();
        onPressIn?.(event);
    };
    const handlePressOut = (event) => {
        setHeld(false);
        press.onPressOut();
        onPressOut?.(event);
    };
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [
            {
                position: 'absolute',
                bottom: spacing.xl + insets.bottom,
                alignSelf: placement === 'bottom-center' ? 'center' : undefined,
                borderRadius: tokens.radius.full,
                // The near stop is the opaque layer the shadow falls from; on a flat
                // seed it IS the whole fill, because both stops are the same colour.
                backgroundColor: brand.from,
                opacity: disabled ? theme.state.disabledContent : 1,
                transform: [{ scale: press.scale }],
            },
            elevationStyle(elevation.action, held),
            anchor,
            style,
        ], children: (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: accessibilityLabel ?? label, accessibilityState: { disabled }, disabled: disabled, onPress: onPress, onPressIn: handlePressIn, onPressOut: handlePressOut, style: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: label ? spacing.xs : 0,
                minHeight: size,
                minWidth: size,
                height: label ? size : undefined,
                width: label ? undefined : size,
                paddingHorizontal: label ? spacing.lg : 0,
                borderRadius: tokens.radius.full,
                overflow: 'hidden',
            }, ...rest, children: [(0, jsx_runtime_1.jsx)(Gradient_1.Gradient, { colors: [brand.from, brand.to], start: points.start, end: points.end, style: react_native_1.StyleSheet.absoluteFill }), icon != null ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: icon }) : null, label ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        // Measured against BOTH stops, not against one flat colour.
                        color: brand.ink,
                        fontSize: tokens.typography.scale.base,
                        fontFamily: tokens.typography.fontBody,
                        fontWeight: '600',
                    }, children: label })) : null] }) }));
}
//# sourceMappingURL=FloatButtonV4.js.map