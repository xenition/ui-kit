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
exports.SubtaskList = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const ChecklistItem_1 = require("./ChecklistItem");
/**
 * Vertical list of subtasks rendered as {@link ChecklistItem}s, with an optional
 * `done/total` counter and a muted empty state. Web parity of the native
 * `SubtaskList`. Guards against a missing/empty array. Colors come from the theme
 * tokens. No literal colors.
 */
exports.SubtaskList = React.forwardRef(function SubtaskList({ subtasks, onToggle, emptyLabel = 'No subtasks yet', showProgress = false, className }, ref) {
    const items = Array.isArray(subtasks) ? subtasks : [];
    const done = items.filter((s) => s.done).length;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-1', className), children: [showProgress && items.length > 0 ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted", children: `${done}/${items.length} done` })) : null, items.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "py-3 text-center text-xs text-muted", children: emptyLabel })) : (items.map((s) => ((0, jsx_runtime_1.jsx)(ChecklistItem_1.ChecklistItem, { label: s.title, checked: !!s.done, onCheckedChange: (next) => onToggle?.(s.id, next) }, s.id))))] }));
});
//# sourceMappingURL=SubtaskList.js.map