"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobFilterBar = JobFilterBar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
const SkillTag_1 = require("./SkillTag");
/**
 * A filter bar for a job list: an optional search field plus a horizontally
 * scrolling row of employment-type chips (`SkillTag`s) that toggle on/off, and a
 * "Clear" chip once anything is active. Controlled — the app owns `active` and
 * `query` and reacts to the callbacks. Selected chips carry a token outline (not
 * color alone). Tokens only.
 */
function JobFilterBar({ types = types_1.EMPLOYMENT_TYPES, active = [], onToggleType, query, onQueryChange, onClear, resultCount, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const activeSet = new Set(active);
    const showSearch = query != null || onQueryChange != null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [showSearch ? ((0, jsx_runtime_1.jsx)(primitives_1.SearchInput, { value: query ?? '', onChangeText: onQueryChange, placeholder: "Search jobs, companies, skills\u2026", accessibilityLabel: "Search jobs" })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, accessibilityRole: "tablist", contentContainerStyle: { gap: tokens.spacing.xs, alignItems: 'center', paddingRight: tokens.spacing.sm }, style: { flex: 1 }, children: [types.map((t) => {
                                const on = activeSet.has(t);
                                return ((0, jsx_runtime_1.jsx)(SkillTag_1.SkillTag, { label: types_1.EMPLOYMENT_LABEL[t], variant: on ? 'matched' : 'default', selected: on, onPress: onToggleType ? () => onToggleType(t) : undefined }, t));
                            }), activeSet.size > 0 && onClear ? ((0, jsx_runtime_1.jsx)(SkillTag_1.SkillTag, { label: "Clear", variant: "missing", onPress: onClear })) : null] }), typeof resultCount === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `${resultCount} result${resultCount === 1 ? '' : 's'}` })) : null] })] }));
}
//# sourceMappingURL=JobFilterBar.js.map