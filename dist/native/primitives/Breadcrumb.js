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
exports.Breadcrumb = Breadcrumb;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Breadcrumb trail — the native mirror of the web `Breadcrumb` (`onClick`→
 * `onPress`; there is no `href` on native). The last item is the current page.
 * Token-bound muted links, separators, and current label. No literal colors.
 */
function Breadcrumb({ items, separator = '/', style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const size = tokens.typography.scale.sm;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Breadcrumb", style: [{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: tokens.spacing.sm }, style], children: items.map((it, i) => {
            const last = i === items.length - 1;
            const labelNode = typeof it.label === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    fontSize: size,
                    color: last ? colors.onSurface : colors.muted,
                    fontWeight: last ? '500' : '400',
                }, children: it.label })) : (it.label);
            return ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [it.onPress && !last ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "link", onPress: it.onPress, children: labelNode })) : (labelNode), !last ? (typeof separator === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: size, color: colors.muted }, children: separator })) : (separator)) : null] }, i));
        }) }));
}
//# sourceMappingURL=Breadcrumb.js.map