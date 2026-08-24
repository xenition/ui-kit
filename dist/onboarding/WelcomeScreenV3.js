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
exports.WelcomeScreenV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const GetStartedButton_1 = require("./GetStartedButton");
/**
 * WelcomeScreen, redesigned (v3): a **compact welcome card**. A small inline
 * medallion beside the title, a short subtitle, and the CTAs in a tight row —
 * sized for a bottom sheet or modal rather than a full page. The opposite of v2's
 * split hero. Same props, token-only.
 */
exports.WelcomeScreenV3 = React.forwardRef(function WelcomeScreenV3({ title, subtitle, logoGlyph, primaryLabel = 'Get started', onGetStarted, secondaryLabel, onSecondary, loading = false, variant, className, ...rest }, ref) {
    void variant;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-4 rounded-lg bg-surface p-5 shadow-sm', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [logoGlyph ? ((0, jsx_runtime_1.jsx)("div", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: logoGlyph, size: "lg", color: "primary" }) })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-xl font-bold text-on-surface", children: title }), subtitle ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: subtitle }) : null] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: (0, jsx_runtime_1.jsx)(GetStartedButton_1.GetStartedButton, { label: primaryLabel, onClick: onGetStarted, loading: loading }) }), secondaryLabel && onSecondary ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": secondaryLabel, onClick: onSecondary, className: "shrink-0 py-2 text-sm font-semibold text-primary", children: secondaryLabel })) : null] })] }));
});
//# sourceMappingURL=WelcomeScreenV3.js.map