"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolicyDocumentRow = PolicyDocumentRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const KIND_GLYPH = {
    policy: '📄',
    declaration: '📋',
    'id-card': '🪪',
    invoice: '🧾',
    letter: '✉️',
};
/**
 * One document in a policy's document list: a tinted kind glyph, a title with a
 * kind · size · date meta line, and an optional download action. The row opens
 * on press when `onPress` is supplied; the download `Button` is only shown when
 * `onDownload` is supplied. Token-bound throughout — no literal colors.
 */
function PolicyDocumentRow({ title, kind = 'policy', size, date, downloadLabel = 'Download', onPress, onDownload, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const glyph = KIND_GLYPH[kind] ?? KIND_GLYPH.policy;
    const meta = [kind.replace('-', ' '), size, date].filter((v) => v != null && v !== '').join(' · ');
    const row = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, paddingVertical: tokens.spacing.sm },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 40,
                    height: 40,
                    borderRadius: tokens.radius.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, format_1.withAlpha)(colors.primary, 0.12),
                }, children: (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: glyph, accessibilityLabel: `${kind} document` }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: title }), meta !== '' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: meta })) : null] }), onDownload != null ? ((0, jsx_runtime_1.jsx)(primitives_2.Button, { variant: "soft", size: "sm", onPress: onDownload, children: downloadLabel })) : null] }));
    if (!onPress)
        return row;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${title} document`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: row }));
}
//# sourceMappingURL=PolicyDocumentRow.js.map