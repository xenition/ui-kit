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
exports.UnreadDividerV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * **V4 unread divider** — the web twin of the native `UnreadDividerV4`, same
 * props as {@link UnreadDivider} plus `formatCount`.
 *
 * ## Three changes
 *
 * 1. **The count reaches the label.** The base drew it beside a fixed
 *    `'Unread'`, so a reader heard the word and the number as two fragments.
 * 2. **It is a `separator` with a name**, which is exactly what it is — a
 *    landmark a reader can jump to.
 * 3. **The rule takes `danger`, the label its corrected ink.**
 */
exports.UnreadDividerV4 = React.forwardRef(function UnreadDividerV4({ label = 'Unread', count, formatCount, className, ...rest }, ref) {
    const text = typeof count === 'number' && count > 0
        ? (formatCount ?? ((n) => `${n} unread ${n === 1 ? 'message' : 'messages'}`))(count)
        : label;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "separator", "aria-label": text, "data-xen-unread-divider": "", className: (0, cn_1.cn)('flex items-center gap-sm', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "h-px flex-1 bg-danger" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold text-danger-text", children: text }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "h-px flex-1 bg-danger" })] }));
});
//# sourceMappingURL=UnreadDividerV4.js.map