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
exports.Tree = Tree;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
if (react_native_1.Platform.OS === 'android' && react_native_1.UIManager.setLayoutAnimationEnabledExperimental) {
    react_native_1.UIManager.setLayoutAnimationEnabledExperimental(true);
}
/**
 * Expandable/collapsible hierarchy view. Each level is indented by
 * `tokens.spacing.lg`; nodes with `children` show a rotating caret and toggle
 * inline (animated via `LayoutAnimation`). Selection highlights with
 * `colors.primary`; all color/spacing values come from the compiled theme
 * tokens via `useXenitionTheme()` — no literal colors.
 */
function Tree({ data, defaultExpanded = [], selectedId, onSelect, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [expanded, setExpanded] = React.useState(defaultExpanded);
    const toggle = (id) => {
        react_native_1.LayoutAnimation.configureNext(react_native_1.LayoutAnimation.Presets.easeInEaseOut);
        setExpanded((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    };
    const renderNodes = (nodes, depth) => nodes.map((node) => {
        const hasChildren = (node.children?.length ?? 0) > 0;
        const isOpen = expanded.includes(node.id);
        const isSelected = selectedId != null && node.id === selectedId;
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { expanded: hasChildren ? isOpen : undefined, selected: isSelected }, onPress: () => {
                        if (hasChildren)
                            toggle(node.id);
                        onSelect?.(node);
                    }, style: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: tokens.spacing.xs,
                        paddingVertical: tokens.spacing.sm,
                        paddingHorizontal: tokens.spacing.sm,
                        paddingLeft: tokens.spacing.sm + depth * tokens.spacing.lg,
                        borderRadius: tokens.radius.sm,
                        backgroundColor: isSelected ? colors.primary : 'transparent',
                    }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                width: tokens.spacing.md,
                                color: isSelected ? colors.onPrimary : colors.muted,
                                fontSize: tokens.typography.scale.xs,
                                transform: [{ rotate: isOpen ? '90deg' : '0deg' }],
                            }, children: hasChildren ? '▸' : '' }), typeof node.label === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                flex: 1,
                                color: isSelected ? colors.onPrimary : colors.onSurface,
                                fontSize: tokens.typography.scale.sm,
                                fontWeight: isSelected ? '600' : '400',
                            }, children: node.label })) : (node.label)] }), hasChildren && isOpen ? renderNodes(node.children ?? [], depth + 1) : null] }, node.id));
    });
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "list", style: style, children: renderNodes(data, 0) }));
}
//# sourceMappingURL=Tree.js.map