"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationRowV2 = ApplicationRowV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const appearance_1 = require("../primitives/internal/appearance");
const motion_1 = require("../primitives/internal/motion");
const StatusPipelineV2_1 = require("./StatusPipelineV2");
const format_1 = require("./format");
/**
 * ApplicationRow — design V2. An elevated card that gives the application room:
 * a header of company avatar + job title + applied age, then the full
 * {@link StatusPipelineV2} funnel (big numbered steps with connectors) laid out
 * horizontally. Same props as {@link ApplicationRowProps} (drop-in). Token-pure,
 * mount enter + press spring via the shared motion hooks.
 */
function ApplicationRowV2({ application, onPress, accessory, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const press = (0, motion_1.usePressScale)();
    const applied = (0, format_1.formatRelative)(application.appliedAt);
    const surface = {
        ...(0, appearance_1.appearanceStyle)('elevated', colors, tokens),
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.lg,
        gap: tokens.spacing.md,
    };
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: onPress ? 'button' : undefined, accessibilityLabel: `${application.jobTitle} at ${application.companyName}`, disabled: !onPress, onPress: onPress ? () => onPress(application) : undefined, onPressIn: onPress ? press.onPressIn : undefined, onPressOut: onPress ? press.onPressOut : undefined, style: ({ pressed }) => [surface, pressed && onPress ? { opacity: 0.95 } : null, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { name: application.companyName, size: "md", shape: "rounded" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: application.jobTitle }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [application.companyName, applied ? ` · ${applied}` : ''] })] }), accessory ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: accessory }) : null] }), (0, jsx_runtime_1.jsx)(StatusPipelineV2_1.StatusPipelineV2, { stage: application.stage, rejected: application.rejected })] }) }));
}
//# sourceMappingURL=ApplicationRowV2.js.map