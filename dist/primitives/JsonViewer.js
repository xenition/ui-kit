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
exports.JsonViewer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
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
const SCALAR_CLASS = {
    string: 'text-on-surface',
    number: 'text-primary',
    boolean: 'text-warn',
    null: 'text-muted',
};
function Node({ label, value, depth, defaultExpandDepth }) {
    const kind = kindOf(value);
    const branch = kind === 'object' || kind === 'array';
    const [open, setOpen] = React.useState(depth < defaultExpandDepth);
    const indent = { paddingLeft: `${depth * 0.75}rem` };
    if (!branch) {
        const scalarClass = SCALAR_CLASS[kind];
        const display = kind === 'string' ? `"${String(value)}"` : String(value);
        return ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-1 py-0.5 font-mono text-sm", style: indent, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-accent", children: `${label}:` }), (0, jsx_runtime_1.jsx)("span", { className: scalarClass, children: display })] }));
    }
    const entries = Array.isArray(value)
        ? value.map((v, i) => [String(i), v])
        : Object.entries(value);
    const summary = kind === 'array' ? `[${entries.length}]` : `{${entries.length}}`;
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-expanded": open, onClick: () => setOpen((o) => !o), style: indent, className: "flex w-full items-center gap-1 py-0.5 text-left font-mono text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-xs text-muted", children: open ? '▾' : '▸' }), (0, jsx_runtime_1.jsx)("span", { className: "text-accent", children: `${label}:` }), (0, jsx_runtime_1.jsx)("span", { className: "text-muted", children: summary })] }), open
                ? entries.map(([k, v]) => ((0, jsx_runtime_1.jsx)(Node, { label: k, value: v, depth: depth + 1, defaultExpandDepth: defaultExpandDepth }, k)))
                : null] }));
}
/**
 * Web parity of the native `JsonViewer`: a collapsible JSON tree inspector. Keys
 * render in the `accent` token, strings in `on-surface`, numbers in `primary`,
 * booleans in `warn`, and null in `muted`, all monospaced. Branch nodes toggle
 * open on click. `font-mono` is a font family, not a color. All colors/spacing
 * come from the `--xen-*` tokens via Tailwind classes — no literal colors.
 */
exports.JsonViewer = React.forwardRef(function JsonViewer({ className, value, defaultExpandDepth = 1, rootLabel = 'root', ...rest }, ref) {
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('bg-surface rounded-[var(--xen-radius-md)] border border-border p-3', className), ...rest, children: (0, jsx_runtime_1.jsx)(Node, { label: rootLabel, value: value, depth: 0, defaultExpandDepth: defaultExpandDepth }) }));
});
//# sourceMappingURL=JsonViewer.js.map