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
exports.MixerV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const EmptyState_1 = require("../commerce/EmptyState");
const VolumeFader_1 = require("./VolumeFader");
/**
 * Mixer, redesigned (v3): a **compact fader list**. Each channel is one thin row
 * — name on the left, a bare inline fader filling the middle, and a small mute
 * dot toggle on the right — for embedding many strips in a tight panel. The
 * opposite of v2's tile grid. Same props, token-only.
 */
exports.MixerV3 = React.forwardRef(function MixerV3({ channels, variant, title, emptyLabel = 'No channels', onVolumeChange, onToggleMute, onToggleSolo, className, ...rest }, ref) {
    void variant;
    void onToggleSolo;
    if (channels.length === 0) {
        return ((0, jsx_runtime_1.jsx)(EmptyState_1.EmptyState, { ref: ref, icon: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDF9A\uFE0F", size: "2xl", color: "muted", "aria-label": "Mixer" }), title: emptyLabel, className: className, ...rest }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col', className), ...rest, children: [title ? ((0, jsx_runtime_1.jsx)("p", { role: "heading", "aria-level": 3, className: "mb-1 text-sm font-bold text-on-surface", children: title })) : null, channels.map((ch) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3 border-b border-border py-1.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "w-16 shrink-0 truncate text-xs font-medium text-on-surface", children: ch.name }), (0, jsx_runtime_1.jsx)("div", { className: "min-w-0 flex-1", children: (0, jsx_runtime_1.jsx)(VolumeFader_1.VolumeFader, { label: ch.name, value: ch.volume, muted: ch.muted, variant: "bare", onValueChange: (v) => onVolumeChange?.(ch, v) }) }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-pressed": ch.muted === true, "aria-label": `${ch.muted ? 'Unmute' : 'Mute'} ${ch.name}`, onClick: () => onToggleMute?.(ch), className: (0, cn_1.cn)('flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold', ch.muted ? 'border-warn bg-warn/20 text-warn' : 'border-border text-muted'), children: "M" })] }, ch.id)))] }));
});
//# sourceMappingURL=MixerV3.js.map