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
exports.GlassPanel = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const glass_1 = require("../theme/glass");
const cn_1 = require("./cn");
/**
 * The glass recipe, bound to the compiled `glass` tokens rather than to a
 * hand-picked percentage of `surface`.
 *
 * `--xen-glass-tint` is emitted per scheme, so the panel is frosted-white in
 * light and smoked-charcoal in dark with no configuration — and, more to the
 * point, it is the SAME value the native twin paints, because both platforms
 * compose it through `theme/glass.ts`. The percentages below are the CSS
 * mirror of `composeGlass`: `color-mix` blends in premultiplied alpha, and the
 * native helper does that same sum by hand.
 *
 * `--xen-glass-blur` carries the compiler's blur radius, which the web can
 * actually spend — `backdrop-filter` exists here even though it does not on
 * native. That is the one place the twins legitimately diverge: web gets a real
 * blur, native gets the pre-composited tint that makes the blur unnecessary.
 */
const GLASS_CSS = `
[data-xen-glass] {
  -webkit-backdrop-filter: blur(var(--xen-glass-blur));
  backdrop-filter: blur(var(--xen-glass-blur));
}
[data-xen-glass="soft"] { background-color: ${(0, glass_1.composeGlassCss)('soft')}; }
[data-xen-glass="regular"] { background-color: ${(0, glass_1.composeGlassCss)('regular')}; }
[data-xen-glass="strong"] { background-color: ${(0, glass_1.composeGlassCss)('strong')}; }
[data-xen-glass][data-bordered="true"] { border: 1px solid var(--xen-glass-border); }
`;
/**
 * Translucent panel — the "glass card" treatment, on tokens.
 *
 * ## Legibility
 *
 * A panel over unknown artwork is where text quietly stops being readable, so
 * the alpha is not a taste knob. `theme/glass-legibility.spec.ts` composites
 * the tint over pure black and pure white — the extremes any real image sits
 * between — and measures `on-surface` against the result. The compiler's tint
 * clears WCAG AA with roughly 5.6:1 at worst, and loses that margin once it is
 * thinned by 12%. `intensity` therefore starts at the token and can only get
 * more opaque.
 *
 * The corollary: put `text-on-surface` on a glass panel, not `text-muted`.
 * `muted` carries no contrast promise even on an opaque surface and measurably
 * fails on glass.
 *
 * ## §8
 *
 * `design.md` bans "glassmorphism without purpose". This is the purpose-built
 * exception, not a default background — compose it under `ProductMock`, over
 * `AuroraBackground`, or as a floating chrome bar, where something is genuinely
 * layered over something else. The V4 surfaces reach for it only when the seed
 * asks for `depth: 'glass'`.
 */
exports.GlassPanel = React.forwardRef(function GlassPanel({ intensity = 'regular', bordered = true, className, children, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)('xen-glass-styles', GLASS_CSS);
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-glass": intensity, "data-bordered": bordered ? 'true' : 'false', className: (0, cn_1.cn)('rounded-lg', className), ...rest, children: children }));
});
//# sourceMappingURL=GlassPanel.js.map