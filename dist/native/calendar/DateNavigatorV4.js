"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateNavigatorV4 = DateNavigatorV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const ButtonV4_1 = require("../primitives/ButtonV4");
const IconV4_1 = require("../primitives/IconV4");
const SegmentedV4_1 = require("../primitives/SegmentedV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const VIEW_LABEL = {
    month: 'Month',
    week: 'Week',
    day: 'Day',
};
/**
 * **V4 date navigator** — same props as {@link DateNavigator} plus four copy
 * hooks.
 *
 * ## Four changes
 *
 * 1. **The chevrons clear 44 and carry names.** They were glyph-sized
 *    pressables with no accessible label — on the control a user hits most in
 *    a calendar.
 * 2. **The title is a heading**, so a screen reader can jump to it, and it is
 *    announced with the view it belongs to.
 * 3. **The view switcher is `SegmentedV4`**, not three hand-rolled buttons, so
 *    it matches every other segmented control in the product and reports
 *    itself as a group.
 * 4. **Press is a state layer**, not an opacity on the glyph.
 */
function DateNavigatorV4({ title, onPrev, onNext, onToday, view, onViewChange, views = ['month', 'week', 'day'], previousLabel, nextLabel, todayLabel = 'Today', viewLabels, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const unit = view ?? 'month';
    const chevron = (direction) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: direction < 0
            ? (previousLabel ?? `Previous ${unit}`)
            : (nextLabel ?? `Next ${unit}`), onPress: direction < 0 ? onPrev : onNext, style: ({ pressed }) => ({
            width: tap,
            height: tap,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.full,
            backgroundColor: pressed ? (0, state_v4_1.pressFill)(theme) : 'transparent',
        }), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: direction < 0 ? 'chevron-left' : 'chevron-right', size: "lg", color: "onSurface" }) }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm },
            style,
        ], children: [onPrev ? chevron(-1) : null, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { accessibilityRole: "header", face: "heading", size: "base", weight: "bold", tone: "onSurface", numberOfLines: 1, style: { flex: 1 }, children: title }), onNext ? chevron(1) : null, onToday ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "secondary", size: "sm", onPress: onToday, accessibilityLabel: todayLabel, children: todayLabel })) : null, onViewChange && views.length > 1 ? ((0, jsx_runtime_1.jsx)(SegmentedV4_1.SegmentedV4, { options: views.map((v) => ({ label: viewLabels?.[v] ?? VIEW_LABEL[v], value: v })), value: view ?? views[0], onChange: (v) => onViewChange(v) })) : null] }));
}
//# sourceMappingURL=DateNavigatorV4.js.map