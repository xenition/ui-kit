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
exports.MenuSectionV4 = MenuSectionV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const TextV4_1 = require("../primitives/TextV4");
// `React.Children.toArray` already strips null/undefined/boolean children.
const isEmptyChildren = (children) => React.Children.toArray(children).length === 0;
/**
 * **V4 menu section** — same props as {@link MenuSection} plus
 * `emptyDescription`.
 *
 * ## Four changes
 *
 * 1. **The empty state is the shared primitive.** This twin hand-rolled a
 *    dashed box around one muted line while the web twin had already moved to
 *    `EmptyState` — so the "EmptyState is a primitive" change only ever landed
 *    on half the kit, and an empty category looked like two different products
 *    depending on the device. `EmptyStateV4` also drops the dashed rectangle,
 *    which is a placeholder outline drawn around a region whose emptiness the
 *    reader can already see.
 * 2. **An empty section says what to do next**, via `emptyDescription`. "No
 *    items yet." on its own is the failure mode an empty state exists to
 *    avoid.
 * 3. **The section is not announced as a summary.** `accessibilityRole="summary"`
 *    sat on the container of the entire dish list, describing the group as a
 *    précis of itself; a heading and its content need no role above them.
 * 4. **The description is `mutedText`.** `muted` is a ramp step with no
 *    contrast promise, and this is a sentence a reader has to read.
 *
 * **Renders nothing without a `title`.**
 */
function MenuSectionV4({ title, description, aside, children, emptyLabel = 'No items yet', emptyDescription, emptyState, style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    if (!title)
        return null;
    const empty = isEmptyChildren(children);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { accessibilityRole: "header", size: "lg", weight: "bold", tone: "onSurface", children: title }), description ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: description })) : null] }), aside ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: aside }) : null] }), empty ? ((emptyState ?? (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { title: emptyLabel, description: emptyDescription }))) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: children }))] }));
}
//# sourceMappingURL=MenuSectionV4.js.map