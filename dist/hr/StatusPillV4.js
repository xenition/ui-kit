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
exports.StatusPillV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * The pill's inset, per size, off the spacing scale.
 *
 * The base wrote `px-2 py-0.5` / `px-2.5 py-0.5` — Tailwind's default rem
 * ramp, which does not move when a seed retunes its rhythm, so the pill kept
 * its old padding inside rows that had tightened around it.
 */
const PAD = {
    sm: 'px-xs py-[calc(var(--xen-space-xs)_/_2)]',
    md: 'px-sm py-[calc(var(--xen-space-xs)_/_2)]',
};
/**
 * **V4 status pill** — the web twin of the native `StatusPillV4`, same props as
 * {@link StatusPill} plus `accessibilityLabel`, `decorative` and `testID`.
 *
 * ## Four changes
 *
 * 1. **The word is read, not the label.** The pill put `aria-label` on a bare
 *    `<span>`. A `<span>` with no role is `generic`, and ARIA forbids naming a
 *    generic element — every browser drops the label. So the pill announced
 *    whatever its text happened to be, and the label the author wrote was
 *    never spoken by anything. The glyph is now `aria-hidden` and the word is
 *    real text, which is what the reader gets either way and is now what the
 *    author is looking at.
 * 2. **The word is inked with an ink slot.** `soft` and `inline` drew the
 *    label with `TONE_TEXT_CLASS` — `text-success`, `text-danger`,
 *    `text-muted`. Those are fill tokens; `muted` in particular is a
 *    decorative ramp step with no contrast promise, and "Cancelled",
 *    "Draft" and "Offline" were all drawn in it. Every tone now resolves to
 *    its `*-text` slot.
 * 3. **`soft` is a tint of its own tone, not `bg-neutral-100`.** A ramp step
 *    mirrors under `[data-theme="dark"]`, so the chip was a pale plate punched
 *    into a dark page. It is now the tone mixed 10% into the card — the same
 *    ground the native twin mixes, so a pending pill is one colour on two
 *    platforms.
 * 4. **The glyph scales with the word.** Native froze the glyph with
 *    `allowFontScaling={false}`, so at 200% Dynamic Type "Approved" grew to
 *    24pt beside a 12pt "✓" that no longer looked attached to it. Neither twin
 *    pins the glyph now: both halves take the pill's own text size.
 */
exports.StatusPillV4 = React.forwardRef(function StatusPillV4({ meta, variant = 'soft', size = 'md', accessibilityLabel, decorative = false, testID, className, style, 'aria-hidden': ariaHidden, ...rest }, ref) {
    if (meta == null)
        return null;
    const solid = variant === 'solid';
    const inline = variant === 'inline';
    return ((0, jsx_runtime_1.jsxs)("span", { ref: ref, "aria-hidden": decorative || ariaHidden, "data-testid": testID, "data-xen-status-pill": variant, className: (0, cn_1.cn)('inline-flex items-center gap-xs font-semibold', size === 'sm' ? 'text-xs' : 'text-sm', inline
            ? (0, tone_v4_1.toneInkClass)(meta.tone)
            : (0, cn_1.cn)('rounded-[var(--xen-radius-full)]', PAD[size], solid
                ? (0, cn_1.cn)((0, tone_v4_1.toneFillClass)(meta.tone), (0, tone_v4_1.toneOnClass)(meta.tone))
                : (0, tone_v4_1.toneInkClass)(meta.tone)), className), 
        // The soft ground is a `color-mix()` over two custom properties, which
        // no utility class bound to a token can say — and being inline it
        // follows `[data-theme]` without a dark rule of its own.
        style: !solid && !inline ? { background: (0, tone_v4_1.toneGround)(meta.tone), ...style } : style, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), accessibilityLabel == null ? ((0, jsx_runtime_1.jsx)("span", { children: meta.label })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.label }), (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: accessibilityLabel })] }))] }));
});
//# sourceMappingURL=StatusPillV4.js.map