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
exports.ScoreBoardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const AvatarV4_1 = require("../primitives/AvatarV4");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const arcade_v4_1 = require("./internal/arcade-v4");
function Crest({ entry, size }) {
    if (entry?.avatarUrl) {
        return ((0, jsx_runtime_1.jsx)("img", { src: entry.avatarUrl, alt: "", loading: "lazy", className: (0, cn_1.cn)('rounded-[var(--xen-radius-sm)] object-cover', arcade_v4_1.PLACEHOLDER_CLASS, size === 'lg' ? 'h-2xl w-2xl' : 'h-lg w-lg') }));
    }
    return (0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { name: entry?.name ?? '?', size: size, alt: "" });
}
/**
 * **V4 scoreboard** — same props as {@link ScoreBoard} plus `scoreUnit`.
 *
 * ## Four changes
 *
 * 1. **Every row's name lands.** The board built a good one — "Rank 2, Kite,
 *    980 points" — and hung it on a bare `<div>`, twice: once per standings
 *    row and once per versus side. ARIA forbids naming a generic element, so
 *    the browser threw all of them away and a reader got the rank, the name
 *    and the score as three unrelated fragments, in a container with no
 *    structure to hold them together. Meanwhile the native twin sets
 *    `accessible` and does announce it — the same component telling two
 *    platforms two different things.
 * 2. **The standings are a list.** They were flex `div`s: no count, no
 *    position, nothing to say "4 of 8" with, and no way to move by item. An
 *    `<ol>` says the order is the meaning, which for a ranked board it is.
 * 3. **A score is a number with a unit and tabular figures.** `950` alone is
 *    not a fact, and proportional digits mean the score column jiggles left
 *    and right as a live match ticks — the one column a viewer is watching.
 * 4. **The crest placeholder stops inverting.** `bg-neutral-200` is a step on
 *    the web ramp, which mirrors under `[data-theme="dark"]` while the crest
 *    loading over it does not.
 */
exports.ScoreBoardV4 = React.forwardRef(function ScoreBoardV4({ entries, variant = 'ranked', title, emptyLabel = 'No scores yet', scoreUnit = 'points', className, }, ref) {
    const list = entries ?? [];
    if (list.length === 0) {
        return (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { ref: ref, title: emptyLabel, className: className });
    }
    const cardClass = (0, cn_1.cn)('flex flex-col rounded-[var(--xen-radius-lg)] border border-border bg-card p-lg text-on-card', className);
    const header = title ? ((0, jsx_runtime_1.jsx)("h3", { className: "font-heading text-base font-bold text-on-card", children: title })) : null;
    if (variant === 'versus') {
        const home = list[0];
        const away = list[1];
        const leader = home != null && away != null
            ? home.score > away.score
                ? 'home'
                : away.score > home.score
                    ? 'away'
                    : undefined
            : undefined;
        const side = (entry, which, align) => {
            const winning = leader === which;
            const score = entry?.score ?? 0;
            return ((0, jsx_runtime_1.jsxs)("div", { role: "group", "aria-label": (0, arcade_v4_1.spokenLine)([
                    entry?.name ?? 'TBD',
                    `${score} ${scoreUnit}`,
                    winning ? 'Leading' : undefined,
                ]), className: "flex flex-1 flex-col items-center gap-xs", children: [(0, jsx_runtime_1.jsx)(Crest, { entry: entry, size: "lg" }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('w-full truncate text-sm text-on-card', winning ? 'font-bold' : 'font-medium', align === 'left' ? 'text-left' : 'text-right'), children: entry?.name ?? 'TBD' }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-2xl font-bold text-on-card', arcade_v4_1.TABULAR_CLASS), children: score })] }));
        };
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)(cardClass, 'gap-md'), children: [header, (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [side(home, 'home', 'left'), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-sm font-bold text-muted-text", children: "VS" }), side(away, 'away', 'right')] })] }));
    }
    const ranked = [...list].sort((a, b) => b.score - a.score);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)(cardClass, 'gap-sm'), children: [header, (0, jsx_runtime_1.jsx)("ol", { "aria-label": title, className: "flex flex-col gap-xs", children: ranked.map((entry, index) => {
                    const leader = index === 0;
                    return ((0, jsx_runtime_1.jsxs)("li", { "aria-label": (0, arcade_v4_1.spokenLine)([
                            `Rank ${index + 1}`,
                            entry.name,
                            `${entry.score} ${scoreUnit}`,
                            entry.detail,
                        ]), className: "flex items-center gap-sm py-xs", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('w-xl shrink-0 text-sm font-bold text-muted-text', arcade_v4_1.TABULAR_CLASS), children: index + 1 }), (0, jsx_runtime_1.jsx)(Crest, { entry: entry, size: "sm" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('truncate text-sm text-on-card', leader ? 'font-bold' : 'font-medium'), children: entry.name }), entry.detail ? ((0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted-text", children: entry.detail })) : null] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-base font-bold text-on-card', arcade_v4_1.TABULAR_CLASS), children: entry.score })] }, entry.id));
                }) })] }));
});
//# sourceMappingURL=ScoreBoardV4.js.map