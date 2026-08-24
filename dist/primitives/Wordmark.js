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
exports.Wordmark = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
const SIZE_CLASSES = {
    sm: 'text-base gap-[var(--xen-space-xs)]',
    md: 'text-lg gap-[var(--xen-space-sm)]',
    lg: 'text-2xl gap-[var(--xen-space-sm)]',
};
const MARK_CLASSES = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-7 w-7',
};
/** Themed brand wordmark — a token logomark plus the name in the heading font. */
exports.Wordmark = React.forwardRef(function Wordmark({ name, mark, size = 'md', as: Tag = 'span', href, className, ...rest }, ref) {
    const defaultMark = ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", "data-xen-wordmark-mark": "", className: (0, cn_1.cn)('inline-block shrink-0 rounded-[var(--xen-radius-sm)] bg-primary', MARK_CLASSES[size]) }));
    return ((0, jsx_runtime_1.jsxs)(Tag, { ref: ref, "data-xen-wordmark": "", href: Tag === 'a' ? href : undefined, className: (0, cn_1.cn)('inline-flex items-center font-heading font-bold leading-none text-on-surface', SIZE_CLASSES[size], className), ...rest, children: [mark === undefined ? defaultMark : mark, (0, jsx_runtime_1.jsx)("span", { "data-xen-wordmark-name": "", children: name })] }));
});
//# sourceMappingURL=Wordmark.js.map