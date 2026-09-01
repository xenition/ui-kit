/**
 * Safety verdicts — **pure, and shared by both twins**, the way
 * `calendar/layout-v4.ts` and `crypto/amount-v4.ts` are. The native twin
 * imports it as `../../fieldservice/verdict-v4`.
 *
 * Nothing here is exported from the package.
 */

/** What a technician has recorded about a checkpoint. */
export type SafetyVerdict = 'unchecked' | 'pass' | 'fail';

/**
 * The order a tap moves a checkpoint through.
 *
 * Unchanged from the base — `unchecked → pass → fail → unchecked` — because
 * passing is the ordinary case and making it cost two taps would be a worse
 * component, not a safer one. What changes is {@link clearsHazard}: the one
 * transition that removes a blocking hazard from the screen no longer happens
 * on a single stray touch.
 */
export function nextVerdict(current: SafetyVerdict): SafetyVerdict {
  if (current === 'pass') return 'fail';
  if (current === 'fail') return 'unchecked';
  return 'pass';
}

/**
 * Whether moving a checkpoint from `from` to `to` takes a blocking hazard off
 * the screen.
 *
 * ## The bug this guards
 *
 * `SafetyChecklist` cycled `fail → unchecked` on one tap. A technician
 * standing on a site with a failed fall-protection anchor sees a red
 * "Hazard — do not proceed" banner. The failing row is a 40px target, tapped
 * one-handed, outdoors, in gloves. One accidental tap moved the row to
 * `unchecked`, which dropped it out of the hazard count, **unmounted the
 * danger banner**, and flipped the header from "1 failing" to "All clear" —
 * with no confirmation, no undo, and no announcement. The row's accessible
 * name did not even say what pressing would do.
 *
 * The component then handed the caller no way to guard it: the props exposed
 * only `onToggle`, so a host app could not require a confirmation, could not
 * make the transition undoable, and could not tell a deliberate clearance
 * apart from a glove brushing the screen.
 *
 * A verdict that is not a hazard cycles freely, as it always did.
 */
export function clearsHazard(
  item: { hazard?: boolean; verdict?: SafetyVerdict },
  to: SafetyVerdict
): boolean {
  return item.hazard === true && item.verdict === 'fail' && to !== 'fail';
}

/** How many blocking hazards are currently failing. */
export function hazardCount(
  items: ReadonlyArray<{ hazard?: boolean; verdict?: SafetyVerdict }>
): number {
  return items.filter((item) => item.hazard === true && item.verdict === 'fail').length;
}

/**
 * Whether a checklist is complete.
 *
 * `ServiceChecklist` compared a **rounded percentage** against 100 —
 * `clampPct((completed / total) * 100) === 100` — and `clampPct` rounds, so
 * 199 of 200 came out as 100 and the bar turned "complete" green with an item
 * still outstanding. Counts answer this question; a percentage is for drawing.
 */
export function isComplete(completed: number, total: number): boolean {
  return total > 0 && completed >= total;
}
