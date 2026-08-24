"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityFeed = ActivityFeed;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/**
 * A vertical activity/event log with a dot rail. Renders a real empty state
 * (per design.md §15) when there is nothing to show rather than a blank box.
 * Token-only.
 */
function ActivityFeed({ items, title, emptyMessage = 'Activity will appear here as things happen.', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [title ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.lg,
                    fontWeight: '700',
                }, children: title })) : null, items.length === 0 ? ((0, jsx_runtime_1.jsx)(primitives_1.EmptyState, { title: "No activity yet", description: emptyMessage })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "list", style: { gap: tokens.spacing.md }, children: items.map((item) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: `${item.title}${item.meta ? `, ${item.meta}` : ''}${item.time ? `, ${item.time}` : ''}`, style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: 8,
                                height: 8,
                                borderRadius: tokens.radius.full,
                                backgroundColor: colors.primary,
                                marginTop: 6,
                            } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: colors.onSurface,
                                        fontSize: tokens.typography.scale.base,
                                        fontWeight: '600',
                                    }, children: item.title }), item.meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: item.meta })) : null] }), item.time ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: item.time })) : null] }, item.id))) }))] }));
}
//# sourceMappingURL=ActivityFeed.js.map