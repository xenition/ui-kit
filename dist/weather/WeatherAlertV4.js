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
exports.WeatherAlertV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
/** Same tone mapping + EXACT label strings as the base `WeatherAlert`. */
const SEVERITY = {
    advisory: { tone: 'warn', glyph: 'ℹ️', label: 'Advisory' },
    watch: { tone: 'warn', glyph: '⚠️', label: 'Watch' },
    warning: { tone: 'danger', glyph: '⚠️', label: 'Warning' },
    emergency: { tone: 'danger', glyph: '🚨', label: 'Emergency' },
};
// Solid tokens only — no opacity modifiers.
const TONE_GROUND = { warn: 'bg-warn', danger: 'bg-danger' };
const TONE_INK = { warn: 'text-on-warn', danger: 'text-on-danger' };
const TONE_CHIP = { warn: 'bg-on-warn', danger: 'bg-on-danger' };
const TONE_GLYPH = { warn: 'warn', danger: 'danger' };
const TONE_PILL = { warn: 'bg-on-warn text-warn', danger: 'bg-on-danger text-danger' };
const TONE_DISMISS = { warn: 'onWarn', danger: 'onDanger' };
/**
 * WeatherAlert — **filled tone banner** design (v4), web parity of the native
 * `WeatherAlertV4`. A bold, filled severity banner: warn (advisory/watch) or
 * danger (warning/emergency) as the ground, with the severity ALSO spelled out by
 * a glyph in a white chip and a text pill — never color alone. Title, copy and
 * "until" line ride in the contrast-guaranteed on-tone ink. Pass `onClick` to
 * make it tappable (keyboard-activatable) and `onDismiss` for a dismiss button.
 * All colors flow through Tailwind token classes. Same props as
 * {@link WeatherAlertProps}.
 */
exports.WeatherAlertV4 = React.forwardRef(function WeatherAlertV4({ title, description, severity = 'advisory', until, onDismiss, className, onKeyDown, ...rest }, ref) {
    const meta = SEVERITY[severity];
    const t = meta.tone;
    const clickable = rest.onClick != null;
    const interactive = clickable
        ? {
            role: 'button',
            tabIndex: 0,
            onKeyDown: (e) => {
                onKeyDown?.(e);
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    rest.onClick?.(e);
                }
            },
        }
        : { role: 'alert', onKeyDown };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": `${meta.label}: ${title}`, className: (0, cn_1.cn)('flex flex-row gap-3 rounded-[var(--xen-radius-lg)] p-5 shadow-lg', TONE_GROUND[t], clickable && 'cursor-pointer', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full', TONE_CHIP[t]), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: meta.glyph, size: "xl", color: TONE_GLYPH[t], "aria-label": meta.label }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-extrabold uppercase', TONE_PILL[t]), children: meta.label }), (0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('mt-1 text-lg font-extrabold', TONE_INK[t]), children: title }), description ? (0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('mt-1 text-sm', TONE_INK[t]), children: description }) : null, until ? (0, jsx_runtime_1.jsxs)("p", { className: (0, cn_1.cn)('mt-1 text-xs', TONE_INK[t]), children: ["Until ", until] }) : null] }), onDismiss ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Dismiss alert", onClick: (e) => {
                    e.stopPropagation();
                    onDismiss();
                }, className: "shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-warn", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2715", size: "sm", color: TONE_DISMISS[t], "aria-label": "Dismiss" }) })) : null] }));
});
//# sourceMappingURL=WeatherAlertV4.js.map