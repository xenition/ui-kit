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
exports.CameraTile = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const Badge_1 = require("../primitives/Badge");
/**
 * A camera feed tile — a token-surface preview area (the kit ships no image
 * decoder, so an offline/placeholder frame is drawn with a `muted` glyph) topped
 * by status {@link Badge}s: a "LIVE" (success) / "OFFLINE" (danger) chip and a
 * "REC" chip when recording. Status is always text, never color alone. The name
 * and timestamp sit in a footer bar. The tile is a `<button>` firing `onClick`.
 * No literal colors.
 */
exports.CameraTile = React.forwardRef(function CameraTile({ name, online = false, recording = false, timestamp, previewHeight = 140, onClick, className, style }, ref) {
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", onClick: onClick, style: style, "aria-label": `${name} camera, ${online ? 'online' : 'offline'}`, className: (0, cn_1.cn)('block w-full overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface text-left transition-opacity hover:opacity-90', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative flex items-center justify-center bg-neutral-200", style: { height: previewHeight }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: online ? '📹' : '🚫', color: "muted", size: "3xl" }), (0, jsx_runtime_1.jsxs)("div", { className: "absolute left-[var(--xen-space-xs)] top-[var(--xen-space-xs)] flex gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: online ? 'success' : 'danger', children: online ? 'LIVE' : 'OFFLINE' }), recording && online ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "danger", children: "REC" }) : null] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between p-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-sm font-semibold text-on-surface", children: name }), timestamp != null ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: timestamp }) : null] })] }));
});
//# sourceMappingURL=CameraTile.js.map