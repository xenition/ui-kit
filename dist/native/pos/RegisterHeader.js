"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterHeader = RegisterHeader;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const internal_1 = require("./internal");
const GradientSurface_1 = require("./internal/GradientSurface");
const register_1 = require("./internal/register");
/**
 * RegisterHeader — the POS V4 "register" **terminal header**. A confident brand
 * gradient (`registerGradient`) carries the store name + `registerLabel`, the
 * `cashierName` subline, a frosted shift-status pill (open/closed by word, not
 * color alone), and the **near-white running total** of the open order (integer
 * cents via `formatMoney`). An optional menu button sits top-right; the shift pill
 * becomes a button when `onShift` is set. Every color derives from the brand ramp
 * via `useXenitionTheme()` — no literals, light + dark safe.
 */
function RegisterHeader({ storeName, registerLabel, cashierName, shiftOpen, runningTotalCents, currency = 'USD', onMenu, onShift, style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, register_1.registerInk)(r);
    const inkSoft = (0, register_1.registerInkSoft)(r);
    const hasShift = typeof shiftOpen === 'boolean';
    const shiftText = shiftOpen ? 'Shift open' : 'Shift closed';
    const shiftGlyph = shiftOpen ? '●' : '○';
    const total = typeof runningTotalCents === 'number' ? Math.max(0, Math.trunc(runningTotalCents)) : undefined;
    const pillStyle = {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.xs,
        minHeight: 44,
        paddingHorizontal: tokens.spacing.md,
        paddingVertical: tokens.spacing.xs,
        borderRadius: tokens.radius.full,
        backgroundColor: (0, register_1.registerTile)(r),
        borderWidth: 1,
        borderColor: (0, register_1.registerBorder)(r),
    };
    const shiftPillContent = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '800' }, children: shiftGlyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: shiftText })] }));
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ borderRadius: tokens.radius.lg }, style], children: (0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, register_1.registerGradient)(r), style: { borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: ink, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: storeName }), registerLabel ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                                color: ink,
                                                fontSize: tokens.typography.scale.xs,
                                                fontWeight: '700',
                                                paddingHorizontal: tokens.spacing.sm,
                                                paddingVertical: 2,
                                                borderRadius: tokens.radius.full,
                                                backgroundColor: (0, register_1.registerTile)(r),
                                                borderWidth: 1,
                                                borderColor: (0, register_1.registerBorder)(r),
                                                overflow: 'hidden',
                                            }, children: registerLabel })) : null] }), cashierName ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: inkSoft, fontSize: tokens.typography.scale.sm, marginTop: 2 }, children: cashierName })) : null] }), onMenu ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Open menu", onPress: onMenu, style: ({ pressed }) => ({
                                width: 44,
                                height: 44,
                                borderRadius: tokens.radius.full,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: (0, register_1.registerTile)(r, 0.22),
                                borderWidth: 1,
                                borderColor: (0, register_1.registerBorder)(r),
                                opacity: pressed ? 0.85 : 1,
                            }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: ink, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: "\u22EF" }) })) : null] }), hasShift ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.md }, children: onShift ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${shiftText}. Manage shift`, onPress: onShift, style: ({ pressed }) => ({ ...pillStyle, opacity: pressed ? 0.85 : 1 }), children: shiftPillContent })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: shiftText, style: pillStyle, children: shiftPillContent })) })) : null, typeof total === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginTop: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: "Open order" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLabel: `Running total ${(0, internal_1.formatMoney)(total, currency)}`, allowFontScaling: false, style: { color: ink, fontSize: tokens.typography.scale['3xl'], fontWeight: '800', letterSpacing: -1, marginTop: 2 }, children: (0, internal_1.formatMoney)(total, currency) })] })) : null] }) }));
}
//# sourceMappingURL=RegisterHeader.js.map