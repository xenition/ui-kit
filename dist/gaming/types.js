"use strict";
/**
 * Shared data shapes + helpers for `@xenition/ui/gaming` — the web (React DOM)
 * parity of `native/gaming`. Plain data records (no colors, no styling) that the
 * gaming components accept as props, plus a couple of pure formatting/token
 * helpers reused across the module.
 *
 * The components are **presentation shells only**: they never own game state.
 * Values (scores, xp, matchmaking phase, quest progress) are passed in and
 * intents (join, claim, accept, click a match) come back out via callbacks, so
 * an app wires its real game backend behind them.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RARITY_BORDER_CLASS = exports.RARITY_TEXT_CLASS = void 0;
exports.rarityRank = rarityRank;
exports.rarityColorKey = rarityColorKey;
exports.formatCount = formatCount;
exports.clamp = clamp;
exports.formatElapsed = formatElapsed;
/**
 * Ordinal rank for a rarity tier (`common` = 0 … `legendary` = 4). Used to
 * sort / compare rarities and to size accents; unknown tiers fall back to 0.
 */
function rarityRank(rarity) {
    const order = ['common', 'uncommon', 'rare', 'epic', 'legendary'];
    const i = rarity ? order.indexOf(rarity) : -1;
    return i < 0 ? 0 : i;
}
/**
 * Map a rarity tier to a **semantic color slot** so every rarity accent traces
 * to a token (never a literal). `common` reads as muted; higher tiers escalate
 * through success → primary → accent → warn.
 */
function rarityColorKey(rarity) {
    switch (rarity) {
        case 'legendary':
            return 'warn';
        case 'epic':
            return 'accent';
        case 'rare':
            return 'primary';
        case 'uncommon':
            return 'success';
        case 'common':
        default:
            return 'muted';
    }
}
/** Token `text-*` utility class for a rarity slot (no literal colors). */
exports.RARITY_TEXT_CLASS = {
    muted: 'text-muted',
    success: 'text-success',
    primary: 'text-primary',
    accent: 'text-accent',
    warn: 'text-warn',
};
/** Token `border-*` utility class for a rarity slot (no literal colors). */
exports.RARITY_BORDER_CLASS = {
    muted: 'border-border',
    success: 'border-success',
    primary: 'border-primary',
    accent: 'border-accent',
    warn: 'border-warn',
};
/** Compact count, e.g. `1234` → `'1.2K'`, `2_000_000` → `'2M'`; guards junk. */
function formatCount(n) {
    if (n == null || !Number.isFinite(n) || n < 0)
        return '0';
    if (n < 1000)
        return String(n);
    if (n < 1000000)
        return `${(n / 1000).toFixed(n < 10000 ? 1 : 0)}K`;
    return `${(n / 1000000).toFixed(n < 10000000 ? 1 : 0)}M`;
}
/** Clamp `n` into `[min, max]`; non-finite input collapses to `min`. */
function clamp(n, min, max) {
    if (!Number.isFinite(n))
        return min;
    return Math.max(min, Math.min(max, n));
}
/** Format `mm:ss` from whole seconds; guards nullish / negative / non-finite. */
function formatElapsed(totalSeconds) {
    if (totalSeconds == null || !Number.isFinite(totalSeconds) || totalSeconds < 0) {
        return '0:00';
    }
    const whole = Math.floor(totalSeconds);
    const s = whole % 60;
    const m = Math.floor(whole / 60);
    return `${m}:${String(s).padStart(2, '0')}`;
}
//# sourceMappingURL=types.js.map