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
exports.Tag = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
const TONE = {
    neutral: 'bg-neutral-100 text-on-surface',
    primary: 'bg-primary-50 text-primary',
    success: 'bg-success text-on-success',
    warn: 'bg-warn text-on-warn',
    danger: 'bg-danger text-on-danger',
};
/** Removable chip/tag bound to the theme tokens — for filters, keywords, multi-select values. */
exports.Tag = React.forwardRef(function Tag({ className, tone = 'neutral', onRemove, children, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("span", { ref: ref, className: (0, cn_1.cn)('inline-flex items-center gap-1 rounded-[var(--xen-radius-sm)] px-2 py-0.5 text-xs font-medium', TONE[tone], className), ...rest, children: [children, onRemove && ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Remove", onClick: onRemove, className: "ml-0.5 opacity-70 transition-opacity hover:opacity-100", children: "\u00D7" }))] }));
});
//# sourceMappingURL=Tag.js.map