"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagFilterBarV4 = TagFilterBarV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const crm_v4_1 = require("./internal/crm-v4");
/**
 * **V4 tag filter bar** — same props as {@link TagFilterBar} plus
 * `formatFilterLabel`.
 *
 * ## Six changes
 *
 * 1. **A selected chip is readable.** Native filled with `colors[tone]` and
 *    inked with `colors.onSurface` for every tone but `primary` and `accent` —
 *    body ink on a saturated brand fill, with no contrast promise at all. And
 *    `neutral` filled the chip with `colors.muted`, a **text** token. Both go
 *    through `toneFill` / `toneOnOf`, so every fill wears its own paired ink.
 *    The web twin was already correct here; the same prop was unreadable on
 *    one platform only.
 * 2. **The idle chip's ground is opaque.** It was a 4% wash of `onSurface`,
 *    so the chip's rendered colour depended on whatever the bar was sitting
 *    over.
 * 3. **Chips clear 44**, which a 8px-padded pill did not.
 * 4. **Clear is a real button.** Red text alone is a colour-only affordance
 *    with no target; it gains a ground, a border and a full-height box.
 * 5. **The count joins the chip's name.** It was rendered on screen and never
 *    announced.
 * 6. **Selection is announced once.** The base said `accessibilityState`
 *    *and* appended ", selected" to the label, so a reader said it twice.
 *    Plus rule B.
 */
function TagFilterBarV4({ tags, selected, onToggle, onClear, tone = 'primary', emptyLabel = 'No filters', formatFilterLabel, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const fill = (0, crm_v4_1.toneFill)(theme, tone);
    const onFill = (0, crm_v4_1.toneOnOf)(theme, tone);
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const hasActive = selected.length > 0;
    const chipLabel = formatFilterLabel ?? ((label, count) => count == null ? label : `${label}, ${count}`);
    if (tags.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: [{ paddingVertical: tokens.spacing.sm }, style], children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: emptyLabel }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, style: style, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xs, alignItems: 'center' }, children: [tags.map((tag) => {
                    const isOn = selected.includes(tag.key);
                    const ground = isOn ? fill : colors.card;
                    const ink = isOn ? onFill : colors.onCard;
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", 
                        // Announced once, by the state — not also spelled into the name.
                        accessibilityState: { selected: isOn }, accessibilityLabel: `Filter ${chipLabel(tag.label, tag.count)}`, onPress: () => onToggle(tag.key), style: ({ pressed }) => ({
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: tokens.spacing.xs / 2,
                            minHeight: tap,
                            paddingVertical: tokens.spacing.xs,
                            paddingHorizontal: tokens.spacing.md,
                            borderRadius: tokens.radius.full,
                            borderWidth: 1,
                            borderColor: isOn ? fill : colors.border,
                            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, ground, ink) : ground,
                        }), children: [isOn ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "bold", style: { color: ink }, children: "\u2713" })) : null, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: isOn ? 'bold' : 'medium', style: { color: ink }, children: tag.label }), tag.count != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", style: { color: ink }, children: `${tag.count}` })) : null] }, tag.key));
                }), onClear && hasActive ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Clear filters", onPress: onClear, style: ({ pressed }) => ({
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: tap,
                        paddingVertical: tokens.spacing.xs,
                        paddingHorizontal: tokens.spacing.md,
                        borderRadius: tokens.radius.full,
                        borderWidth: 1,
                        borderColor: colors.border,
                        backgroundColor: pressed
                            ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard)
                            : colors.card,
                    }), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "dangerText", children: "Clear" }) })) : null] }) }));
}
//# sourceMappingURL=TagFilterBarV4.js.map