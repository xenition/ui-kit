"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagFilterBar = TagFilterBar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
/**
 * Horizontally scrolling filter bar of toggleable chips (segments, tags,
 * sources). Selection state is conveyed by a filled tone **and** the chip's
 * `selected` a11y state (not color alone). Controlled via `selected` + a
 * per-key `onToggle`; an optional `onClear` chip appears while any filter is
 * active. Guards an empty `tags` array. Colors are theme tokens; the idle chip
 * fill uses `withAlpha` over a token.
 */
function TagFilterBar({ tags, selected, onToggle, onClear, tone = 'primary', emptyLabel = 'No filters', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const toneColor = tone === 'neutral' ? colors.muted : colors[tone];
    const onTone = tone === 'primary' ? colors.onPrimary : tone === 'accent' ? colors.onAccent : colors.onSurface;
    const hasActive = selected.length > 0;
    if (tags.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: emptyLabel, style: [{ paddingVertical: tokens.spacing.sm }, style], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, style: style, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xs, alignItems: 'center' }, children: [tags.map((tag) => {
                    const isOn = selected.includes(tag.key);
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: isOn }, accessibilityLabel: `Filter ${tag.label}${isOn ? ', selected' : ''}`, onPress: () => onToggle(tag.key), style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.xs / 2,
                            paddingVertical: tokens.spacing.xs,
                            paddingHorizontal: tokens.spacing.sm,
                            borderRadius: tokens.radius.full,
                            borderWidth: 1,
                            borderColor: isOn ? toneColor : colors.border,
                            backgroundColor: isOn ? toneColor : (0, color_1.withAlpha)(colors.onSurface, 0.04),
                        }, children: [isOn ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xs, color: onTone, fontWeight: '700' }, children: "\u2713" })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: isOn ? onTone : colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: isOn ? '700' : '500' }, children: tag.label }), tag.count != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: isOn ? onTone : colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: tag.count })) : null] }, tag.key));
                }), onClear && hasActive ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Clear filters", onPress: onClear, style: {
                        paddingVertical: tokens.spacing.xs,
                        paddingHorizontal: tokens.spacing.sm,
                        borderRadius: tokens.radius.full,
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.danger, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: "Clear" }) })) : null] }) }));
}
//# sourceMappingURL=TagFilterBar.js.map