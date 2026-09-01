"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxListV4 = TxListV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const TxRowV4_1 = require("./TxRowV4");
const market_v4_1 = require("./internal/market-v4");
/** How many ghost rows a loading feed shows. Enough to read as a list. */
const SKELETON_ROWS = 3;
/**
 * **V4 transaction list** — same props as {@link TxList} plus `loading` and
 * `loadingLabel`.
 *
 * ## Three changes
 *
 * 1. **A feed that is still fetching says so.** The base had no loading state
 *    at all, so a wallet whose history had not arrived yet rendered **"No
 *    transactions"** — indistinguishable from a wallet that has never
 *    transacted, and the more alarming of the two readings. `loading` draws
 *    skeleton rows in the shape the feed is about to take.
 * 2. **A row's own handler is not silently overridden.** The base wrote
 *    `onPress={onSelectItem ? () => onSelectItem(item, index) : item.onPress}`,
 *    so passing a list-level handler discarded every per-row one. The row's
 *    handler wins now and the list's is the fallback.
 * 3. **The empty state moves the user forward** — a headline and a next step
 *    through the V4 empty state, rather than the older dashed placeholder.
 */
function TxListV4({ items, emptyTitle = 'No transactions', emptyDescription, loading = false, loadingLabel = 'Loading transactions', onSelectItem, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    if (loading) {
        const band = (width, height) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                height,
                width,
                borderRadius: tokens.radius.sm,
                backgroundColor: (0, market_v4_1.skeletonFill)(theme),
            } }));
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: loadingLabel, style: style, children: Array.from({ length: SKELETON_ROWS }, (_, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowContainerStyle)(theme, { twoLine: true }), children: [band('25%', tokens.spacing.lg), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [band('55%', tokens.typography.scale.sm), band('30%', tokens.typography.scale.xs)] }), band('20%', tokens.typography.scale.base)] }, i))) }));
    }
    const rows = Array.isArray(items) ? items : [];
    if (rows.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: style, children: (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { title: emptyTitle, description: emptyDescription }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: style, children: rows.map((item, index) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(TxRowV4_1.TxRowV4, { ...item, 
                    // The row's own handler first. A list-level `onSelectItem` is the
                    // fallback, not an override.
                    onPress: item.onPress ?? (onSelectItem ? () => onSelectItem(item, index) : undefined) }), index < rows.length - 1 ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, row_v4_1.rowSeparatorStyle)(theme) }) : null] }, `${item.hash}-${index}`))) }));
}
//# sourceMappingURL=TxListV4.js.map