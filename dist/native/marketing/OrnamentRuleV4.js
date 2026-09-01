"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrnamentRuleV4 = OrnamentRuleV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
/**
 * OrnamentRule — **V4** "showcase" design (native mirror of the web V4).
 *
 * Same technique as the native base: a 1px rule flanking an optional centered
 * `diamond`/`dot`/`line`/`none` ornament — React Native has no CSS gradient
 * here, so each rule half is a **solid low-opacity token fill** (the tint
 * always originates from a theme token, never a literal). The V4 *refines* the
 * look: a slightly stronger, cleaner rule tint that fades toward the outer
 * edges via two stacked segments (approximating the web's fuller gradient), and
 * a crisper ornament sitting on a faint token halo pad for a sharper read.
 *
 * Every `ornament` shape and `tone` value is honored exactly. Purely
 * decorative and **static** — no motion, nothing to reduce. Token-only colors.
 */
function OrnamentRuleV4({ ornament = 'diamond', tone = 'accent', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const toneColor = tone === 'accent'
        ? tokens.ramps.accent[400]
        : tone === 'primary'
            ? tokens.ramps.primary[400]
            : colors.border;
    // Two-segment rule: a stronger inner tint fading to a fainter outer one —
    // a token-only approximation of the web V4's fuller three-stop gradient.
    const ruleInner = (0, color_1.withAlpha)(toneColor, 0.5);
    const ruleOuter = (0, color_1.withAlpha)(toneColor, 0.12);
    const shape = ornament;
    const ornamentStyle = shape === 'none'
        ? null
        : shape === 'diamond'
            ? { width: 7, height: 7, transform: [{ rotate: '45deg' }] }
            : shape === 'dot'
                ? { width: 6, height: 6, borderRadius: 9999 }
                : { width: 24, height: 1 };
    const rule = (side) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, height: 1, flexDirection: 'row' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, backgroundColor: side === 'left' ? ruleOuter : ruleInner } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, backgroundColor: side === 'left' ? ruleInner : ruleOuter } })] }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-ornament-rule-v4", accessibilityRole: "none", style: [
            { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
            style,
        ], children: [rule('left'), ornamentStyle ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginHorizontal: tokens.spacing.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            position: 'absolute',
                            width: 14,
                            height: 14,
                            borderRadius: 9999,
                            backgroundColor: (0, color_1.withAlpha)(toneColor, 0.16),
                        } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { backgroundColor: toneColor, ...ornamentStyle } })] })) : null, rule('right')] }));
}
//# sourceMappingURL=OrnamentRuleV4.js.map