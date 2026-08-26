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
exports.ChecklistItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * A single checklist line — a round toggle + label. Unlike the square primitive
 * `Checkbox`, a checked item fills with the **success** token (done = success)
 * and strikes through its label. Exposes the `checkbox` a11y role/state. Web
 * parity of the native `ChecklistItem` (`onPress` → `onClick`). No literal colors.
 */
exports.ChecklistItem = React.forwardRef(function ChecklistItem({ label, checked = false, onCheckedChange, onChange, disabled = false, className }, ref) {
    // Two spellings, one callback: the original wins when both are passed, so a
    // caller who has migrated half a file never gets the change reported twice.
    const emit = onCheckedChange ?? onChange;
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", role: "checkbox", "aria-checked": checked, "aria-label": label, disabled: disabled, onClick: () => emit?.(!checked), className: (0, cn_1.cn)('flex w-full items-center gap-2 py-1 text-left transition-opacity', 'disabled:pointer-events-none disabled:opacity-50', className), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)('inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-bold', checked ? 'border-success bg-success text-on-success' : 'border-border bg-surface'), children: checked ? '✓' : '' }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex-1 text-sm', checked ? 'text-muted line-through' : 'text-on-surface'), children: label })] }));
});
//# sourceMappingURL=ChecklistItem.js.map