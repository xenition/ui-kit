"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobCard = JobCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
const SalaryRange_1 = require("./SalaryRange");
const SkillTag_1 = require("./SkillTag");
const ApplyButton_1 = require("./ApplyButton");
const format_1 = require("./format");
/** Employment type → primitive `Badge` tone (tokens only). */
const TYPE_TONE = {
    'full-time': 'primary',
    'part-time': 'neutral',
    contract: 'warn',
    remote: 'success',
};
/**
 * A job-posting card — the module's headline component. Variant-rich via the
 * job's `type` (`full-time` / `part-time` / `contract` / `remote`), each mapped
 * to a token `Badge` tone. Composes `Avatar` (company logo), `SalaryRange`,
 * `SkillTag`s, and an `ApplyButton`, plus an optional save/bookmark toggle.
 * Data + callbacks only; supports a `loading` skeleton. All colors are tokens.
 */
function JobCard({ job, saved, onSave, applyState, onApply, onWithdraw, applyLoading, onPress, loading = false, maxSkills = 4, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const surface = {
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.lg,
        gap: tokens.spacing.md,
    };
    if (loading) {
        const bar = (w, h) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: w, height: h, borderRadius: tokens.radius.sm, backgroundColor: colors.border } }));
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading job", style: [surface, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 40, height: 40, borderRadius: tokens.radius.md, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs, flex: 1 }, children: [bar('70%', 14), bar('45%', 12)] })] }), bar('55%', 12)] }));
    }
    const skills = job.skills ?? [];
    const shown = skills.slice(0, Math.max(0, maxSkills));
    const overflow = skills.length - shown.length;
    const showApply = applyState != null || onApply != null;
    const posted = (0, format_1.formatRelative)(job.postedAt);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: onPress ? 'button' : undefined, accessibilityLabel: `${job.title} at ${job.companyName}, ${types_1.EMPLOYMENT_LABEL[job.type]}`, disabled: !onPress, onPress: onPress ? () => onPress(job) : undefined, style: ({ pressed }) => [surface, pressed && onPress ? { opacity: 0.9 } : null, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'flex-start' }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: job.companyLogoUrl, name: job.companyName, size: "md" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: job.title }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: [job.companyName, job.location ? ` · ${job.location}` : ''] })] }), onSave ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: saved ? 'Saved — tap to remove' : 'Save job', accessibilityState: { selected: !!saved }, onPress: () => onSave(job), hitSlop: 8, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.lg, color: saved ? colors.primary : colors.muted }, children: saved ? '★' : '☆' }) })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: TYPE_TONE[job.type], children: types_1.EMPLOYMENT_LABEL[job.type] }), posted ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: posted })) : null] }), job.salary ? (0, jsx_runtime_1.jsx)(SalaryRange_1.SalaryRange, { salary: job.salary, size: "sm" }) : null, shown.length > 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: [shown.map((s, i) => ((0, jsx_runtime_1.jsx)(SkillTag_1.SkillTag, { label: s }, `${s}-${i}`))), overflow > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            alignSelf: 'flex-start',
                            borderRadius: tokens.radius.sm,
                            paddingVertical: 3,
                            paddingHorizontal: tokens.spacing.sm,
                            backgroundColor: colors.border,
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs }, children: `+${overflow}` }) })) : null] })) : null, showApply ? ((0, jsx_runtime_1.jsx)(ApplyButton_1.ApplyButton, { state: applyState, loading: applyLoading, onApply: onApply ? () => onApply(job) : undefined, onWithdraw: onWithdraw ? () => onWithdraw(job) : undefined, block: true })) : null] }));
}
//# sourceMappingURL=JobCard.js.map