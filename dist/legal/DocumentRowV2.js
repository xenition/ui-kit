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
exports.DocumentRowV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * DocumentRow, redesigned (v2): an **elevated document card**. A kind glyph tile
 * leads the title and a status pill; version·size·modified·author sit as meta, with
 * a download affordance. Distinct from v1's flat row. Same props, token-only.
 */
exports.DocumentRowV2 = React.forwardRef(function DocumentRowV2({ title, kind = 'other', status, modified, version, size, author, variant, onClick, onDownload, testID, className, ...rest }, ref) {
    void variant;
    const interactive = typeof onClick === 'function';
    const meta = [version, size, author, modified].filter((s) => !!s).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-document-row": "", "data-testid": testID, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": title, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? (0, internal_1.activateOnKey)(() => onClick?.()) : undefined, className: (0, cn_1.cn)('flex items-center gap-3 rounded-lg bg-surface p-3 shadow-sm', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-xl", "aria-hidden": true, children: internal_1.DOCUMENT_KIND_META[kind].glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: title }), meta ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: meta }) : null] }), status ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.DOCUMENT_STATUS_META[status], size: "sm" }) : null, onDownload ? (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Download", onClick: (e) => { e.stopPropagation(); onDownload(); }, className: "text-lg text-muted hover:text-primary", children: "\u2913" }) : null] }));
});
//# sourceMappingURL=DocumentRowV2.js.map