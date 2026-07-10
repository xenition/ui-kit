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
exports.AppShell = AppShell;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Dashboard layout — the native mirror of the web `AppShell`. Renders a top bar
 * (with a hamburger that opens the `sidebar` in a slide-in drawer `Modal`) above
 * a content area. This is the simplified phone form: the sidebar is always a
 * drawer rather than a persistent rail. No literal colors.
 */
function AppShell({ sidebar, header, children, menuLabel = 'Toggle navigation', sidebarWidth = 280, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [open, setOpen] = React.useState(false);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flex: 1, backgroundColor: colors.surface }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    borderBottomWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: colors.surface,
                    paddingHorizontal: tokens.spacing.lg,
                    paddingVertical: tokens.spacing.md,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: menuLabel, onPress: () => setOpen(true), style: {
                            borderRadius: tokens.radius.sm,
                            padding: tokens.spacing.xs,
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl }, children: '≡' }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: typeof header === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: colors.onSurface,
                                fontSize: tokens.typography.scale.lg,
                                fontWeight: '600',
                            }, children: header })) : (header) })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, padding: tokens.spacing.lg }, children: children }), (0, jsx_runtime_1.jsx)(react_native_1.Modal, { visible: open, transparent: true, animationType: "slide", onRequestClose: () => setOpen(false), children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, flexDirection: 'row' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: sidebarWidth, maxWidth: '85%' }, children: sidebar }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityLabel: "Close navigation", onPress: () => setOpen(false), style: {
                                flex: 1,
                                backgroundColor: tokens.ramps.neutral[950],
                                opacity: 0.5,
                            } })] }) })] }));
}
//# sourceMappingURL=AppShell.js.map