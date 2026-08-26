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
exports.CodeBlockV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const v4_data_1 = require("./internal/v4-data");
/**
 * **V4 code block** — the web twin of the native `CodeBlockV4`, same props as
 * {@link CodeBlock}, a different design line.
 *
 * Code is the one content in this kit that is read character by character, so
 * the V4 answer is the opposite of decoration: a calmer surface and one more
 * piece of structure.
 *
 * Four changes:
 *
 * 1. **A calm, recessed ground.** The base painted the code on `bg-surface` —
 *    the same colour as the page — so a block sat on a page it could not be
 *    distinguished from except by its border. V4 sinks the `<pre>` by the same
 *    4% neutral step the V4 tables band with, mixed from `--xen-on-surface`
 *    into `--xen-surface` so it darkens a light page and lightens a dark one
 *    with no dark rule of its own.
 * 2. **A gutter with an edge.** A line number the reader is counting to needs
 *    something to stop at; with only `mr-3` the numbers read as a first column
 *    of code. That is the second and last rule on the surface — everything
 *    else is spacing (§9).
 * 3. **The header is chrome, the body is content.** The header stays on
 *    `surface` while the body sinks, so the two layers are told apart by
 *    ground rather than by another border.
 * 4. **The copy button stops using the wrong three tokens.** `text-primary` is
 *    a FILL colour with no contrast promise as ink on `surface` —
 *    `text-primary-text` is that promise. `hover:bg-neutral-100` is the
 *    light-oriented ramp and turns into a pale slab in dark mode.
 *    `ring-primary-300` is a ramp step where the semantic `primary` slot
 *    belongs. All three are the same mistake: reaching past the token that
 *    means the thing for one that merely looks like it.
 *
 * **No gradient, anywhere near this.** §35.11 keeps gradients for a hero and
 * one primary action; a brand sweep behind code is decoration laid over
 * something read one glyph at a time. **No syntax colours either** — the base
 * highlights nothing, and inventing a palette here would be a second colour
 * system living outside the seed.
 *
 * `font-mono` is a font family, not a colour. Monospace figures are tabular by
 * construction, so the gutter needs no numeral setting of its own.
 */
exports.CodeBlockV4 = React.forwardRef(function CodeBlockV4({ className, code, language, lineNumbers = true, onCopy, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_data_1.V4_CODE_STYLE_ID, v4_data_1.V4_CODE_CSS);
    const lines = code.replace(/\n$/, '').split('\n');
    const showHeader = language != null || onCopy != null;
    const [copied, setCopied] = React.useState(false);
    const handleCopy = () => {
        try {
            void navigator?.clipboard?.writeText?.(code);
        }
        catch {
            /* clipboard unavailable — the onCopy callback still fires */
        }
        onCopy?.(code);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1500);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-v4-code": "", className: (0, cn_1.cn)('overflow-hidden rounded-[var(--xen-radius-md)] border border-border bg-surface', className), ...rest, children: [showHeader ? (
            // Chrome, not content: it stays on `surface` while the body sinks.
            (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between border-b border-border px-[var(--xen-space-md)] py-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted-text", children: language ?? '' }), onCopy != null ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Copy code", "data-xen-v4-copy": "", onClick: handleCopy, className: (0, cn_1.cn)('min-h-[var(--xen-space-xl)] rounded-[var(--xen-radius-sm)] px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]', 'text-xs font-semibold text-primary-text transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: copied ? 'Copied' : 'Copy' })) : null] })) : null, (0, jsx_runtime_1.jsx)("pre", { "data-xen-v4-code-body": "", className: "overflow-x-auto p-[var(--xen-space-md)] font-mono text-sm leading-relaxed text-on-surface", children: (0, jsx_runtime_1.jsxs)("code", { className: "flex", children: [lineNumbers ? (
                        // The gutter's one rule: a number the reader is counting to needs
                        // an edge to stop at.
                        (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", "data-xen-v4-gutter": "", className: "mr-[var(--xen-space-md)] select-none pr-[var(--xen-space-md)] text-right text-muted-text", children: lines.map((_, i) => ((0, jsx_runtime_1.jsx)("span", { className: "block", children: i + 1 }, i))) })) : null, (0, jsx_runtime_1.jsx)("span", { className: "min-w-0", children: lines.map((line, i) => ((0, jsx_runtime_1.jsx)("span", { className: "block whitespace-pre", children: line.length > 0 ? line : ' ' }, i))) })] }) })] }));
});
//# sourceMappingURL=CodeBlockV4.js.map