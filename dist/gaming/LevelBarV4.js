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
exports.LevelBarV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const ProgressV4_1 = require("../primitives/ProgressV4");
const types_1 = require("./types");
const arcade_v4_1 = require("./internal/arcade-v4");
/**
 * **V4 level bar** — the same props as {@link LevelBar}.
 *
 * ## Four changes
 *
 * 1. **The fraction is announced.** The base's JSDoc claims it is, and on the
 *    native twin it is not: the `Progress` primitive supplies a real
 *    `progressbar` value and the labelled container above it swallows the
 *    whole subtree, so the one number the component exists to communicate was
 *    unreachable. Nothing wraps or renames the bar here; its own value and its
 *    own name are what a reader gets, and the name carries the level as well
 *    as the percentage, because the level chip beside it is decorative.
 * 2. **The drawn fill and the announced value cannot disagree.** Both come out
 *    of `questParts()` — one clamp, shared with `QuestCard` and with both
 *    native twins. The base clamped `xp` for the fill and passed `max || 1` to
 *    the bar, which meant an `xpMax` of 0 produced a bar whose range was a lie
 *    and whose caption read `0 / 0 XP`.
 * 3. **The XP readout is tabular.** A level bar that ticks up during play
 *    reflowed on every frame, because proportional digits are different widths
 *    and `1,199 / 1,200` is not the same length as `1,200 / 1,200`.
 * 4. **The level chip comes off the spacing scale.** It was `h-10 w-10` and
 *    `h-[30px] w-[30px]` — two hand-picked pixel sizes that ignore a denser or
 *    a roomier seed entirely.
 */
exports.LevelBarV4 = React.forwardRef(function LevelBarV4({ level, xp, xpMax, variant = 'default', tone = 'primary', className }, ref) {
    const compact = variant === 'compact';
    const parts = (0, arcade_v4_1.questParts)(xp, xpMax);
    // `xpMax <= 0` is "no next level", not "a goal of one XP" — the bar reads
    // empty and the caption says so, rather than jumping to 100%.
    const known = Number.isFinite(xpMax) && xpMax > 0;
    const pct = known ? Math.round(parts.ratio * 100) : 0;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-md', className), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex shrink-0 items-center justify-center rounded-full bg-primary font-bold text-on-primary', arcade_v4_1.TABULAR_CLASS, compact ? 'h-xl w-xl text-sm' : 'h-2xl w-2xl text-sm'), children: level }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)(ProgressV4_1.ProgressV4, { value: known ? parts.value : 0, max: known ? parts.goal : 1, tone: tone, size: compact ? 'sm' : 'md', "aria-label": (0, arcade_v4_1.spokenLine)([`Level ${level}`, `${pct}% to next level`]) }), compact ? null : ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs text-muted-text', arcade_v4_1.TABULAR_CLASS), children: `${(0, types_1.formatCount)(known ? parts.value : 0)} / ` +
                                    `${(0, types_1.formatCount)(known ? parts.goal : 0)} XP` }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold text-muted-text', arcade_v4_1.TABULAR_CLASS), children: `${pct}%` })] }))] })] }));
});
//# sourceMappingURL=LevelBarV4.js.map