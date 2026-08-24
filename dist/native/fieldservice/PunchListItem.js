"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PunchListItem = PunchListItem;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const SEVERITY = {
    minor: { label: 'Minor', glyph: '·', tone: 'neutral' },
    major: { label: 'Major', glyph: '▲', tone: 'warn' },
    critical: { label: 'Critical', glyph: '!', tone: 'danger' },
};
/**
 * One punch-list defect: a leading checkbox to mark it resolved, a description
 * that strikes through when `done` (so completion reads without color alone), a
 * severity pill (text + glyph + a color that traces to a `SemanticColors`
 * slot), and location / assignee meta. Toggling fires `onToggle` with the next
 * state. No literal colors.
 */
function PunchListItem({ label, done, severity, location, assignee, onToggle, disabled = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const sd = severity ? SEVERITY[severity] : undefined;
    const meta = [location, assignee].filter((v) => v != null).join(' · ');
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { paddingTop: 2 }, children: (0, jsx_runtime_1.jsx)(primitives_1.Checkbox, { checked: done, disabled: disabled, onCheckedChange: onToggle, accessibilityLabel: label }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 3, style: {
                            color: done ? colors.muted : colors.onSurface,
                            fontSize: tokens.typography.scale.base,
                            fontWeight: '600',
                            textDecorationLine: done ? 'line-through' : 'none',
                        }, children: label }), meta !== '' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: meta })) : null] }), sd ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: sd.tone, variant: "soft", size: "sm", children: `${sd.glyph} ${sd.label}` })) : null] }));
}
//# sourceMappingURL=PunchListItem.js.map