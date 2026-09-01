"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentRowV4 = EquipmentRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const job_v4_1 = require("./internal/job-v4");
const STATUS_META = {
    operational: { label: 'Operational', glyph: '✓', tone: 'success' },
    maintenance: { label: 'Maintenance', glyph: '⚙', tone: 'warn' },
    down: { label: 'Down', glyph: '✕', tone: 'danger' },
    retired: { label: 'Retired', glyph: '⏻', tone: 'neutral' },
};
/**
 * **V4 equipment row** — same props as {@link EquipmentRow} plus
 * `statusLabels`.
 *
 * ## Four changes
 *
 * 1. **The row announces where the asset is and when it is next due.** Its
 *    name was `"${name}, ${tag}, ${status}"`, which replaces the subtree — so
 *    the location and the service date the row draws were spoken to nobody.
 * 2. **The row is a row from the shared row line**, with a leading slot that
 *    clears 44 and a press that is a state layer rather than `opacity: 0.7` —
 *    0.38 is M3's *disabled* band, so a pressed row read as a dead one.
 * 3. **The badge is the module's one shape** — this twin passed `soft`/`sm`
 *    while the web twin took `Badge`'s `solid`/`md` at all sixteen call sites
 *    in the module.
 * 4. **The caller's `style` lands on the root**, the element the web twin puts
 *    it on.
 *
 * **Renders nothing without a `name`.**
 */
function EquipmentRowV4({ name, assetTag, status, glyph = '🚜', nextService, location, statusLabels, onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    if (!name)
        return null;
    const meta = STATUS_META[status] ?? STATUS_META.operational;
    const statusWord = statusLabels?.[status] ?? meta.label;
    const service = nextService != null ? `Service ${nextService}` : null;
    const caption = (0, tone_v4_1.metaLine)([assetTag, location, service]);
    const spoken = (0, job_v4_1.spokenLine)([name, assetTag, statusWord, location, service]);
    const content = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: [
                    (0, row_v4_1.rowLeadingStyle)(theme),
                    { borderRadius: tokens.radius.md, backgroundColor: (0, job_v4_1.discGround)(theme, meta.tone) },
                ], children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onCard", numberOfLines: 1, children: name }), caption !== '' ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: caption })) : null] }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, ...job_v4_1.BADGE_V4, children: `${meta.glyph} ${statusWord}` })] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, style: [(0, row_v4_1.rowContainerStyle)(theme, { twoLine: caption !== '' }), style], children: content }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spoken, onPress: onPress, style: [{ borderRadius: tokens.radius.md }, style], children: ({ pressed }) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
                (0, row_v4_1.rowContainerStyle)(theme, { twoLine: caption !== '' }),
                { borderRadius: tokens.radius.md, backgroundColor: (0, row_v4_1.rowGround)(theme, { pressed }) },
            ], children: content })) }));
}
//# sourceMappingURL=EquipmentRowV4.js.map