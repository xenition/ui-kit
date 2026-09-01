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
exports.AttachmentBarV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const KIND_META = {
    image: { glyph: '🖼', label: 'Image' },
    video: { glyph: '🎬', label: 'Video' },
    file: { glyph: '📄', label: 'File' },
    audio: { glyph: '🎵', label: 'Audio' },
};
/**
 * **V4 attachment bar** — the web twin of the native `AttachmentBarV4`, same
 * props as {@link AttachmentBar} plus `formatRemoveLabel` and `kindLabels`.
 *
 * ## Four changes
 *
 * 1. **Remove says *what* it removes.** The base's close button was a bare
 *    `×`, so a reader heard "button" once per staged file with nothing to
 *    tell them apart.
 * 2. **Remove clears 44.** It was a 16px glyph in the corner of a thumbnail —
 *    the smallest target in the composer, and a destructive one.
 * 3. **The kind is a word, not only an emoji.** An emoji is announced by name
 *    on some readers and skipped on others; neither is "Video".
 * 4. **The bar is a labelled list**, and renders nothing when empty (§4.5).
 */
exports.AttachmentBarV4 = React.forwardRef(function AttachmentBarV4({ attachments, onRemove, formatRemoveLabel, kindLabels, className, ...rest }, ref) {
    const list = attachments?.filter((a) => a?.id != null) ?? [];
    if (list.length === 0)
        return null;
    const removeLabel = formatRemoveLabel ?? ((name) => `Remove ${name}`);
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-attachment-bar": "", className: className, ...rest, children: (0, jsx_runtime_1.jsx)("ul", { "aria-label": `${list.length} ${list.length === 1 ? 'attachment' : 'attachments'}`, className: "flex gap-sm overflow-x-auto py-xs [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", children: list.map((item) => {
                const kind = KIND_META[item.kind ?? 'file'];
                const word = kindLabels?.[item.kind ?? 'file'] ?? kind.label;
                const name = item.name ?? word;
                return ((0, jsx_runtime_1.jsxs)("li", { className: "relative shrink-0", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex h-[72px] w-[72px] flex-col items-center justify-center gap-xs overflow-hidden rounded-[var(--xen-radius-md)] border border-border bg-card px-xs", "aria-label": `${word}, ${name}`, children: item.thumbnailUri ? ((0, jsx_runtime_1.jsx)("img", { src: item.thumbnailUri, alt: "", className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "text-lg", children: kind.glyph }), (0, jsx_runtime_1.jsx)("span", { className: "line-clamp-1 text-[10px] text-muted-text", children: word })] })) }), onRemove && ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": removeLabel(name), onClick: () => onRemove(item.id), "data-xen-v4-chrome": "on-surface", className: (0, cn_1.cn)('absolute -right-xs -top-xs inline-flex aspect-square items-center justify-center rounded-full border border-border bg-surface text-xs text-on-surface shadow-sm', chrome_v4_1.MIN_TAP_CLASS), children: "\u00D7" }))] }, item.id));
            }) }) }));
});
//# sourceMappingURL=AttachmentBarV4.js.map