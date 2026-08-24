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
exports.Button = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
/** Per-tone token-class pieces. `default`/`primary` share the primary slot. */
const TONE = {
    default: {
        solid: 'bg-primary text-on-primary',
        ring: 'focus-visible:ring-primary-300',
        text: 'text-primary',
        border: 'border-primary',
        softBg: 'bg-primary-50',
        softHover: 'hover:bg-primary-50',
    },
    primary: {
        solid: 'bg-primary text-on-primary',
        ring: 'focus-visible:ring-primary-300',
        text: 'text-primary',
        border: 'border-primary',
        softBg: 'bg-primary-50',
        softHover: 'hover:bg-primary-50',
    },
    danger: {
        solid: 'bg-danger text-on-danger',
        ring: 'focus-visible:ring-danger',
        text: 'text-danger',
        border: 'border-danger',
        // success/warn/danger have no `-50` ramp → subtle neutral bg + colored text.
        softBg: 'bg-neutral-100',
        softHover: 'hover:bg-neutral-100',
    },
    success: {
        solid: 'bg-success text-on-success',
        ring: 'focus-visible:ring-success',
        text: 'text-success',
        border: 'border-success',
        softBg: 'bg-neutral-100',
        softHover: 'hover:bg-neutral-100',
    },
};
/**
 * Resolve the color-bearing classes for a variant under a tone. With the
 * default tone the five historical variants reproduce their prior class strings
 * byte-for-byte; the additive `soft`/`link`/`elevated` variants and the
 * non-default tones layer on top.
 */
function variantClasses(variant, tone) {
    const t = TONE[tone];
    const neutralText = tone === 'default';
    switch (variant) {
        case 'primary':
            return (0, cn_1.cn)(t.solid, 'hover:opacity-90', t.ring);
        case 'secondary':
            return (0, cn_1.cn)('border', t.border, 'bg-transparent', t.text, t.softHover, t.ring);
        case 'ghost':
            return (0, cn_1.cn)('bg-transparent', neutralText ? 'text-on-surface' : t.text, 'hover:bg-neutral-100', neutralText ? 'focus-visible:ring-neutral-300' : t.ring);
        case 'outline':
            return (0, cn_1.cn)('border border-border bg-transparent', neutralText ? 'text-on-surface' : t.text, 'hover:bg-neutral-100', neutralText ? 'focus-visible:ring-neutral-300' : t.ring);
        // `danger` is a semantic variant that pins the danger accent regardless of
        // tone — kept identical to the historical string.
        case 'danger':
            return 'bg-danger text-on-danger hover:opacity-90 focus-visible:ring-danger';
        case 'soft':
            return (0, cn_1.cn)(t.softBg, t.text, 'hover:opacity-90', t.ring);
        case 'link':
            return (0, cn_1.cn)('bg-transparent', t.text, 'underline underline-offset-2 hover:opacity-80', t.ring);
        case 'elevated':
            return (0, cn_1.cn)('border border-border bg-surface shadow', neutralText ? 'text-on-surface' : t.text, 'hover:bg-neutral-100', neutralText ? 'focus-visible:ring-neutral-300' : t.ring);
    }
}
const SIZE_CLASSES = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
};
/**
 * Themed button. All colors/radii come from the `--xen-*` tokens via the
 * Tailwind preset — no literal colors (kit lint rule).
 *
 * Variants `primary`/`secondary`/`ghost`/`outline`/`danger` and the default
 * tone render exactly as before; `soft`/`link`/`elevated` and the `tone` prop
 * (`danger`/`success`) are additive opt-ins mirroring the native `Button`.
 *
 * Pass `href` to render a styled `<a>` instead of a `<button>` (navigation
 * CTAs); everything else — variants, sizes, ref forwarding — is identical.
 */
exports.Button = React.forwardRef(function Button({ variant = 'primary', size = 'md', tone = 'default', className, type = 'button', href, target, rel, ...rest }, ref) {
    const classes = (0, cn_1.cn)('inline-flex items-center justify-center font-medium transition-colors', 'rounded-[var(--xen-radius-md)]', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1', 'disabled:pointer-events-none disabled:opacity-50', variantClasses(variant, tone), SIZE_CLASSES[size], className);
    if (href !== undefined) {
        // Anchor form. `rest` carries button-typed DOM props (event handlers keyed
        // to HTMLButtonElement); the DOM shape is identical at runtime, so cast to
        // the anchor attribute set for the spread. `type` is intentionally dropped.
        return ((0, jsx_runtime_1.jsx)("a", { ref: ref, href: href, target: target, rel: rel, className: classes, ...rest }));
    }
    return (0, jsx_runtime_1.jsx)("button", { ref: ref, type: type, className: classes, ...rest });
});
//# sourceMappingURL=Button.js.map