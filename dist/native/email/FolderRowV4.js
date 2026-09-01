"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolderRowV4 = FolderRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const mail_v4_1 = require("./internal/mail-v4");
/** Above this the badge shows `999+` rather than a number nobody reads. */
const COUNT_CAP = 999;
/**
 * **V4 folder row** — same props as {@link FolderRow} plus `formatCount`.
 *
 * ## Four changes
 *
 * 1. **It stops asserting "unread".** The base announced `` `${name}, ${count}
 *    unread` `` for a prop its own doc defines as an "unread / item count", so
 *    "Drafts, 3 unread" was wrong in every folder where the number is a count
 *    of items. `formatCount` names the unit and defaults to `'3 items'`.
 * 2. **Selected and pressed are different colours.** The base drew pressed as
 *    `colors.border` — a hairline token as a fill — so a finger held on Inbox
 *    made it look like the folder you were already in. Both grounds come from
 *    the shared row line now.
 * 3. **The label and count are their ground's guaranteed pair.** `selected`
 *    inked the name with `colors.primary`, a fill slot with no contrast
 *    promise as text, over a tint nobody measured; and the count pill mixed
 *    `withAlpha(colors.onSurface, 0.1)` by hand. The count is a `BadgeV4`,
 *    which owns its ground and re-measures its own ink.
 * 4. **The row clears 44** and joins the row family's one height and rhythm.
 */
function FolderRowV4({ name, glyph, count = 0, selected = false, depth = 0, formatCount = (n) => `${n} items`, onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    if (!name)
        return null;
    const indent = Math.max(0, depth) * tokens.spacing.lg;
    const ink = selected ? 'onSelected' : 'onSurface';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: (0, mail_v4_1.spokenLine)([name, count > 0 ? formatCount(count) : null]), accessibilityState: { selected }, onPress: onPress, style: ({ pressed }) => [
            (0, row_v4_1.rowContainerStyle)(theme),
            {
                paddingLeft: tokens.spacing.md + indent,
                borderRadius: tokens.radius.md,
                backgroundColor: (0, row_v4_1.rowGround)(theme, { pressed, selected }),
            },
            style,
        ], children: [glyph ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, row_v4_1.rowLeadingStyle)(theme), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: glyph, size: "base", color: selected ? 'onSelected' : 'mutedText' }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: selected ? 'bold' : 'medium', tone: ink, numberOfLines: 1, children: name }) }), count > 0 ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: selected ? 'primary' : 'neutral', variant: "soft", size: "sm", count: count, max: COUNT_CAP })) : null] }));
}
//# sourceMappingURL=FolderRowV4.js.map