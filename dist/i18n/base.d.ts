/**
 * The shared base dictionary: the UI-chrome strings essentially every template
 * reuses — navigation, actions, statuses, commerce, forms, booking, footer, and
 * the not-found page. A template only has to translate its OWN copy (hero lines,
 * section headings, service names); everything here comes for free in all seven
 * languages.
 *
 * Keys are flat, dot-namespaced. `{{var}}` placeholders are filled by `t(key, vars)`.
 * English is the complete source of truth; the other six mirror its keys.
 */
import type { Bundle } from './context';
/** The shared base bundle: chrome strings in all seven languages. */
export declare const baseBundle: Bundle;
/** The English key set — useful for tests / completeness checks. */
export declare const baseKeys: string[];
//# sourceMappingURL=base.d.ts.map