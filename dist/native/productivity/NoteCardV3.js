"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteCardV3 = NoteCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * NoteCard, redesigned (v3): a **dense note line**. A pin dot (when pinned), the
 * title over a body-preview·timestamp subtitle, and labels folded in — a hairline
 * row for a notes list. The opposite of v2's sticky note. Same props, token-only.
 */
function NoteCardV3({ title, body, timestamp, pinned = false, labels, onPress, appearance, style }) {
    void appearance;
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPress, disabled: !onPress, style: [
            {
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
                borderLeftWidth: pinned ? 2 : 0,
                borderLeftColor: colors.primary,
                paddingLeft: pinned ? tokens.spacing.sm : 0,
            },
            style,
        ], children: [pinned ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLabel: "Pinned", style: { fontSize: tokens.typography.scale.xs }, children: "\uD83D\uDCCC" }) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: title }), body ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: body }) : null, labels ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: labels }) : null] }), timestamp ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: timestamp }) : null] }));
}
//# sourceMappingURL=NoteCardV3.js.map