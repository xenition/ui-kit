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
exports.Section = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const _tokens_1 = require("./_tokens");
/**
 * A titled content block: an optional `title`/`subtitle` header followed by its
 * children, separated by a token-bound `spacing` gap. Rendered as a `<section>`.
 * Type sizes, colors, and spacing trace to the theme tokens; no literal colors.
 */
exports.Section = React.forwardRef(function Section({ title, subtitle, spacing = 'md', className, children, ...rest }, ref) {
    const hasHeader = Boolean(title || subtitle);
    return ((0, jsx_runtime_1.jsxs)("section", { ref: ref, className: (0, cn_1.cn)('flex flex-col', _tokens_1.SPACE_GAP[spacing], className), ...rest, children: [hasHeader ? ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-col', _tokens_1.SPACE_GAP.xs), children: [title ? (0, jsx_runtime_1.jsx)("h2", { className: "text-lg font-semibold text-on-surface", children: title }) : null, subtitle ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: subtitle }) : null] })) : null, children] }));
});
//# sourceMappingURL=Section.js.map