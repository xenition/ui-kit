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
exports.FAQ = FAQ;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
if (react_native_1.Platform.OS === 'android' && react_native_1.UIManager.setLayoutAnimationEnabledExperimental) {
    react_native_1.UIManager.setLayoutAnimationEnabledExperimental(true);
}
/**
 * Accordion of question/answer rows — the native mirror of the web `FAQ` +
 * `FAQItem`. The web version composes children and animates height with the CSS
 * grid `0fr → 1fr` trick; native takes an `items` data array and expands inline
 * with `LayoutAnimation` (same idiom as the native `Accordion` primitive).
 * Token-only.
 */
function FAQ({ items, multiple = false, defaultOpen = [], style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [open, setOpen] = React.useState(defaultOpen);
    const toggle = (q) => {
        react_native_1.LayoutAnimation.configureNext(react_native_1.LayoutAnimation.Presets.easeInEaseOut);
        setOpen((prev) => prev.includes(q) ? prev.filter((x) => x !== q) : multiple ? [...prev, q] : [q]);
    };
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-faq", style: [
            { borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border },
            style,
        ], children: items.map((it, i) => {
            const isOpen = open.includes(it.question);
            return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: i > 0 ? { borderTopWidth: 1, borderColor: colors.border } : undefined, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { expanded: isOpen }, onPress: () => toggle(it.question), style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: tokens.spacing.md,
                            paddingVertical: tokens.spacing.md,
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    flex: 1,
                                    color: colors.onSurface,
                                    fontSize: tokens.typography.scale.base,
                                    fontWeight: '600',
                                }, children: it.question }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: colors.muted,
                                    transform: [{ rotate: isOpen ? '180deg' : '0deg' }],
                                }, children: "\u25BE" })] }), isOpen ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { paddingBottom: tokens.spacing.md }, children: typeof it.answer === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: colors.muted,
                                fontSize: tokens.typography.scale.sm,
                                lineHeight: tokens.typography.scale.sm * 1.6,
                            }, children: it.answer })) : (it.answer) })) : null] }, i));
        }) }));
}
//# sourceMappingURL=FAQ.js.map