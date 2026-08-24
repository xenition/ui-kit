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
exports.JsonViewer = JsonViewer;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
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
function Node({ label, value, depth, defaultExpandDepth }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const kind = kindOf(value);
    const branch = kind === 'object' || kind === 'array';
    const [open, setOpen] = React.useState(depth < defaultExpandDepth);
    /*
      Syntax highlighting is text by definition, so every colour here is a `*Text`
      slot rather than the fill it was.
  
      `accent`, `primary` and `warn` are background colours — the compiler
      guarantees `onAccent` on `accent`, and nothing at all about `accent` on
      `surface`. A viewer whose keys measure 1.43:1 is a viewer you cannot read,
      which the audit found in light mode. The `*Text` forms are the same hues
      pushed until they clear AA, and unchanged wherever the fill already did.
    */
    const keyStyle = {
        color: colors.accentText,
        fontFamily: 'monospace',
        fontSize: tokens.typography.scale.sm,
    };
    const scalarColor = kind === 'string'
        ? colors.onSurface
        : kind === 'number'
            ? colors.primaryText
            : kind === 'boolean'
                ? colors.warnText
                : colors.muted;
    const indent = { paddingLeft: depth * tokens.spacing.md };
    if (!branch) {
        const display = kind === 'string' ? `"${String(value)}"` : String(value);
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flexDirection: 'row', gap: tokens.spacing.xs, paddingVertical: tokens.spacing.xs / 2 }, indent], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: keyStyle, children: `${label}:` }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: scalarColor, fontFamily: 'monospace', fontSize: tokens.typography.scale.sm }, children: display })] }));
    }
    const entries = Array.isArray(value)
        ? value.map((v, i) => [String(i), v])
        : Object.entries(value);
    const summary = kind === 'array' ? `[${entries.length}]` : `{${entries.length}}`;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { expanded: open }, onPress: () => setOpen((o) => !o), style: [{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, paddingVertical: tokens.spacing.xs / 2 }, indent], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontFamily: 'monospace', fontSize: tokens.typography.scale.xs }, children: open ? '▾' : '▸' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: keyStyle, children: `${label}:` }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontFamily: 'monospace', fontSize: tokens.typography.scale.sm }, children: summary })] }), open
                ? entries.map(([k, v]) => ((0, jsx_runtime_1.jsx)(Node, { label: k, value: v, depth: depth + 1, defaultExpandDepth: defaultExpandDepth }, k)))
                : null] }));
}
/**
 * Collapsible JSON tree inspector: keys render in `colors.accentText`, strings in
 * `colors.onSurface`, numbers in `colors.primaryText`, booleans in `colors.warnText`,
 * and null in `colors.muted`, all monospaced. Branch nodes (objects/arrays)
 * toggle open on tap. `fontFamily: 'monospace'` is a font family, not a color.
 * All colors and spacing come from the compiled theme tokens via
 * `useXenitionTheme()` — no literal colors.
 */
function JsonViewer({ value, defaultExpandDepth = 1, rootLabel = 'root', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: tokens.radius.md,
                backgroundColor: colors.surface,
                padding: tokens.spacing.md,
            },
            style,
        ], children: (0, jsx_runtime_1.jsx)(Node, { label: rootLabel, value: value, depth: 0, defaultExpandDepth: defaultExpandDepth }) }));
}
//# sourceMappingURL=JsonViewer.js.map