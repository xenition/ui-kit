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
exports.StatementListV4 = StatementListV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const TextV4_1 = require("../primitives/TextV4");
const motion_1 = require("../primitives/internal/motion");
const row_v4_1 = require("../dashboard/internal/row-v4");
const TransactionRowV4_1 = require("./TransactionRowV4");
const ledger_v4_1 = require("./internal/ledger-v4");
/** How wide the two placeholder lines run, as a share of the text column. */
const SKELETON_WIDTHS = ['45%', '70%'];
/**
 * One statement row wrapped in a mount-enter transition — a subcomponent so
 * the `useEnter` hook is called at a stable position, never inside a `.map`.
 */
function StatementRowV4({ entry, index, currency, appearance, onSelectItem, }) {
    const enter = (0, motion_1.useEnter)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: enter, children: (0, jsx_runtime_1.jsx)(TransactionRowV4_1.TransactionRowV4, { title: entry.title, subtitle: entry.subtitle, amountCents: entry.amountCents, currency: entry.currency ?? currency, direction: entry.direction, date: entry.date, icon: entry.icon, appearance: appearance, onPress: onSelectItem ? () => onSelectItem(entry, index) : undefined }) }));
}
/**
 * **V4 statement list** — same props as {@link StatementList} plus
 * `loadingLabel`.
 *
 * ## Five changes
 *
 * 1. **The loading state is the shape of the list.** Four flat bars at
 *    `colors.border` — the *hairline* colour, at `opacity: 0.5`, so a
 *    different colour on every ground — became four ghost rows with a leading
 *    slot, two text lines and an amount, drawn in the shared opaque skeleton.
 * 2. **`loadingRows={0}` draws no skeletons.** `Math.max(1, loadingRows)`
 *    made zero mean one, so a caller who asked for a quiet load got a row
 *    anyway.
 * 3. **The load is announced once.** Every placeholder carried
 *    `accessibilityLabel="Loading transaction"`, so a reader heard it four
 *    times and learned nothing the first time did not say.
 * 4. **An entry with no `currency` does not silently become USD.** It inherits
 *    the currency the list is already stating — the first entry that declares
 *    one — instead of falling through to a dollar sign on a euro statement.
 * 5. **The separator is a real rule between rows**, so the last row no longer
 *    trails a hairline off the end of the list, and it is inset to clear the
 *    leading slot.
 */
function StatementListV4({ items, header, onSelectItem, loading = false, loadingRows = 4, emptyTitle = 'No transactions', emptyDescription, loadingLabel = 'Loading transactions', appearance = 'classic', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const metrics = (0, row_v4_1.rowMetrics)(theme);
    const headerNode = header != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "mutedText", style: { textTransform: 'uppercase', marginBottom: tokens.spacing.xs }, children: header })) : null;
    if (loading) {
        const rows = Number.isFinite(loadingRows) ? Math.max(0, Math.trunc(loadingRows)) : 0;
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: style, children: [headerNode, rows > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: loadingLabel, children: Array.from({ length: rows }).map((_, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowContainerStyle)(theme, { twoLine: true }), children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
                                    (0, row_v4_1.rowLeadingStyle)(theme),
                                    {
                                        borderRadius: tokens.radius.full,
                                        backgroundColor: (0, ledger_v4_1.placeholderGround)(theme),
                                    },
                                ] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: SKELETON_WIDTHS.map((width) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        height: tokens.typography.scale.sm,
                                        width,
                                        borderRadius: tokens.radius.sm,
                                        backgroundColor: (0, ledger_v4_1.placeholderGround)(theme),
                                    } }, width))) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    height: tokens.typography.scale.base,
                                    width: metrics.leading,
                                    borderRadius: tokens.radius.sm,
                                    backgroundColor: (0, ledger_v4_1.placeholderGround)(theme),
                                } })] }, i))) })) : null] }));
    }
    if (items.length === 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: style, children: [headerNode, (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { title: emptyTitle, description: emptyDescription })] }));
    }
    // The list states one currency; an entry that names none inherits it rather
    // than falling through to `TransactionRow`'s USD default.
    const currency = items.find((entry) => entry.currency != null)?.currency;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: style, children: [headerNode, items.map((entry, index) => ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [index > 0 ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, row_v4_1.rowSeparatorStyle)(theme, { inset: true }) }) : null, (0, jsx_runtime_1.jsx)(StatementRowV4, { entry: entry, index: index, currency: currency, appearance: appearance, onSelectItem: onSelectItem })] }, entry.id ?? String(index))))] }));
}
//# sourceMappingURL=StatementListV4.js.map