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
exports.GenerativeCoverV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const GenerativeCover_1 = require("./GenerativeCover");
/**
 * GenerativeCover — **V4** "showcase" design (web parity of the native V4).
 *
 * Same effect engine as the base {@link GenerativeCover}: deterministic
 * generative SVG "print plates", seeded from `seed`, drawn in two token color
 * roles (`ink` over `paper`). The V4 is a *refined* take — **crisper,
 * token-driven** generative art. It reuses the base's shared machinery
 * (`hashSeed`, `COVER_FORMS`) rather than reinventing the seed logic, and
 * renders through the base component so every one of the six `COVER_FORMS`
 * (`arc`/`bands`/`orbit`/`grid`/`wave`/`stack`) is honored exactly. The refinement
 * is confident defaults: a deeper `primary-700` ink over a soft `neutral-50`
 * paper for higher-contrast, sharper plates, plus a whisper-thin seeded accent
 * hairline framing the plate so the art reads bolder while staying subtle.
 *
 * `seed`/`form`/`ink`/`paper`/`label` all pass straight through; explicit
 * `ink`/`paper` override the V4 defaults. Every color is a `--xen-*` token — no
 * literals; an invalid color role still throws at render (inherited from the
 * base). **Static SVG — no motion, nothing to reduce**, same as the base.
 */
exports.GenerativeCoverV4 = React.forwardRef(function GenerativeCoverV4({ seed, form, ink = 'primary-700', paper = 'neutral-50', label, className, style, ...rest }, ref) {
    // Reuse the base's seed machinery — do not reinvent it — to derive the same
    // resolved form the base would, so the V4 accent frame matches the plate.
    const hash = (0, GenerativeCover_1.hashSeed)(seed);
    const resolvedForm = form ?? GenerativeCover_1.COVER_FORMS[hash % GenerativeCover_1.COVER_FORMS.length];
    // Seeded accent-vs-primary hairline: a token-only frame, alternating role.
    const frameVar = hash % 2 === 0 ? 'var(--xen-accent-400)' : 'var(--xen-primary-400)';
    return ((0, jsx_runtime_1.jsx)("span", { "data-xen-v4-cover": resolvedForm, className: (0, cn_1.cn)('relative block h-full w-full overflow-hidden', className), style: {
            boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${frameVar} 45%, transparent)`,
            ...style,
        }, ...(label !== undefined ? {} : { 'aria-hidden': true }), children: (0, jsx_runtime_1.jsx)(GenerativeCover_1.GenerativeCover, { ref: ref, seed: seed, form: form, ink: ink, paper: paper, label: label, ...rest }) }));
});
//# sourceMappingURL=GenerativeCoverV4.js.map