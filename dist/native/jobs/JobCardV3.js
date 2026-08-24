"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobCardV3 = JobCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
const SalaryRange_1 = require("./SalaryRange");
const SkillTag_1 = require("./SkillTag");
const ApplyButton_1 = require("./ApplyButton");
const format_1 = require("./format");
/** Employment type → a semantic fill slot for the left accent rail (tokens). */
const TYPE_ACCENT = {
    'full-time': 'primary',
    'part-time': 'accent',
    contract: 'warn',
    remote: 'success',
};
/**
 * JobCard — design V3. A minimal, borderless line item: a thin colored accent
 * rail on the left keyed to the employment type, then the title, a single inline
 * `company · location · type · posted` meta line, salary, and a tight skill row.
 * Separation comes from spacing, not a box. Same props as {@link JobCardProps}
 * (drop-in). Token-pure — the accent color is resolved from the semantic slots.
 */
function JobCardV3({ job, saved, onSave, applyState, onApply, onWithdraw, applyLoading, onPress, loading = false, maxSkills = 3, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    // Cast to a string-keyed record so the accent slot can be indexed dynamically.
    const colorMap = colors;
    const wrap = {
        flexDirection: 'row',
        gap: tokens.spacing.md,
        paddingVertical: tokens.spacing.md,
    };
    if (loading) {
        const bar = (w, h) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: w, height: h, borderRadius: tokens.radius.sm, backgroundColor: colors.border } }));
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading job", style: [wrap, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 4, borderRadius: tokens.radius.full, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [bar(180, 14), bar(120, 12)] })] }));
    }
    const skills = job.skills ?? [];
    const shown = skills.slice(0, Math.max(0, maxSkills));
    const overflow = skills.length - shown.length;
    const showApply = applyState != null || onApply != null;
    const posted = (0, format_1.formatRelative)(job.postedAt);
    const accent = colorMap[TYPE_ACCENT[job.type]] ?? colors.primary;
    const meta = [job.companyName, job.location, types_1.EMPLOYMENT_LABEL[job.type], posted]
        .filter(Boolean)
        .join(' · ');
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: onPress ? 'button' : undefined, accessibilityLabel: `${job.title} at ${job.companyName}, ${types_1.EMPLOYMENT_LABEL[job.type]}`, disabled: !onPress, onPress: onPress ? () => onPress(job) : undefined, style: ({ pressed }) => [wrap, pressed && onPress ? { opacity: 0.9 } : null, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 4, borderRadius: tokens.radius.full, backgroundColor: accent } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: job.companyLogoUrl, name: job.companyName, size: "xs", shape: "rounded" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: job.title }), onSave ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: saved ? 'Saved — tap to remove' : 'Save job', accessibilityState: { selected: !!saved }, onPress: () => onSave(job), hitSlop: 8, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.base, color: saved ? colors.primaryText : colors.muted }, children: saved ? '★' : '☆' }) })) : null] }), meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: meta })) : null, job.salary ? (0, jsx_runtime_1.jsx)(SalaryRange_1.SalaryRange, { salary: job.salary, size: "sm" }) : null, shown.length > 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.xs }, children: [shown.map((s, i) => ((0, jsx_runtime_1.jsx)(SkillTag_1.SkillTag, { label: s }, `${s}-${i}`))), overflow > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `+${overflow}` })) : null] })) : null, showApply ? ((0, jsx_runtime_1.jsx)(ApplyButton_1.ApplyButton, { state: applyState, loading: applyLoading, size: "sm", onApply: onApply ? () => onApply(job) : undefined, onWithdraw: onWithdraw ? () => onWithdraw(job) : undefined })) : null] })] }));
}
//# sourceMappingURL=JobCardV3.js.map