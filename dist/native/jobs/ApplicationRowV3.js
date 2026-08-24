"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationRowV3 = ApplicationRowV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const format_1 = require("./format");
const types_1 = require("./types");
/**
 * ApplicationRow — design V3. A dense single line: a colored status dot, the
 * job title, then the stage word and applied age trailing. The stage is carried
 * by the WORD (and a ✕ glyph on rejection), never the dot color alone, and the
 * full context lives in the accessible label. Same props as
 * {@link ApplicationRowProps} (drop-in). Token-pure.
 */
function ApplicationRowV3({ application, onPress, accessory, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const applied = (0, format_1.formatRelative)(application.appliedAt);
    // Guarded indexing: an unknown stage still resolves to a real label.
    const idx = Math.max(0, types_1.APPLICATION_STAGES.indexOf(application.stage));
    const label = types_1.STAGE_LABEL[application.stage] ?? types_1.STAGE_LABEL[types_1.APPLICATION_STAGES[0]];
    const rejected = !!application.rejected;
    const hired = application.stage === 'hired';
    const dotColor = rejected ? colors.danger : hired ? colors.success : colors.primary;
    const stageColor = rejected ? colors.dangerText : hired ? colors.successText : colors.primaryText;
    const stageWord = rejected ? `✕ ${label}` : hired ? `✓ ${label}` : label;
    const summary = rejected
        ? `${application.jobTitle} at ${application.companyName}, rejected at ${label}, stage ${idx + 1} of ${types_1.APPLICATION_STAGES.length}`
        : `${application.jobTitle} at ${application.companyName}, ${label}, stage ${idx + 1} of ${types_1.APPLICATION_STAGES.length}`;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: onPress ? 'button' : undefined, accessibilityLabel: summary, disabled: !onPress, onPress: onPress ? () => onPress(application) : undefined, style: ({ pressed }) => [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                backgroundColor: colors.surface,
                borderBottomColor: colors.border,
                borderBottomWidth: 1,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
            },
            pressed && onPress ? { opacity: 0.9 } : null,
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 8, height: 8, borderRadius: tokens.radius.full, backgroundColor: dotColor } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: application.jobTitle }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: stageColor, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: stageWord }), applied ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: applied })) : null, accessory ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: accessory }) : null] }));
}
//# sourceMappingURL=ApplicationRowV3.js.map