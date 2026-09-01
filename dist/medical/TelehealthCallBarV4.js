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
exports.TelehealthCallBarV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const Button_1 = require("../primitives/Button");
const Icon_1 = require("../primitives/Icon");
const internal_1 = require("./internal");
/** Call lifecycle state → glyph + label + token tone (never color alone). */
const STATE_META = {
    idle: { label: 'Ready to connect', glyph: '📹', tone: 'muted' },
    connecting: { label: 'Connecting…', glyph: '⏳', tone: 'primary' },
    active: { label: 'In call', glyph: '🟢', tone: 'success' },
    ended: { label: 'Call ended', glyph: '⏹', tone: 'muted' },
};
function RoundControl({ glyph, label, danger = false, onClick }) {
    return ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": label, onClick: onClick, className: (0, cn_1.cn)('inline-flex h-11 w-11 items-center justify-center rounded-full text-xl transition-opacity hover:opacity-80', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1', danger ? 'bg-danger text-on-danger' : 'bg-primary/10 text-on-surface'), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: glyph }) }));
}
/**
 * TelehealthCallBar — **V4** "clinic" design (web parity of the native V4). A
 * calm, persistent call bar on an elevated rounded surface with a soft shadow.
 * Shows the participant's identity and a labelled connection-state marker
 * (glyph + label + token tone, never color alone) for each `state`:
 * `idle` / `connecting` / `active` / `ended`. While `idle` a "Join call" CTA is
 * shown; while `active` the standard round controls appear (mute, camera, and a
 * `danger`-token labelled End-call button), each a ≥44px tap target. Mute/camera
 * state is conveyed by a glyph swap + `aria-label`. Identical props/behavior to
 * {@link TelehealthCallBarProps}. All colors from `--xen-*` token classes (no
 * literals). Informational UI only — not a medical device.
 */
exports.TelehealthCallBarV4 = React.forwardRef(function TelehealthCallBarV4({ participantName, participantAvatar, state = 'idle', elapsed, muted = false, cameraOff = false, onJoin, onToggleMute, onToggleCamera, onEnd, className, ...rest }, ref) {
    const meta = STATE_META[state] ?? STATE_META.idle;
    const isActive = state === 'active';
    const isIdle = state === 'idle';
    const shell = 'rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-telehealth-call-bar": "", "aria-label": `Telehealth call with ${participantName}, ${meta.label}${isActive && elapsed ? `, ${elapsed}` : ''}`, className: (0, cn_1.cn)(shell, 'flex items-center gap-[var(--xen-space-md)] p-[var(--xen-space-md)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: participantAvatar, name: participantName, size: "md" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-surface", children: participantName }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('inline-flex items-center gap-[var(--xen-space-xs)] truncate text-xs font-semibold', internal_1.TEXT_TONE[meta.tone]), children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: meta.glyph, size: "xs" }), meta.label, isActive && elapsed ? ((0, jsx_runtime_1.jsxs)("span", { className: "tabular-nums font-bold text-on-surface", children: ["  \u00B7  ", elapsed] })) : null] })] }), isIdle ? ((0, jsx_runtime_1.jsxs)(Button_1.Button, { variant: "primary", onClick: () => onJoin?.(), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "mr-[var(--xen-space-xs)]", children: "\uD83D\uDCDE" }), "Join call"] })) : state === 'ended' ? null : ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)(RoundControl, { glyph: muted ? '🔇' : '🎙', label: muted ? 'Unmute microphone' : 'Mute microphone', onClick: () => onToggleMute?.(!muted) }), (0, jsx_runtime_1.jsx)(RoundControl, { glyph: cameraOff ? '📷' : '📹', label: cameraOff ? 'Turn camera on' : 'Turn camera off', onClick: () => onToggleCamera?.(!cameraOff) }), (0, jsx_runtime_1.jsx)(RoundControl, { glyph: "\uD83D\uDCF5", label: "End call", danger: true, onClick: () => onEnd?.() })] }))] }));
});
//# sourceMappingURL=TelehealthCallBarV4.js.map