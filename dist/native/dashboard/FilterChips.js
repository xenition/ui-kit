"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterChips = FilterChips;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
function normalize(o) {
    return typeof o === 'string' ? { value: o, label: o } : o;
}
/**
 * A row of selectable filter chips (single- or multi-select). The selected
 * chip(s) fill with the `primary` token. Token-only; wraps by default, or lays
 * out in a horizontal scroller when `scroll` is set.
 */
function FilterChips({ options, selected, onChange, multi = false, scroll = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const selectedList = Array.isArray(selected) ? selected : [selected];
    const toggle = (value) => {
        if (multi) {
            const set = new Set(selectedList);
            if (set.has(value)) {
                set.delete(value);
            }
            else {
                set.add(value);
            }
            onChange(Array.from(set));
        }
        else {
            onChange(value);
        }
    };
    const chips = options.map(normalize).map((opt) => {
        const active = selectedList.includes(opt.value);
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: active }, accessibilityLabel: opt.label, onPress: () => toggle(opt.value), style: ({ pressed }) => ({
                paddingVertical: tokens.spacing.xs,
                paddingHorizontal: tokens.spacing.md,
                borderRadius: tokens.radius.full,
                borderWidth: 1,
                borderColor: active ? colors.primary : colors.border,
                backgroundColor: active ? colors.primary : colors.surface,
                opacity: pressed ? 0.8 : 1,
            }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: active ? colors.onPrimary : colors.onSurface,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: active ? '600' : '500',
                }, children: opt.label }) }, opt.value));
    });
    if (scroll) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: { gap: tokens.spacing.sm, paddingRight: tokens.spacing.md }, style: style, children: chips }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, style], children: chips }));
}
//# sourceMappingURL=FilterChips.js.map