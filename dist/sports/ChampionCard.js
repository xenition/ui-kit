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
exports.ChampionCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * ChampionCard — the sports module's **peak-end trophy celebration** (web parity
 * of the native twin). A two-hue accent→primary "trophy glow" gradient ground
 * (`from-accent-400 to-primary-600`) with a big 🏆 glyph, the optional
 * competition subtitle, the celebration `title`, and the winning `team` (crest +
 * name) all in near-white ink, plus an optional frosted stat tile and a share
 * CTA. Presentational only: shaped data plus an optional `onShare`; nothing
 * fetches. Every color derives from the brand ramp (gradient utilities +
 * `--xen-*` classes) — no literals, dark-safe.
 */
exports.ChampionCard = React.forwardRef(function ChampionCard({ title, team, crest, subtitle, stat, onShare, className, ...rest }, ref) {
    const a11y = `${title}${subtitle ? `, ${subtitle}` : ''}, ${team}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": a11y, className: (0, cn_1.cn)('flex flex-col items-center overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-accent-400 to-primary-600 p-6 text-center text-primary-50 shadow-sm', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { role: "img", "aria-label": "Trophy", className: "flex h-20 w-20 items-center justify-center rounded-full border border-primary-50/30 bg-primary-50/15 text-4xl", children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\uD83C\uDFC6" }) }), subtitle ? ((0, jsx_runtime_1.jsx)("p", { className: "mt-4 text-xs font-extrabold uppercase tracking-wide text-primary-100", children: subtitle })) : null, (0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-2xl font-extrabold text-primary-50", children: title }), (0, jsx_runtime_1.jsxs)("p", { className: "mt-2 flex items-center justify-center gap-2 text-lg font-bold text-primary-50", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: crest ?? '🛡' }), (0, jsx_runtime_1.jsx)("span", { className: "truncate", children: team })] }), stat ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-6 flex min-w-[8rem] flex-col items-center gap-0.5 rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 px-6 py-3", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-extrabold text-primary-50", children: stat.value }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-primary-100", children: stat.label })] })) : null, onShare ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": "Share", onClick: onShare, className: "mt-6 inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-on-primary px-6 text-sm font-extrabold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u2197" }), "Share"] })) : null] }));
});
//# sourceMappingURL=ChampionCard.js.map