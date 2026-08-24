"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketStub = TicketStub;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
/**
 * A tear-off ticket stub. The lower band is a placeholder "barcode" — a row of
 * vertical bars whose widths are derived deterministically from the ticket
 * `code` characters and drawn purely from theme tokens (`onSurface` / `muted`).
 * There is no barcode or scanning dependency; this is a visual stand-in only.
 * All colors come from the compiled theme tokens — no literal colors.
 */
function TicketStub({ eventTitle, holderName, dateLabel, fields = [], code, tier, variant = 'default', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    // Deterministic bar widths from the code characters (guarded, token-colored).
    const chars = code.length > 0 ? code.split('') : ['0'];
    const bars = Array.from({ length: 28 }, (_, i) => {
        const ch = chars[i % chars.length] ?? '0';
        const magnitude = (ch.charCodeAt(0) % 3) + 1; // 1..3
        const dark = ch.charCodeAt(0) % 2 === 0;
        return { width: magnitude, dark };
    });
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "summary", accessibilityLabel: `Ticket for ${eventTitle}, code ${code}`, style: [
            {
                overflow: 'hidden',
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.lg, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: eventTitle }), tier ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", children: tier }) : null] }), holderName ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: holderName })) : null, dateLabel ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: dateLabel })) : null, variant !== 'compact' && fields.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.lg, marginTop: tokens.spacing.xs }, children: fields.map((f, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600', letterSpacing: 1 }, children: f.label.toUpperCase() }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: f.value })] }, `${f.label}-${i}`))) })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 1, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    gap: 2,
                    height: tokens.spacing['2xl'],
                    paddingVertical: tokens.spacing.sm,
                    backgroundColor: tokens.ramps.neutral[50],
                }, children: bars.map((b, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: b.width,
                        height: '100%',
                        backgroundColor: b.dark ? colors.onSurface : colors.muted,
                    } }, i))) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    textAlign: 'center',
                    color: colors.muted,
                    fontSize: tokens.typography.scale.xs,
                    letterSpacing: 2,
                    paddingBottom: tokens.spacing.sm,
                }, children: code })] }));
}
//# sourceMappingURL=TicketStub.js.map