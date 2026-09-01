"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnoozeRowV4 = SnoozeRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const mail_v4_1 = require("./internal/mail-v4");
/**
 * **V4 snooze preset row** — the same props as {@link SnoozeRow}. Nothing to
 * add: everything wrong with this row was in how it was drawn, not in what it
 * could be told.
 *
 * ## Four changes
 *
 * 1. **Selected and pressed stopped being the same thing.** The base drew
 *    pressed as `colors.border` — a hairline token used as a fill — and
 *    selected as a hand-mixed 12% wash of `primary`. Both now come from the
 *    shared row line: `selected` is `colors.selected`, and a press composites
 *    M3's layer into whichever ground the row is already on, so holding a
 *    finger on an unselected preset never makes it look chosen.
 * 2. **The text on a selected row is that ground's guaranteed pair.** The base
 *    kept `onSurface` over a tint nobody measured it against.
 * 3. **It is a row from the row family**, so a snooze sheet, a settings screen
 *    and a notification list are one object at one height with one rhythm.
 * 4. **The check mark is decorative on both twins.** It was already hidden
 *    here and was a reader stop on the web; the pair of native flags is now
 *    the full `no-hide-descendants` spelling the rest of the V4 line uses.
 */
function SnoozeRowV4({ label, when, glyph = '⏰', selected = false, onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    // On the selected ground the only ink with a promise is its own pair.
    const ink = selected ? 'onSelected' : 'onSurface';
    const meta = selected ? 'onSelected' : 'mutedText';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: (0, mail_v4_1.spokenLine)([`Snooze ${label}`, when]), accessibilityState: { selected }, onPress: onPress, style: ({ pressed }) => [
            (0, row_v4_1.rowContainerStyle)(theme),
            {
                borderRadius: tokens.radius.md,
                backgroundColor: (0, row_v4_1.rowGround)(theme, { pressed, selected }),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, row_v4_1.rowLeadingStyle)(theme), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: glyph, size: "lg", color: meta }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: selected ? 'bold' : 'medium', tone: ink, numberOfLines: 1, children: label }) }), when ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: meta, numeric: "tabular", children: when })) : null, selected ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\u2713", size: "base", color: ink }) })) : null] }));
}
//# sourceMappingURL=SnoozeRowV4.js.map