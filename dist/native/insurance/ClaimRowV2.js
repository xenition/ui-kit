"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimRowV2 = ClaimRowV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
/** Happy-path stage labels the timeline chip walks through (denied is off-path). */
const STAGES = ['Filed', 'Review', 'Approved', 'Paid'];
/**
 * ClaimRow, alternate design **V2** — an elevated card carrying a compact
 * status **timeline chip**: a row of stage dots (Filed → Review → Approved →
 * Paid) with the reached stages filled and the current one ringed, so progress
 * reads at a glance. A denied claim collapses the timeline to a single danger
 * marker. Status stays glyph + text + color; the amount anchors the top-right.
 * Same `ClaimRowProps`; drops in for `ClaimRow`. Token-pure.
 */
function ClaimRowV2({ claimNumber, title, status, amountCents, currency = 'USD', date, formatMoney: format = format_1.formatMoney, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const sd = (0, status_1.claimStatus)(status);
    const denied = status === 'denied';
    const tint = denied ? colors.danger : colors.primary;
    const body = ((0, jsx_runtime_1.jsx)(primitives_2.Card, { variant: onPress ? 'interactive' : 'elevated', padding: "md", radius: "md", style: style, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: claimNumber })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 2 }, children: [amountCents != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: format(Math.max(0, Math.trunc(amountCents)), currency) })) : null, date != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: date })) : null] })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: denied ? ((0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: "danger", variant: "soft", size: "sm", children: `${sd.glyph} ${sd.label}` })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: tokens.spacing.xs }, children: STAGES.map((stage, i) => {
                                    const done = i < sd.step;
                                    const current = i === sd.step;
                                    const on = done || current;
                                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, flexDirection: 'row', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: current ? `${stage}, current stage` : undefined, style: {
                                                    width: current ? 12 : 8,
                                                    height: current ? 12 : 8,
                                                    borderRadius: tokens.radius.full,
                                                    backgroundColor: on ? tint : (0, format_1.withAlpha)(colors.muted, 0.25),
                                                    borderWidth: current ? 2 : 0,
                                                    borderColor: (0, format_1.withAlpha)(tint, 0.35),
                                                } }), i < STAGES.length - 1 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                                    flex: 1,
                                                    height: 2,
                                                    marginHorizontal: tokens.spacing.xs,
                                                    backgroundColor: done ? tint : (0, format_1.withAlpha)(colors.muted, 0.2),
                                                } })) : null] }, stage));
                                }) }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: [sd.glyph, " ", sd.label] })] })) })] }) }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Claim ${claimNumber}, ${title}, ${sd.label}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: body }));
}
//# sourceMappingURL=ClaimRowV2.js.map