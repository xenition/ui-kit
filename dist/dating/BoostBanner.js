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
exports.BoostBanner = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const SPEC = {
    boost: {
        glyph: '⚡',
        accentText: 'text-primary',
        accentBorder: 'border-primary',
        title: 'Be seen first',
        subtitle: 'Boost your profile to the top for 30 minutes.',
        cta: 'Boost me',
    },
    superboost: {
        glyph: '🚀',
        accentText: 'text-accent',
        accentBorder: 'border-accent',
        title: 'Super Boost tonight',
        subtitle: 'Up to 100× more profile views during peak hours.',
        cta: 'Super Boost',
    },
    premium: {
        glyph: '★',
        accentText: 'text-warn',
        accentBorder: 'border-warn',
        title: 'Go Premium',
        subtitle: 'Unlimited likes, see who likes you, and more.',
        cta: 'Upgrade',
    },
};
/**
 * Upsell banner for boosts / premium — the web parity of the native boost banner.
 * Presents a glyph, headline, subtitle, and a CTA, switching to an "active"
 * treatment when an `activeLabel` (countdown) is supplied. The whole card is a
 * keyboard-operable `role="button"` container and the nested CTA/dismiss are real
 * `<button>`s that stop propagation. Token classes only; state is conveyed by
 * text, not color alone.
 */
exports.BoostBanner = React.forwardRef(function BoostBanner({ variant = 'boost', title, subtitle, ctaLabel, onClick, activeLabel, onDismiss, className, ...rest }, ref) {
    const spec = SPEC[variant];
    const active = activeLabel != null;
    const heading = title ?? spec.title;
    const support = active ? activeLabel : subtitle ?? spec.subtitle;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "button", tabIndex: 0, "aria-label": `${heading}. ${support}`, onClick: () => onClick?.(), onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
            }
        }, className: (0, cn_1.cn)('flex cursor-pointer items-center gap-md rounded-[var(--xen-radius-lg)] border bg-surface p-md transition-opacity hover:opacity-90', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', active ? spec.accentBorder : 'border-border', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-11 w-11 items-center justify-center rounded-full border text-xl', spec.accentBorder), "aria-hidden": "true", children: spec.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: heading }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('line-clamp-2 text-sm', active ? spec.accentText : 'text-muted'), children: support })] }), onDismiss ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Dismiss", onClick: (e) => {
                    e.stopPropagation();
                    onDismiss();
                }, className: "text-lg leading-none text-muted", children: "\u2715" })) : ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "sm", onClick: (e) => {
                    e.stopPropagation();
                    onClick?.();
                }, children: ctaLabel ?? spec.cta }))] }));
});
//# sourceMappingURL=BoostBanner.js.map