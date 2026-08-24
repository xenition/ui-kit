"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkOrderCardV2 = WorkOrderCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
const STATUS = {
    open: { label: 'Open', glyph: '○', tone: 'neutral', slot: 'muted' },
    'in-progress': { label: 'In progress', glyph: '⟳', tone: 'primary', slot: 'primary' },
    'on-hold': { label: 'On hold', glyph: '⏸', tone: 'warn', slot: 'warn' },
    done: { label: 'Done', glyph: '✓', tone: 'success', slot: 'success' },
    cancelled: { label: 'Cancelled', glyph: '✕', tone: 'neutral', slot: 'muted' },
};
const PRIORITY = {
    low: { label: 'Low', glyph: '↓', tone: 'neutral', slot: 'muted' },
    medium: { label: 'Medium', glyph: '=', tone: 'primary', slot: 'primary' },
    high: { label: 'High', glyph: '↑', tone: 'warn', slot: 'warn' },
    emergency: { label: 'Emergency', glyph: '!', tone: 'danger', slot: 'danger' },
};
function WorkOrderCardV2({ workOrderNumber, title, status, priority, assignee, site, scheduledFor, glyph = '🔧', loading = false, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const press = (0, motion_1.usePressScale)();
    const sd = STATUS[status] ?? STATUS.open;
    const pd = priority ? PRIORITY[priority] : undefined;
    const railColor = colors[sd.slot];
    const surface = {
        flexDirection: 'row',
        borderRadius: tokens.radius.lg,
        backgroundColor: colors.surface,
        overflow: 'hidden',
        ...(0, elevation_1.shadow)('lg', tokens),
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading work order", style: [surface, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 6, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.4) } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, padding: tokens.spacing.lg, flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "rect", width: 48, height: 48 }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "text", width: "70%", height: 16 }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "text", width: "40%", height: 10 })] })] })] }));
    }
    const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: surface, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 6, backgroundColor: railColor } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, padding: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: 48,
                                    height: 48,
                                    borderRadius: tokens.radius.md,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: (0, color_1.withAlpha)(railColor, 0.14),
                                }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: "xl", accessibilityLabel: "Work order" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: title }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600', letterSpacing: 0.5 }, children: workOrderNumber })] }), pd ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: pd.tone, variant: "soft", size: "sm", children: `${pd.glyph} ${pd.label}` }) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.md, flexDirection: 'row' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: sd.tone, variant: "soft", children: `${sd.glyph} ${sd.label}` }) }), site != null || assignee != null || scheduledFor != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            marginTop: tokens.spacing.md,
                            paddingTop: tokens.spacing.md,
                            borderTopWidth: 1,
                            borderTopColor: colors.border,
                            gap: 2,
                        }, children: [site != null ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\uD83D\uDCCD ", site] }) : null, assignee != null ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\uD83D\uDC77 ", assignee] }) : null, scheduledFor != null ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\uD83D\uDD51 ", scheduledFor] }) : null] })) : null] })] }));
    const a11y = `Work order ${workOrderNumber}, ${title}, ${sd.label}`;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [{ opacity: enter.opacity, transform: enter.transform }, style], children: onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessible: true, accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, children: inner }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: a11y, children: inner })) }));
}
//# sourceMappingURL=WorkOrderCardV2.js.map