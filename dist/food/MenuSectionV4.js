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
exports.MenuSectionV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const isEmptyChildren = (children) => 
// React.Children.toArray already strips null/undefined/boolean children.
React.Children.toArray(children).length === 0;
/**
 * **V4 menu section** — the web twin of the native `MenuSectionV4`, same props
 * as {@link MenuSection} plus `emptyDescription`.
 *
 * ## Three changes
 *
 * 1. **Both twins render the same empty state.** The "EmptyState is a
 *    primitive" change only ever landed on this side — native still hand-rolls
 *    a dashed box — so one twin's empty category was the kit's empty state and
 *    the other's was a dashed rectangle §11 argues against. Both take
 *    `EmptyStateV4` now, and `emptyDescription` gives it the second sentence a
 *    title on its own cannot carry.
 * 2. **The section is a real landmark.** A `<section>` with no accessible name
 *    is skipped by a reader's region list; `aria-labelledby` points it at its
 *    own heading, so a menu of eight categories is navigable as eight regions
 *    instead of one long run of dishes.
 * 3. **Tokens.** The supporting line was `text-muted` — a fill slot used as
 *    ink, with no contrast promise — where `mutedText` is the corrected one.
 */
exports.MenuSectionV4 = React.forwardRef(function MenuSectionV4({ title, description, aside, children, emptyLabel = 'No items yet', emptyDescription, emptyState, className, ...rest }, ref) {
    const empty = isEmptyChildren(children);
    const headingId = React.useId();
    return ((0, jsx_runtime_1.jsxs)("section", { ref: ref, "aria-labelledby": title ? headingId : undefined, className: (0, cn_1.cn)('flex flex-col gap-md', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-end justify-between gap-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("h3", { id: headingId, className: "font-heading text-lg font-bold text-on-surface", children: title }), description ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-text", children: description }) : null] }), aside ? (0, jsx_runtime_1.jsx)("div", { className: "shrink-0", children: aside }) : null] }), empty ? ((emptyState ?? (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { title: emptyLabel, description: emptyDescription }))) : ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-sm", children: children }))] }));
});
//# sourceMappingURL=MenuSectionV4.js.map