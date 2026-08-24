"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceCardV3 = ServiceCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const CATEGORY = {
    license: { label: 'Licensing', glyph: '🪪' },
    permit: { label: 'Permits', glyph: '📋' },
    tax: { label: 'Tax', glyph: '🧾' },
    records: { label: 'Records', glyph: '🗂️' },
    benefit: { label: 'Benefits', glyph: '🤝' },
    health: { label: 'Public health', glyph: '⚕️' },
    utility: { label: 'Utilities', glyph: '💧' },
    other: { label: 'Service', glyph: '🏛️' },
};
const CHANNEL = {
    online: { label: 'Online', glyph: '🌐' },
    'in-person': { label: 'In person', glyph: '🏢' },
    phone: { label: 'By phone', glyph: '☎️' },
    unavailable: { label: 'Unavailable', glyph: '⛔' },
};
/**
 * ServiceCard, alternate design **V3** — a minimal directory line. A small
 * primary category dot and glyph lead, the title and category label share the
 * line, and the delivery channel (text + glyph, never color alone) plus
 * turnaround close it on the right. Tight rhythm for long service lists. Same
 * `ServiceCardProps`; drops in for `ServiceCard`. Token-pure.
 */
function ServiceCardV3({ category, title, description, channel, estimatedTime, onStart, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const cat = CATEGORY[category] ?? CATEGORY.other;
    const ch = channel ? CHANNEL[channel] : undefined;
    // A whole-line press falls back to the start handler, so a bare list line is
    // still actionable even when only `onStart` was supplied.
    const activate = onPress ?? onStart;
    const row = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, paddingVertical: tokens.spacing.sm },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: cat.label, style: { width: 8, height: 8, borderRadius: tokens.radius.full, backgroundColor: colors.primary } }), (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: cat.glyph, size: "base", accessibilityLabel: cat.label }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: title }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [cat.label, description != null ? ` · ${description}` : ''] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 1 }, children: [ch != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: [ch.glyph, " ", ch.label] })) : null, estimatedTime != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\u23F1 ", estimatedTime] })) : null] })] }));
    if (activate == null)
        return row;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${title}, ${cat.label}`, onPress: activate, style: ({ pressed }) => ({ opacity: pressed ? 0.6 : 1 }), children: row }));
}
//# sourceMappingURL=ServiceCardV3.js.map