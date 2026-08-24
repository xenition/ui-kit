"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrgChartNode = OrgChartNode;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/**
 * A single node in a reporting hierarchy: avatar, name, title, and an optional
 * direct-report count. `depth` indents the node with a token-derived rail so a
 * flat list of nodes reads as a tree; `expandable` adds a disclosure toggle for
 * collapsing a manager's reports. `highlighted` tints the surface for the
 * focused person. Managers are flagged by a "N reports" count (a word, not
 * color). All colors are theme tokens — no literals.
 */
function OrgChartNode({ name, title, avatarUrl, department, directReports = 0, depth = 0, expandable = false, expanded = false, variant = 'default', onToggle, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const highlighted = variant === 'highlighted';
    const level = Math.max(0, Math.floor(depth));
    const indent = level * tokens.spacing.lg;
    const isManager = directReports > 0;
    const inner = ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { variant: highlighted ? 'elevated' : 'outlined', padding: compact ? 'sm' : 'md', style: [
            highlighted ? { backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.06), borderColor: colors.primary } : null,
            { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm },
        ], children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: compact ? 'sm' : 'md', name: name, src: avatarUrl }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), title ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: [title, department ? ` · ${department}` : ''] })) : null] }), isManager ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: [directReports, " report", directReports === 1 ? '' : 's'] })) : null, expandable ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${expanded ? 'Collapse' : 'Expand'} ${name}`, accessibilityState: { expanded }, hitSlop: 8, onPress: () => onToggle?.(!expanded), style: ({ pressed }) => ({
                    width: 28,
                    height: 28,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: tokens.radius.sm,
                    backgroundColor: (0, color_1.withAlpha)(colors.onSurface, pressed ? 0.1 : 0.05),
                }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: expanded ? '▾' : '▸' }) })) : null] }));
    const node = onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Org node ${name}`, onPress: onPress, children: inner })) : (inner);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: testID, style: [{ flexDirection: 'row', alignItems: 'stretch' }, style], children: [level > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: indent, alignItems: 'flex-end', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 1, height: '100%', backgroundColor: colors.border } }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: node })] }));
}
//# sourceMappingURL=OrgChartNode.js.map