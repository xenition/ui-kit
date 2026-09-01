"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelBarV4 = LevelBarV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const arcade_v4_1 = require("./internal/arcade-v4");
const types_1 = require("./types");
/**
 * **V4 level bar** — the same props as {@link LevelBar}.
 *
 * ## Four changes
 *
 * 1. **The XP fraction is actually announced.** The base's docstring says "the
 *    bar carries an `accessibilityValue` so the fraction is announced" — and
 *    it does not. The `Progress` primitive supplies the value correctly, and
 *    then the wrapping `View` sets `accessible` with its own label, which
 *    collapses the subtree and drops the `progressbar` with it. A reader heard
 *    "Level 7, 40% to next level" and could never reach the meter. The bar is
 *    now the labelled `progressbar` itself, so the level, the XP and the value
 *    arrive together, in one stop, from the element that owns them.
 * 2. **`warn` means `warn`.** The base `Progress` routes a `warn` bar to the
 *    `accent` token — a brand colour standing in for a semantic one — with the
 *    comment that there is no warning slot. There is one, and the tone table
 *    hands it over.
 * 3. **The track is an opaque placeholder, not the `border` hairline used as a
 *    fill.** A rule between rows and the unfilled half of a meter are not the
 *    same object and should not share a token.
 * 4. **The readout is drawn, not read twice.** `12.3K / 20K XP` and `62%` sat
 *    beside a bar that says the same thing, as two more stops; they are hidden
 *    from the reader and the numerals are tabular so the percentage does not
 *    jitter as it climbs. The chip and the bar's geometry come off the spacing
 *    scale.
 */
function LevelBarV4({ level, xp, xpMax, variant = 'default', tone = 'primary', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const compact = variant === 'compact';
    const max = Number.isFinite(xpMax) && xpMax > 0 ? xpMax : 0;
    const value = max > 0 ? (0, types_1.clamp)(xp, 0, max) : 0;
    const pct = max > 0 ? Math.round((value / max) * 100) : 0;
    const chip = compact ? tokens.spacing.xl : (0, chrome_v4_1.minTap)(tokens.spacing) - tokens.spacing.xs;
    const xpLine = `${(0, types_1.formatCount)(value)} / ${(0, types_1.formatCount)(max)} XP`;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                    width: chip,
                    height: chip,
                    borderRadius: chip / 2,
                    backgroundColor: colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "bold", tone: "onPrimary", numeric: "tabular", children: String(level) }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityLabel: (0, arcade_v4_1.spokenLine)([`Level ${level}`, xpLine]), accessibilityValue: { min: 0, max: max || 1, now: value }, style: {
                            height: compact ? tokens.spacing.xs : tokens.spacing.sm,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, arcade_v4_1.placeholderGround)(theme),
                            overflow: 'hidden',
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: `${pct}%`,
                                height: '100%',
                                borderRadius: tokens.radius.full,
                                backgroundColor: (0, arcade_v4_1.toneFill)(theme, tone),
                            } }) }), !compact ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: xpLine }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "mutedText", numeric: "tabular", children: `${pct}%` })] })) : null] })] }));
}
//# sourceMappingURL=LevelBarV4.js.map