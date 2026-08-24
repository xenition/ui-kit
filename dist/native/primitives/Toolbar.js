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
exports.Toolbar = Toolbar;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Horizontal action bar: an optional title, a row of inline action buttons, and
 * an optional `⋯` overflow that reveals extra actions in an inline panel below.
 * All colors, radii and spacing come from the compiled theme tokens via
 * `useXenitionTheme()` — no literal colors.
 */
function Toolbar({ title, actions = [], overflowActions = [], style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [overflowOpen, setOverflowOpen] = React.useState(false);
    const renderAction = (action, inMenu) => {
        const color = action.disabled
            ? colors.muted
            : action.destructive
                ? colors.danger
                : colors.primary;
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { disabled: action.disabled }, disabled: action.disabled, onPress: () => {
                setOverflowOpen(false);
                action.onPress?.();
            }, style: {
                paddingHorizontal: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                borderRadius: tokens.radius.sm,
                alignSelf: inMenu ? 'stretch' : undefined,
            }, children: typeof action.label === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: action.label })) : (action.label) }, action.key));
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.sm,
                    paddingVertical: tokens.spacing.xs,
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: tokens.radius.md,
                    backgroundColor: colors.surface,
                }, children: [title != null ? (typeof title === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: title }))) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } })), actions.map((a) => renderAction(a, false)), overflowActions.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "More actions", accessibilityState: { expanded: overflowOpen }, onPress: () => setOverflowOpen((o) => !o), style: { paddingHorizontal: tokens.spacing.sm, paddingVertical: tokens.spacing.sm, borderRadius: tokens.radius.sm }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: "\u22EF" }) })) : null] }), overflowOpen && overflowActions.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.xs,
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: tokens.radius.md,
                    backgroundColor: colors.surface,
                    paddingVertical: tokens.spacing.xs,
                }, children: overflowActions.map((a) => renderAction(a, true)) })) : null] }));
}
//# sourceMappingURL=Toolbar.js.map