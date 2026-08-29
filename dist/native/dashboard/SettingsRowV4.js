"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsRowV4 = SettingsRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const row_v4_1 = require("./internal/row-v4");
/**
 * **V4 settings row** — the row family's short variant, the same object as
 * `ListRowV4` wearing a settings label.
 *
 * The base `SettingsRow` and the base `ListRow` were measurably different
 * components: `paddingHorizontal: spacing.lg` against `spacing.md`,
 * `minHeight: 48` against `minHeight: 56`, a `›` typed as a character against
 * no affordance at all, and `colors.muted` — a *fill* — used as the ink for
 * three separate runs of text. §4.3 calls that mismatch out by name as the
 * reason a settings list and a people list do not look related. Every one of
 * those decisions now comes from `internal/row-v4.ts`, so the two files cannot
 * drift again without the module moving underneath both.
 *
 * What changes:
 *
 * 1. **The metric is the family's.** `minHeight: 48` and the `lg` horizontal
 *    padding — both brief §1 violations — become {@link rowContainerStyle}.
 *    The padding drops to `md` because the row sits *inside* a card already
 *    inset by `lg`; paying the page gutter twice pushed every label into a
 *    narrow channel down the middle.
 *
 *    The height turns on the supporting line: 56 (`2xl + sm`) with a label
 *    alone, 72 (`2xl + lg`) with a `description`. §5's note sends a row with a
 *    leading slot to 72 as well; that is not adopted, because it would put a
 *    settings row wearing a badge at 72 next to a people row wearing an avatar
 *    at 56 — the family seam §4.3 exists to close. The 44 slot grows the row
 *    past 56 by itself; the metric is a floor, not a size.
 *
 * 2. **`›` becomes an `IconV4`.** A literal chevron character renders in
 *    whatever the platform's text face has for U+203A, at the text baseline,
 *    at whatever weight the font decided — brief §1.2 retires every one of
 *    them. And it now appears **only when the row navigates**: a row whose
 *    trailing slot is a switch gets the switch and no chevron.
 *
 * 3. **A leading slot.** Optional, so nothing existing changes, but present —
 *    the reference settings screens are a column of tinted badges beside their
 *    labels, and the base row could not draw one.
 *
 * 4. **`muted` stops being an ink.** Description and value are
 *    `tone="mutedText"`, the slot that carries an actual contrast promise.
 *
 * 5. **Press is the state layer.** `opacity: pressed ? 0.7 : 1` is deleted,
 *    not translated: {@link rowGround} returns `stateMix(card, onCard,
 *    'pressed')`, so the layer tints the container while the label stays at
 *    full strength instead of fading toward M3's disabled signal.
 *
 * The label keeps `weight="medium"` rather than the family's `semibold`, per
 * §5: a settings screen is a column of twenty labels and semibold across all
 * of them is a wall, where a people list has an avatar carrying the weight
 * instead.
 *
 * Renders `null` when there is nothing to show (§4.5) — no label, no
 * description, no value, no leading slot, no trailing control.
 */
function SettingsRowV4({ label, value, description, rightSlot, onPress, style, leading, icon, iconTone = 'primary', chevron, selected = false, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const navigates = onPress !== undefined;
    // A row that toggles takes the control, not the chevron (§4.3).
    const showChevron = chevron ?? (navigates && rightSlot == null);
    const supporting = description !== undefined && description !== '';
    const labelled = label.trim() !== '';
    const hasValue = value !== undefined && value !== '';
    const leadingNode = leading ??
        (icon !== undefined ? (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: icon, color: iconTone, badge: "soft", size: "base" }) : null);
    // §4.5: nothing to show, so show nothing — never a blank bordered box.
    if (!labelled && !supporting && !hasValue && leadingNode == null && rightSlot == null) {
        return null;
    }
    const container = (0, row_v4_1.rowContainerStyle)(theme, { twoLine: supporting });
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [leadingNode != null ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, row_v4_1.rowLeadingStyle)(theme), children: leadingNode }) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [labelled ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "medium", tone: "onSurface", numberOfLines: 1, children: label })) : null, supporting ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: description })) : null] }), hasValue || rightSlot != null || showChevron ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTrailingStyle)(theme), children: [hasValue ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: value })) : null, rightSlot, showChevron ? (
                    // `muted` and not `mutedText`: a chevron is a UI mark held to
                    // 1.4.11's 3:1, not a run of text — the reading `AccordionV4`
                    // already records for its disclosure mark.
                    (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "chevron-right", size: "base", color: "muted" })) : null] })) : null] }));
    if (!navigates) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: label, style: [container, { backgroundColor: (0, row_v4_1.rowGround)(theme, { selected }) }, style], children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, onPress: onPress, style: ({ pressed }) => [
            container,
            { backgroundColor: (0, row_v4_1.rowGround)(theme, { pressed, selected }) },
            style,
        ], children: inner }));
}
//# sourceMappingURL=SettingsRowV4.js.map