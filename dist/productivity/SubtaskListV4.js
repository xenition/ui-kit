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
exports.SubtaskListV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const ChecklistItem_1 = require("./ChecklistItem");
/**
 * SubtaskList — **V4** "flow" design (web parity of the native V4). The
 * focused-workspace take on a subtask list: a calm header carrying a
 * **soft-primary progress bar** and an "N/M done" count, then the
 * {@link ChecklistItem} rows. Guards against a missing/empty array and keeps the
 * add/toggle callbacks. Same props/behavior as {@link SubtaskListProps}; all
 * colors from `--xen-*` token classes (no literals).
 */
exports.SubtaskListV4 = React.forwardRef(function SubtaskListV4({ subtasks, onToggle, emptyLabel = 'No subtasks yet', showProgress = false, className }, ref) {
    const items = Array.isArray(subtasks) ? subtasks : [];
    const done = items.filter((s) => s.done).length;
    const pct = items.length > 0 ? (done / items.length) * 100 : 0;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-2', className), children: [showProgress && items.length > 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-1.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted", children: `${done}/${items.length} done` }), (0, jsx_runtime_1.jsx)("div", { className: "h-1.5 w-full overflow-hidden rounded-full bg-primary/10", "aria-hidden": true, children: (0, jsx_runtime_1.jsx)("div", { className: "h-full rounded-full bg-primary transition-all", style: { width: `${pct}%` } }) })] })) : null, items.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "py-3 text-center text-xs text-muted", children: emptyLabel })) : (items.map((s) => ((0, jsx_runtime_1.jsx)(ChecklistItem_1.ChecklistItem, { label: s.title, checked: !!s.done, onCheckedChange: (next) => onToggle?.(s.id, next) }, s.id))))] }));
});
//# sourceMappingURL=SubtaskListV4.js.map