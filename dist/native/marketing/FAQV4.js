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
exports.FAQV4 = FAQV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const useReducedMotion_1 = require("../primitives/internal/useReducedMotion");
if (react_native_1.Platform.OS === 'android' && react_native_1.UIManager.setLayoutAnimationEnabledExperimental) {
    react_native_1.UIManager.setLayoutAnimationEnabledExperimental(true);
}
/**
 * FAQ — **V4** "showcase" design (native mirror of the web V4). An elegant
 * accordion: each `items` entry a clean rounded row with an extra-bold
 * `question` and a chevron, expanding inline with `LayoutAnimation` (dropped
 * under the OS "Reduce Motion" toggle via {@link useReducedMotion}, exactly as
 * the web V4 drops its grid animation). The open row sits on a subtle
 * soft-primary (`withAlpha(colors.primary, 0.06)`) tint with a soft-primary
 * chevron; the toggle is a `≥44px` tap target. NOT a gradient surface. Honors
 * every prop — `items` (`question`/`answer`), `multiple`, `defaultOpen`. Same
 * props/behavior as {@link FAQProps}; token-only colors, no literals.
 */
function FAQV4({ items, multiple = false, defaultOpen = [], style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const [open, setOpen] = React.useState(defaultOpen);
    const toggle = (q) => {
        if (!reduced) {
            react_native_1.LayoutAnimation.configureNext(react_native_1.LayoutAnimation.Presets.easeInEaseOut);
        }
        setOpen((prev) => prev.includes(q) ? prev.filter((x) => x !== q) : multiple ? [...prev, q] : [q]);
    };
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-faq", style: [{ gap: tokens.spacing.sm }, style], children: items.map((it, i) => {
            const isOpen = open.includes(it.question);
            return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    borderRadius: tokens.radius.lg,
                    borderWidth: 1,
                    borderColor: colors.border,
                    paddingHorizontal: tokens.spacing.md,
                    backgroundColor: isOpen ? (0, color_1.withAlpha)(colors.primary, 0.06) : colors.card,
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { expanded: isOpen }, onPress: () => toggle(it.question), style: {
                            minHeight: 44,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: tokens.spacing.md,
                            paddingVertical: tokens.spacing.md,
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    flex: 1,
                                    color: colors.onSurface,
                                    fontSize: tokens.typography.scale.base,
                                    fontWeight: '800',
                                    letterSpacing: -0.3,
                                }, children: it.question }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    height: 24,
                                    width: 24,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: colors.primary,
                                        fontWeight: '700',
                                        transform: [{ rotate: isOpen ? '180deg' : '0deg' }],
                                    }, children: "\u25BE" }) })] }), isOpen ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { paddingBottom: tokens.spacing.md }, children: typeof it.answer === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: colors.muted,
                                fontSize: tokens.typography.scale.sm,
                                lineHeight: tokens.typography.scale.sm * 1.6,
                            }, children: it.answer })) : (it.answer) })) : null] }, i));
        }) }));
}
//# sourceMappingURL=FAQV4.js.map