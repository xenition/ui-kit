/**
 * Tiny pure formatters shared by the jobs components (web). No React, no theme,
 * no color — presentation-only string helpers so each component stays focused on
 * layout + tokens. Dep-free port of the native `jobs/format`.
 */
import type { Salary } from './types';
/** Compact money, e.g. `120000` → `$120k`. Falls back to grouped digits. */
export declare function formatCompactMoney(amount: number, currency?: string): string;
/**
 * Render a salary band as a single label, e.g. `$90k – $120k/yr`. Returns
 * `null` when neither bound is present so callers can show an empty hint.
 */
export declare function formatSalary(salary?: Salary | null): string | null;
/** Localized short date, e.g. `Jun 15`. Empty string on bad input. */
export declare function formatShortDate(iso?: string): string;
/** Localized `h:mm a` time. Empty string on bad input. */
export declare function formatTime(iso?: string): string;
/** Coarse relative age, e.g. `2d ago`, `just now`. Empty on bad input. */
export declare function formatRelative(iso?: string, now?: number): string;
//# sourceMappingURL=format.d.ts.map