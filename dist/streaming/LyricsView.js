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
exports.LyricsView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const types_1 = require("./types");
/**
 * LyricsView — the **V4 "spotlight"** lyric sheet (web). Deliberately calm: a
 * scrollable list on the plain `surface` (NOT the gradient — that's reserved for
 * the hero moments), with the `activeIndex` line emphasized in bold `on-surface`
 * / `primary` and the rest muted. When `onLineTap` is set each line becomes a
 * seek button. The active line auto-scrolls into view. All colors from `--xen-*`
 * token classes — no literal hex; dark-mode safe.
 */
exports.LyricsView = React.forwardRef(function LyricsView({ lines, activeIndex, onLineTap, className, ...rest }, ref) {
    const activeRef = React.useRef(null);
    React.useEffect(() => {
        activeRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }, [activeIndex]);
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('overflow-y-auto rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)]', className), ...rest, children: (0, jsx_runtime_1.jsx)("ol", { className: "flex flex-col gap-[var(--xen-space-md)]", children: lines.map((line, i) => {
                const active = i === activeIndex;
                const tappable = !!onLineTap;
                const content = ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('block text-left leading-snug transition-colors', active ? 'text-xl font-extrabold text-primary' : 'text-lg font-medium text-muted'), children: line.text }));
                return ((0, jsx_runtime_1.jsx)("li", { ref: active ? activeRef : undefined, "aria-current": active ? 'true' : undefined, children: tappable ? ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => onLineTap(i), "aria-label": line.time != null ? `Seek to ${(0, types_1.formatTime)(line.time)}: ${line.text}` : line.text, className: "block w-full min-h-11 rounded-[var(--xen-radius-md)] px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-left transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: content })) : ((0, jsx_runtime_1.jsx)("div", { className: "px-[var(--xen-space-sm)]", children: content })) }, i));
            }) }) }));
});
//# sourceMappingURL=LyricsView.js.map