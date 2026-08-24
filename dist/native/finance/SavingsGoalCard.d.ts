import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SemanticColors } from '../theme';
import { type Appearance } from '../primitives/internal/appearance';
import { type MoneyFormatter } from '../commerce/money';
export interface SavingsGoalCardProps {
    /** Goal name (e.g. "Emergency fund"). */
    title: string;
    /** Amount saved so far, in integer **cents**. */
    savedCents: number;
    /** Target amount, in integer **cents**. */
    targetCents: number;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Optional target-date caption (already localized). */
    deadline?: string;
    /** Theme color slot for the progress ring (default `success`). */
    color?: keyof SemanticColors;
    /** Override the cents → string formatter (locale control). */
    formatMoney?: MoneyFormatter;
    /**
     * Surface treatment (visual-diversity preset). Defaults to `classic` —
     * byte-for-byte the historical bordered card, so this is opt-in only.
     */
    appearance?: Appearance;
    style?: StyleProp<ViewStyle>;
}
/**
 * A savings-goal tile: a {@link ProgressRing} showing percent-to-target beside
 * a saved / target breakdown and an optional deadline. Progress is
 * `savedCents / targetCents` (guarded against a non-positive target), amounts
 * are integer cents through {@link MoneyAmount}, and the "to go" figure is the
 * remaining cents. Token-bound throughout.
 */
export declare function SavingsGoalCard({ title, savedCents, targetCents, currency, deadline, color, formatMoney: format, appearance, style, }: SavingsGoalCardProps): React.ReactElement;
//# sourceMappingURL=SavingsGoalCard.d.ts.map