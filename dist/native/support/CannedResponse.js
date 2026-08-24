"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CannedResponse = CannedResponse;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Card_1 = require("../primitives/Card");
const Button_1 = require("../primitives/Button");
const internal_1 = require("./internal");
/**
 * A saved/canned reply card for agents — title, an optional shortcut + category
 * chip, a truncated body preview, and an "Insert" action that reports the full
 * response back to the composer via `onInsert`. Tapping the body fires
 * `onPress` (e.g. to preview the whole thing). All colors/spacing come from the
 * compiled theme tokens; the shortcut chip uses a token tint, not literal hex.
 */
function CannedResponse({ response, previewLines = 2, onInsert, onPress, insertLabel = 'Insert', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { variant: "outlined", padding: "md", style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: onPress ? 'button' : undefined, accessibilityLabel: `Canned response: ${response.title}`, onPress: onPress ? () => onPress(response) : undefined, disabled: !onPress, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700', flexShrink: 1 }, children: response.title }), response.shortcut ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    backgroundColor: (0, internal_1.withAlpha)(colors.primary, 0.14),
                                    borderRadius: tokens.radius.sm,
                                    paddingHorizontal: tokens.spacing.xs,
                                    paddingVertical: 1,
                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: response.shortcut }) })) : null, response.category ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: response.category })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: Math.max(1, previewLines), style: { color: colors.muted, fontSize: tokens.typography.scale.sm, marginTop: tokens.spacing.xs }, children: response.body })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "soft", onPress: onInsert ? () => onInsert(response) : undefined, disabled: !onInsert, children: insertLabel }) })] }));
}
//# sourceMappingURL=CannedResponse.js.map