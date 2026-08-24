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
exports.UnreadDivider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * Full-width rule marking the first unread message in a thread — the "New
 * messages" line. Uses the primary token so it reads as an active marker.
 * Exposed as a `separator`. No literal colors.
 */
exports.UnreadDivider = React.forwardRef(function UnreadDivider({ label = 'Unread messages', count, className, ...rest }, ref) {
    const text = count != null && count > 0 ? `${count} ${label}` : label;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "separator", "aria-label": text, className: (0, cn_1.cn)('flex items-center gap-2 py-1', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "h-px flex-1 bg-primary opacity-50" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-primary", children: text }), (0, jsx_runtime_1.jsx)("span", { className: "h-px flex-1 bg-primary opacity-50" })] }));
});
//# sourceMappingURL=UnreadDivider.js.map