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
exports.AgendaList = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
/** Token background class for each status dot (meaning also spelled out for `live`). */
const STATUS_DOT = {
    upcoming: 'bg-muted',
    live: 'bg-success',
    done: 'bg-border',
};
/**
 * A vertical, time-anchored agenda. Each row shows a time gutter, a status dot
 * (whose meaning is also spelled out for `live` entries), the title and an
 * optional subtitle. Renders a skeleton when `loading` and a centered
 * {@link EmptyState} when there are no items. Colors come from the `--xen-*`
 * tokens; no literal colors.
 */
exports.AgendaList = React.forwardRef(function AgendaList({ items, onSelectItem, emptyLabel = 'No sessions scheduled yet', loading = false, className, ...rest }, ref) {
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-label": "Loading agenda", className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: Array.from({ length: 3 }, (_, i) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row items-center gap-md", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-4 w-12 animate-pulse rounded-sm bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-5 flex-1 animate-pulse rounded-sm bg-neutral-100" })] }, i))) }));
    }
    if (items.length === 0) {
        return (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, className: className, ...rest, title: emptyLabel });
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "list", className: (0, cn_1.cn)('flex flex-col gap-xs', className), ...rest, children: items.map((item) => {
            const status = item.status ?? 'upcoming';
            const clickable = typeof onSelectItem === 'function';
            const row = ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row gap-md py-sm text-left", children: [(0, jsx_runtime_1.jsx)("span", { className: "w-14 shrink-0 text-sm font-semibold text-muted", children: item.time }), (0, jsx_runtime_1.jsx)("span", { className: "flex flex-col items-center pt-1", children: (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-2 w-2 rounded-full', STATUS_DOT[status]) }) }), (0, jsx_runtime_1.jsxs)("span", { className: "flex flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex-1 text-base font-semibold text-on-surface", children: item.title }), status === 'live' ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold tracking-wide text-success", children: "LIVE" })) : null] }), item.subtitle ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: item.subtitle }) : null] })] }));
            return ((0, jsx_runtime_1.jsx)("div", { role: "listitem", children: clickable ? ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => onSelectItem?.(item), "aria-label": `${item.time} ${item.title}`, className: "w-full rounded-md text-left transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: row })) : (row) }, item.id));
        }) }));
});
//# sourceMappingURL=AgendaList.js.map