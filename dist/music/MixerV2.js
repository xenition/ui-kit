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
exports.MixerV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const EmptyState_1 = require("../commerce/EmptyState");
const VolumeFader_1 = require("./VolumeFader");
/**
 * Mixer, redesigned (v2): a **console of channel tiles**. Each strip is its own
 * bordered card in a responsive two-column grid — name header, a labelled fader,
 * and pill Mute/Solo toggles — rather than v1's flat stack. Elevated feel. Same
 * props, token-only.
 */
exports.MixerV2 = React.forwardRef(function MixerV2({ channels, variant = 'full', title, emptyLabel = 'No channels', onVolumeChange, onToggleMute, onToggleSolo, className, ...rest }, ref) {
    if (channels.length === 0) {
        return ((0, jsx_runtime_1.jsx)(EmptyState_1.EmptyState, { ref: ref, icon: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDF9A\uFE0F", size: "2xl", color: "muted", "aria-label": "Mixer" }), title: emptyLabel, className: className, ...rest }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-3', className), ...rest, children: [title ? ((0, jsx_runtime_1.jsx)("p", { role: "heading", "aria-level": 3, className: "text-base font-bold text-on-surface", children: title })) : null, (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-2 gap-2", children: channels.map((ch) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-2 rounded-lg bg-surface p-3 shadow-sm", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs font-semibold text-on-surface", children: ch.name }), (0, jsx_runtime_1.jsx)(VolumeFader_1.VolumeFader, { label: ch.name, value: ch.volume, muted: ch.muted, variant: "bare", onValueChange: (v) => onVolumeChange?.(ch, v) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-1.5", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-pressed": ch.muted === true, "aria-label": `${ch.muted ? 'Unmute' : 'Mute'} ${ch.name}`, onClick: () => onToggleMute?.(ch), className: (0, cn_1.cn)('flex-1 rounded-md border px-2 py-1 text-xs font-bold transition-colors', ch.muted ? 'border-warn bg-warn/20 text-warn' : 'border-border text-muted hover:bg-neutral-50'), children: "M" }), variant === 'full' ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-pressed": ch.soloed === true, "aria-label": `${ch.soloed ? 'Unsolo' : 'Solo'} ${ch.name}`, onClick: () => onToggleSolo?.(ch), className: (0, cn_1.cn)('flex-1 rounded-md border px-2 py-1 text-xs font-bold transition-colors', ch.soloed ? 'border-primary bg-primary/20 text-primary' : 'border-border text-muted hover:bg-neutral-50'), children: "S" })) : null] })] }, ch.id))) })] }));
});
//# sourceMappingURL=MixerV2.js.map