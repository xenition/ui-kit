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
exports.Input = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
/** Themed text input bound to the `--xen-*` tokens. */
exports.Input = React.forwardRef(function Input({ className, invalid = false, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsx)("input", { ref: ref, "aria-invalid": invalid || undefined, className: (0, cn_1.cn)('w-full bg-surface text-on-surface placeholder:text-muted', 'border rounded-[var(--xen-radius-sm)] px-3 py-2 text-base transition-colors', 'focus:outline-none focus:ring-1', invalid
            ? 'border-danger focus:border-danger focus:ring-danger'
            : 'border-border focus:border-primary focus:ring-primary', 'disabled:pointer-events-none disabled:opacity-50', className), ...rest }));
});
//# sourceMappingURL=Input.js.map