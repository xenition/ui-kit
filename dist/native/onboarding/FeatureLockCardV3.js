"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureLockCardV3 = FeatureLockCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/** §10.1 geometry: the 44pt minimum a whole-row target must clear. */
const TAP_TARGET = 44;
/**
 * Locked feature — V3, the compact line: **one row, the whole row is the
 * button**, ending in a chevron. No card, no badge circle, no separate CTA.
 *
 * The shape a settings list or a feature index needs. The base and V2 both put
 * a button inside a container, which means a list of eight gated features is a
 * list of eight buttons — and a user scanning it has to aim at a small target
 * inside a big one. Here the row is the target, which is how every other list
 * row in the kit behaves (§31: use the familiar interaction).
 *
 * `unlockLabel` moves to the row's accessible name rather than being drawn: the
 * chevron already says "this goes somewhere", and a visible "Unlock" beside it
 * would be the second affordance for one action.
 *
 * `variant` is accepted and ignored — this line is the compact row, and asking
 * it for a card is asking for the base.
 *
 * Same props as {@link FeatureLockCard}. Token-pure.
 */
function FeatureLockCardV3({ title, description, icon = '🔒', planLabel = 'Pro', unlockLabel = 'Unlock', onUnlock, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (!title)
        return null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${title}, ${planLabel}. ${unlockLabel}`, onPress: onUnlock, style: ({ pressed }) => [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                minHeight: TAP_TARGET,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                borderRadius: tokens.radius.md,
                backgroundColor: pressed ? colors.selected : 'transparent',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, size: "lg" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "base", weight: "semibold", tone: "onSurface", children: title }), description ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "xs", tone: "mutedText", numberOfLines: 1, children: description })) : null] }), planLabel ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "xs", weight: "bold", tone: "primaryText", children: planLabel })) : null, (0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "chevron-right", size: "lg", color: "mutedText" })] }));
}
//# sourceMappingURL=FeatureLockCardV3.js.map