"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterChipsV4 = FilterChipsV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const BleedV4_1 = require("../layout/BleedV4");
const FlexV4_1 = require("../layout/FlexV4");
const ScrollAreaV4_1 = require("../layout/ScrollAreaV4");
const TextV4_1 = require("../primitives/TextV4");
const nav_v4_1 = require("../primitives/internal/nav-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const theme_1 = require("../theme");
function normalize(o) {
    return typeof o === 'string' ? { value: o, label: o } : o;
}
/**
 * **V4 filter chips** — a wrapping strip of single- or multi-select chips, on
 * the V4 design line. Same props as {@link FilterChips} plus `bleed`, and the
 * exact twin of the web `FilterChipsV4`.
 *
 * ## Chips wrap, and the last one is always reachable
 *
 * `ONBOARDING-DESIGN-SPEC.md` §7 governs this component and it opens with the
 * rule: **chips wrap**, `spacing.sm` gaps, never a horizontal scroll that
 * clips the last option, *because a user cannot choose what they cannot see*.
 * Wrapping is the default here exactly as it was in the base, and it is now
 * `FlexV4` doing it rather than a hand-rolled `flexWrap` — the web twin
 * composes `ClusterV4`, which has no native counterpart by design (see that
 * file), so this is the same shape said in the vocabulary the platform has.
 *
 * `scroll` survives because removing a prop is not additive, but it is no
 * longer allowed to clip: the scroller keeps a trailing pad, and the new
 * `bleed` prop pairs it with `BleedV4 edge="end"` so the strip runs to the
 * screen edge instead of stopping short of it (§5). The bleed's *vertical*
 * component is zeroed — a chip strip escapes one horizontal edge, and pulling
 * it up out of the screen's vertical rhythm as well would be a second,
 * unasked-for change.
 *
 * ## 44, not 48
 *
 * §5: *"Chips are control-shaped but not fields: they take min-height 44 (the
 * HIG floor, and the house §7 minimum) with `radius.full`, not the 48 field
 * metric."* The floor comes from {@link minTap} — `spacing['2xl'] -
 * spacing.xs`, composed from the scale rather than typed as `44` — the same
 * expression `ButtonV4` and every V4 tab already stand on. The base chip was
 * `paddingVertical: spacing.xs` around a 14pt label: about 22, half a target,
 * on a control whose entire job is to be tapped.
 *
 * ## Selected, unselected, and pressed
 *
 * Selected is `primary` fill with an `onPrimary` label at `semibold`;
 * unselected is a hairline `border` over the **card** ground. §4.2 is the
 * reason it is `card` and not `surface`: `colors.card` was split out precisely
 * so a raised element reads as raised on the warm page ground, and §5's note
 * for this component names `colors.card` explicitly. §7's older wording says
 * `surface`, which is what a chip was before the card slot existed — the brief
 * settles it, the same way its Addendum settles the 48/56 contradiction. The
 * label rides `onCard`, the slot whose contrast against `card` the compiler
 * actually guarantees.
 *
 * Press is the **state layer**, never `opacity: pressed ? 0.8 : 1` — which is
 * what the base carried, and which fades the *label*, the signal M3 spends on
 * *disabled*. {@link pressOver} composites the layer against the chip's own
 * fill and returns an opaque hex, because a chip's label carries a measured
 * contrast promise against that fill and a translucent layer would make the
 * promise depend on whatever happens to be behind the strip.
 *
 * ## Behaviour is untouched
 *
 * A chip is a toggle in both modes and the active one turns itself off,
 * clearing single-select to `''`. That is the base's documented contract and
 * V4 does not touch it — see {@link FilterChipsProps.onChange}.
 *
 * `options: []` renders **nothing at all** (§4.5): a filter row with no
 * filters is not an empty state worth explaining, and a bordered empty box is
 * the thing §4.5 rules out.
 */
function FilterChipsV4({ options, selected, onChange, multi = false, scroll = false, bleed, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const selectedList = Array.isArray(selected) ? selected : [selected];
    /*
      A chip is a toggle in both modes, and the active one turns itself off.
      Carried over from the base verbatim: single-select clears to `''` so the
      control can say "no filter" without an app having to invent a fake "All"
      option whose value is the empty string.
    */
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
            onChange(selectedList.includes(value) ? '' : value);
        }
    };
    // §4.5 — nothing to choose between is nothing to draw.
    if (options.length === 0)
        return null;
    // The HIG floor, composed from the spacing scale rather than typed as 44.
    const tapFloor = (0, nav_v4_1.minTap)(tokens.spacing);
    const pressedSelected = (0, state_v4_1.pressOver)(theme, colors.primary, colors.onPrimary);
    const pressedIdle = (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard);
    const chips = options.map(normalize).map((opt) => {
        const active = selectedList.includes(opt.value);
        const ground = active ? colors.primary : colors.card;
        const pressedGround = active ? pressedSelected : pressedIdle;
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: active }, accessibilityLabel: opt.label, onPress: () => toggle(opt.value), style: ({ pressed }) => ({
                minHeight: tapFloor,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: tokens.spacing.md,
                borderRadius: tokens.radius.full,
                // A hairline. `1` is the one width §1.1 lets a component name.
                borderWidth: 1,
                borderColor: active ? colors.primary : colors.border,
                backgroundColor: pressed ? pressedGround : ground,
            }), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: active ? 'semibold' : 'medium', tone: active ? 'onPrimary' : 'onCard', children: opt.label }) }, opt.value));
    });
    if (!scroll) {
        return ((0, jsx_runtime_1.jsx)(FlexV4_1.FlexV4, { direction: "row", wrap: true, gap: "sm", align: "center", style: style, children: chips }));
    }
    const strip = ((0, jsx_runtime_1.jsx)(ScrollAreaV4_1.ScrollAreaV4, { axis: "horizontal", padding: "none", showsHorizontalScrollIndicator: false, contentContainerStyle: {
            gap: tokens.spacing.sm,
            alignItems: 'center',
            // Even without a bleed the last chip keeps clear of the container's
            // edge; with one, the pad matches the gutter being escaped.
            paddingEnd: tokens.spacing[bleed ?? 'md'],
        }, style: style, children: chips }));
    if (bleed === undefined)
        return strip;
    return ((0, jsx_runtime_1.jsx)(BleedV4_1.BleedV4, { edge: "end", space: bleed, 
        // `BleedV4` always pays a vertical bleed as well; a chip strip escapes
        // one HORIZONTAL edge and must keep its place in the screen's vertical
        // rhythm. `0` is the absence of a margin, not a spacing decision.
        style: { marginVertical: 0 }, children: strip }));
}
//# sourceMappingURL=FilterChipsV4.js.map