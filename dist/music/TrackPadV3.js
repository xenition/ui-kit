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
exports.TrackPadV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const EmptyState_1 = require("../commerce/EmptyState");
const ACCENTS = ['primary', 'accent', 'success', 'warn', 'danger'];
const DOT = {
    primary: 'bg-primary', accent: 'bg-accent', success: 'bg-success', warn: 'bg-warn', danger: 'bg-danger',
};
/**
 * TrackPad, redesigned (v3): a **compact pad strip**. Small square pads wrap in a
 * tight grid with the label beneath each; a triggered pad shows a filled accent
 * dot and a bold label (never color alone). The minimal counterpart to v2's bold
 * tiles. Same props, token-only.
 */
exports.TrackPadV3 = React.forwardRef(function TrackPadV3({ pads, columns = 6, variant, activePadIds, label, emptyLabel = 'No pads assigned', onPadPress, className, ...rest }, ref) {
    void variant;
    if (pads.length === 0) {
        return ((0, jsx_runtime_1.jsx)(EmptyState_1.EmptyState, { ref: ref, icon: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83E\uDD41", size: "2xl", color: "muted", "aria-label": "Pads" }), title: emptyLabel, className: className, ...rest }));
    }
    const cols = Math.max(1, Math.trunc(Number.isFinite(columns) ? columns : 6));
    const active = new Set(activePadIds ?? []);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-1.5', className), ...rest, children: [label ? ((0, jsx_runtime_1.jsx)("p", { role: "heading", "aria-level": 3, className: "text-sm font-bold text-on-surface", children: label })) : null, (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap", children: pads.map((pad, i) => {
                    const accent = pad.color ?? ACCENTS[i % ACCENTS.length];
                    const isEmpty = pad.empty === true;
                    const isActive = active.has(pad.id);
                    const name = pad.label ?? pad.note ?? `Pad ${i + 1}`;
                    return ((0, jsx_runtime_1.jsxs)("div", { className: "p-0.5", style: { width: `${100 / cols}%` }, children: [(0, jsx_runtime_1.jsxs)("button", { type: "button", disabled: isEmpty || !onPadPress, "aria-pressed": isActive, "aria-label": isEmpty ? `${name}, empty` : name, onClick: () => onPadPress?.(pad, i), className: (0, cn_1.cn)('relative flex aspect-square w-full items-center justify-center rounded border transition-colors', 'focus-visible:outline-none focus-visible:ring-2', isEmpty ? 'border-border bg-neutral-100 opacity-45' : isActive ? 'border-on-surface bg-neutral-100' : 'border-border bg-surface hover:bg-neutral-50'), children: [isActive ? (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)('absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full', DOT[accent]) }) : null, pad.glyph ? (0, jsx_runtime_1.jsx)("span", { className: "text-base", children: pad.glyph }) : (0, jsx_runtime_1.jsx)("span", { className: "text-[10px] text-muted", children: name.slice(0, 2) })] }), (0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('mt-0.5 truncate text-center text-[10px]', isActive ? 'font-bold text-on-surface' : 'text-muted'), children: isEmpty ? '—' : name })] }, pad.id));
                }) })] }));
});
//# sourceMappingURL=TrackPadV3.js.map