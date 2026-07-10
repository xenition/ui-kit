"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusMessage = StatusMessage;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const DEFAULTS = {
    loading: 'Loading…',
    empty: 'Nothing here yet.',
    error: 'Something went wrong.',
};
/**
 * Loading / empty / error feedback — the native mirror of the web
 * `StatusMessage`. `loading` shows an `ActivityIndicator` (tinted from the
 * `primary` token) with an optional message and a polite live region; `empty`
 * is a `muted` message; `error` is a `danger` message announced via the `alert`
 * role + an assertive live region. Token-only. Pairs with `@xenition/ui/data`'s
 * `useResource`.
 */
function StatusMessage({ state, message, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const container = [
        {
            alignItems: 'center',
            justifyContent: 'center',
            gap: tokens.spacing.sm,
            paddingVertical: tokens.spacing.xl,
        },
        style,
    ];
    if (state === 'loading') {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLiveRegion: "polite", accessibilityLabel: message ?? DEFAULTS.loading, style: container, children: [(0, jsx_runtime_1.jsx)(react_native_1.ActivityIndicator, { size: "small", color: colors.primary }), message ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }, children: message })) : null] }));
    }
    if (state === 'error') {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "alert", accessibilityLiveRegion: "assertive", style: container, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.danger, fontSize: tokens.typography.scale.sm, textAlign: 'center' }, children: message ?? DEFAULTS.error }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: container, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }, children: message ?? DEFAULTS.empty }) }));
}
//# sourceMappingURL=StatusMessage.js.map