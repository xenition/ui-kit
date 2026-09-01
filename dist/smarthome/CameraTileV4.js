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
exports.CameraTileV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const Badge_1 = require("../primitives/Badge");
/**
 * CameraTile — **V4** "ambient" design (web parity of the native V4). The
 * immersive take on a feed tile: a **dark, rounded video frame** (drawn on the
 * `on-surface` token so it reads as a screen in both light and dark, with a
 * `surface`-toned scrim behind the overlays — no literal colors) fills the tile,
 * a **live pulse dot** rides beside the "LIVE"/"OFFLINE" chip when streaming, and
 * a `REC` chip appears while recording. The camera name + timestamp sit in a
 * scrim overlay along the bottom of the frame rather than a separate bar, so the
 * framing stays clean and immersive. Status is always text, never color alone.
 * The tile is a `<button>` firing `onClick`. Same props/behavior as
 * {@link CameraTileProps}; all colors from `--xen-*` token classes (no literals).
 */
exports.CameraTileV4 = React.forwardRef(function CameraTileV4({ name, online = false, recording = false, timestamp, previewHeight = 140, onClick, className, style, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsx)("button", { ref: ref, type: "button", onClick: onClick, style: style, "aria-label": `${name} camera, ${online ? 'online' : 'offline'}`, className: (0, cn_1.cn)('block w-full overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-on-surface text-left shadow-sm transition-opacity hover:opacity-90', className), ...rest, children: (0, jsx_runtime_1.jsxs)("div", { className: "relative flex items-center justify-center bg-on-surface", style: { height: previewHeight }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: online ? '📹' : '🚫', color: "onPrimary", size: "3xl" }), (0, jsx_runtime_1.jsxs)("div", { className: "absolute left-[var(--xen-space-xs)] top-[var(--xen-space-xs)] flex items-center gap-[var(--xen-space-xs)]", children: [online ? ((0, jsx_runtime_1.jsxs)("span", { className: "relative flex h-2 w-2", "aria-hidden": true, children: [(0, jsx_runtime_1.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" }), (0, jsx_runtime_1.jsx)("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-success" })] })) : null, (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: online ? 'success' : 'danger', children: online ? 'LIVE' : 'OFFLINE' }), recording && online ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "danger", children: "REC" }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "absolute inset-x-0 bottom-0 flex items-center justify-between gap-[var(--xen-space-sm)] bg-on-surface/60 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-sm font-semibold text-surface", children: name }), timestamp != null ? (0, jsx_runtime_1.jsx)("span", { className: "shrink-0 text-xs text-surface opacity-80", children: timestamp }) : null] })] }) }));
});
//# sourceMappingURL=CameraTileV4.js.map