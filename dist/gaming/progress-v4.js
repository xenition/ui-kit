"use strict";
/**
 * Slots, quests and scores — **pure, and shared by both twins**, the way
 * `events/schedule-v4.ts` is. The native twin imports it as
 * `../../gaming/progress-v4`.
 *
 * Nothing here is exported from the package.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.slotParts = slotParts;
exports.questParts = questParts;
/**
 * Read a lobby's slots.
 *
 * ## The bug this replaces
 *
 * `LobbyRow` computed `clamp(players, 0, cap || players)` and rendered
 * `` `${filled}/${cap || players}` ``, so a lobby with `capacity: 0` showed
 * **5/5** — apparently full. But `isFull` was `cap > 0 && …`, so `joinable`
 * stayed true and the button still said **Join**. The badge said full, the
 * button said join, and both were reading the same zero.
 */
function slotParts(players, capacity) {
    const filled = Number.isFinite(players) ? Math.max(0, Math.round(players)) : 0;
    const cap = Number.isFinite(capacity) ? Math.round(capacity) : 0;
    if (cap <= 0) {
        // No capacity is not a full room. It is an unknown room.
        return { filled, capacity: 0, ratio: undefined, full: false, joinable: false };
    }
    const bounded = Math.min(filled, cap);
    return {
        filled: bounded,
        capacity: cap,
        ratio: bounded / cap,
        full: bounded >= cap,
        joinable: bounded < cap,
    };
}
/**
 * A quest's progress, clamped, with a goal that cannot be zero.
 *
 * The V2 and V3 lines passed `quest.goal` raw to `aria-valuemax` while the
 * drawn fill used a clamped percentage — so for out-of-range input the bar and
 * the announced value disagreed, and a `goal` of 0 produced an invalid range.
 */
function questParts(progress, goal) {
    const safeGoal = Number.isFinite(goal) ? Math.max(1, Math.round(goal)) : 1;
    const raw = Number.isFinite(progress) ? Math.round(progress) : 0;
    const value = Math.min(Math.max(0, raw), safeGoal);
    return { value, goal: safeGoal, ratio: value / safeGoal, complete: value >= safeGoal };
}
//# sourceMappingURL=progress-v4.js.map