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
exports.Navbar = Navbar;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
/**
 * Marketing navbar — the native mirror of the web `Navbar`.
 *
 * The web version is a sticky `<header>` that gains a translucent
 * backdrop-blur bar once the page scrolls (a passive `scroll` listener +
 * `color-mix`). React Native has no page-scroll chrome, `backdrop-filter`, or
 * `color-mix`, so native **drops the sticky/scroll-blur behavior** and renders
 * a plain top bar over a translucent `surface` token. Web link `children`
 * become a `links` data array (`href`→`onPress`). On narrow layouts the links
 * collapse behind a disclosure toggle (a `Pressable` flipping a `View`), the
 * native equivalent of the web mobile menu. Token-only.
 */
function Navbar({ logo, links = [], actions, menuLabel = 'Menu', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [open, setOpen] = React.useState(false);
    const renderLink = (link, i) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "link", accessibilityState: { selected: link.active }, onPress: () => {
            setOpen(false);
            link.onPress?.();
        }, style: ({ pressed }) => ({ opacity: pressed ? 0.6 : 1 }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                color: link.active ? colors.primary : colors.onSurface,
                fontSize: tokens.typography.scale.sm,
                fontWeight: link.active ? '700' : '500',
                paddingVertical: tokens.spacing.xs,
            }, children: link.label }) }, i));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-navbar", style: [
            {
                backgroundColor: (0, color_1.withAlpha)(colors.surface, 0.8),
                borderBottomWidth: 1,
                borderBottomColor: (0, color_1.withAlpha)(colors.border, 0.7),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.md,
                    paddingHorizontal: tokens.spacing.lg,
                    paddingVertical: tokens.spacing.sm,
                }, children: [logo !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center' }, children: logo })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.sm,
                        }, children: [actions !== undefined && actions !== null ? actions : null, links.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: menuLabel, accessibilityState: { expanded: open }, onPress: () => setOpen((prev) => !prev), style: ({ pressed }) => ({
                                    width: 36,
                                    height: 36,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: tokens.radius.sm,
                                    opacity: pressed ? 0.6 : 1,
                                }), children: open ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg }, children: "\u2715" })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 18, gap: 4 }, children: [0, 1, 2].map((i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 2, borderRadius: 1, backgroundColor: colors.onSurface } }, i))) })) })) : null] })] }), open && links.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-navbar-menu", style: {
                    borderTopWidth: 1,
                    borderTopColor: (0, color_1.withAlpha)(colors.border, 0.7),
                    backgroundColor: colors.surface,
                    paddingHorizontal: tokens.spacing.lg,
                    paddingVertical: tokens.spacing.md,
                    gap: tokens.spacing.sm,
                }, children: links.map(renderLink) })) : null] }));
}
//# sourceMappingURL=Navbar.js.map