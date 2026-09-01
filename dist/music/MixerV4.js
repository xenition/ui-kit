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
exports.MixerV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const EmptyState_1 = require("../commerce/EmptyState");
const VolumeFaderV4_1 = require("./VolumeFaderV4");
const types_1 = require("./types");
/**
 * Mixer — **V4** "session" design (web parity of the native V4). The tactile DAW
 * take on a channel mixer: each `MixerChannel` becomes a rounded control surface
 * (`bg-surface` + `border`) housing a `VolumeFaderV4`, a mute toggle, and (in
 * `full`) a solo toggle plus a token-well level meter. Every strip keeps its
 * **channel accent** — cycled through the module's semantic slots via
 * `padAccentKey` and applied only through the `ACCENT_*` token classes (never a
 * literal). Armed / mute / solo states light with a soft-token fill *and* a
 * glyph/label marker (never color alone), surfaced in `aria-pressed` + label.
 * Honors both `variant`s (`full` / `compact`), identical props/behavior to
 * {@link MixerProps}. Renders an `EmptyState` when there are no channels.
 * Token-only styling.
 */
exports.MixerV4 = React.forwardRef(function MixerV4({ channels, variant = 'full', title, emptyLabel = 'No channels', onVolumeChange, onToggleMute, onToggleSolo, className, ...rest }, ref) {
    if (channels.length === 0) {
        return ((0, jsx_runtime_1.jsx)(EmptyState_1.EmptyState, { ref: ref, icon: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDF9A\uFE0F", size: "2xl", color: "muted", "aria-label": "Mixer" }), title: emptyLabel, className: className, ...rest }));
    }
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)]', className), ...rest, children: [title ? ((0, jsx_runtime_1.jsx)("p", { role: "heading", "aria-level": 3, className: "text-base font-bold text-on-surface", children: title })) : null, channels.map((ch, index) => {
                // The channel accent — cycled through the module's semantic slots, so it
                // always traces to a token class (never a literal color).
                const accent = (0, types_1.padAccentKey)(index);
                const armed = ch.armed === true;
                return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border bg-surface p-[var(--xen-space-sm)] transition-colors', armed ? types_1.ACCENT_BORDER_CLASS[accent] : 'border-border'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('h-2 w-2 shrink-0 rounded-full', types_1.ACCENT_BG_CLASS[accent]) }), armed ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('inline-flex items-center gap-1 text-xs font-bold', types_1.ACCENT_TEXT_CLASS[accent]), children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u25CF", size: "xs", color: "danger", "aria-label": "Record armed" }), "ARM"] })) : null] }), (0, jsx_runtime_1.jsx)(VolumeFaderV4_1.VolumeFaderV4, { label: ch.name, value: ch.volume, muted: ch.muted, onValueChange: (v) => onVolumeChange?.(ch, v) }), variant === 'full' ? (0, jsx_runtime_1.jsx)(Meter, { level: ch.level, muted: ch.muted, accent: accent }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(StripToggle, { label: "M", glyph: "\uD83D\uDD07", a11y: `${ch.muted ? 'Unmute' : 'Mute'} ${ch.name}`, active: ch.muted === true, activeClass: "border-warn bg-warn/20 text-warn", onClick: () => onToggleMute?.(ch) }), variant === 'full' ? ((0, jsx_runtime_1.jsx)(StripToggle, { label: "S", glyph: "\u25CE", a11y: `${ch.soloed ? 'Unsolo' : 'Solo'} ${ch.name}`, active: ch.soloed === true, activeClass: (0, cn_1.cn)(types_1.ACCENT_BORDER_CLASS[accent], types_1.ACCENT_STRONG_BG_CLASS[accent], types_1.ACCENT_TEXT_CLASS[accent]), onClick: () => onToggleSolo?.(ch) })) : null] })] }, ch.id));
            })] }));
});
function Meter({ level, muted, accent, }) {
    const pct = muted ? 0 : (0, types_1.clamp)((level ?? 0) * 100, 0, 100);
    // The channel accent tints the meter fill (token class only); overloads still
    // warn/danger so a hot signal is never signalled by color alone below.
    const tone = pct > 85 ? 'bg-danger' : pct > 60 ? 'bg-warn' : types_1.ACCENT_BG_CLASS[accent];
    return ((0, jsx_runtime_1.jsx)("div", { role: "img", "aria-label": `Output level ${Math.round(pct)} percent`, className: "h-1 overflow-hidden rounded-full bg-primary/15", children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full', tone), style: { width: `${pct}%` } }) }));
}
function StripToggle({ label, glyph, a11y, active, activeClass, onClick, }) {
    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-pressed": active, "aria-label": a11y, onClick: onClick, className: (0, cn_1.cn)('inline-flex min-w-[44px] items-center justify-center gap-1 rounded-[var(--xen-radius-sm)] border px-[var(--xen-space-sm)] py-1 text-center text-xs font-bold tabular-nums transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1', active ? activeClass : 'border-border bg-transparent text-muted hover:opacity-80'), children: [active ? (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: glyph }) : null, label] }));
}
//# sourceMappingURL=MixerV4.js.map