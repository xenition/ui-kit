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
exports.ProfilePrompt = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * A profile prompt + answer block — the web parity of a dating "prompt" card
 * ("My simple pleasures → …"). The prompt is styled quietly, the answer is the
 * emphasis. The optional like affordance is a real `<button>` whose pressed state
 * is surfaced via `aria-pressed`, not color. When `onClick` is set the whole block
 * becomes a keyboard-operable `role="button"` container so the nested like button
 * stays independently focusable. Token classes only — graceful empty state when
 * the answer is missing.
 */
exports.ProfilePrompt = React.forwardRef(function ProfilePrompt({ prompt, answer, variant = 'card', glyph, liked = false, onClick, onLike, emptyLabel = 'No answer yet', className, ...rest }, ref) {
    const hasAnswer = answer != null && answer.trim().length > 0;
    const body = ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-xs", children: [glyph ? (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-sm", children: glyph }) : null, (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-muted", children: prompt })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex-1 font-medium', variant === 'quote' ? 'text-xl italic' : 'text-lg', hasAnswer ? 'text-on-surface' : 'text-muted'), children: hasAnswer ? (variant === 'quote' ? `“${answer}”` : answer) : emptyLabel }), onLike ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": liked ? 'Unlike prompt' : 'Like prompt', "aria-pressed": liked, onClick: (e) => {
                            e.stopPropagation();
                            onLike();
                        }, className: (0, cn_1.cn)('text-lg leading-none', liked ? 'text-danger' : 'text-muted'), children: liked ? '♥' : '♡' })) : null] })] }));
    const shellClass = variant === 'quote'
        ? (0, cn_1.cn)('rounded-[var(--xen-radius-md)] border-l-[3px] border-primary bg-primary-50 px-md py-sm', className)
        : className;
    const content = variant === 'card' ? ((0, jsx_runtime_1.jsx)(primitives_1.Card, { className: (0, cn_1.cn)('p-md', className), children: body })) : ((0, jsx_runtime_1.jsx)("div", { className: shellClass, children: body }));
    if (onClick) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "button", tabIndex: 0, "aria-label": `${prompt}. ${hasAnswer ? answer : emptyLabel}`, onClick: onClick, onKeyDown: (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }, className: "cursor-pointer rounded-[var(--xen-radius-lg)] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", ...rest, children: content }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, ...rest, children: content }));
});
//# sourceMappingURL=ProfilePrompt.js.map