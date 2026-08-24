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
exports.FloatButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
const ANCHOR = {
    'bottom-right': 'right-6',
    'bottom-left': 'left-6',
    'bottom-center': 'left-1/2 -translate-x-1/2',
};
/**
 * Floating action button — a circular (or pill, when `label` is set) primary
 * affordance `fixed` to a viewport corner. Background is the `primary` token,
 * content the `on-primary` token. Anchored by `placement`; override via
 * `className`. No literal colors.
 */
exports.FloatButton = React.forwardRef(function FloatButton({ icon, label, placement = 'bottom-right', type = 'button', className, disabled, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: type, disabled: disabled, "aria-label": rest['aria-label'] ?? label, className: (0, cn_1.cn)('fixed bottom-8 z-40 inline-flex items-center justify-center gap-2 font-semibold shadow-lg transition', 'bg-primary text-on-primary hover:opacity-90', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-1', 'disabled:pointer-events-none disabled:opacity-50', label ? 'h-14 rounded-full px-6' : 'h-14 w-14 rounded-full', ANCHOR[placement], className), ...rest, children: [icon != null && (0, jsx_runtime_1.jsx)("span", { className: "inline-flex shrink-0", children: icon }), label && (0, jsx_runtime_1.jsx)("span", { children: label })] }));
});
//# sourceMappingURL=FloatButton.js.map