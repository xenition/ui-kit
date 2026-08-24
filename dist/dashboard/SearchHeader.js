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
exports.SearchHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * A search bar header: a token-bound search field with a leading glyph, an
 * optional clear button, and a trailing action slot. Token-only.
 */
exports.SearchHeader = React.forwardRef(function SearchHeader({ value, onChangeText, placeholder = 'Search', onSubmit, actions, clearable = true, className }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex items-center gap-sm', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 items-center gap-sm rounded-full border border-border bg-surface px-md", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "text-base text-muted", children: "\u2315" }), (0, jsx_runtime_1.jsx)("input", { ref: ref, type: "search", "aria-label": placeholder, value: value, placeholder: placeholder, onChange: (e) => onChangeText(e.target.value), onKeyDown: (e) => {
                            if (e.key === 'Enter')
                                onSubmit?.();
                        }, className: "flex-1 bg-transparent py-sm text-base text-on-surface outline-none placeholder:text-muted" }), clearable && value.length > 0 ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Clear search", onClick: () => onChangeText(''), className: "text-base text-muted hover:text-on-surface", children: "\u2715" })) : null] }), actions ? (0, jsx_runtime_1.jsx)("div", { className: "shrink-0", children: actions }) : null] }));
});
//# sourceMappingURL=SearchHeader.js.map