import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface AutomationRuleProps {
    /** Rule name (e.g. "Lights off at sunset"). */
    name: string;
    /** Human "when" clause (e.g. "When sunset"). */
    trigger?: string;
    /** Human "then" clause (e.g. "Turn off all lights"). */
    action?: string;
    /** Leading glyph/emoji. Default "⚙️". */
    icon?: string;
    /** Whether the rule is enabled. */
    enabled?: boolean;
    /** Rule references an unreachable device — disables the toggle. */
    offline?: boolean;
    /** Fires with the requested enabled value. */
    onToggle?: (next: boolean) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * An automation rule row — name plus a "when → then" trigger/action summary and
 * an enable {@link Switch}. Enabled rules tint the glyph with `primary`; disabled
 * or `offline` rules fall back to `muted`, and a text `On`/`Off`/`Offline` label
 * carries the state independent of color. The trigger and action clauses join
 * with a token-colored arrow. `offline` blocks toggling. No literal colors.
 */
export declare function AutomationRule({ name, trigger, action, icon, enabled, offline, onToggle, style, }: AutomationRuleProps): React.ReactElement;
//# sourceMappingURL=AutomationRule.d.ts.map