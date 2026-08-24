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
exports.Grid = Grid;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Fixed-column grid that wraps its children into equal-width cells using the
 * classic gutter technique (negative container margin + per-cell padding), so
 * the token-bound `gap` traces to the compiled spacing scale. Column count is
 * a numeric layout literal; no literal colors.
 */
function Grid({ columns = 2, gap = 'md', style, children, ...rest }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const gutter = tokens.spacing[gap];
    const half = gutter / 2;
    const cells = React.Children.toArray(children);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginHorizontal: -half,
                marginVertical: -half,
            },
            style,
        ], ...rest, children: cells.map((child, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                width: `${100 / columns}%`,
                paddingHorizontal: half,
                paddingVertical: half,
            }, children: child }, i))) }));
}
//# sourceMappingURL=Grid.js.map