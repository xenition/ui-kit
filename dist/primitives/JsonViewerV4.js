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
exports.JsonViewerV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const v4_data_1 = require("./internal/v4-data");
function kindOf(value) {
    if (value === null || value === undefined)
        return 'null';
    if (Array.isArray(value))
        return 'array';
    const t = typeof value;
    if (t === 'object')
        return 'object';
    if (t === 'number')
        return 'number';
    if (t === 'boolean')
        return 'boolean';
    return 'string';
}
/**
 * Scalar → ink.
 *
 * Every one is a `*Text` slot, never a fill. `text-primary` and `text-warn` —
 * what this twin used — are BACKGROUND colours: the compiler guarantees
 * `on-primary` ON `primary` and nothing at all about `primary` as ink on
 * `surface`. The native twin was fixed for exactly this (its audit found keys
 * measuring 1.43:1 in light mode) and its web twin was left behind. Syntax
 * colour IS text, so it takes the text forms.
 */
const SCALAR_CLASS = {
    string: 'text-on-surface',
    number: 'text-primary-text',
    boolean: 'text-warn-text',
    null: 'text-muted-text',
};
/** Keys, in the accent's contrast-safe text form for the same reason. */
const KEY_CLASS = 'text-accent-text';
function Node({ label, value, depth, defaultExpandDepth }) {
    const kind = kindOf(value);
    const branch = kind === 'object' || kind === 'array';
    const [open, setOpen] = React.useState(depth < defaultExpandDepth);
    // Depth is carried by a guide at the level's left edge rather than by
    // padding alone.
    const level = depth > 0
        ? 'ml-[var(--xen-space-sm)] pl-[var(--xen-space-sm)]'
        : '';
    const levelAttrs = depth > 0 ? { 'data-xen-v4-json-level': '' } : {};
    if (!branch) {
        const scalarClass = SCALAR_CLASS[kind];
        const display = kind === 'string' ? `"${String(value)}"` : String(value);
        return ((0, jsx_runtime_1.jsxs)("div", { ...levelAttrs, className: (0, cn_1.cn)('flex gap-[var(--xen-space-xs)] py-0.5 font-mono text-sm', level), children: [(0, jsx_runtime_1.jsx)("span", { className: KEY_CLASS, children: `${label}:` }), (0, jsx_runtime_1.jsx)("span", { className: scalarClass, children: display })] }));
    }
    const entries = Array.isArray(value)
        ? value.map((v, i) => [String(i), v])
        : Object.entries(value);
    const summary = kind === 'array' ? `[${entries.length}]` : `{${entries.length}}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ...levelAttrs, className: level, children: [(0, jsx_runtime_1.jsxs)("button", { type: "button", "data-xen-v4-json-branch": "", "aria-expanded": open, onClick: () => setOpen((o) => !o), className: (0, cn_1.cn)('flex w-full items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-sm)]', 'py-0.5 text-left font-mono text-sm transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-xs text-muted-text", children: open ? '▾' : '▸' }), (0, jsx_runtime_1.jsx)("span", { className: KEY_CLASS, children: `${label}:` }), (0, jsx_runtime_1.jsx)("span", { className: "text-muted-text", children: summary })] }), open
                ? entries.map(([k, v]) => ((0, jsx_runtime_1.jsx)(Node, { label: k, value: v, depth: depth + 1, defaultExpandDepth: defaultExpandDepth }, k)))
                : null] }));
}
/**
 * **V4 JSON viewer** — the web twin of the native `JsonViewerV4`, same props as
 * {@link JsonViewer}, a different design line.
 *
 * Four changes:
 *
 * 1. **The syntax colours become readable.** `text-accent`, `text-primary` and
 *    `text-warn` are FILL colours; the compiler makes no contrast promise
 *    about any of them as ink on `surface`. The native twin was fixed for this
 *    — its audit found keys measuring 1.43:1 in light mode — and this twin was
 *    left behind, so the same viewer was legible on a phone and not in a
 *    browser. All five roles now take their `*Text` forms.
 * 2. **A calm, recessed ground.** The tree sat on `bg-surface`, the same
 *    colour as the page. It sinks by the same 4% neutral step `CodeBlockV4`
 *    and the V4 tables use, mixed from the two scheme-resolved slots so it
 *    inverts with the scheme.
 * 3. **Depth gets a guide, not just an indent.** Each level draws a hairline
 *    at its left edge, and the indent step becomes a token instead of the
 *    literal `0.75rem` that made this twin a different shape from its native
 *    counterpart. This is the one place a rule earns itself against §9: an
 *    indent with nothing in it stops telling you which parent a row belongs to
 *    as soon as the parent scrolls off the top, and re-finding that is the
 *    entire task a JSON inspector exists for (§33).
 * 4. **The focus ring is a token.** `ring-primary-300` was a ramp step;
 *    `ring-ring` is the semantic slot, so the ring survives a hue change.
 *
 * **No gradient and no new palette.** Five roles all drawn from seed tokens is
 * the whole colour system here, and §35.5 would not thank us for a sixth.
 */
exports.JsonViewerV4 = React.forwardRef(function JsonViewerV4({ className, value, defaultExpandDepth = 1, rootLabel = 'root', ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_data_1.V4_CODE_STYLE_ID, v4_data_1.V4_CODE_CSS);
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-v4-code": "", "data-xen-v4-code-body": "", className: (0, cn_1.cn)('rounded-[var(--xen-radius-md)] border border-border p-[var(--xen-space-md)]', className), ...rest, children: (0, jsx_runtime_1.jsx)(Node, { label: rootLabel, value: value, depth: 0, defaultExpandDepth: defaultExpandDepth }) }));
});
//# sourceMappingURL=JsonViewerV4.js.map