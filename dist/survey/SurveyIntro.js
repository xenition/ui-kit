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
exports.SurveyIntro = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * Survey landing / intro screen — a token `Card` leading with the title and
 * purpose, an optional meta stats row (question count, estimated time), and a
 * primary start `Button`. `hero` centers the layout behind an enlarged mark. The
 * CTA carries an accessible name; no literal colors.
 */
exports.SurveyIntro = React.forwardRef(function SurveyIntro({ title, description, logoGlyph, meta, startLabel = 'Start survey', onStart, footnote, variant = 'default', className }, ref) {
    const hero = variant === 'hero';
    return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { ref: ref, className: className, children: (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-col gap-md', hero ? 'items-center' : 'items-stretch'), children: [logoGlyph ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex items-center justify-center rounded-full bg-primary', hero ? 'h-[72px] w-[72px] self-center' : 'h-[52px] w-[52px] self-start'), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: logoGlyph, size: hero ? '2xl' : 'xl', color: "onPrimary" }) })) : null, (0, jsx_runtime_1.jsx)("h2", { className: (0, cn_1.cn)('text-2xl font-extrabold text-on-surface', hero ? 'text-center' : 'text-left'), children: title }), description ? ((0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-base leading-relaxed text-muted', hero ? 'text-center' : 'text-left'), children: description })) : null, meta && meta.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex gap-lg py-sm', hero ? 'justify-center' : 'justify-start'), children: meta.map((m, i) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-0.5", children: [m.icon ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: m.icon, size: "lg", color: "primary" }) : null, (0, jsx_runtime_1.jsx)("span", { className: "text-lg font-bold text-on-surface", children: m.value }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: m.label })] }, `${m.label}-${i}`))) })) : null, (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "lg", onClick: onStart, "aria-label": startLabel, children: startLabel }), footnote ? (0, jsx_runtime_1.jsx)("p", { className: "text-center text-xs text-muted", children: footnote }) : null] }) }));
});
//# sourceMappingURL=SurveyIntro.js.map