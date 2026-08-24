"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Avatar = Avatar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const DIAMETER = { xs: 24, sm: 32, md: 40, lg: 56, xl: 72 };
const FONT = {
    xs: 'xs',
    sm: 'xs',
    md: 'sm',
    lg: 'lg',
    xl: 'xl',
};
const STATUS_SLOT = {
    online: 'success',
    away: 'warn',
    busy: 'danger',
    offline: 'muted',
};
function initials(name) {
    if (!name)
        return '?';
    const parts = name.trim().split(/\s+/).slice(0, 2);
    return parts.map((w) => w[0]?.toUpperCase() ?? '').join('') || '?';
}
/**
 * User avatar — the native mirror of the web `Avatar`: image with an initials
 * fallback, bound to the theme tokens. The default (`md`, `circle`, no status,
 * no ring) renders exactly as before; `shape`, the extended `xs`/`xl` sizes, a
 * `status` presence dot, and a `ring` are additive. No literal colors.
 */
function Avatar({ src, name, size = 'md', shape = 'circle', status, ring = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const d = DIAMETER[size];
    const cornerRadius = shape === 'circle' ? d / 2 : shape === 'rounded' ? tokens.radius.md : tokens.radius.sm;
    const statusColor = status ? colors[STATUS_SLOT[status]] : undefined;
    const ringColor = statusColor ?? colors.primary;
    const dotSize = Math.max(8, Math.round(d * 0.28));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ width: d, height: d }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: d,
                    height: d,
                    borderRadius: cornerRadius,
                    overflow: 'hidden',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.primary,
                    borderWidth: ring ? 2 : 0,
                    borderColor: ring ? ringColor : 'transparent',
                }, children: src ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: src }, style: { width: d, height: d }, resizeMode: "cover" })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        color: colors.onPrimary,
                        fontSize: tokens.typography.scale[FONT[size]],
                        fontWeight: '500',
                    }, children: initials(name) })) }), status ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    width: dotSize,
                    height: dotSize,
                    borderRadius: dotSize / 2,
                    backgroundColor: statusColor,
                    borderWidth: 2,
                    borderColor: colors.surface,
                } })) : null] }));
}
//# sourceMappingURL=Avatar.js.map