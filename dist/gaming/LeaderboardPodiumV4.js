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
exports.LeaderboardPodiumV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const AvatarV4_1 = require("../primitives/AvatarV4");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const types_1 = require("./types");
const arcade_v4_1 = require("./internal/arcade-v4");
const CARD_STATE = (0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)');
/**
 * Render order (2nd · 1st · 3rd) with each pillar's height **off the spacing
 * scale**, so a denser or a roomier seed rescales the podium instead of
 * leaving three hand-picked pixel heights sitting in the middle of it.
 */
const PLACES = [
    { index: 1, height: 'h-[calc(var(--xen-space-2xl)_*_1.5)]', medal: '🥈' },
    { index: 0, height: 'h-[calc(var(--xen-space-2xl)_*_2)]', medal: '🥇' },
    { index: 2, height: 'h-2xl', medal: '🥉' },
];
/**
 * **V4 leaderboard podium** — same props as {@link LeaderboardPodium} plus
 * `formatScore`.
 *
 * ## Four changes
 *
 * 1. **A podium place is identity, not status.** Gold was `warn` and bronze
 *    `accent` — so the winner of a leaderboard was drawn in the colour the kit
 *    uses to warn you about something, and third place in the brand's
 *    secondary. Second place was worse: it spent `border` — the **hairline**
 *    colour, which has no contrast promise at all — as a tier accent, so on
 *    some seeds it simply vanished. The medal, the `#1`/`#2`/`#3` and the
 *    pillar height say which place it is; all three pillars share one neutral
 *    ground and one hairline.
 * 2. **A place that is not a button still has a name.** The static form put
 *    `aria-label` on a bare `<div>`, where ARIA forbids it — so the rank, the
 *    name and the score were discarded, while the native twin announced all
 *    three. It is a `group` now, and the interactive form keeps the score in
 *    its name the way the V2 and V3 lines already did.
 * 3. **Scores are formatted once, by `formatScore`.** The base printed
 *    `formatCount(score)` on the pillar and announced the raw integer, so a
 *    reader heard "1247 points" where the screen said "1.2K" — two different
 *    numbers for the same fact, and no way for an app to change either.
 * 4. **The pillar ground is a token mix and the press is a state layer.**
 *    `bg-neutral-100` inverts under `[data-theme="dark"]`; `hover:opacity-90`
 *    dims the podium's own content, which is M3's disabled signal. Each place
 *    clears 44 and rings in the kit's one `ring` colour.
 */
exports.LeaderboardPodiumV4 = React.forwardRef(function LeaderboardPodiumV4({ entries, emptyLabel = 'No rankings yet', onClick, formatScore = types_1.formatCount, className }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const list = entries ?? [];
    if (list.length === 0) {
        return (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { ref: ref, title: emptyLabel, className: className });
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('flex items-end justify-center gap-sm rounded-[var(--xen-radius-lg)] border border-border', 'bg-card p-lg text-on-card', className), children: PLACES.map((place) => {
            const entry = list[place.index];
            if (!entry)
                return (0, jsx_runtime_1.jsx)("div", { className: "flex-1" }, place.index);
            const rank = place.index + 1;
            const scoreText = formatScore(entry.score);
            const name = (0, arcade_v4_1.spokenLine)([`Rank ${rank}`, entry.name, scoreText]);
            const column = ((0, jsx_runtime_1.jsxs)("span", { className: "flex w-full flex-col items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-xl leading-none", children: place.medal }), (0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: entry.avatarUrl, name: entry.name, alt: "", size: place.index === 0 ? 'lg' : 'md' }), (0, jsx_runtime_1.jsx)("span", { className: "max-w-full truncate text-sm font-bold text-on-card", children: entry.name }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('flex w-full flex-col items-center rounded-t-[var(--xen-radius-md)]', 'border-t border-border pt-xs', place.height), style: { background: (0, tone_v4_1.toneGround)(arcade_v4_1.IDENTITY_TONE) }, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-base font-bold text-on-card', arcade_v4_1.TABULAR_CLASS), children: `#${rank}` }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs text-on-card', arcade_v4_1.TABULAR_CLASS), children: scoreText })] })] }));
            if (!onClick) {
                return ((0, jsx_runtime_1.jsx)("div", { role: "group", "aria-label": name, className: "flex-1", children: column }, entry.id));
            }
            return ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": name, onClick: () => onClick(entry, rank), "data-xen-v4-state": "", style: CARD_STATE, className: (0, cn_1.cn)('flex-1 rounded-[var(--xen-radius-md)]', chrome_v4_1.MIN_TAP_CLASS, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: column }, entry.id));
        }) }));
});
//# sourceMappingURL=LeaderboardPodiumV4.js.map