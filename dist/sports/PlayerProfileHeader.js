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
exports.PlayerProfileHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * PlayerProfileHeader — a **gradient player hero** (web parity of the native twin).
 * A brand-gradient ground with the player's crest/photo avatar and big jersey
 * number up top, the near-white name + position · team beneath, an optional
 * follow CTA, and a row of frosted stat tiles (`bg-primary-50/15 border
 * border-primary-50/30`) along the bottom. Presentational only: shaped `stats`
 * plus an optional `onFollow`; nothing fetches. Every color derives from the
 * brand ramp (`--xen-*` classes + gradient utilities) — no literals, dark-safe.
 */
exports.PlayerProfileHeader = React.forwardRef(function PlayerProfileHeader({ name, position, team, number, photoUrl, crest, stats, onFollow, following = false, className, ...rest }, ref) {
    const subtitle = [position, team].filter(Boolean).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-6 text-primary-50 shadow-sm', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-4", children: [(0, jsx_runtime_1.jsx)("span", { role: "img", "aria-label": `${name} avatar`, className: "flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary-50/30 bg-primary-50/15 text-3xl", children: photoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        (0, jsx_runtime_1.jsx)("img", { src: photoUrl, alt: "", className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: crest ?? '🧑' })) }), number !== undefined ? ((0, jsx_runtime_1.jsx)("span", { "aria-label": `Jersey number ${number}`, className: "ml-auto text-5xl font-extrabold leading-none tracking-tight text-primary-50", children: number })) : null] }), (0, jsx_runtime_1.jsx)("p", { className: "mt-4 truncate text-2xl font-extrabold text-primary-50", children: name }), subtitle ? ((0, jsx_runtime_1.jsx)("p", { className: "mt-0.5 truncate text-sm font-semibold text-primary-100", children: subtitle })) : null, onFollow ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": following ? `Unfollow ${name}` : `Follow ${name}`, "aria-pressed": following, onClick: onFollow, className: (0, cn_1.cn)('mt-4 inline-flex min-h-11 items-center justify-center self-start rounded-full px-5 text-sm font-extrabold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', following
                    ? 'border border-primary-50/30 bg-primary-50/15 text-primary-50'
                    : 'bg-on-primary text-primary'), children: following ? 'Following' : 'Follow' })) : null, stats.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-6 grid grid-cols-3 gap-2", children: stats.map((s, i) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-0.5 rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 px-2 py-3", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-lg font-extrabold text-primary-50", children: s.value }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs font-semibold text-primary-100", children: s.label })] }, `${s.label}-${i}`))) })) : null] }));
});
//# sourceMappingURL=PlayerProfileHeader.js.map