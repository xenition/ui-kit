"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableV4 = TableV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const v4_depth_1 = require("../../primitives/internal/v4-depth");
const v4_data_1 = require("../../primitives/internal/v4-data");
/**
 * Guiding two-line empty state (design.md §15): a title plus a hint on what
 * makes rows appear, instead of a bare "No data".
 */
function DefaultEmptyState() {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '600',
                    textAlign: 'center',
                }, children: "Nothing here yet" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs, textAlign: 'center' }, children: "Rows will appear once data is added." })] }));
}
/** The fallback cell text — the only path the component is allowed to read. */
function cellText(row, col) {
    return String(row[col.key] ?? '');
}
/**
 * **V4 table** — same props as {@link Table}, a different design line.
 *
 * The base table draws a border under every row. That is the reflex §9 warns
 * about: a rule per row costs a line of ink for every item and buys nothing
 * the eye was not already getting from a steady baseline, and on a
 * twenty-row table it turns the data into a grid the reader has to look
 * *through*. A table that reads faster is the premium version — not a table
 * with more chrome on it.
 *
 * Four changes, all of them about scanning (§33):
 *
 * 1. **One rule, not `n` rules.** The single horizontal line left is the one
 *    that means something: labels above it, data below it. Row separation
 *    becomes a steady row height plus an optional zebra band — spacing as
 *    structure (§9), not borders everywhere.
 * 2. **A zebra that survives dark mode.** The band is mixed from `surface`
 *    toward `onSurface`, both of which the provider has already resolved for
 *    the active scheme, so it darkens a light page and lightens a dark one
 *    with no branch. `tokens.ramps` would have been the obvious reach and the
 *    wrong one — it carries the LIGHT orientation in both schemes, so
 *    `ramps.neutral[50]` paints a near-white band across a dark table.
 * 3. **Numerals line up.** A column whose fallback text is entirely quantities
 *    is right-aligned and set in tabular figures, header included. A column of
 *    numbers whose decimal points do not line up cannot be compared by eye,
 *    and that comparison is why the column is on screen. Nothing was added to
 *    the props to say so: alignment is a fact about the data, and a column
 *    with a custom `render` opts out by construction.
 * 4. **A steady baseline.** Every row takes the same minimum height and
 *    centres its cells in it, so the eye tracks across a row and down a column
 *    without re-finding the line each time.
 *
 * **No depth anywhere in the body.** Depth marks a layer, not a row — a table
 * whose rows each cast a shadow is the "cards inside cards inside cards" §8
 * bans, wearing a different hat. The container keeps its hairline because a
 * table genuinely is one object (§11); the rows inside it are not eleven more.
 */
function TableV4({ columns, rows, getRowKey, empty = (0, jsx_runtime_1.jsx)(DefaultEmptyState, {}), style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    // Alignment is derived from the rows on screen, once per render.
    const numeric = React.useMemo(() => {
        const set = new Set();
        columns.forEach((c) => {
            if (c.render)
                return;
            if ((0, v4_data_1.isNumericColumn)(rows.map((r) => cellText(r, c))))
                set.add(c.key);
        });
        return set;
    }, [columns, rows]);
    const rule = (0, v4_depth_1.mixToken)(colors.surface, colors.onSurface, v4_data_1.RULE_MIX);
    const zebra = (0, v4_depth_1.mixToken)(colors.surface, colors.onSurface, v4_data_1.ZEBRA_MIX);
    const rowHeight = tokens.spacing.xl + tokens.spacing.xs;
    const cell = (isNumeric) => ({
        flex: 1,
        justifyContent: 'center',
        alignItems: isNumeric ? 'flex-end' : 'flex-start',
        paddingHorizontal: tokens.spacing.md,
        paddingVertical: tokens.spacing.sm,
    });
    const numeralStyle = { fontVariant: ['tabular-nums'], textAlign: 'right' };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: tokens.radius.md,
                overflow: 'hidden',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    minHeight: rowHeight,
                    borderBottomWidth: 1,
                    borderColor: rule,
                }, children: columns.map((c) => {
                    const isNumeric = numeric.has(c.key);
                    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: cell(isNumeric), children: typeof c.header === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [
                                {
                                    color: colors.mutedText,
                                    fontSize: tokens.typography.scale.xs,
                                    fontFamily: tokens.typography.fontBody,
                                    fontWeight: '600',
                                },
                                isNumeric ? numeralStyle : null,
                            ], children: c.header })) : (c.header) }, c.key));
                }) }), rows.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { paddingVertical: tokens.spacing.xl, paddingHorizontal: tokens.spacing.md }, children: typeof empty === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        color: colors.mutedText,
                        fontSize: tokens.typography.scale.sm,
                        textAlign: 'center',
                    }, children: empty })) : (empty) })) : (rows.map((row, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    minHeight: rowHeight,
                    // The band replaces the per-row rule; it is a tracking aid, not
                    // a second surface, so only every other row carries it.
                    backgroundColor: i % 2 === 1 ? zebra : colors.surface,
                }, children: columns.map((c) => {
                    const isNumeric = numeric.has(c.key);
                    const content = c.render ? c.render(row) : cellText(row, c);
                    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: cell(isNumeric), children: typeof content === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [
                                {
                                    color: colors.onSurface,
                                    fontSize: tokens.typography.scale.sm,
                                    fontFamily: tokens.typography.fontBody,
                                },
                                isNumeric ? numeralStyle : null,
                            ], children: content })) : (content) }, c.key));
                }) }, getRowKey ? getRowKey(row, i) : String(i)))))] }));
}
//# sourceMappingURL=TableV4.js.map