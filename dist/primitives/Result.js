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
exports.Result = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
const Icon_1 = require("./Icon");
const GLYPH = {
    success: '✓',
    error: '✕',
    empty: '∅',
    '404': '?',
};
const ICON_COLOR = {
    success: 'success',
    error: 'danger',
    empty: 'muted',
    '404': 'muted',
};
/**
 * Full-page result state — a centered status glyph, title, description, and
 * optional primary action for success / error / empty / 404 outcomes. The glyph
 * tone maps to a semantic token (`success`→success, `error`→danger, `empty` and
 * `404`→muted); title is `on-surface`, description `muted`. The action reuses
 * the primary/`on-primary` button convention. No literal colors.
 */
exports.Result = React.forwardRef(function Result({ status = 'success', title, description, actionLabel, onAction, icon, className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "status", className: (0, cn_1.cn)('flex w-full flex-col items-center justify-center gap-4 bg-surface p-8 text-center', className), ...rest, children: [icon != null ? ((0, jsx_runtime_1.jsx)("span", { className: "inline-flex", children: icon })) : ((0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: GLYPH[status], size: "3xl", color: ICON_COLOR[status], "aria-label": status })), (0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-bold text-on-surface", children: title }), description != null && (0, jsx_runtime_1.jsx)("p", { className: "text-base text-muted", children: description }), actionLabel && ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onAction, className: (0, cn_1.cn)('mt-2 inline-flex items-center justify-center rounded-[var(--xen-radius-md)] px-6 py-2.5', 'bg-primary text-base font-semibold text-on-primary transition hover:opacity-90', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'), children: actionLabel }))] }));
});
//# sourceMappingURL=Result.js.map