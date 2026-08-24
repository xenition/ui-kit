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
exports.SetlistRowV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const types_1 = require("./types");
/**
 * SetlistRow, redesigned (v3): a **dense playlist line**. The index leads as a
 * tabular number, the title·artist share one line, the duration pins right, and a
 * quiet play glyph trails — hairline-bordered for a long set. A ♪ marks the
 * playing row (never color alone). The opposite of v2's card. Same props,
 * token-only.
 */
exports.SetlistRowV3 = React.forwardRef(function SetlistRowV3({ song, index, playing = false, variant, emptyLabel = 'Empty slot', onClick, onPlay, className, ...rest }, ref) {
    void variant;
    if (!song) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-setlist-row": "", "aria-label": emptyLabel, className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2 opacity-60', className), ...rest, children: [typeof index === 'number' ? (0, jsx_runtime_1.jsx)("span", { className: "w-5 text-right text-xs tabular-nums text-muted", children: index }) : null, (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: emptyLabel })] }));
    }
    const interactive = typeof onClick === 'function';
    const handleKeyDown = (e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick?.(song);
        }
    };
    const dur = (0, types_1.formatDuration)(song.durationSec);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-setlist-row": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${song.title}${song.artist ? `, ${song.artist}` : ''}${playing ? ', now playing' : ''}`, onClick: interactive ? () => onClick?.(song) : undefined, onKeyDown: interactive ? handleKeyDown : undefined, className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('w-5 text-right text-xs tabular-nums', playing ? 'text-primary' : 'text-muted'), children: playing ? '♪' : index }), (0, jsx_runtime_1.jsxs)("p", { className: (0, cn_1.cn)('min-w-0 flex-1 truncate text-sm', playing ? 'font-semibold text-primary' : 'text-on-surface'), children: [song.title, song.artist ? (0, jsx_runtime_1.jsxs)("span", { className: "text-muted", children: [" \u00B7 ", song.artist] }) : null] }), dur && dur !== '—' ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs tabular-nums text-muted", children: dur }) : null, onPlay ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Play ${song.title}`, onClick: (e) => {
                    e.stopPropagation();
                    onPlay(song);
                }, className: "text-sm text-muted hover:text-primary", children: "\u25B6" })) : null] }));
});
//# sourceMappingURL=SetlistRowV3.js.map