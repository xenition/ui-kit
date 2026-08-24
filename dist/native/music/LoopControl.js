"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoopControl = LoopControl;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
/**
 * A loop-region control — a UI shell only, it loops no transport. Shows a
 * loop on/off toggle (state via a11y `selected` + fill, not color alone) and,
 * in the `bar` variant, a strip visualizing the `[start, end]` region over
 * `totalBars` with −/＋ steppers that report through `onRegionChange`. All
 * bounds are clamped/guarded. Token-only styling.
 */
function LoopControl({ enabled, start = 1, end = 4, totalBars = 8, variant = 'bar', disabled = false, onToggle, onRegionChange, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const bars = Math.max(1, Math.trunc(Number.isFinite(totalBars) ? totalBars : 8));
    const s = (0, types_1.clamp)(Math.trunc(start), 1, bars);
    const e = (0, types_1.clamp)(Math.trunc(end), s, bars);
    const setRegion = (ns, ne) => {
        if (disabled)
            return;
        const cs = (0, types_1.clamp)(ns, 1, bars);
        const ce = (0, types_1.clamp)(ne, cs, bars);
        onRegionChange?.(cs, ce);
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: enabled ? 'Turn loop off' : 'Turn loop on', accessibilityState: { selected: enabled, disabled }, disabled: disabled, onPress: () => onToggle?.(!enabled), style: ({ pressed }) => ({
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    paddingVertical: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.sm,
                    borderRadius: tokens.radius.md,
                    borderWidth: 1,
                    borderColor: enabled ? colors.primary : colors.border,
                    backgroundColor: enabled ? (0, types_1.withAlpha)(colors.primary, 0.16) : 'transparent',
                    opacity: disabled ? 0.5 : pressed ? 0.8 : 1,
                }), children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83D\uDD01", size: "sm", color: enabled ? 'primary' : 'muted' }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: {
                            color: enabled ? colors.primary : colors.muted,
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: '700',
                        }, children: ["Loop ", enabled ? 'On' : 'Off'] })] }), variant === 'bar' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: `Loop region bars ${s} to ${e} of ${bars}`, style: { flexDirection: 'row', gap: 2, height: 16 }, children: Array.from({ length: bars }).map((_, i) => {
                            const bar = i + 1;
                            const inRegion = bar >= s && bar <= e;
                            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    flex: 1,
                                    borderRadius: tokens.radius.sm,
                                    backgroundColor: inRegion && enabled ? colors.primary : inRegion ? (0, types_1.withAlpha)(colors.primary, 0.35) : colors.border,
                                } }, bar));
                        }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(Stepper, { label: "Start", value: s, onDec: () => setRegion(s - 1, e), onInc: () => setRegion(s + 1, e), disabled: disabled }), (0, jsx_runtime_1.jsx)(Stepper, { label: "End", value: e, onDec: () => setRegion(s, e - 1), onInc: () => setRegion(s, e + 1), disabled: disabled })] })] })) : ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: ["Bars ", s, "\u2013", e] }))] }));
}
function Stepper({ label, value, onDec, onInc, disabled, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const btn = ({ pressed }) => ({
        width: 26,
        height: 26,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: tokens.radius.sm,
        borderWidth: 1,
        borderColor: colors.border,
        opacity: disabled ? 0.4 : pressed ? 0.8 : 1,
    });
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Decrease ${label.toLowerCase()} bar`, disabled: disabled, onPress: onDec, style: btn, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2212", size: "sm", color: "onSurface" }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700', minWidth: 16, textAlign: 'center' }, children: value }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Increase ${label.toLowerCase()} bar`, disabled: disabled, onPress: onInc, style: btn, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uFF0B", size: "sm", color: "onSurface" }) })] }));
}
//# sourceMappingURL=LoopControl.js.map