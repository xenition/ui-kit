"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentPerformanceCard = AgentPerformanceCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Avatar_1 = require("../primitives/Avatar");
const GradientSurface_1 = require("./internal/GradientSurface");
const console_1 = require("./internal/console");
/**
 * AgentPerformanceCard — a gradient "console" stats hero for an agent. The agent
 * name and period sit as near-white ink over the console gradient; each metric
 * renders as a frosted tile with a big value and a soft label. A calm
 * peak-moment surface, dark-mode safe, every color from the compiled theme ramps
 * (token-only, no literals). Presentational — shaped stats only, nothing
 * fetches.
 */
function AgentPerformanceCard({ agentName, agentAvatar, stats, period = 'This week', style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, console_1.consoleInk)(r);
    const inkSoft = (0, console_1.consoleInkSoft)(r);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ borderRadius: tokens.radius.lg }, style], children: (0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, console_1.consoleGradient)(r), style: { borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden', gap: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { size: "lg", name: agentName, src: agentAvatar }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: ink, fontSize: tokens.typography.scale.xl, fontWeight: '800', letterSpacing: -0.5 }, children: agentName }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: period })] })] }), stats.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: stats.map((stat) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "text", accessibilityLabel: `${stat.label} ${stat.value}`, style: {
                            flexGrow: 1,
                            flexBasis: '30%',
                            gap: tokens.spacing.xs,
                            padding: tokens.spacing.md,
                            borderRadius: tokens.radius.md,
                            backgroundColor: (0, console_1.consoleTile)(r),
                            borderWidth: 1,
                            borderColor: (0, console_1.consoleBorder)(r),
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: stat.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale['2xl'], fontWeight: '800', letterSpacing: -0.5 }, children: stat.value })] }, stat.label))) })) : null] }) }));
}
//# sourceMappingURL=AgentPerformanceCard.js.map