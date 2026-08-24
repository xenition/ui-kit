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
exports.TrackPadV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const EmptyState_1 = require("../commerce/EmptyState");
const ACCENTS = ['primary', 'accent', 'success', 'warn', 'danger'];
const SOFT = {
    primary: 'bg-primary/10', accent: 'bg-accent/10', success: 'bg-success/10', warn: 'bg-warn/10', danger: 'bg-danger/10',
};
const SOLID = {
    primary: 'bg-primary text-on-primary', accent: 'bg-accent text-on-accent', success: 'bg-success text-on-success', warn: 'bg-warn text-on-warn', danger: 'bg-danger text-on-danger',
};
const TEXT = {
    primary: 'text-primary', accent: 'text-accent', success: 'text-success', warn: 'text-warn', danger: 'text-danger',
};
/**
 * TrackPad, redesigned (v2): **bold color tiles**. Each pad is a big rounded
 * square tinted by its accent with the glyph over a label; a triggered pad fills
 * solid in its accent with a ring (never color alone — also a bold label). A
 * punchier grid than v1's outlined pads. Same props, token-only.
 */
exports.TrackPadV2 = React.forwardRef(function TrackPadV2({ pads, columns = 4, variant, activePadIds, label, emptyLabel = 'No pads assigned', onPadPress, className, ...rest }, ref) {
    void variant;
    if (pads.length === 0) {
        return ((0, jsx_runtime_1.jsx)(EmptyState_1.EmptyState, { ref: ref, icon: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83E\uDD41", size: "2xl", color: "muted", "aria-label": "Pads" }), title: emptyLabel, className: className, ...rest }));
    }
    const cols = Math.max(1, Math.trunc(Number.isFinite(columns) ? columns : 4));
    const active = new Set(activePadIds ?? []);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-2', className), ...rest, children: [label ? ((0, jsx_runtime_1.jsx)("p", { role: "heading", "aria-level": 3, className: "text-base font-bold text-on-surface", children: label })) : null, (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap", children: pads.map((pad, i) => {
                    const accent = pad.color ?? ACCENTS[i % ACCENTS.length];
                    const isEmpty = pad.empty === true;
                    const isActive = active.has(pad.id);
                    const name = pad.label ?? pad.note ?? `Pad ${i + 1}`;
                    return ((0, jsx_runtime_1.jsx)("div", { className: "p-1", style: { width: `${100 / cols}%` }, children: (0, jsx_runtime_1.jsxs)("button", { type: "button", disabled: isEmpty || !onPadPress, "aria-pressed": isActive, "aria-label": isEmpty ? `${name}, empty` : name, onClick: () => onPadPress?.(pad, i), className: (0, cn_1.cn)('flex aspect-square w-full flex-col items-center justify-center gap-1 rounded-lg transition-transform', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1', isEmpty
                                ? 'bg-neutral-100 opacity-45'
                                : isActive
                                    ? (0, cn_1.cn)(SOLID[accent], 'ring-2 ring-offset-1 scale-95 motion-reduce:scale-100')
                                    : (0, cn_1.cn)(SOFT[accent], 'hover:opacity-90')), children: [pad.glyph ? (0, jsx_runtime_1.jsx)("span", { className: "text-2xl", children: pad.glyph }) : null, (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('max-w-full truncate text-xs font-bold', isEmpty ? 'text-muted' : isActive ? '' : TEXT[accent]), children: isEmpty ? '—' : name })] }) }, pad.id));
                }) })] }));
});
//# sourceMappingURL=TrackPadV2.js.map