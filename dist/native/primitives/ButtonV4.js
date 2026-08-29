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
exports.ButtonV4 = ButtonV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Gradient_1 = require("../commerce/internal/Gradient");
const color_1 = require("./internal/color");
const motion_1 = require("./internal/motion");
const v4_depth_1 = require("../../primitives/internal/v4-depth");
/**
 * Convert a {@link GradientToken} angle (degrees clockwise from "up") into the
 * `start`/`end` unit points `expo-linear-gradient` wants. Kept here rather than
 * hard-coding `{0,0}→{1,1}` so the compiler stays the single owner of the
 * gradient's direction.
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
 * **V4 button** — same props as {@link Button}, a different design line.
 *
 * What makes it premium is restraint, not decoration. Exactly one thing on the
 * screen carries the brand gradient: `variant="primary"` at the default tone —
 * the single dominant action `design.md` §5 asks every screen to have. Every
 * other variant is flat with a crisp hairline, because §8 lists "gradients on
 * every button" as the first tell of generic AI UI and §35.11 asks that
 * gradients stay rare and purposeful. A `danger` or `success` primary is solid,
 * never gradient: §35.4 says semantic colours are not brand colours, and a
 * destructive action wearing the brand sweep reads as a promotion.
 *
 * The depth comes from `elevation.action` and a press that genuinely depresses
 * — scale plus a shadow that sits back down — rather than from an opacity dip.
 * Both are read straight off the theme, so a `depth: 'flat'` seed gets a flat
 * button with no branch anywhere in this file: the tokens are already inert.
 *
 * Motion is `usePressScale`, which is reduced-motion aware by construction
 * (§36.10); with Reduce Motion on, the scale stays at 1 and the elevation
 * change alone carries the feedback, so nothing depends on the animation.
 */
function ButtonV4({ variant = 'primary', size = 'md', tone = 'default', onPress, onPressIn, onPressOut, disabled = false, loading = false, style, children, ...rest }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens, gradient, elevation } = theme;
    const press = (0, motion_1.usePressScale)();
    const [held, setHeld] = React.useState(false);
    const isDisabled = disabled || loading;
    const spacing = tokens.spacing;
    // Generous vertical rhythm — every height clears the 44px touch target at
    // `md` and above, composed from the spacing scale rather than picked.
    const HEIGHT = {
        sm: spacing.xl + spacing.xs,
        md: spacing['2xl'] - spacing.xs,
        lg: spacing['2xl'] + spacing.sm,
    };
    const PAD_X = {
        sm: spacing.md,
        md: spacing.lg,
        lg: spacing.xl,
    };
    const TEXT = { sm: 'sm', md: 'base', lg: 'lg' };
    /** Fill / on-fill / on-surface-text triple per tone (see the base `Button`). */
    const TONE_COLOR = {
        default: { base: colors.primary, on: colors.onPrimary, text: colors.primaryText },
        primary: { base: colors.primary, on: colors.onPrimary, text: colors.primaryText },
        danger: { base: colors.danger, on: colors.onDanger, text: colors.dangerText },
        success: { base: colors.success, on: colors.onSuccess, text: colors.successText },
    };
    const { base, on, text } = TONE_COLOR[tone];
    // The one place a gradient is allowed: the brand-toned primary action.
    const brandAction = variant === 'primary' && (tone === 'default' || tone === 'primary');
    // Legible stops + the ink that reads on both. Untouched when the compiler's
    // own pair already clears AA, which is the common case.
    const brand = (0, v4_depth_1.gradientInk)(gradient.brand, colors.onPrimary, {
        darkest: tokens.ramps.neutral[950],
        lightest: tokens.ramps.neutral[50],
    });
    let bg = 'transparent';
    let fg = on;
    let borderWidth = 0;
    let borderColor = 'transparent';
    let underline = false;
    let raise = null;
    switch (variant) {
        case 'primary':
            // `from` doubles as the flat fill under the gradient overlay, so the
            // shadow has an opaque layer to fall from and a `depth: 'flat'` seed
            // (where `from === to`) lands on exactly the same solid colour.
            bg = brandAction ? brand.from : base;
            fg = brandAction ? brand.ink : on;
            raise = elevation.action;
            break;
        case 'secondary':
            bg = colors.surface;
            fg = text;
            borderWidth = 1;
            borderColor = colors.border;
            break;
        case 'ghost':
            fg = tone === 'default' ? colors.onSurface : text;
            break;
        case 'outline':
            fg = tone === 'default' ? colors.onSurface : text;
            borderWidth = 1;
            borderColor = colors.border;
            break;
        case 'soft':
            bg = (0, color_1.withAlpha)(base, 0.12);
            fg = text;
            break;
        case 'link':
            fg = text;
            underline = true;
            break;
        case 'elevated':
            bg = colors.surface;
            fg = tone === 'default' ? colors.onSurface : text;
            borderWidth = 1;
            borderColor = colors.border;
            raise = elevation.card;
            break;
    }
    const points = angleToPoints(gradient.brand.angle);
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
                borderRadius: tokens.radius.md,
                backgroundColor: bg,
                borderWidth,
                borderColor,
                opacity: isDisabled ? theme.state.disabledContent : 1,
                transform: [{ scale: press.scale }],
            },
            raise ? elevationStyle(raise, held) : null,
            style,
        ], children: (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { disabled: isDisabled, busy: loading }, disabled: isDisabled, onPress: onPress, onPressIn: handlePressIn, onPressOut: handlePressOut, style: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: tokens.spacing.sm,
                minHeight: HEIGHT[size],
                paddingHorizontal: PAD_X[size],
                borderRadius: tokens.radius.md,
                overflow: 'hidden',
            }, ...rest, children: [brandAction ? ((0, jsx_runtime_1.jsx)(Gradient_1.Gradient, { colors: [brand.from, brand.to], start: points.start, end: points.end, style: react_native_1.StyleSheet.absoluteFill })) : null, loading ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, children: (0, jsx_runtime_1.jsx)(react_native_1.ActivityIndicator, { size: "small", color: fg }) })) : null, typeof children === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        color: fg,
                        fontSize: tokens.typography.scale[TEXT[size]],
                        fontFamily: tokens.typography.fontBody,
                        fontWeight: '600',
                        textDecorationLine: underline ? 'underline' : 'none',
                    }, children: children })) : (children)] }) }));
}
//# sourceMappingURL=ButtonV4.js.map