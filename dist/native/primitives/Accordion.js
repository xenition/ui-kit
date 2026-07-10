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
exports.Accordion = Accordion;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
if (react_native_1.Platform.OS === 'android' &&
    react_native_1.UIManager.setLayoutAnimationEnabledExperimental) {
    react_native_1.UIManager.setLayoutAnimationEnabledExperimental(true);
}
/**
 * Themed collapsible sections — the native mirror of the web `Accordion`. No
 * modal: sections expand/collapse inline, animated with `LayoutAnimation`.
 * Supports `single` (one open) and `multiple` like the web version. No literal
 * colors.
 */
function Accordion({ items, type = 'single', defaultValue = [], style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [open, setOpen] = React.useState(defaultValue);
    const toggle = (v) => {
        react_native_1.LayoutAnimation.configureNext(react_native_1.LayoutAnimation.Presets.easeInEaseOut);
        setOpen((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : type === 'single' ? [v] : [...prev, v]);
    };
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.md,
                overflow: 'hidden',
            },
            style,
        ], children: items.map((it, i) => {
            const isOpen = open.includes(it.value);
            return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: i > 0 ? { borderTopWidth: 1, borderColor: colors.border } : undefined, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { expanded: isOpen }, onPress: () => toggle(it.value), style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: tokens.spacing.sm,
                            paddingVertical: tokens.spacing.md,
                            paddingHorizontal: tokens.spacing.lg,
                        }, children: [typeof it.title === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: 14, fontWeight: '500', color: colors.onSurface }, children: it.title })) : (it.title), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: colors.muted,
                                    transform: [{ rotate: isOpen ? '180deg' : '0deg' }],
                                }, children: "\u25BE" })] }), isOpen && ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { paddingHorizontal: tokens.spacing.lg, paddingBottom: tokens.spacing.md }, children: typeof it.content === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: 14, color: colors.muted }, children: it.content })) : (it.content) }))] }, it.value));
        }) }));
}
//# sourceMappingURL=Accordion.js.map