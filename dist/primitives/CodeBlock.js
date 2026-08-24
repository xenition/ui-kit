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
exports.CodeBlock = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
/**
 * Web parity of the native `CodeBlock`: a monospace `<pre><code>` surface with an
 * optional header (language label + copy button) and an optional line-number
 * gutter. Horizontally scrollable for long lines. `font-mono` is a font family,
 * not a color. All colors/radii/spacing come from the `--xen-*` tokens via
 * Tailwind classes — no literal colors.
 */
exports.CodeBlock = React.forwardRef(function CodeBlock({ className, code, language, lineNumbers = true, onCopy, ...rest }, ref) {
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
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('bg-surface overflow-hidden rounded-[var(--xen-radius-md)] border border-border', className), ...rest, children: [showHeader ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between border-b border-border px-3 py-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted", children: language ?? '' }), onCopy != null ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Copy code", onClick: handleCopy, className: "rounded-[var(--xen-radius-sm)] px-2 py-1 text-xs font-semibold text-primary hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: copied ? 'Copied' : 'Copy' })) : null] })) : null, (0, jsx_runtime_1.jsx)("pre", { className: "overflow-x-auto p-3 font-mono text-sm leading-relaxed text-on-surface", children: (0, jsx_runtime_1.jsxs)("code", { className: "flex", children: [lineNumbers ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "mr-3 select-none text-right text-muted", children: lines.map((_, i) => ((0, jsx_runtime_1.jsx)("span", { className: "block", children: i + 1 }, i))) })) : null, (0, jsx_runtime_1.jsx)("span", { className: "min-w-0", children: lines.map((line, i) => ((0, jsx_runtime_1.jsx)("span", { className: "block whitespace-pre", children: line.length > 0 ? line : ' ' }, i))) })] }) })] }));
});
//# sourceMappingURL=CodeBlock.js.map