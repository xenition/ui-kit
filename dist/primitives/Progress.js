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
exports.Progress = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
const FILL = {
    primary: 'bg-primary',
    success: 'bg-success',
    warn: 'bg-warn',
    danger: 'bg-danger',
};
/** Linear progress bar bound to the theme tokens. Clamps to [0, max]. */
exports.Progress = React.forwardRef(function Progress({ className, value, max = 100, tone = 'primary', size = 'md', ...rest }, ref) {
    const pct = Math.max(0, Math.min(100, max > 0 ? (value / max) * 100 : 0));
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "progressbar", "aria-valuenow": value, "aria-valuemin": 0, "aria-valuemax": max, className: (0, cn_1.cn)('w-full overflow-hidden rounded-full bg-neutral-200', size === 'sm' ? 'h-1.5' : 'h-2.5', className), ...rest, children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full rounded-full transition-[width] duration-300', FILL[tone]), style: { width: `${pct}%` } }) }));
});
//# sourceMappingURL=Progress.js.map