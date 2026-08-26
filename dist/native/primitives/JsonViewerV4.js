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
exports.JsonViewerV4 = JsonViewerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const v4_depth_1 = require("../../primitives/internal/v4-depth");
const v4_data_1 = require("../../primitives/internal/v4-data");
const state_v4_1 = require("./internal/state-v4");
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
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const kind = kindOf(value);
    const branch = kind === 'object' || kind === 'array';
    const [open, setOpen] = React.useState(depth < defaultExpandDepth);
    const size = tokens.typography.scale.sm;
    const mono = { fontFamily: 'monospace', fontSize: size, lineHeight: size * 1.5 };
    /*
      Every colour here is a `*Text` slot, never a fill. `accent`, `primary` and
      `warn` are background colours: the compiler guarantees `onAccent` ON
      `accent` and nothing at all about `accent` as ink on `surface`. Syntax
      colour IS text, so it takes the text forms.
    */
    const keyStyle = { ...mono, color: colors.accentText };
    const scalarColor = kind === 'string'
        ? colors.onSurface
        : kind === 'number'
            ? colors.primaryText
            : kind === 'boolean'
                ? colors.warnText
                : colors.mutedText;
    const pressedBg = (0, state_v4_1.pressFill)(theme);
    const guide = (0, v4_depth_1.mixToken)(colors.surface, colors.onSurface, v4_data_1.RULE_MIX);
    // Depth is carried by a guide at the level's left edge rather than by
    // padding alone: in a deep tree, an indent with nothing in it stops telling
    // you which parent a row belongs to once the parent scrolls away.
    const rail = depth > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            width: 1,
            alignSelf: 'stretch',
            marginRight: tokens.spacing.sm,
            backgroundColor: guide,
        } })) : null;
    if (!branch) {
        const display = kind === 'string' ? `"${String(value)}"` : String(value);
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', paddingLeft: depth > 0 ? tokens.spacing.sm : 0 }, children: [rail, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        flexDirection: 'row',
                        gap: tokens.spacing.xs,
                        paddingVertical: tokens.spacing.xs / 2,
                        flex: 1,
                    }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: keyStyle, children: `${label}:` }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { ...mono, color: scalarColor }, children: display })] })] }));
    }
    const entries = Array.isArray(value)
        ? value.map((v, i) => [String(i), v])
        : Object.entries(value);
    const summary = kind === 'array' ? `[${entries.length}]` : `{${entries.length}}`;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', paddingLeft: depth > 0 ? tokens.spacing.sm : 0 }, children: [rail, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { expanded: open }, onPress: () => setOpen((o) => !o), style: ({ pressed }) => ({
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.xs,
                            paddingVertical: tokens.spacing.xs / 2,
                            borderRadius: tokens.radius.sm,
                            backgroundColor: pressed ? pressedBg : 'transparent',
                        }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text
                            // Decorative: the row already announces its expanded state.
                            , { 
                                // Decorative: the row already announces its expanded state.
                                accessibilityElementsHidden: true, importantForAccessibility: "no", style: { ...mono, color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: open ? '▾' : '▸' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: keyStyle, children: `${label}:` }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { ...mono, color: colors.mutedText }, children: summary })] }), open
                        ? entries.map(([k, v]) => ((0, jsx_runtime_1.jsx)(Node, { label: k, value: v, depth: depth + 1, defaultExpandDepth: defaultExpandDepth }, k)))
                        : null] })] }));
}
/**
 * **V4 JSON viewer** — same props as {@link JsonViewer}, a different design
 * line.
 *
 * Three changes:
 *
 * 1. **A calm, recessed ground.** The tree sat on `surface`, the same colour
 *    as the page. It sinks by the same 4% neutral step `CodeBlockV4` and the
 *    V4 tables use, mixed from the two scheme-resolved slots so it inverts
 *    with the scheme — one recessed amount for every monospace surface in the
 *    line.
 * 2. **Depth gets a guide, not just an indent.** Each level draws a hairline
 *    at its left edge. This is the one place a rule earns itself against §9:
 *    an indent with nothing in it stops telling you which parent a row belongs
 *    to as soon as the parent scrolls off the top, and re-finding that is the
 *    entire task a JSON inspector exists for (§33).
 * 3. **A branch row tints when pressed and the caret leaves the accessibility
 *    tree.** The row already announces `expanded`; a screen reader should not
 *    also read "▾".
 *
 * The syntax colours stay exactly as the base has them — every one a `*Text`
 * slot rather than a fill, which is the fix the native twin already carried
 * and its web twin did not. **No gradient and no new palette**: five roles
 * (key, string, number, boolean, null) all drawn from seed tokens is the whole
 * colour system here, and §35.5 would not thank us for a sixth.
 */
function JsonViewerV4({ value, defaultExpandDepth = 1, rootLabel = 'root', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const ground = (0, v4_depth_1.mixToken)(colors.surface, colors.onSurface, v4_data_1.ZEBRA_MIX);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: tokens.radius.md,
                backgroundColor: ground,
                padding: tokens.spacing.md,
            },
            style,
        ], children: (0, jsx_runtime_1.jsx)(Node, { label: rootLabel, value: value, depth: 0, defaultExpandDepth: defaultExpandDepth }) }));
}
//# sourceMappingURL=JsonViewerV4.js.map