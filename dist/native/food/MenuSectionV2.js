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
exports.MenuSectionV2 = MenuSectionV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const isEmptyChildren = (children) => React.Children.toArray(children).length === 0;
/**
 * MenuSection, alternate design **V2** — a *panelled banner* group. The whole
 * section is wrapped in an elevated surface card; the heading sits in a soft
 * primary-tinted banner strip across the top (title, description, and the
 * `aside` slot as a right-hand chip), with the items grouped inside below. The
 * empty state is a soft-tinted inset panel rather than a dashed box. This reads
 * as a bold, contained category card — the opposite of the flat classic. Same
 * props as the classic.
 */
function MenuSectionV2({ title, description, aside, children, emptyLabel = 'No items yet', emptyState, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const empty = isEmptyChildren(children);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "summary", style: [
            {
                borderRadius: tokens.radius.lg,
                overflow: 'hidden',
                backgroundColor: colors.surface,
                ...(0, elevation_1.shadow)('md', tokens),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.sm,
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.08),
                    paddingVertical: tokens.spacing.md,
                    paddingHorizontal: tokens.spacing.lg,
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: { color: colors.primaryText, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: title }), description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: description })) : null] }), aside ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: aside }) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { padding: tokens.spacing.lg }, children: empty ? (emptyState ?? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: tokens.radius.md,
                        backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.05),
                        paddingVertical: tokens.spacing.xl,
                        paddingHorizontal: tokens.spacing.lg,
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }, children: emptyLabel }) }))) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: children })) })] }));
}
//# sourceMappingURL=MenuSectionV2.js.map