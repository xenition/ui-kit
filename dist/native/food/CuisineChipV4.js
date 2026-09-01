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
exports.CuisineChipV4 = CuisineChipV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const menu_v4_1 = require("./internal/menu-v4");
/**
 * **V4 cuisine chip** — same props as {@link CuisineChip} plus
 * `defaultSelected`.
 *
 * ## Four changes
 *
 * 1. **It works uncontrolled.** A toggle with no internal state and a
 *    `selected` default of `false` is a filter that can never be applied:
 *    dropped in as `<CuisineChip label="Thai" onPress={…} />` it stayed
 *    unselected however many times it was tapped. `defaultSelected` gives the
 *    state somewhere to live; passing `selected` still drives it from outside.
 * 2. **The chip clears 44.** It was 24–30 tall depending on `size`, which is a
 *    filter rail that is hard to hit and easy to hit wrongly.
 * 3. **It is a toggle button, and both twins say so.** The base announced
 *    `accessibilityState.selected` while its own doc called the chip
 *    "radio-like" and the web twin used `aria-pressed`. It is a toggle: one
 *    chip's state says nothing about its neighbours'. `selected` is the native
 *    spelling of `aria-pressed`, and the doc no longer claims otherwise.
 * 4. **Disabled means the handler does not fire**, at M3's 0.38 band rather
 *    than a hand-picked 0.5 — and press is a state layer, so a pressed chip
 *    stops reading as an unavailable one.
 *
 * **Renders nothing without a `label`.**
 */
function CuisineChipV4({ label, glyph, selected, defaultSelected = false, onPress, disabled = false, size = 'md', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    // `undefined` is the only signal that means "you hold it".
    const controlled = selected !== undefined;
    const [held, setHeld] = React.useState(defaultSelected);
    const isSelected = controlled ? selected === true : held;
    if (!label)
        return null;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const fontSize = size === 'sm' ? 'xs' : 'sm';
    const padH = size === 'sm' ? tokens.spacing.sm : tokens.spacing.md;
    const ground = isSelected ? colors.primary : colors.card;
    const ink = isSelected ? (0, menu_v4_1.onPair)(theme, 'primary') : colors.onCard;
    const chipStyle = (pressed) => ({
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: tokens.spacing.xs,
        // A chip a thumb has to hit in a scrolling rail, not a label.
        minHeight: tap,
        paddingVertical: tokens.spacing.xs,
        paddingHorizontal: padH,
        borderRadius: tokens.radius.full,
        borderWidth: 1,
        borderColor: isSelected ? colors.primary : colors.border,
        backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, ground, ink) : ground,
        opacity: (0, chrome_v4_1.disabledOpacity)(theme.state, disabled),
    });
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [glyph ? (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: glyph, size: "xs", style: { color: ink } }) : null, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: fontSize, weight: "semibold", style: { color: ink }, children: label })] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: label, style: [chipStyle(false), style], children: inner }));
    }
    const press = () => {
        if (!controlled)
            setHeld((value) => !value);
        onPress();
    };
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, accessibilityState: { selected: isSelected, disabled }, disabled: disabled, onPress: disabled ? undefined : press, style: ({ pressed }) => [chipStyle(pressed), style], children: inner }));
}
//# sourceMappingURL=CuisineChipV4.js.map