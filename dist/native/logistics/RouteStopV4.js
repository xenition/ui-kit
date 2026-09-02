"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteStopV4 = RouteStopV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const internal_1 = require("./internal");
/**
 * RouteStop — **V4** "dispatch" design (native twin of the web V4). The
 * confident, operations-desk take on a delivery-route stop: an elevated rounded
 * card with a soft shadow, a numbered sequence marker (filled with the status
 * tone once completed), the address + recipient, an ETA/window, a package count,
 * and a labelled glyph + word status badge (never color alone). Tappable when
 * `onPress` is set. Honors the V4 `variant` — `full` (card, default) and
 * `compact` (a dense single row). Token-only colors via `useXenitionTheme()`.
 */
function RouteStopV4({ sequence, address, recipient, status, eta, packages, variant = 'full', onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = internal_1.STOP_META[status] ?? internal_1.STOP_META.pending;
    const accent = (0, internal_1.toneColor)(colors, meta.tone);
    const done = status === 'completed';
    const shell = {
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    };
    const a11y = `Stop ${sequence}, ${address}, ${meta.label}`;
    const compact = variant === 'compact';
    const marker = (size) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: size, height: size, borderRadius: tokens.radius.full, alignItems: 'center', justifyContent: 'center', backgroundColor: done ? accent : 'transparent', borderWidth: done ? 0 : 2, borderColor: accent }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xs, fontWeight: '700', color: done ? colors.surface : accent, fontVariant: ['tabular-nums'] }, children: done ? '✓' : sequence }) }));
    const badge = ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: `${meta.glyph} ${meta.label}` }));
    const content = compact ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [marker(24), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, fontSize: tokens.typography.scale.sm, fontWeight: '600', color: colors.onSurface }, children: address }), eta ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, color: colors.muted, fontVariant: ['tabular-nums'] }, children: eta }) : null, badge] })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [marker(36), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, fontSize: tokens.typography.scale.base, fontWeight: '600', color: colors.onSurface }, children: address }), eta ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, color: colors.muted, fontVariant: ['tabular-nums'] }, children: eta }) : null] }), recipient ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: recipient }) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, marginTop: 2 }, children: [badge, packages != null ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: `${packages} pkg` }) : null] })] })] }));
    const layout = compact
        ? { minHeight: 44, paddingVertical: tokens.spacing.sm, paddingHorizontal: tokens.spacing.md }
        : { padding: tokens.spacing.md };
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, testID: testID, style: ({ pressed }) => [shell, layout, { opacity: pressed ? 0.8 : 1 }, style], children: content }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, style: [shell, layout, style], children: content });
}
//# sourceMappingURL=RouteStopV4.js.map