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
exports.ConversationListV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const ConversationRowV4_1 = require("./ConversationRowV4");
/** How many placeholder rows a loading inbox draws. */
const SKELETON_ROWS = 5;
/**
 * **V4 conversation list** — the web twin of the native `ConversationListV4`,
 * same props as {@link ConversationList} plus `emptyDescription`.
 *
 * ## Four changes
 *
 * 1. **Loading draws the rows it is about to show.** The base drew a centred
 *    spinner, so the inbox collapsed to a dot and then jumped to full height.
 * 2. **Empty is a real empty state** with a title and a sentence, not a line
 *    of grey text centred in the void.
 * 3. **The last row drops its separator**, which otherwise hung off the end of
 *    the list with nothing under it.
 * 4. **The list is a list**, with a count in its name.
 */
exports.ConversationListV4 = React.forwardRef(function ConversationListV4({ items, onPressItem, onLongPressItem: _onLongPressItem, loading = false, emptyLabel = 'No conversations', emptyDescription, dividers: _dividers, children, className, ...rest }, ref) {
    const list = items?.filter((item) => item?.id != null) ?? [];
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "status", "aria-live": "polite", "aria-label": "Loading conversations", className: (0, cn_1.cn)('flex flex-col', className), ...rest, children: Array.from({ length: SKELETON_ROWS }).map((_, index) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-md px-md py-sm", children: [(0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { className: "h-10 w-10 shrink-0 rounded-full" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { className: "h-3 w-1/3" }), (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { className: "h-3 w-2/3" })] })] }, index))) }));
    }
    if (list.length === 0 && children == null) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { title: emptyLabel, description: emptyDescription }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: className, ...rest, children: [(0, jsx_runtime_1.jsx)("ul", { "aria-label": `${list.length} ${list.length === 1 ? 'conversation' : 'conversations'}`, className: "flex flex-col", children: list.map((item, index) => ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(ConversationRowV4_1.ConversationRowV4, { ...item, last: index === list.length - 1, onClick: () => onPressItem?.(item.id) }) }, item.id))) }), children] }));
});
//# sourceMappingURL=ConversationListV4.js.map