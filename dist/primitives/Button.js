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
exports.Button = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
const VARIANT_CLASSES = {
    primary: 'bg-primary text-on-primary hover:opacity-90 focus-visible:ring-primary-300',
    secondary: 'border border-primary bg-transparent text-primary hover:bg-primary-50 focus-visible:ring-primary-300',
    ghost: 'bg-transparent text-on-surface hover:bg-neutral-100 focus-visible:ring-neutral-300',
    outline: 'border border-border bg-transparent text-on-surface hover:bg-neutral-100 focus-visible:ring-neutral-300',
    danger: 'bg-danger text-on-danger hover:opacity-90 focus-visible:ring-danger',
};
const SIZE_CLASSES = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
};
/**
 * Themed button. All colors/radii come from the `--xen-*` tokens via the
 * Tailwind preset — no literal colors (kit lint rule).
 */
exports.Button = React.forwardRef(function Button({ variant = 'primary', size = 'md', className, type = 'button', ...rest }, ref) {
    return ((0, jsx_runtime_1.jsx)("button", { ref: ref, type: type, className: (0, cn_1.cn)('inline-flex items-center justify-center font-medium transition-colors', 'rounded-[var(--xen-radius-md)]', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1', 'disabled:pointer-events-none disabled:opacity-50', VARIANT_CLASSES[variant], SIZE_CLASSES[size], className), ...rest }));
});
//# sourceMappingURL=Button.js.map