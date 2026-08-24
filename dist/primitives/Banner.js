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
exports.Banner = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
const TONE = {
    info: 'bg-primary text-on-primary',
    success: 'bg-success text-on-success',
    warn: 'bg-warn text-on-warn',
    danger: 'bg-danger text-on-danger',
};
/**
 * Full-width banner — a solid, edge-to-edge notice keyed to a semantic tone:
 * the background is the tone token and all content uses the paired `on-*`
 * token. Distinct from `Alert` (surface card + left rule) by its solid,
 * full-bleed fill. Optional trailing action + dismiss. `danger` announces via
 * the `alert` role; other tones via `status`. No literal colors.
 */
exports.Banner = React.forwardRef(function Banner({ tone = 'info', icon, actionLabel, onAction, onClose, className, children, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: tone === 'danger' ? 'alert' : 'status', className: (0, cn_1.cn)('flex w-full items-center gap-3 px-4 py-3', TONE[tone], className), ...rest, children: [icon != null && (0, jsx_runtime_1.jsx)("span", { className: "inline-flex shrink-0", children: icon }), (0, jsx_runtime_1.jsx)("div", { className: "min-w-0 flex-1 text-sm font-medium", children: children }), actionLabel && ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onAction, className: "shrink-0 text-sm font-bold underline underline-offset-2 hover:opacity-90", children: actionLabel })), onClose && ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onClose, "aria-label": "Dismiss", className: "shrink-0 text-base leading-none hover:opacity-80", children: "\u00D7" }))] }));
});
//# sourceMappingURL=Banner.js.map