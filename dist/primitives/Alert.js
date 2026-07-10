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
exports.Alert = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
const TONE = {
    info: 'border-primary text-primary',
    success: 'border-success text-success',
    warn: 'border-warn text-warn',
    danger: 'border-danger text-danger',
};
/** Inline, optionally dismissible alert bound to the theme tokens — info/success/warn/danger. */
exports.Alert = React.forwardRef(function Alert({ className, tone = 'info', title, onClose, icon, children, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: tone === 'danger' ? 'alert' : 'status', className: (0, cn_1.cn)('flex gap-3 rounded-[var(--xen-radius-md)] border-l-4 bg-neutral-50 p-3', TONE[tone], className), ...rest, children: [icon != null && (0, jsx_runtime_1.jsx)("span", { className: "mt-0.5 shrink-0", children: icon }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1 text-on-surface", children: [title != null && (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('text-sm font-semibold', TONE[tone]), children: title }), children != null && (0, jsx_runtime_1.jsx)("div", { className: "text-sm", children: children })] }), onClose && ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onClose, "aria-label": "Dismiss", className: "shrink-0 text-muted transition-colors hover:text-on-surface", children: "\u00D7" }))] }));
});
//# sourceMappingURL=Alert.js.map