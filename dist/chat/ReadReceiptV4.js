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
exports.ReadReceiptV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const thread_v4_1 = require("./internal/thread-v4");
const TEXT_SIZE = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' };
/**
 * **V4 read receipt** — the web twin of the native `ReadReceiptV4`, same props
 * as {@link ReadReceipt} plus `scale`, `onRetry`, `retryLabel` and
 * `statusLabels`.
 *
 * ## Four changes
 *
 * 1. **A failed send is actionable.** See `onRetry`.
 * 2. **It reports as a status, not an image.** `role="img"` on a delivery
 *    state is simply the wrong role.
 * 3. **`failed` announces assertively**, the rest politely — a receipt that
 *    interrupts on every message trains a user to ignore it.
 * 4. **The ink is the contrast-corrected slot**, where the base used `muted`
 *    for three of the five states.
 */
exports.ReadReceiptV4 = React.forwardRef(function ReadReceiptV4({ status = 'sent', size, scale = 'sm', onRetry, retryLabel = 'Retry', statusLabels, className, style, ...rest }, ref) {
    const meta = thread_v4_1.RECEIPT_META[status];
    const word = statusLabels?.[status] ?? meta.label;
    const failed = status === 'failed';
    const glyph = ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)(size == null && TEXT_SIZE[scale], thread_v4_1.TONE_INK[meta.tone]), style: size != null ? { fontSize: size } : undefined, children: meta.glyph }));
    if (failed && onRetry) {
        return ((0, jsx_runtime_1.jsx)("span", { ref: ref, className: className, style: style, ...rest, children: (0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": `${word}. ${retryLabel}`, onClick: onRetry, "data-xen-v4-chrome": "on-surface", className: (0, cn_1.cn)('inline-flex items-center gap-xs rounded-[var(--xen-radius-md)] px-xs', chrome_v4_1.MIN_TAP_CLASS), children: [glyph, (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-danger-text", children: retryLabel })] }) }));
    }
    return ((0, jsx_runtime_1.jsx)("span", { ref: ref, role: "status", "aria-live": failed ? 'assertive' : 'polite', "aria-label": word, "data-xen-receipt": status, className: (0, cn_1.cn)('inline-flex', className), style: style, ...rest, children: glyph }));
});
//# sourceMappingURL=ReadReceiptV4.js.map