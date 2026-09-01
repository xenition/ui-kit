"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IcebreakerChipV4 = IcebreakerChipV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const v4_depth_1 = require("../../primitives/internal/v4-depth");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
/** The tint behind a `soft` chip, composited once so it owns its ground. */
const SOFT_MIX = 0.12;
/** The tint behind a `solid` chip is not a tint — `solid` fills. */
const SELECTED_MARK = '✓';
/**
 * **V4 icebreaker chip** — the same props as {@link IcebreakerChip}, nothing
 * added.
 *
 * ## Four changes
 *
 * 1. **The chip is big enough to hit.** `sm` measured about 22px tall and `md`
 *    about 30 — and `ProfileCard` renders *every* interest chip at `sm`, so an
 *    entire profile's worth of tappable chips sat under half the minimum
 *    target. Both sizes now clear 44 through `minTap`, with the padding still
 *    doing the visual work.
 * 2. **`solid` is solid.** The base drew `solid` as a 20% tint and `soft` as a
 *    12% tint — two washes four points apart, which is not a difference a
 *    person can see, and neither of them is what "solid" means. `solid` now
 *    fills `primary` and inks it `onPrimary`; `soft` is the tint, opaque.
 * 3. **Brand ink on a tint is the corrected slot.** A `soft` chip drew its
 *    label in `colors.primary` — the fill token — over a 12% wash of itself.
 *    That is the lowest-contrast pairing in the palette. It is `primaryText`
 *    now, which is the slot the compiler measured for exactly this.
 * 4. **Selection is a mark, not a colour.** The base expressed `selected`
 *    purely as a background flip; it now carries a check glyph as well, so it
 *    survives greyscale and CVD (§ "nothing is carried by colour alone").
 *    Press is a state layer over the chip's own ground rather than `opacity`,
 *    and disabled is M3's 0.38 rather than the base's 0.5.
 */
function IcebreakerChipV4({ label, value, selected = false, disabled = false, variant = 'soft', size = 'md', glyph, onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const padV = size === 'sm' ? tokens.spacing.xs : tokens.spacing.sm;
    const padH = size === 'sm' ? tokens.spacing.sm : tokens.spacing.md;
    const textSize = size === 'sm' ? 'xs' : 'sm';
    let ground;
    let ink;
    let borderColor = 'transparent';
    let borderWidth = 0;
    if (selected || variant === 'solid') {
        ground = colors.primary;
        ink = colors.onPrimary;
    }
    else if (variant === 'soft') {
        // Composited, not `withAlpha`: the same chip sits on a card, on a photo
        // scrim and on the page, and a translucent tint is a different colour on
        // each of the three while its label promises contrast against only one.
        ground = (0, v4_depth_1.mixToken)(colors.card, colors.primary, SOFT_MIX);
        ink = colors.primaryText;
    }
    else {
        ground = colors.card;
        ink = colors.onCard;
        borderWidth = 1;
        borderColor = colors.border;
    }
    const body = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                alignSelf: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: tokens.spacing.xs,
                minHeight: (0, chrome_v4_1.minTap)(tokens.spacing),
                backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, ground, ink) : ground,
                borderColor,
                borderWidth,
                borderRadius: tokens.radius.full,
                paddingVertical: padV,
                paddingHorizontal: padH,
                opacity: (0, chrome_v4_1.disabledOpacity)(theme.state, disabled),
            },
            style,
        ], children: [selected ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: textSize, weight: "bold", style: { color: ink }, children: SELECTED_MARK })) : null, glyph ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: textSize, allowFontScaling: false, children: glyph })) : null, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: textSize, weight: "semibold", style: { color: ink }, children: label })] }));
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected, disabled }, accessibilityLabel: label, disabled: disabled, onPress: () => onPress?.(value ?? label), style: { alignSelf: 'flex-start' }, children: ({ pressed }) => body(pressed) }));
}
//# sourceMappingURL=IcebreakerChipV4.js.map