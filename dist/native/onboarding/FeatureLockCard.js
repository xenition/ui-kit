"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureLockCard = FeatureLockCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/* §10.1 geometry: the badge is the module's 44 circle, same as a §8 feature row. */
const BADGE = 44;
/**
 * Locked-feature teaser — shown where a free user hits a gated capability. It
 * names the feature, says what unlocking gets them and offers the upgrade CTA,
 * turning a dead end into a value pitch (paywall-after-value, design.md §27-28).
 *
 * Drawn as a single §8 row so a teaser encountered mid-app reads as the same
 * object as the rows on the paywall it leads to: the 44 circular badge on a
 * `primary[50]` ground with the glyph in `colors.primary`, a semibold title and
 * a muted description. It used to sit on a grey `border` ground, which read as
 * "disabled" rather than "worth buying".
 *
 * The `inline` variant collapses to a compact row for list contexts. Colors are
 * token-bound via the {@link Card}/{@link Badge} primitives. No literal colors.
 */
function FeatureLockCard({ title, description, icon = '🔒', planLabel = 'Pro', unlockLabel = 'Unlock', onUnlock, variant = 'card', style, }) {
    const { scheme, tokens } = (0, theme_1.useXenitionTheme)();
    // The native ramps keep their light orientation in both schemes — see the
    // note in `PaywallScreen`'s `PaywallFeatureRows`.
    const badgeGround = scheme === 'dark' ? tokens.ramps.primary[900] : tokens.ramps.primary[50];
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: BADGE,
                    height: BADGE,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: badgeGround,
                }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, size: "lg", color: "primary", accessibilityLabel: "Locked" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "base", weight: "semibold", style: { flexShrink: 1 }, children: title }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "primary", size: "sm", children: planLabel })] }), description ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", tone: "muted", children: description })) : null] })] }));
    if (variant === 'inline') {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "summary", style: [{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, style], children: [body, (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "secondary", size: "sm", onPress: onUnlock, accessibilityLabel: unlockLabel, children: unlockLabel })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { style: [{ gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: body }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "md", onPress: onUnlock, accessibilityLabel: unlockLabel, style: { alignSelf: 'stretch' }, children: unlockLabel })] }));
}
//# sourceMappingURL=FeatureLockCard.js.map