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
exports.QuickReplies = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * Horizontal strip of suggested-reply chips (smart replies / canned responses).
 * Scrolls horizontally when the suggestions overflow. Each chip is a button.
 * Renders nothing when `replies` is empty. No literal colors.
 */
exports.QuickReplies = React.forwardRef(function QuickReplies({ replies, onSelect, className, ...rest }, ref) {
    if (replies.length === 0)
        return null;
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-label": "Suggested replies", className: (0, cn_1.cn)('flex gap-2 overflow-x-auto px-4', className), ...rest, children: replies.map((reply) => ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": reply.label, onClick: () => onSelect?.(reply.id), className: (0, cn_1.cn)('shrink-0 whitespace-nowrap rounded-full border border-primary bg-surface px-3 py-1', 'text-sm font-medium text-primary transition-colors hover:bg-primary-50', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'), children: reply.label }, reply.id))) }));
});
//# sourceMappingURL=QuickReplies.js.map