"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelBar = LevelBar;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../primitives/cn");
const Progress_1 = require("../primitives/Progress");
const types_1 = require("./types");
/**
 * An XP / level progress bar — a circular level chip beside a token `Progress`
 * fill sized to `xp / xpMax`, with an optional `xp / xpMax` readout. Guards a
 * zero/negative `xpMax` (renders an empty, non-`NaN` bar) and clamps `xp` into
 * range. The `Progress` carries `role="progressbar"` + an aria-label so the
 * fraction is announced, not conveyed by color alone. Composes `Progress`.
 * Token-only.
 */
function LevelBar({ level, xp, xpMax, variant = 'default', tone = 'primary', className, }) {
    const compact = variant === 'compact';
    const max = Number.isFinite(xpMax) && xpMax > 0 ? xpMax : 0;
    const value = max > 0 ? (0, types_1.clamp)(xp, 0, max) : 0;
    const pct = max > 0 ? Math.round((value / max) * 100) : 0;
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)]', className), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex shrink-0 items-center justify-center rounded-full bg-primary font-bold text-on-primary', compact ? 'h-[30px] w-[30px] text-sm' : 'h-10 w-10 text-sm'), children: level }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-1", children: [(0, jsx_runtime_1.jsx)(Progress_1.Progress, { value: value, max: max || 1, tone: tone, size: compact ? 'sm' : 'md', "aria-label": `Level ${level}, ${pct}% to next level` }), !compact ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: `${(0, types_1.formatCount)(value)} / ${(0, types_1.formatCount)(max)} XP` }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted", children: `${pct}%` })] })) : null] })] }));
}
//# sourceMappingURL=LevelBar.js.map