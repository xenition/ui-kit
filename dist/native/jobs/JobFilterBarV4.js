"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobFilterBarV4 = JobFilterBarV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const SearchInputV4_1 = require("../primitives/SearchInputV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const types_1 = require("./types");
const tone_v4_1 = require("./internal/tone-v4");
/** The clear affordance's copy — an undo, never a destructive act. */
const CLEAR = 'Clear';
/**
 * **V4 job filter bar** — same props as {@link JobFilterBar} plus
 * `searchPlaceholder`, `formatResultCount` and `emptyLabel`.
 *
 * ## Five changes
 *
 * 1. **The chips are not a tab list.** The base put
 *    `accessibilityRole="tablist"` on the `ScrollView` (and `role="tablist"` on
 *    web). These are **multi-select filters**: a tab list promises exactly one
 *    selected tab and a matching tab panel, so a reader announced "tab 2 of 4"
 *    for a control where two, three or none can be on at once, and looked for
 *    a panel that does not exist. The role is gone; each chip is a button that
 *    reports its own `selected` state, which is what a filter chip is.
 * 2. **"Clear" stopped being a red alarm.** The bar reused `SkillTag`'s
 *    `matched` and `missing` variants as selection state, so the clear
 *    affordance rendered as a solid danger-red chip labelled "! Clear" —
 *    the palette's strongest colour, meaning destruction, on the mildest
 *    action in the module. Clearing a filter is undoing a choice, so it is a
 *    plain outline chip. Selection is `primary`, the way every other V4 chip
 *    strip in the kit says it.
 * 3. **The chips are targets.** They were about 20 points tall — `paddingVertical:
 *    3` around a 12pt label — on the single most-tapped control in the module.
 *    They clear 44 now, from the same `minTap` the buttons and the nav line
 *    stand on.
 * 4. **`resultCount={0}` says something.** Zero is the one count that matters
 *    and it announced nothing at all, so a filter that eliminated every job
 *    looked identical to one still loading. It now draws `emptyLabel` in a
 *    polite live region, so the reader hears the outcome of the filter they
 *    just changed without being interrupted mid-word.
 * 5. **`muted` stopped inking the count**, and the search field is the V4 one —
 *    same height, same radius and same focus halo as every other field, with a
 *    real 44 clear button instead of a bare ✕ in 8 points of slop.
 */
function JobFilterBarV4({ types = types_1.EMPLOYMENT_TYPES, active = [], onToggleType, query, onQueryChange, onClear, resultCount, searchPlaceholder = 'Search jobs, companies, skills…', formatResultCount = (count) => `${count} result${count === 1 ? '' : 's'}`, emptyLabel = 'No matching jobs', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const activeSet = new Set(active);
    const showSearch = query != null || onQueryChange != null;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const countText = typeof resultCount === 'number'
        ? resultCount === 0
            ? emptyLabel
            : formatResultCount(resultCount)
        : null;
    const chipStyle = (pressed, on) => ({
        minHeight: tap,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: tokens.spacing.md,
        borderRadius: tokens.radius.full,
        borderWidth: 1,
        borderColor: on ? colors.primary : colors.border,
        backgroundColor: pressed
            ? (0, state_v4_1.pressOver)(theme, on ? colors.primary : colors.card, on ? colors.onPrimary : colors.onCard)
            : on
                ? colors.primary
                : colors.card,
    });
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [showSearch ? ((0, jsx_runtime_1.jsx)(SearchInputV4_1.SearchInputV4, { value: query ?? '', onChangeText: onQueryChange, placeholder: searchPlaceholder, accessibilityLabel: "Search jobs" })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: {
                            gap: tokens.spacing.sm,
                            alignItems: 'center',
                            paddingEnd: tokens.spacing.md,
                        }, style: { flex: 1 }, children: [types.map((type) => {
                                const on = activeSet.has(type);
                                const label = ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: on ? 'semibold' : 'medium', tone: on ? 'onPrimary' : 'onCard', children: types_1.EMPLOYMENT_LABEL[type] }));
                                // A bar with no handler is a read-out of the active filters, not a
                                // row of dead buttons, so it is announced rather than focusable.
                                return onToggleType ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: types_1.EMPLOYMENT_LABEL[type], accessibilityState: { selected: on }, onPress: () => onToggleType(type), style: ({ pressed }) => chipStyle(pressed, on), children: label }, type)) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: types_1.EMPLOYMENT_LABEL[type], accessibilityState: { selected: on }, style: chipStyle(false, on), children: label }, type));
                            }), activeSet.size > 0 && onClear ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: (0, tone_v4_1.spokenName)([CLEAR, 'filters']), onPress: onClear, style: ({ pressed }) => chipStyle(pressed, false), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "medium", tone: "primaryText", children: CLEAR }) })) : null] }), countText ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: countText, accessibilityLiveRegion: "polite", children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: countText }) })) : null] })] }));
}
//# sourceMappingURL=JobFilterBarV4.js.map