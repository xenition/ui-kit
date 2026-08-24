"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureLockCard = FeatureLockCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/**
 * Locked-feature teaser — shown where a free user hits a gated capability. It
 * names the feature, says what unlocking gets them and offers the upgrade CTA,
 * turning a dead end into a value pitch (paywall-after-value, design.md §27-28).
 * The `inline` variant collapses to a compact row for list contexts. Colors are
 * token-bound via the {@link Card}/{@link Badge} primitives. No literal colors.
 */
function FeatureLockCard({ title, description, icon = '🔒', planLabel = 'Pro', unlockLabel = 'Unlock', onUnlock, variant = 'card', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 44,
                    height: 44,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.border,
                }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, size: "lg", color: "muted", accessibilityLabel: "Locked" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "primary", children: planLabel })] }), description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: description })) : null] })] }));
    if (variant === 'inline') {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "summary", style: [{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, style], children: [body, (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "secondary", size: "sm", onPress: onUnlock, accessibilityLabel: unlockLabel, children: unlockLabel })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { style: [{ gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: body }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "md", onPress: onUnlock, accessibilityLabel: unlockLabel, style: { alignSelf: 'stretch' }, children: unlockLabel })] }));
}
//# sourceMappingURL=FeatureLockCard.js.map