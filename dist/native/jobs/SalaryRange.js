"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalaryRange = SalaryRange;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const format_1 = require("./format");
const TEXT_KEY = {
    sm: 'sm',
    md: 'base',
    lg: 'lg',
};
/**
 * Inline salary-band label — e.g. `💰 $90k – $120k/yr`. Data-only: pass a
 * {@link Salary} and it formats a compact range, a `From …`/`Up to …` label for
 * a single bound, or the `emptyLabel` when nothing is disclosed. All colors come
 * from theme tokens (`onSurface` for the amount, `muted` for the empty hint).
 */
function SalaryRange({ salary, size = 'md', format, emptyLabel = 'Salary not disclosed', glyph = '💰', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const fontSize = tokens.typography.scale[TEXT_KEY[size]];
    const label = salary && format ? format(salary) : (0, format_1.formatSalary)(salary);
    const disclosed = label != null;
    const text = disclosed ? label : emptyLabel;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: disclosed ? `Salary ${text}` : emptyLabel, style: [{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, style], children: [glyph && disclosed ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize }, children: glyph })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: disclosed ? colors.onSurface : colors.muted,
                    fontSize,
                    fontWeight: disclosed ? '600' : '400',
                    fontStyle: disclosed ? 'normal' : 'italic',
                }, children: text })] }));
}
//# sourceMappingURL=SalaryRange.js.map