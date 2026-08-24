"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationRow = ApplicationRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const StatusPipeline_1 = require("./StatusPipeline");
const format_1 = require("./format");
/**
 * A single row in the "my applications" list: company avatar, job title,
 * applied age, and a compact {@link StatusPipeline} showing where it sits in the
 * funnel (with rejection called out as text). Data + `onPress` only; tokens only.
 */
function ApplicationRow({ application, onPress, accessory, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const applied = (0, format_1.formatRelative)(application.appliedAt);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: onPress ? 'button' : undefined, accessibilityLabel: `${application.jobTitle} at ${application.companyName}`, disabled: !onPress, onPress: onPress ? () => onPress(application) : undefined, style: ({ pressed }) => [
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
        ], children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { name: application.companyName, size: "sm" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: application.jobTitle }), applied ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: applied })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: application.companyName }), (0, jsx_runtime_1.jsx)(StatusPipeline_1.StatusPipeline, { stage: application.stage, rejected: application.rejected, variant: "compact" })] }), accessory ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: accessory }) : null] }));
}
//# sourceMappingURL=ApplicationRow.js.map