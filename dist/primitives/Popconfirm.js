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
exports.Popconfirm = Popconfirm;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const useDismiss_1 = require("./useDismiss");
/** Inline confirmation popover bound to the theme tokens — for destructive actions. */
function Popconfirm({ trigger, message, onConfirm, confirmLabel = 'Confirm', cancelLabel = 'Cancel', }) {
    const [open, setOpen] = React.useState(false);
    const ref = (0, useDismiss_1.useDismiss)(open, () => setOpen(false));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: "relative inline-block", children: [(0, jsx_runtime_1.jsx)("span", { onClick: () => setOpen((o) => !o), children: trigger }), open && ((0, jsx_runtime_1.jsxs)("div", { role: "dialog", className: "absolute z-50 mt-1 w-56 rounded-[var(--xen-radius-md)] border border-border bg-surface p-3 shadow-lg", children: [(0, jsx_runtime_1.jsx)("p", { className: "mb-3 text-sm text-on-surface", children: message }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-end gap-2", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => setOpen(false), className: "rounded-[var(--xen-radius-sm)] px-2 py-1 text-xs text-muted transition-colors hover:text-on-surface", children: cancelLabel }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => {
                                    onConfirm();
                                    setOpen(false);
                                }, className: "rounded-[var(--xen-radius-sm)] bg-danger px-2 py-1 text-xs text-on-danger", children: confirmLabel })] })] }))] }));
}
//# sourceMappingURL=Popconfirm.js.map