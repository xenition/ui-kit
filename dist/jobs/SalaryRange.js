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
exports.SalaryRange = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const format_1 = require("./format");
const TEXT_CLASS = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
};
/**
 * Inline salary-band label — e.g. `💰 $90k – $120k/yr`. Data-only: pass a
 * {@link Salary} and it formats a compact range, a `From …`/`Up to …` label for
 * a single bound, or the `emptyLabel` when nothing is disclosed. All colors come
 * from theme tokens (`text-on-surface` for the amount, `text-muted` for the
 * empty hint) — no literal colors (kit lint rule).
 */
exports.SalaryRange = React.forwardRef(function SalaryRange({ salary, size = 'md', format, emptyLabel = 'Salary not disclosed', glyph = '💰', className, ...rest }, ref) {
    const label = salary && format ? format(salary) : (0, format_1.formatSalary)(salary);
    const disclosed = label != null;
    const text = disclosed ? label : emptyLabel;
    return ((0, jsx_runtime_1.jsxs)("span", { ref: ref, "data-xen-salary-range": "", role: "text", "aria-label": disclosed ? `Salary ${text}` : emptyLabel, className: (0, cn_1.cn)('inline-flex items-center gap-xs', TEXT_CLASS[size], className), ...rest, children: [glyph && disclosed ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: glyph })) : null, (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)(disclosed ? 'font-semibold text-on-surface' : 'italic font-normal text-muted'), children: text })] }));
});
//# sourceMappingURL=SalaryRange.js.map