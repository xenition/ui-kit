"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sparkline = Sparkline;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Compact trend indicator approximated with thin View-based bars (no SVG — the
 * kit has no `react-native-svg`). Each datum is a hairline-gapped bar whose
 * height tracks its value, reading as a sparkline at a glance.
 */
function Sparkline({ data, height = 32, color = 'primary', max, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (data.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "No data" }));
    }
    const ceiling = Math.max(max ?? Math.max(...data), 1);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ flexDirection: 'row', alignItems: 'flex-end', height, gap: 1 }, style], children: data.map((value, i) => {
            const ratio = Math.min(Math.max(value / ceiling, 0), 1);
            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    flex: 1,
                    height: Math.max(ratio * height, 1),
                    backgroundColor: colors[color],
                    borderRadius: tokens.radius.sm,
                } }, i));
        }) }));
}
//# sourceMappingURL=Sparkline.js.map