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
exports.ButtonGroup = ButtonGroup;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Button group — joins a row of `Button` children into one segmented control
 * with a single shared outer radius and hairline dividers in the `border`
 * token. The container clips inner corners (`overflow: 'hidden'`) so each child
 * button's own radius is neutralised at the seams; pass `fill` for equal-width
 * children. Purely structural — the buttons keep their own token-bound colors,
 * and the only color this adds (the divider) is the `border` token. No literals.
 */
function ButtonGroup({ children, fill = false, style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const items = React.Children.toArray(children).filter(React.isValidElement);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "toolbar", style: [
            {
                flexDirection: 'row',
                alignSelf: fill ? 'stretch' : 'flex-start',
                borderRadius: tokens.radius.md,
                borderColor: colors.border,
                borderWidth: 1,
                overflow: 'hidden',
            },
            style,
        ], children: items.map((child, i) => ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [i > 0 ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 1, backgroundColor: colors.border } }) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: fill ? 1 : undefined }, children: child })] }, i))) }));
}
//# sourceMappingURL=ButtonGroup.js.map