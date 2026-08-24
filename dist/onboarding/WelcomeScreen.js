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
exports.WelcomeScreen = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const GetStartedButton_1 = require("./GetStartedButton");
/**
 * First-launch welcome — a brand medallion, headline, one value line and the
 * primary {@link GetStartedButton}, with an optional "already have an account"
 * secondary link (design.md §42). The `bottomSheet` variant left-aligns for use
 * inside a sheet. Every color traces to a token. No literal colors.
 */
exports.WelcomeScreen = React.forwardRef(function WelcomeScreen({ title, subtitle, logoGlyph, primaryLabel = 'Get started', onGetStarted, secondaryLabel, onSecondary, loading = false, variant = 'centered', className, ...rest }, ref) {
    const centered = variant === 'centered';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex min-h-full flex-col justify-center gap-6 bg-surface p-6', centered ? 'items-center text-center' : 'items-start text-left', className), ...rest, children: [logoGlyph ? ((0, jsx_runtime_1.jsx)("div", { className: "flex h-20 w-20 items-center justify-center rounded-full bg-primary", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: logoGlyph, size: "2xl", color: "onPrimary" }) })) : null, (0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold text-on-surface", children: title }), subtitle ? ((0, jsx_runtime_1.jsx)("p", { className: "text-lg leading-relaxed text-muted", children: subtitle })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "mt-2 flex w-full flex-col gap-3", children: [(0, jsx_runtime_1.jsx)(GetStartedButton_1.GetStartedButton, { label: primaryLabel, onClick: onGetStarted, loading: loading }), secondaryLabel && onSecondary ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": secondaryLabel, onClick: onSecondary, className: "py-2 text-center text-base font-semibold text-primary", children: secondaryLabel })) : null] })] }));
});
//# sourceMappingURL=WelcomeScreen.js.map