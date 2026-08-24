"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobCardV2 = JobCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const appearance_1 = require("../primitives/internal/appearance");
const color_1 = require("../primitives/internal/color");
const motion_1 = require("../primitives/internal/motion");
const types_1 = require("./types");
const SalaryRange_1 = require("./SalaryRange");
const SkillTag_1 = require("./SkillTag");
const ApplyButton_1 = require("./ApplyButton");
const format_1 = require("./format");
const TYPE_TONE = {
    'full-time': 'primary',
    'part-time': 'neutral',
    contract: 'warn',
    remote: 'success',
};
/**
 * JobCard — design V2. An elevated, shadowed card led by a big rounded company
 * logo tile, a full-width tinted salary rail, and a wrapped skill-chip shelf.
 * Same props as {@link JobCardProps} (drop-in), same token discipline: fills are
 * `withAlpha` tints of theme tokens, depth is the shared elevation scale, the
 * employment type is a `Badge` tone plus its text label. Mount enter + press
 * spring via the shared motion hooks (reduced-motion aware).
 */
function JobCardV2({ job, saved, onSave, applyState, onApply, onWithdraw, applyLoading, onPress, loading = false, maxSkills = 4, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const press = (0, motion_1.usePressScale)();
    const surface = {
        ...(0, appearance_1.appearanceStyle)('elevated', colors, tokens),
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.lg,
        gap: tokens.spacing.md,
    };
    if (loading) {
        const bar = (w, h) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: w, height: h, borderRadius: tokens.radius.sm, backgroundColor: colors.border } }));
        return ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { accessibilityLabel: "Loading job", style: [surface, { opacity: enter.opacity, transform: enter.transform }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 64, height: 64, borderRadius: tokens.radius.md, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs, flex: 1 }, children: [bar(180, 14), bar(120, 12)] })] }), bar(140, 12)] }));
    }
    const skills = job.skills ?? [];
    const shown = skills.slice(0, Math.max(0, maxSkills));
    const overflow = skills.length - shown.length;
    const showApply = applyState != null || onApply != null;
    const posted = (0, format_1.formatRelative)(job.postedAt);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: onPress ? 'button' : undefined, accessibilityLabel: `${job.title} at ${job.companyName}, ${types_1.EMPLOYMENT_LABEL[job.type]}`, disabled: !onPress, onPress: onPress ? () => onPress(job) : undefined, onPressIn: onPress ? press.onPressIn : undefined, onPressOut: onPress ? press.onPressOut : undefined, style: ({ pressed }) => [surface, pressed && onPress ? { opacity: 0.95 } : null, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'flex-start' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: 64,
                                height: 64,
                                borderRadius: tokens.radius.md,
                                backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.08),
                                alignItems: 'center',
                                justifyContent: 'center',
                            }, children: (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: job.companyLogoUrl, name: job.companyName, size: "lg", shape: "rounded" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: job.title }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: [job.companyName, job.location ? ` · ${job.location}` : ''] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: TYPE_TONE[job.type], children: types_1.EMPLOYMENT_LABEL[job.type] }), posted ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: posted })) : null] })] }), onSave ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: saved ? 'Saved — tap to remove' : 'Save job', accessibilityState: { selected: !!saved }, onPress: () => onSave(job), hitSlop: 8, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.lg, color: saved ? colors.primaryText : colors.muted }, children: saved ? '★' : '☆' }) })) : null] }), job.salary ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.06),
                        borderRadius: tokens.radius.md,
                        paddingVertical: tokens.spacing.sm,
                        paddingHorizontal: tokens.spacing.md,
                    }, children: (0, jsx_runtime_1.jsx)(SalaryRange_1.SalaryRange, { salary: job.salary, size: "md" }) })) : null, shown.length > 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: [shown.map((s, i) => ((0, jsx_runtime_1.jsx)(SkillTag_1.SkillTag, { label: s }, `${s}-${i}`))), overflow > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                alignSelf: 'flex-start',
                                borderRadius: tokens.radius.sm,
                                paddingVertical: 3,
                                paddingHorizontal: tokens.spacing.sm,
                                backgroundColor: colors.border,
                            }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs }, children: `+${overflow}` }) })) : null] })) : null, showApply ? ((0, jsx_runtime_1.jsx)(ApplyButton_1.ApplyButton, { state: applyState, loading: applyLoading, onApply: onApply ? () => onApply(job) : undefined, onWithdraw: onWithdraw ? () => onWithdraw(job) : undefined, block: true })) : null] }) }));
}
//# sourceMappingURL=JobCardV2.js.map