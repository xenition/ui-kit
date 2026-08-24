"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_SHARE_TARGETS = void 0;
exports.ShareRow = ShareRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
/** A sensible default set of share destinations (glyphs, no icon font needed). */
exports.DEFAULT_SHARE_TARGETS = [
    { id: 'twitter', label: 'Share on X', glyph: '𝕏' },
    { id: 'facebook', label: 'Share on Facebook', glyph: 'f' },
    { id: 'link', label: 'Copy link', glyph: '🔗' },
    { id: 'mail', label: 'Share by email', glyph: '✉' },
];
/**
 * A row of share actions for an article — X, Facebook, copy-link, email, etc.
 * Data-driven via `targets` (each supplies a glyph + accessible label) and a
 * single `onShare(id)` callback; the parent decides what each id does. Two
 * variants: round `icons` or `labeled` pills. Colors come only from
 * `SemanticColors`; no literal hex.
 */
function ShareRow({ onShare, targets = exports.DEFAULT_SHARE_TARGETS, variant = 'icons', heading = 'Share', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [heading != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.muted,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '700',
                    letterSpacing: 0.6,
                    textTransform: 'uppercase',
                }, children: heading })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: targets.map((t) => ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: t.label, onPress: () => onShare(t.id), hitSlop: 6, style: ({ pressed }) => ({
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: tokens.spacing.xs,
                        width: variant === 'icons' ? 40 : undefined,
                        height: 40,
                        paddingHorizontal: variant === 'labeled' ? tokens.spacing.md : 0,
                        justifyContent: 'center',
                        borderRadius: variant === 'icons' ? tokens.radius.full : tokens.radius.md,
                        borderWidth: 1,
                        borderColor: colors.border,
                        backgroundColor: colors.surface,
                        opacity: pressed ? 0.6 : 1,
                    }), children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: t.glyph, size: "base", color: "onSurface" }), variant === 'labeled' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: t.label })) : null] }, t.id))) })] }));
}
//# sourceMappingURL=ShareRow.js.map