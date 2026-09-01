"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityPickerV4 = AvailabilityPickerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const grid_v4_1 = require("./internal/grid-v4");
/**
 * **V4 availability picker** — same props as {@link AvailabilityPicker} plus
 * `locale` and `unavailableLabel`.
 *
 * ## Four changes
 *
 * 1. **Every chip clears 44.** The base sized them by padding alone, so a
 *    compact seed produced a grid of targets a thumb could miss — on the one
 *    control this component is.
 * 2. **A disabled slot cannot be pressed**, dims at M3's 0.38 and says why.
 *    The base greyed it and reported the press.
 * 3. **The times are localized and tabular**, so a grid of slots lines up and
 *    reads correctly outside en-US.
 * 4. **Multi-select announces itself.** With `multiple`, the chips are
 *    checkboxes rather than buttons, so a reader hears what selecting does.
 */
function AvailabilityPickerV4({ slots = [], value, multiple = false, columns = 3, locale, unavailableLabel = 'Unavailable', onSelect, loading = false, emptyLabel = 'No times available.', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const timeFmt = React.useMemo(() => new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit' }), [locale]);
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, style], children: Array.from({ length: 6 }, (_, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    height: tap,
                    flexBasis: `${100 / columns - 4}%`,
                    borderRadius: tokens.radius.md,
                    backgroundColor: (0, grid_v4_1.skeletonFill)(theme),
                } }, i))) }));
    }
    if (slots.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: [{ padding: tokens.spacing.md }, style], children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: emptyLabel }) }));
    }
    const chosen = Array.isArray(value) ? value : value ? [value] : [];
    const isChosen = (start) => chosen.some((d) => d.getTime() === start.getTime());
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: multiple ? 'list' : 'radiogroup', style: [{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, style], children: slots.map((slot) => {
            const selected = isChosen(slot.start);
            const blocked = slot.disabled === true;
            const label = slot.label ?? timeFmt.format(slot.start);
            const fill = selected ? colors.primary : colors.card;
            const ink = selected ? colors.onPrimary : colors.onCard;
            return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: multiple ? 'checkbox' : 'radio', accessibilityLabel: [label, blocked ? unavailableLabel : null]
                    .filter(Boolean)
                    .join(', '), accessibilityState: { selected, checked: selected, disabled: blocked }, disabled: blocked, onPress: () => onSelect?.(slot.start, slot), style: ({ pressed }) => ({
                    flexBasis: `${100 / columns - 4}%`,
                    minHeight: tap,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: tokens.radius.md,
                    borderWidth: 1,
                    borderColor: selected ? colors.primary : colors.border,
                    backgroundColor: pressed && !blocked ? (0, state_v4_1.pressOver)(theme, fill, ink) : fill,
                    paddingHorizontal: tokens.spacing.sm,
                    opacity: (0, chrome_v4_1.disabledOpacity)(theme.state, blocked),
                }), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", numeric: "tabular", style: { color: ink }, children: label }) }, slot.start.toISOString()));
        }) }));
}
//# sourceMappingURL=AvailabilityPickerV4.js.map