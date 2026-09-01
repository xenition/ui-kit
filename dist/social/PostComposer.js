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
exports.PostComposer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const primitives_1 = require("../primitives");
/**
 * PostComposer — the compose-a-post card for the social V4 "feed" line. A clean
 * surface card pairs the author avatar with a growing text field, a row of
 * soft-primary action glyph buttons (photo / poll / emoji), a live character
 * counter that flips to danger when over `maxLength`, and a primary Post CTA that
 * disables while empty, over the limit, or `posting`. Presentational only —
 * controlled `value` + callbacks. Token-only colors via `--xen-*` classes; the
 * ≥44px controls stay keyboard-operable and dark-mode safe.
 */
exports.PostComposer = React.forwardRef(function PostComposer({ authorAvatarUrl, authorName, value, onChangeText, onChange, placeholder = "What's on your mind?", onPost, posting = false, maxLength, onAddPhoto, onAddPoll, onAddEmoji, className, ...rest }, ref) {
    const length = value.length;
    const overLimit = maxLength != null && length > maxLength;
    const empty = value.trim().length === 0;
    const disabled = empty || overLimit || posting;
    const Action = ({ label, glyph, onPress }) => onPress ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": label, onClick: onPress, className: "flex h-11 w-11 items-center justify-center rounded-[var(--xen-radius-md)] bg-primary-50 text-lg text-primary transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: glyph })) : null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)] shadow-sm', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: authorAvatarUrl, name: authorName, size: "md", className: "mt-[2px] shrink-0" }), (0, jsx_runtime_1.jsx)("textarea", { value: value, onChange: (e) => {
                            onChange?.(e);
                            onChangeText(e.target.value);
                        }, placeholder: placeholder, "aria-label": placeholder, rows: 3, className: "min-h-[72px] flex-1 resize-none border-0 bg-transparent text-base leading-relaxed text-on-surface placeholder:text-muted focus:outline-none" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)(Action, { label: "Add photo", glyph: "\uD83D\uDDBC\uFE0F", onPress: onAddPhoto }), (0, jsx_runtime_1.jsx)(Action, { label: "Add poll", glyph: "\uD83D\uDCCA", onPress: onAddPoll }), (0, jsx_runtime_1.jsx)(Action, { label: "Add emoji", glyph: "\uD83D\uDE0A", onPress: onAddEmoji })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [maxLength != null ? ((0, jsx_runtime_1.jsxs)("span", { "aria-live": "polite", className: (0, cn_1.cn)('text-xs font-semibold tabular-nums', overLimit ? 'text-danger' : 'text-muted'), children: [length, "/", maxLength] })) : null, (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "md", onClick: onPost, disabled: disabled, "aria-label": "Post", "aria-busy": posting, className: "min-h-[44px]", children: posting ? 'Posting…' : 'Post' })] })] })] }));
});
//# sourceMappingURL=PostComposer.js.map