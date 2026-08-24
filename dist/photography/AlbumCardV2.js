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
exports.AlbumCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * AlbumCard, redesigned (v2): a **full-bleed cover hero**. The cover fills the
 * card; a Private badge floats top-left and the title over a photo-count·date
 * line sits on a gradient scrim at the bottom. Elevated, hover-lift. Same props
 * as {@link AlbumCard}, token-only.
 */
exports.AlbumCardV2 = React.forwardRef(function AlbumCardV2({ title, photoCount, dateText, coverUrl, isPrivate, variant, loading = false, countLabel = 'photos', className, ...rest }, ref) {
    void variant;
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-album-card": "", "aria-label": "Loading album", className: (0, cn_1.cn)('h-48 animate-pulse rounded-lg bg-neutral-200', className), ...rest });
    }
    const meta = [typeof photoCount === 'number' ? `${photoCount} ${countLabel}` : null, dateText].filter((s) => !!s);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-album-card": "", className: (0, cn_1.cn)('relative flex h-48 flex-col justify-end overflow-hidden rounded-lg bg-neutral-100 shadow-md transition-transform hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0', className), ...rest, children: [coverUrl ? ((0, jsx_runtime_1.jsx)("img", { src: coverUrl, alt: "", className: "absolute inset-0 h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 flex items-center justify-center text-4xl", children: "\uD83D\uDDBC\uFE0F" })), isPrivate ? (0, jsx_runtime_1.jsx)("div", { className: "absolute left-2 top-2", children: (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "neutral", children: "\uD83D\uDD12 Private" }) }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "relative bg-gradient-to-t from-neutral-900/75 to-transparent p-3 pt-10", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-neutral-50", children: title }), meta.length > 0 ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-neutral-200", children: meta.join(' · ') }) : null] })] }));
});
//# sourceMappingURL=AlbumCardV2.js.map