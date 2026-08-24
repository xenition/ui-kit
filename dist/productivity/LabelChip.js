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
exports.LabelChip = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/** Maps a tone to the token class used for its accent dot. */
const DOT = {
    neutral: 'bg-muted',
    primary: 'bg-primary',
    success: 'bg-success',
    warn: 'bg-warn',
    danger: 'bg-danger',
};
/**
 * Outlined, color-coded label chip — a token-bound accent dot plus text on a
 * surface background, with optional click + remove affordances. Web parity of the
 * native `LabelChip` (`onPress` → `onClick`). The dot tone traces to an `--xen-*`
 * token class. No literal colors.
 */
exports.LabelChip = React.forwardRef(function LabelChip({ label, tone = 'neutral', onRemove, onClick, className }, ref) {
    const container = (0, cn_1.cn)('inline-flex items-center gap-1 self-start rounded-full border border-border bg-surface px-2 py-0.5', onClick && 'cursor-pointer transition-opacity hover:opacity-70', className);
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)('inline-block h-2 w-2 rounded-full', DOT[tone] ?? DOT.neutral) }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-medium text-on-surface", children: label }), onRemove ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Remove ${label}`, onClick: (e) => {
                    e.stopPropagation();
                    onRemove();
                }, className: "ml-0.5 text-xs font-semibold text-muted transition-opacity hover:opacity-100", children: "\u00D7" })) : null] }));
    if (onClick) {
        // A `role="button"` div (not a `<button>`) so the nested remove button stays
        // valid DOM. Keyboard-activated via Enter/Space.
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "button", tabIndex: 0, "aria-label": label, onClick: onClick, onKeyDown: (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }, className: container, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: container, children: body }));
});
//# sourceMappingURL=LabelChip.js.map