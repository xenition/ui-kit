"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaySegment = DaySegment;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * DaySegment — a segmented pill selector (Today / Tomorrow / Next 7 days). Sits
 * on the page ground (not the gradient): a bordered, fully-rounded track holding
 * equal-width pills; the active pill fills with `primary` and its label flips to
 * `onPrimary`, the rest stay muted. All colors/sizes come from the compiled theme
 * tokens — no literal color (the unselected pill simply omits its background).
 */
function DaySegment({ options, selectedIndex, onSelect, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "tablist", style: [
            {
                flexDirection: 'row',
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.full,
                padding: 4,
            },
            style,
        ], children: options.map((option, index) => {
            const selected = index === selectedIndex;
            return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "tab", accessibilityState: { selected }, accessibilityLabel: option, onPress: () => onSelect(index), style: ({ pressed }) => ({
                    flex: 1,
                    paddingVertical: tokens.spacing.sm,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    backgroundColor: selected ? colors.primary : undefined,
                    opacity: pressed ? 0.85 : 1,
                }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                        color: selected ? colors.onPrimary : colors.onSurface,
                        fontSize: tokens.typography.scale.sm,
                        fontWeight: selected ? '800' : '600',
                    }, children: option }) }, `${option}-${index}`));
        }) }));
}
//# sourceMappingURL=DaySegment.js.map