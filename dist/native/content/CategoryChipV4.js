"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryChipV4 = CategoryChipV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const reading_v4_1 = require("./internal/reading-v4");
/**
 * **V4 category chip** — same props as {@link CategoryChip} plus
 * `formatLabel`.
 *
 * ## Five changes
 *
 * 1. **The `soft` chip gets a ground of its own.** It was painted `surface` —
 *    and an `ArticleCard` renders it inside a `Card`, which is also `surface`.
 *    The chip was exactly the colour of the thing it sat on, so there was no
 *    chip. It now takes `card`, the token the theme added for a raised
 *    surface.
 * 2. **`accent` as ink becomes `accentText`.** That pairing was measured at
 *    1.32:1 and corrected in `Tag` some time ago; this component never got the
 *    correction, and it is the smallest type in the module.
 * 3. **`active` is not colour alone.** A one-pixel accent ring was the whole
 *    signal on a filter control. The active chip now takes weight as well, and
 *    both twins draw the ring on every variant rather than this one drawing it
 *    on `solid` and the web twin skipping it.
 * 4. **It announces as a toggle**, with the selected state on both platforms
 *    rather than a name that says "Category Sport" and stops.
 * 5. **A pressable chip clears 44 and presses as a state layer**, not
 *    `opacity: 0.7` — which, on a chip whose entire content is one small word,
 *    reads as unavailable.
 *
 * **Renders nothing without a label** (§4.5).
 */
function CategoryChipV4({ label, variant = 'solid', onPress, active = false, formatLabel = (value) => `Category ${value}`, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!label)
        return null;
    // `card`, not `surface`: the soft chip is drawn on a card and has to differ
    // from it. `onPair` is not reached for here because only `solid` is a fill.
    const ground = {
        solid: colors.accent,
        soft: colors.card,
        outline: 'transparent',
    };
    const ink = {
        solid: colors.onAccent,
        soft: (0, reading_v4_1.toneInk)(theme, 'accent'),
        outline: (0, reading_v4_1.toneInk)(theme, 'accent'),
    };
    const fill = ground[variant];
    // A transparent chip still needs something to mix the layer into; the page
    // is what is behind it.
    const layerGround = fill === 'transparent' ? colors.surface : fill;
    const chip = (pressed) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                alignSelf: 'flex-start',
                borderRadius: tokens.radius.sm,
                paddingVertical: tokens.spacing.xs,
                paddingHorizontal: tokens.spacing.sm,
                backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, layerGround, ink[variant]) : fill,
                borderWidth: variant === 'outline' || active ? 1 : 0,
                borderColor: active ? colors.accent : colors.border,
            },
            style,
        ], children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", 
            // Weight, not only the ring — a filter's chosen state has to survive
            // greyscale and CVD.
            weight: active ? 'bold' : 'semibold', style: { color: ink[variant], textTransform: 'uppercase' }, children: label }) }));
    if (!onPress)
        return chip(false);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: formatLabel(label), accessibilityState: { selected: active }, onPress: onPress, style: {
            alignSelf: 'flex-start',
            justifyContent: 'center',
            minHeight: (0, chrome_v4_1.minTap)(tokens.spacing),
        }, children: ({ pressed }) => chip(pressed) }));
}
//# sourceMappingURL=CategoryChipV4.js.map