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
exports.Callout = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
const EDGE = {
    info: 'border-primary',
    success: 'border-success',
    warn: 'border-warn',
    danger: 'border-danger',
    neutral: 'border-border',
};
const TITLE = {
    info: 'text-primary',
    success: 'text-success',
    warn: 'text-warn',
    danger: 'text-danger',
    neutral: 'text-muted',
};
/**
 * Callout — a lightweight boxed emphasis block for asides and tips, lighter
 * than `Banner` (no solid fill). A `surface` card with a full 1px border tinted
 * to the tone token and a tone-tinted title, plus an optional leading icon.
 * Body copy stays `on-surface`. No literal colors.
 */
exports.Callout = React.forwardRef(function Callout({ tone = 'info', icon, title, className, children, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "note", className: (0, cn_1.cn)('flex gap-3 rounded-[var(--xen-radius-md)] border bg-surface p-3', EDGE[tone], className), ...rest, children: [icon != null && (0, jsx_runtime_1.jsx)("span", { className: "mt-0.5 inline-flex shrink-0", children: icon }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [title != null && ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('text-sm font-bold', TITLE[tone]), children: title })), children != null && (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-on-surface", children: children })] })] }));
});
//# sourceMappingURL=Callout.js.map