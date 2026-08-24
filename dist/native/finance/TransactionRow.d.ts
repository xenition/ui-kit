import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SemanticColors } from '../theme';
import { type Appearance } from '../primitives/internal/appearance';
/** Credit (money in) vs debit (money out). */
export type TransactionDirection = 'income' | 'expense';
export interface TransactionRowProps {
    /** Merchant / counterparty / description. */
    title: string;
    /** Secondary line (category, account, memo). */
    subtitle?: string;
    /** Transaction amount in integer **cents** (magnitude; sign taken from `direction`). */
    amountCents: number;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /**
     * Income tints the amount `success` and prefixes `+`; expense tints it
     * `danger` and prefixes `−`. Omit to let the sign of `amountCents` drive tone.
     */
    direction?: TransactionDirection;
    /** Right-aligned timestamp string (already localized by the caller). */
    date?: string;
    /** Leading glyph/emoji for the category avatar (e.g. `'☕'`, `'🛒'`). */
    icon?: string;
    /** Accent color slot for the avatar disc (default `primary`). */
    iconColor?: keyof SemanticColors;
    /** Fires on row press. */
    onPress?: () => void;
    /**
     * Surface treatment (visual-diversity preset). Defaults to `classic` —
     * byte-for-byte the historical borderless row, so this is opt-in only.
     */
    appearance?: Appearance;
    style?: StyleProp<ViewStyle>;
}
/**
 * One line in a transaction feed: a tinted category avatar, a title/subtitle
 * stack, and a right-aligned {@link MoneyAmount} over an optional date. The
 * amount tone follows `direction` (income = `success`, expense = `danger`) and
 * the magnitude is integer cents — no float drift. Fully token-bound; becomes a
 * button only when `onPress` is supplied (which also enables a press-scale
 * spring). `appearance` opts the row into an alternate surface treatment.
 */
export declare function TransactionRow({ title, subtitle, amountCents, currency, direction, date, icon, iconColor, onPress, appearance, style, }: TransactionRowProps): React.ReactElement;
//# sourceMappingURL=TransactionRow.d.ts.map