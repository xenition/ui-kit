"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CannedResponseV4 = CannedResponseV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const internal_1 = require("./internal");
/**
 * CannedResponse — **V4** "calm console" design. A saved-reply card reimagined as
 * an elevated rounded surface: title with an optional shortcut/category chip, the
 * body preview set on a calm inset panel, and a primary **Insert** affordance
 * (≥44px tap target). Tapping the body fires `onPress` (e.g. to expand);
 * **Insert** reports the full response via `onInsert`. One accent = primary;
 * press paints a soft-primary tint. Same props/behavior as
 * {@link CannedResponseProps}; token-only colors via `useXenitionTheme()` +
 * `withAlpha`. Dark-mode safe.
 */
function CannedResponseV4({ response, previewLines = 2, onInsert, onPress, insertLabel = 'Insert', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                backgroundColor: colors.card,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                padding: tokens.spacing.md,
                gap: tokens.spacing.md,
                shadowColor: colors.onSurface,
                shadowOpacity: 0.06,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 3 },
                elevation: 2,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: onPress ? 'button' : undefined, accessibilityLabel: `Canned response: ${response.title}`, onPress: onPress ? () => onPress(response) : undefined, disabled: !onPress, style: ({ pressed }) => ({
                    gap: tokens.spacing.sm,
                    borderRadius: tokens.radius.md,
                    backgroundColor: pressed && onPress ? (0, internal_1.withAlpha)(colors.primary, 0.08) : 'transparent',
                }), children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700', flexShrink: 1 }, children: response.title }), response.shortcut ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    backgroundColor: (0, internal_1.withAlpha)(colors.primary, 0.12),
                                    borderRadius: tokens.radius.full,
                                    paddingHorizontal: tokens.spacing.sm,
                                    paddingVertical: 2,
                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: response.shortcut }) })) : null, response.category ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: response.category })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: Math.max(1, previewLines), style: {
                            color: colors.muted,
                            fontSize: tokens.typography.scale.sm,
                            backgroundColor: (0, internal_1.withAlpha)(colors.onSurface, 0.03),
                            borderRadius: tokens.radius.md,
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: tokens.spacing.xs,
                        }, children: response.body })] }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: insertLabel, accessibilityState: { disabled: !onInsert }, onPress: onInsert ? () => onInsert(response) : undefined, disabled: !onInsert, style: ({ pressed }) => ({
                    minHeight: 44,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: tokens.radius.md,
                    paddingHorizontal: tokens.spacing.md,
                    backgroundColor: colors.primary,
                    opacity: !onInsert ? 0.5 : pressed ? 0.9 : 1,
                }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onPrimary, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: insertLabel }) })] }));
}
//# sourceMappingURL=CannedResponseV4.js.map