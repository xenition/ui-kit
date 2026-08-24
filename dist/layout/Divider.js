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
exports.Divider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const _tokens_1 = require("./_tokens");
/**
 * A one-pixel rule in the theme `border` color, horizontal or vertical, with an
 * optional token-bound `inset`. Rendered as an `<hr>` (implicit `separator`
 * role). Color and inset trace to the theme tokens; no literal colors.
 */
exports.Divider = React.forwardRef(function Divider({ orientation = 'horizontal', inset, className, ...rest }, ref) {
    const horizontal = orientation === 'horizontal';
    return ((0, jsx_runtime_1.jsx)("hr", { ref: ref, "aria-orientation": orientation, className: (0, cn_1.cn)('border-0 border-solid border-border', horizontal ? 'w-full border-t' : 'self-stretch border-l', inset ? (horizontal ? _tokens_1.SPACE_MX[inset] : _tokens_1.SPACE_MY[inset]) : undefined, className), ...rest }));
});
//# sourceMappingURL=Divider.js.map