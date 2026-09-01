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
exports.ChecklistItemV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * ChecklistItem — **V4** "flow" design (web parity of the native V4). The
 * focused-workspace take on a checklist line: a big ≥44px tap target, a round
 * toggle, and a bigger, more legible label. Checking the item is the satisfying
 * moment — the row settles into a **soft-success glow** with the label struck
 * through. Same props/behavior as {@link ChecklistItemProps} (both `onChange`
 * and `onCheckedChange` spellings, the original winning); all colors from
 * `--xen-*` token classes (no literals).
 */
exports.ChecklistItemV4 = React.forwardRef(function ChecklistItemV4({ label, checked = false, onCheckedChange, onChange, disabled = false, className }, ref) {
    // Two spellings, one callback: the original wins when both are passed, so a
    // caller who has migrated half a file never gets the change reported twice.
    const emit = onCheckedChange ?? onChange;
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", role: "checkbox", "aria-checked": checked, "aria-label": label, disabled: disabled, onClick: () => emit?.(!checked), className: (0, cn_1.cn)('flex w-full min-h-[44px] items-center gap-3 rounded-[var(--xen-radius-md)] px-2 py-2 text-left transition-colors', 'disabled:pointer-events-none disabled:opacity-50', checked ? 'bg-success/[0.08]' : 'bg-surface', className), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)('inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-sm font-bold', checked ? 'border-success bg-success text-on-success' : 'border-border bg-surface'), children: checked ? '✓' : '' }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex-1 text-base font-medium leading-relaxed', checked ? 'text-muted line-through' : 'text-on-surface'), children: label })] }));
});
//# sourceMappingURL=ChecklistItemV4.js.map