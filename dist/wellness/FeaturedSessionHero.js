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
exports.FeaturedSessionHero = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
/**
 * FeaturedSessionHero (web parity) — the home-screen centerpiece: a soft
 * primary-hue gradient ground carrying the featured session, a near-white play
 * button (`bg-on-primary` with a `text-primary` ▶), and a frosted
 * `bg-primary-500` duration chip. A large faint glyph sits behind the copy for
 * warmth. Near-white ink (`text-on-primary` / `text-primary-100`) and the
 * gradient both derive from the brand ramp — token-only colors. The single
 * vivid surface at the top of the screen.
 */
exports.FeaturedSessionHero = React.forwardRef(function FeaturedSessionHero({ eyebrow, title, subtitle, durationMin, coverGlyph = '🌅', onPlay, className, ...rest }, ref) {
    const a11y = `${eyebrow ? eyebrow + ', ' : ''}${title}${subtitle ? ', ' + subtitle : ''}${durationMin != null ? ', ' + durationMin + ' minutes' : ''}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-featured-session-hero": "", className: (0, cn_1.cn)('relative rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-400 to-primary-700 p-[var(--xen-space-lg)] overflow-hidden', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "pointer-events-none absolute right-[var(--xen-space-md)] top-[var(--xen-space-sm)] opacity-[0.16]", style: { fontSize: '4rem' }, children: coverGlyph }), (0, jsx_runtime_1.jsxs)("div", { role: "group", "aria-label": a11y, className: "flex flex-col gap-0.5 pr-[var(--xen-space-xl)]", children: [eyebrow ? ((0, jsx_runtime_1.jsx)("p", { className: "text-xs font-bold uppercase tracking-wide text-primary-100", children: eyebrow })) : null, (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-extrabold text-on-primary", children: title }), subtitle ? (0, jsx_runtime_1.jsx)("p", { className: "mt-0.5 text-sm text-primary-100", children: subtitle }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-lg)] flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Play session", onClick: onPlay, className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u25B6", size: "lg", color: "primary" }) }), durationMin != null ? ((0, jsx_runtime_1.jsx)("span", { className: "rounded-full bg-primary-500 px-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-sm font-bold text-on-primary", children: `${durationMin} min` })) : null] })] }));
});
//# sourceMappingURL=FeaturedSessionHero.js.map