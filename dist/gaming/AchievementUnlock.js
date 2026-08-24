"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AchievementUnlock = AchievementUnlock;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
/**
 * An achievement / trophy unlock surface — a glyph medallion, an overline, the
 * title + criteria, and a point value. Locked achievements render a padlock and
 * muted copy (state shown via text + icon, not color alone). `toast` is a
 * compact banner; `inline` is a centered card. `onClick` opens it (a real
 * `<button>`; disabled while locked). Composes `Card`, `Icon`. Token-only.
 */
function AchievementUnlock({ achievement, variant = 'toast', unlocked = true, label = 'Achievement unlocked', onClick, className, }) {
    const inline = variant === 'inline';
    const accentText = unlocked ? 'text-warn' : 'text-muted';
    const accentBorder = unlocked ? 'border-warn' : 'border-border';
    const badge = ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 bg-neutral-100', accentBorder), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: unlocked ? achievement.glyph ?? '🏆' : '🔒', size: "2xl", color: unlocked ? 'warn' : 'muted' }) }));
    const text = ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-col gap-0.5', inline ? 'items-center text-center' : 'flex-1 items-start'), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-bold uppercase tracking-wide', accentText), children: unlocked ? label : 'Locked' }), (0, jsx_runtime_1.jsx)("span", { className: "line-clamp-2 text-lg font-bold text-on-surface", children: achievement.title }), achievement.description ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm text-muted', inline ? 'line-clamp-3' : 'line-clamp-2'), children: achievement.description })) : null, achievement.points != null ? ((0, jsx_runtime_1.jsx)("span", { className: "mt-0.5 text-xs font-semibold text-muted", children: `${achievement.points} G` })) : null] }));
    const a11yLabel = `${unlocked ? label : 'Locked achievement'}: ${achievement.title}`;
    const cardClass = (0, cn_1.cn)('flex', inline ? 'flex-col items-center gap-[var(--xen-space-sm)]' : 'flex-row items-center gap-[var(--xen-space-md)]');
    if (!onClick) {
        return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { role: "group", "aria-label": a11yLabel, className: (0, cn_1.cn)(cardClass, className), children: [badge, text] }));
    }
    return ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": a11yLabel, "aria-disabled": !unlocked || undefined, onClick: () => onClick(achievement), className: (0, cn_1.cn)('block w-full text-left transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), children: (0, jsx_runtime_1.jsxs)(Card_1.Card, { className: cardClass, children: [badge, text] }) }));
}
//# sourceMappingURL=AchievementUnlock.js.map