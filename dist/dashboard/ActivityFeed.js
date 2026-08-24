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
exports.ActivityFeed = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * A vertical activity/event log with a dot rail. Renders a real empty state
 * (per design.md §15) when there is nothing to show rather than a blank box.
 * Token-only.
 */
exports.ActivityFeed = React.forwardRef(function ActivityFeed({ items, title, emptyMessage = 'Activity will appear here as things happen.', className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: [title ? (0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-bold text-on-surface", children: title }) : null, items.length === 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-xs px-lg py-xl text-center", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-base font-semibold text-on-surface", children: "No activity yet" }), (0, jsx_runtime_1.jsx)("p", { className: "max-w-[340px] text-sm text-muted", children: emptyMessage })] })) : ((0, jsx_runtime_1.jsx)("ul", { className: "flex flex-col gap-md", children: items.map((item) => ((0, jsx_runtime_1.jsxs)("li", { className: "flex gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-surface", children: item.title }), item.meta ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: item.meta }) : null] }), item.time ? ((0, jsx_runtime_1.jsx)("span", { className: "shrink-0 text-xs text-muted", children: item.time })) : null] }, item.id))) }))] }));
});
//# sourceMappingURL=ActivityFeed.js.map