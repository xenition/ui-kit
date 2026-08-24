"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = Button;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const SIZE_TOKENS = {
    sm: { paddingKey: 'sm', textKey: 'sm' },
    md: { paddingKey: 'md', textKey: 'base' },
    lg: { paddingKey: 'lg', textKey: 'lg' },
};
/** Token-derived translucent tint (no literal hex; mirrors GlassPanel). */
function withAlpha(hex, alpha) {
    const h = hex.replace('#', '');
    const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    const r = parseInt(full.slice(0, 2), 16);
    const g = parseInt(full.slice(2, 4), 16);
    const b = parseInt(full.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
/**
 * Themed button — the native mirror of the web `Button`. Same
 * `variant`/`size`/`disabled` contract; `onPress` replaces the web `onClick`
 * and a `loading` flag renders a spinner. Additive `variant`s (`outline`,
 * `soft`, `link`, `elevated`) and a `tone` (`danger`/`success`) layer on top;
 * the defaults (`primary`/`secondary`/`ghost`, tone `default`) render exactly
 * as before. All colors/radii come from the compiled theme tokens via
 * `useXenitionTheme()` — no literal colors.
 */
function Button({ variant = 'primary', size = 'md', tone = 'default', onPress, disabled = false, loading = false, style, children, ...rest }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const { paddingKey, textKey } = SIZE_TOKENS[size];
    const isDisabled = disabled || loading;
    const TONE_COLOR = {
        default: { base: colors.primary, on: colors.onPrimary },
        primary: { base: colors.primary, on: colors.onPrimary },
        danger: { base: colors.danger, on: colors.onDanger },
        success: { base: colors.success, on: colors.onSuccess },
    };
    const { base, on } = TONE_COLOR[tone];
    // Per-variant resolution. Defaults are pinned to the historical look so any
    // existing usage renders byte-for-byte the same.
    let bg = 'transparent';
    let fg = on;
    let borderWidth = 0;
    let borderColor = 'transparent';
    let underline = false;
    let elevated = false;
    switch (variant) {
        case 'primary':
            bg = base;
            fg = on;
            break;
        case 'secondary':
            fg = base;
            borderWidth = 1;
            borderColor = base;
            break;
        case 'ghost':
            fg = tone === 'default' ? colors.onSurface : base;
            break;
        case 'outline':
            fg = tone === 'default' ? colors.onSurface : base;
            borderWidth = 1;
            borderColor = colors.border;
            break;
        case 'soft':
            bg = withAlpha(base, 0.14);
            fg = base;
            break;
        case 'link':
            fg = base;
            underline = true;
            break;
        case 'elevated':
            bg = colors.surface;
            fg = tone === 'default' ? colors.onSurface : base;
            borderWidth = 1;
            borderColor = colors.border;
            elevated = true;
            break;
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { disabled: isDisabled, busy: loading }, disabled: isDisabled, onPress: onPress, style: ({ pressed }) => [
            {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: tokens.radius.md,
                paddingVertical: tokens.spacing[paddingKey],
                paddingHorizontal: tokens.spacing[paddingKey] * 1.6,
                backgroundColor: bg,
                borderWidth,
                borderColor,
                opacity: isDisabled ? 0.5 : pressed ? 0.85 : 1,
            },
            elevated
                ? {
                    shadowColor: colors.onSurface,
                    shadowOpacity: 0.12,
                    shadowRadius: 6,
                    shadowOffset: { width: 0, height: 2 },
                    elevation: 3,
                }
                : null,
            style,
        ], ...rest, children: [loading ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginRight: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(react_native_1.ActivityIndicator, { size: "small", color: fg }) })) : null, typeof children === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: fg,
                    fontSize: tokens.typography.scale[textKey],
                    fontWeight: '600',
                    textDecorationLine: underline ? 'underline' : 'none',
                }, children: children })) : (children)] }));
}
//# sourceMappingURL=Button.js.map