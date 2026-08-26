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
exports.TreeV4 = TreeV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const v4_depth_1 = require("../../primitives/internal/v4-depth");
const v4_data_1 = require("../../primitives/internal/v4-data");
const color_1 = require("../../theme/color");
const compile_1 = require("../../theme/compile");
const state_v4_1 = require("./internal/state-v4");
if (react_native_1.Platform.OS === 'android' && react_native_1.UIManager.setLayoutAnimationEnabledExperimental) {
    react_native_1.UIManager.setLayoutAnimationEnabledExperimental(true);
}
/**
 * **V4 tree** — same props as {@link Tree}, a different design line.
 *
 * A tree's whole job is to make a hierarchy visible, and the base fills the
 * selected row edge-to-edge with solid `primary`. That answers "which one" and
 * destroys the answer to "where am I": the indentation, the caret and the
 * label all vanish under a brand bar, and on a deep tree the bar is the
 * loudest thing on the screen — §35.6 asks that colour create hierarchy rather
 * than noise, and §35.5 that accents stay rare.
 *
 * Three changes:
 *
 * 1. **Selection tints, it does not repaint.** 12% `primary` composited into
 *    `surface`, the label in `primaryText` at weight 600. The row still reads
 *    as chosen at a glance, and the structure it sits in survives. The label
 *    is re-measured with `ensureContrast` against the tint the row actually
 *    painted, so the promise is about this row rather than about the page it
 *    was designed on.
 * 2. **The indent is the structure, and it matches its twin.** Both twins now
 *    step by `spacing.lg` per level. The base web twin used a literal `1rem`
 *    while native used `spacing.lg`, so the same tree was a different shape on
 *    the two platforms — and §9 makes indentation the one thing a tree cannot
 *    get wrong.
 * 3. **A row is a real target and never a card.** Every row takes the same
 *    `xl + xs` height the V4 tables use, so the whole line is one rhythm, and
 *    a press tints from the two scheme-resolved neutral slots instead of the
 *    light-oriented ramp step the base web twin reached for.
 *
 * **No guide lines and no depth.** Vertical guides are the obvious "premium"
 * addition and they are ink per level for something 24pt of indentation
 * already says (§7, §9). Nothing lifts: a tree row that casts a shadow is a
 * card in a stack of cards (§8).
 */
function TreeV4({ data, defaultExpanded = [], selectedId, onSelect, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const [expanded, setExpanded] = React.useState(defaultExpanded);
    const toggle = (id) => {
        react_native_1.LayoutAnimation.configureNext(react_native_1.LayoutAnimation.Presets.easeInEaseOut);
        setExpanded((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    };
    // The two grounds a row can own, composited once so neither borrows the
    // colour of whatever is behind the tree.
    const selectedBg = (0, v4_depth_1.mixToken)(colors.surface, colors.primary, v4_data_1.SELECT_MIX);
    const pressedBg = (0, state_v4_1.pressFill)(theme);
    const selectedInk = (0, color_1.ensureContrast)(colors.primaryText, selectedBg, compile_1.MIN_CONTRAST);
    const rowHeight = tokens.spacing.xl + tokens.spacing.xs;
    const renderNodes = (nodes, depth) => nodes.map((node) => {
        const hasChildren = (node.children?.length ?? 0) > 0;
        const isOpen = expanded.includes(node.id);
        const isSelected = selectedId != null && node.id === selectedId;
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { expanded: hasChildren ? isOpen : undefined, selected: isSelected }, onPress: () => {
                        if (hasChildren)
                            toggle(node.id);
                        onSelect?.(node);
                    }, style: ({ pressed }) => ({
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: tokens.spacing.xs,
                        minHeight: rowHeight,
                        paddingVertical: tokens.spacing.sm,
                        paddingHorizontal: tokens.spacing.sm,
                        // Indentation is the hierarchy (§9) — one `lg` step per level,
                        // the same step the web twin takes.
                        paddingLeft: tokens.spacing.sm + depth * tokens.spacing.lg,
                        borderRadius: tokens.radius.sm,
                        // Selection wins over the press tint: pointing at the chosen row
                        // must not un-choose it.
                        backgroundColor: isSelected ? selectedBg : pressed ? pressedBg : 'transparent',
                    }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                width: tokens.spacing.md,
                                color: isSelected ? selectedInk : colors.mutedText,
                                fontSize: tokens.typography.scale.xs,
                                transform: [{ rotate: isOpen ? '90deg' : '0deg' }],
                            }, children: hasChildren ? '▸' : '' }), typeof node.label === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                flex: 1,
                                color: isSelected ? selectedInk : colors.onSurface,
                                fontFamily: tokens.typography.fontBody,
                                fontSize: tokens.typography.scale.sm,
                                fontWeight: isSelected ? '600' : '400',
                            }, children: node.label })) : (node.label)] }), hasChildren && isOpen ? renderNodes(node.children ?? [], depth + 1) : null] }, node.id));
    });
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "list", style: style, children: renderNodes(data, 0) }));
}
//# sourceMappingURL=TreeV4.js.map