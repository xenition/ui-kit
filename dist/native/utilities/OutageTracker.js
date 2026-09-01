"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutageTracker = OutageTracker;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
const DEFAULT_STEPS = [
    { label: 'Reported', done: true },
    { label: 'Crew dispatched', current: true },
    { label: 'Power restored' },
];
/**
 * A clean-card outage progress timeline. The event state (active → danger,
 * scheduled → warn, resolved → success) is conveyed by **glyph + heading + a
 * tint that traces to a `SemanticColors` slot** — never color alone — over a
 * soft tinted header strip. A vertical timeline traces the restoration: a
 * completed step is a filled dot with a connector, the current step is ringed,
 * and pending steps are `border`-colored. The estimated restoration is shown for
 * active/scheduled events and suppressed once resolved. Token-bound throughout.
 */
function OutageTracker({ state = 'active', area, eta, steps = DEFAULT_STEPS, onDetails, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const od = (0, status_1.outageState)(state);
    const tint = colors[od.color];
    const showEta = eta != null && state !== 'resolved';
    const card = {
        backgroundColor: colors.card,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.lg,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.1,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 6 },
        elevation: 3,
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${od.heading}${area != null ? `, ${area}` : ''}`, style: [card, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    gap: tokens.spacing.md,
                    borderRadius: tokens.radius.md,
                    backgroundColor: (0, format_1.withAlpha)(tint, 0.1),
                    padding: tokens.spacing.md,
                }, children: [(0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: od.glyph, size: "xl", color: od.color, accessibilityLabel: od.label }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: od.heading }), area != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.sm }, children: area })) : null, showEta ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { marginTop: 2, color: tint, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: ["Estimated restoration: ", eta] })) : null] })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.lg, gap: 0 }, children: steps.map((step, i) => {
                    const last = i === steps.length - 1;
                    const dotColor = step.done ? tint : colors.border;
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', width: 16 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                                            width: 14,
                                            height: 14,
                                            borderRadius: tokens.radius.full,
                                            backgroundColor: step.done ? tint : colors.card,
                                            borderWidth: step.current ? 3 : step.done ? 0 : 2,
                                            borderColor: step.current ? tint : dotColor,
                                        } }), !last ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                            flex: 1,
                                            width: 2,
                                            minHeight: tokens.spacing.lg,
                                            backgroundColor: step.done ? tint : colors.border,
                                        } })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, paddingBottom: last ? 0 : tokens.spacing.lg, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                            color: colors.onSurface,
                                            fontSize: tokens.typography.scale.sm,
                                            fontWeight: step.current ? '700' : '600',
                                        }, children: step.label }), step.time != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: step.time })) : null] })] }, `${step.label}-${i}`));
                }) }), onDetails != null ? ((0, jsx_runtime_1.jsx)(primitives_2.Button, { variant: "outline", onPress: onDetails, style: { marginTop: tokens.spacing.md }, children: "View details" })) : null] }));
}
//# sourceMappingURL=OutageTracker.js.map