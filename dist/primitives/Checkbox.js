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
exports.Checkbox = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
/** Themed checkbox bound to the `--xen-*` tokens — the check fills with the primary color. */
exports.Checkbox = React.forwardRef(function Checkbox({ className, invalid = false, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsx)("input", { ref: ref, type: "checkbox", "aria-invalid": invalid || undefined, className: (0, cn_1.cn)('h-4 w-4 shrink-0 cursor-pointer rounded-[var(--xen-radius-sm)] accent-primary', 'border border-border transition-colors', 'focus:outline-none focus:ring-1 focus:ring-primary', invalid && 'ring-1 ring-danger', 'disabled:pointer-events-none disabled:opacity-50', className), ...rest }));
});
//# sourceMappingURL=Checkbox.js.map