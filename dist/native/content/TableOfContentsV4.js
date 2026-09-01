"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableOfContentsV4 = TableOfContentsV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const reading_v4_1 = require("./internal/reading-v4");
/** Per-nesting-level indent, off the spacing scale (guards a missing `level`). */
function indentFor(level, unit) {
    return Math.max(0, (level ?? 1) - 1) * unit;
}
/**
 * **V4 table of contents** — same props as {@link TableOfContents} plus
 * `navLabel`.
 *
 * ## Six changes
 *
 * 1. **A read-only contents list is a list of headings.** `onSelect` is
 *    optional, and both twins passed `disabled={!onSelect}` — so the ordinary
 *    case, a TOC rendered for reading, turned every heading into a disabled
 *    button: greyed, out of the tab order, announced "unavailable". Without
 *    `onSelect` the rows are now plain text.
 * 2. **It is not a menu.** This twin said `menu` / `menuitem`, which promises a
 *    popup widget with menu keyboard semantics that nothing here implements,
 *    while the web twin used a navigation landmark. Both now describe the same
 *    object: a named list of headings.
 * 3. **The indent comes from the spacing scale on both twins.** The web twin
 *    multiplied depth by a hard-coded 16.
 * 4. **The current heading is not marked by colour alone.** It takes weight as
 *    well as `accentText`, and announces as selected.
 * 5. **A selectable row clears 44** and presses as a state layer rather than
 *    `opacity: 0.6`.
 * 6. **`navLabel` names the list when `title` is hidden**, instead of the
 *    fallback being a hard-coded `'Contents'` nobody could change.
 */
function TableOfContentsV4({ items, activeId, onSelect, title = 'Contents', emptyLabel = 'No sections', navLabel = 'Contents', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const row = (id, label, level, active) => {
        const text = ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", 
            // Weight as well as colour: a highlight nobody can see in greyscale is
            // not a highlight.
            weight: active ? 'bold' : 'regular', numberOfLines: 2, style: { color: active ? (0, reading_v4_1.toneInk)(theme, 'accent') : colors.onSurface }, children: label }));
        const indent = indentFor(level, tokens.spacing.md);
        // No handler, no button. A heading a reader cannot jump to is still a
        // heading, not a broken control.
        if (!onSelect) {
            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "text", accessibilityLabel: label, accessibilityState: { selected: active }, style: { paddingVertical: tokens.spacing.xs, paddingLeft: indent }, children: text }, id));
        }
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, accessibilityState: { selected: active }, onPress: () => onSelect(id), style: ({ pressed }) => ({
                justifyContent: 'center',
                minHeight: tap,
                paddingVertical: tokens.spacing.xs,
                paddingLeft: indent,
                borderRadius: tokens.radius.sm,
                backgroundColor: pressed ? (0, state_v4_1.pressFill)(theme) : 'transparent',
            }), children: text }, id));
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "list", accessibilityLabel: typeof title === 'string' ? title : navLabel, style: [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.md,
                gap: tokens.spacing.xs,
            },
            style,
        ], children: [title != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "bold", tone: "mutedText", style: { textTransform: 'uppercase', marginBottom: tokens.spacing.xs }, children: title })) : null, items.length === 0 ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: emptyLabel })) : (items.map((item) => row(item.id, item.label, item.level, item.id === activeId)))] }));
}
//# sourceMappingURL=TableOfContentsV4.js.map