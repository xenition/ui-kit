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
exports.SurveyIntroV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * SurveyIntro — **V4** "clean form / focus" design (web parity of the native V4).
 * The start of a survey is a peak moment, so this variant leads with a brand
 * gradient hero band (`bg-gradient-to-br from-primary-500 to-primary-700`) carrying
 * near-white ink (`text-primary-50` / `text-primary-100`): an optional glyph mark,
 * the title, the purpose line, and any meta stats rendered as frosted glass tiles
 * (`bg-primary-50/15 border border-primary-50/30`). Below the band a big ≥44px
 * primary Start CTA sits in the thumb zone with an accessible name, and the
 * footnote is quiet muted fine print. `hero` centers the band and enlarges the
 * mark. Same props/behavior as {@link SurveyIntroProps}; all colors from `--xen-*`
 * token classes + gradient utilities (no literal colors), dark-mode safe.
 */
exports.SurveyIntroV4 = React.forwardRef(function SurveyIntroV4({ title, description, logoGlyph, meta, startLabel = 'Start survey', onStart, footnote, variant = 'default', className }, ref) {
    const hero = variant === 'hero';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-survey-intro": "", className: (0, cn_1.cn)('overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface shadow-sm', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-col gap-md bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-lg)]', hero ? 'items-center' : 'items-stretch'), children: [logoGlyph ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex items-center justify-center rounded-full bg-primary-50/15 border border-primary-50/30', hero ? 'h-[72px] w-[72px] self-center text-3xl' : 'h-[52px] w-[52px] self-start text-2xl'), children: logoGlyph })) : null, (0, jsx_runtime_1.jsx)("h2", { className: (0, cn_1.cn)('text-2xl font-extrabold text-primary-50', hero ? 'text-center' : 'text-left'), children: title }), description ? ((0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-base leading-relaxed text-primary-100', hero ? 'text-center' : 'text-left'), children: description })) : null, meta && meta.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex flex-wrap gap-sm', hero ? 'justify-center' : 'justify-start'), children: meta.map((m, i) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 min-w-[84px] flex-col items-center gap-0.5 rounded-[var(--xen-radius-md)] bg-primary-50/15 border border-primary-50/30 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]", children: [m.icon ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-lg", children: m.icon })) : null, (0, jsx_runtime_1.jsx)("span", { className: "text-lg font-extrabold text-primary-50", children: m.value }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-primary-100", children: m.label })] }, `${m.label}-${i}`))) })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-sm p-[var(--xen-space-lg)]", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": startLabel, onClick: onStart, className: "flex min-h-[44px] w-full items-center justify-center rounded-[var(--xen-radius-md)] bg-primary py-[var(--xen-space-md)] text-base font-extrabold text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: startLabel }), footnote ? (0, jsx_runtime_1.jsx)("p", { className: "text-center text-xs text-muted", children: footnote }) : null] })] }));
});
//# sourceMappingURL=SurveyIntroV4.js.map