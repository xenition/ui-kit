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
exports.AttachmentBar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const KIND_GLYPH = {
    image: '🖼️',
    video: '🎬',
    file: '📄',
    audio: '🎵',
};
const TILE = 56;
/**
 * Horizontal strip of staged attachments shown above the composer before a
 * message is sent. Each tile shows a thumbnail (or a kind glyph) and a remove
 * button. Scrolls horizontally; renders nothing when empty. No literal colors.
 */
exports.AttachmentBar = React.forwardRef(function AttachmentBar({ attachments, onRemove, className, ...rest }, ref) {
    if (attachments.length === 0)
        return null;
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-label": "Staged attachments", className: (0, cn_1.cn)('flex gap-2 overflow-x-auto p-2', className), ...rest, children: attachments.map((att) => {
            const kind = att.kind ?? 'file';
            return ((0, jsx_runtime_1.jsxs)("div", { className: "relative shrink-0", style: { width: TILE }, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] border border-border bg-surface", style: { width: TILE, height: TILE }, children: att.thumbnailUri ? ((0, jsx_runtime_1.jsx)("img", { src: att.thumbnailUri, alt: att.name ?? 'Attachment', className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: KIND_GLYPH[kind], "aria-label": att.name ?? kind })) }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Remove ${att.name ?? 'attachment'}`, onClick: () => onRemove?.(att.id), className: (0, cn_1.cn)('absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-danger', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger'), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u00D7", size: "sm", color: "onDanger" }) }), att.name ? ((0, jsx_runtime_1.jsx)("span", { className: "mt-0.5 block truncate text-center text-xs text-muted", children: att.name })) : null] }, att.id));
        }) }));
});
//# sourceMappingURL=AttachmentBar.js.map