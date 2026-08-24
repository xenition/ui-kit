import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type LeadTemperature } from './internal';
export interface LeadRowProps {
    /** Lead / person name. */
    name: string;
    /** Company or source line. */
    company?: string;
    /** Lead temperature — drives the glyph + word (never color alone). */
    temperature: LeadTemperature;
    /** Estimated value in integer **cents**. */
    valueCents?: number;
    /** ISO 4217 currency (default USD). */
    currency?: string;
    /** Lead score 0–100, rendered as a badge. */
    score?: number;
    /** Avatar image URL; initials fallback from `name`. */
    avatarUrl?: string;
    /** Whether this row is selected/active (adds a leading accent bar). */
    selected?: boolean;
    onPress?: () => void;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Dense list row for a lead, keyed by **temperature** (`hot` 🔥 / `warm` ☀ /
 * `cold` ❄). Temperature is shown as a glyph *and* a label so it never relies
 * on color; the matching tone (danger/warn/primary) is only reinforcement.
 * Shows optional value (cents → `formatMoney`) and a score badge. All colors
 * are theme tokens.
 */
export declare function LeadRow({ name, company, temperature, valueCents, currency, score, avatarUrl, selected, onPress, testID, style, }: LeadRowProps): React.ReactElement;
//# sourceMappingURL=LeadRow.d.ts.map