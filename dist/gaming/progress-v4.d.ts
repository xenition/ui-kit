/**
 * Slots, quests and scores — **pure, and shared by both twins**, the way
 * `events/schedule-v4.ts` is. The native twin imports it as
 * `../../gaming/progress-v4`.
 *
 * Nothing here is exported from the package.
 */
/** A lobby's occupancy, and whether it can still be joined. */
export interface SlotParts {
    filled: number;
    capacity: number;
    /** `undefined` when there is no capacity to be a fraction of. */
    ratio: number | undefined;
    full: boolean;
    /** True only when a capacity is known and there is room in it. */
    joinable: boolean;
}
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
export declare function slotParts(players: number, capacity: number): SlotParts;
/**
 * A quest's progress, clamped, with a goal that cannot be zero.
 *
 * The V2 and V3 lines passed `quest.goal` raw to `aria-valuemax` while the
 * drawn fill used a clamped percentage — so for out-of-range input the bar and
 * the announced value disagreed, and a `goal` of 0 produced an invalid range.
 */
export declare function questParts(progress: number, goal: number): {
    value: number;
    goal: number;
    ratio: number;
    complete: boolean;
};
//# sourceMappingURL=progress-v4.d.ts.map