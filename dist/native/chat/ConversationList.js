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
exports.ConversationList = ConversationList;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const ConversationRow_1 = require("./ConversationRow");
/**
 * Scrollable inbox / DM list. Pass `items` for the data-driven path (each mapped
 * to a `ConversationRow`) or `children` for full control. Handles `loading` and
 * empty states out of the box and exposes the `list` role. No literal colors.
 */
function ConversationList({ items, onPressItem, onLongPressItem, loading = false, emptyLabel = 'No conversations yet', dividers = true, children, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityLabel: "Loading conversations", style: [{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: tokens.spacing.xl }, style], children: (0, jsx_runtime_1.jsx)(primitives_1.Spinner, { size: "lg" }) }));
    }
    const usingItems = items != null;
    const isEmpty = usingItems ? items.length === 0 : React.Children.count(children) === 0;
    if (isEmpty) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: [{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: tokens.spacing.xl }, style], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.muted,
                    fontSize: tokens.typography.scale.base,
                    textAlign: 'center',
                }, children: emptyLabel }) }));
    }
    const Divider = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 1, marginLeft: tokens.spacing.md, backgroundColor: colors.border } }));
    return ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { accessibilityRole: "list", style: [{ flex: 1, backgroundColor: colors.surface }, style], keyboardShouldPersistTaps: "handled", children: usingItems
            ? items.map((item, i) => {
                const { id, ...rowProps } = item;
                return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(ConversationRow_1.ConversationRow, { ...rowProps, onPress: () => onPressItem?.(id), onLongPress: () => onLongPressItem?.(id) }), dividers && i < items.length - 1 ? Divider : null] }, id));
            })
            : children }));
}
//# sourceMappingURL=ConversationList.js.map