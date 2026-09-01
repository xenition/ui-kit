"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeHeader = HomeHeader;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const GradientSurface_1 = require("./internal/GradientSurface");
const ambient_1 = require("./internal/ambient");
const TONE_GLYPH = {
    success: '🛡️',
    warn: '⚠️',
    danger: '🚨',
};
/**
 * HomeHeader — the smart-home dashboard **hero** and the module's peak moment.
 * A brand-gradient ground carries a near-white greeting + home name, a frosted
 * security/status pill (tone + glyph, never color alone), a weather glance and a
 * run of metric tiles, then an optional row of quick-scene chips. Every color
 * derives from the compiled brand ramp via `ambient*` + `GradientSurface` — the
 * light ramp steps act as near-white "ink" on the saturated ground for any hue —
 * token-only, no literals, light + dark. Presentational: shaped data +
 * callbacks, nothing fetches.
 */
function HomeHeader({ homeName, greeting, statusLabel, statusTone = 'success', weather, metrics, scenes, onScene, style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, ambient_1.ambientInk)(r);
    const inkSoft = (0, ambient_1.ambientInkSoft)(r);
    const tile = (0, ambient_1.ambientTile)(r);
    const border = (0, ambient_1.ambientBorder)(r);
    const tileStyle = {
        borderRadius: tokens.radius.md,
        backgroundColor: tile,
        borderWidth: 1,
        borderColor: border,
        paddingHorizontal: tokens.spacing.md,
        paddingVertical: tokens.spacing.sm,
    };
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ borderRadius: tokens.radius.lg }, style], children: (0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, ambient_1.ambientGradient)(r), style: { borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [greeting ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: greeting })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: ink, fontSize: tokens.typography.scale['3xl'], fontWeight: '800', letterSpacing: -0.5, marginTop: 2 }, children: homeName })] }), statusLabel ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: statusLabel, style: {
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: tokens.spacing.xs,
                                paddingHorizontal: tokens.spacing.md,
                                paddingVertical: tokens.spacing.xs,
                                borderRadius: tokens.radius.full,
                                backgroundColor: tile,
                                borderWidth: 1,
                                borderColor: border,
                            }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: TONE_GLYPH[statusTone], size: "sm", style: { color: ink } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: statusLabel })] })) : null] }), weather || (metrics && metrics.length > 0) ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm, marginTop: tokens.spacing.lg }, children: [weather ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [tileStyle, { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexGrow: 1, minWidth: 112 }], children: [weather.glyph ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: weather.glyph, size: "xl", style: { color: ink } }) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: ink, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: weather.temp }), weather.condition ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: inkSoft, fontSize: tokens.typography.scale.xs }, children: weather.condition })) : null] })] })) : null, (metrics ?? []).map((m) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [tileStyle, { flexGrow: 1, minWidth: 112, justifyContent: 'center' }], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: ink, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: m.value }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: inkSoft, fontSize: tokens.typography.scale.xs }, children: m.label })] }, m.label)))] })) : null, scenes && scenes.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm, marginTop: tokens.spacing.md }, children: scenes.map((s) => ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: s.label, onPress: () => onScene?.(s.id), style: ({ pressed }) => ({
                            minHeight: 44,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.xs,
                            paddingHorizontal: tokens.spacing.md,
                            paddingVertical: tokens.spacing.xs,
                            borderRadius: tokens.radius.full,
                            backgroundColor: tile,
                            borderWidth: 1,
                            borderColor: border,
                            opacity: pressed ? 0.85 : 1,
                        }), children: [s.glyph ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: s.glyph, size: "sm", style: { color: ink } }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: s.label })] }, s.id))) })) : null] }) }));
}
//# sourceMappingURL=HomeHeader.js.map