"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavedJobRow = SavedJobRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
const SalaryRange_1 = require("./SalaryRange");
const format_1 = require("./format");
const TYPE_TONE = {
    'full-time': 'primary',
    'part-time': 'neutral',
    contract: 'warn',
    remote: 'success',
};
/**
 * A compact row for the "saved jobs" list: company avatar, title, type badge +
 * salary, saved age, and a filled bookmark that removes the job when pressed.
 * Data + callbacks only; tokens only.
 */
function SavedJobRow({ job, savedAt, onPress, onRemove, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const saved = (0, format_1.formatRelative)(savedAt);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: onPress ? 'button' : undefined, accessibilityLabel: `${job.title} at ${job.companyName}`, disabled: !onPress, onPress: onPress ? () => onPress(job) : undefined, style: ({ pressed }) => [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                backgroundColor: colors.surface,
                borderBottomColor: colors.border,
                borderBottomWidth: 1,
                paddingVertical: tokens.spacing.md,
                paddingHorizontal: tokens.spacing.md,
            },
            pressed && onPress ? { opacity: 0.9 } : null,
            style,
        ], children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: job.companyLogoUrl, name: job.companyName, size: "sm" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: job.title }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: TYPE_TONE[job.type], children: types_1.EMPLOYMENT_LABEL[job.type] }), job.salary ? (0, jsx_runtime_1.jsx)(SalaryRange_1.SalaryRange, { salary: job.salary, size: "sm", glyph: null }) : null] }), saved ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `Saved ${saved}` })) : null] }), onRemove ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Remove ${job.title} from saved`, accessibilityState: { selected: true }, onPress: () => onRemove(job), hitSlop: 8, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.lg, color: colors.primary }, children: "\u2605" }) })) : null] }));
}
//# sourceMappingURL=SavedJobRow.js.map