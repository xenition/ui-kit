import * as React from 'react';
import type { AutomationRuleProps } from './AutomationRule';
/** Drop-in for {@link AutomationRuleProps} — same props, the V4 "ambient" design. */
export type AutomationRuleV4Props = AutomationRuleProps;
/**
 * AutomationRule — **V4** "ambient" design. The control-panel take on an
 * automation row: an **enabled rule glows** — when active the card takes a soft
 * `primary`-tinted wash, a primary border, and a glowing icon disc; disabled or
 * `offline` rules stay calm and muted. The "when → then" clause reads as a
 * trigger → action line, and a text `On`/`Off`/`Offline` label carries the state
 * independent of color. The enable {@link Switch} is blocked while `offline`.
 * Same props/behavior as {@link AutomationRuleProps}; token-only colors via
 * `useXenitionTheme()`.
 */
export declare function AutomationRuleV4({ name, trigger, action, icon, enabled, offline, onToggle, style, }: AutomationRuleV4Props): React.ReactElement;
//# sourceMappingURL=AutomationRuleV4.d.ts.map