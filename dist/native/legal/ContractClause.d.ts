import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type ClauseRisk, type ClauseStatus } from './internal';
export type ContractClauseVariant = 'default' | 'compact';
export interface ContractClauseProps {
    /** Clause number / section reference (e.g. "§ 7.2"). */
    number?: string;
    /** Clause heading / title. */
    title: string;
    /** Clause body text. */
    body?: string;
    /** Negotiation state — glyph + word pill, never color alone. */
    status?: ClauseStatus;
    /** Risk level — glyph + word pill. */
    risk?: ClauseRisk;
    /** Whether the clause is expanded to show the full body. */
    expanded?: boolean;
    /** Density. */
    variant?: ContractClauseVariant;
    /** Toggle expand/collapse; passes the next expanded state. */
    onToggle?: (expanded: boolean) => void;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single contract clause: section number, heading, and (when expanded) body,
 * with negotiation-status and risk pills (each a glyph + word so state never
 * rests on color alone). A flagged / high-risk clause gets a token-tinted left
 * rail for scannability. Tapping toggles the body via `onToggle`. All colors are
 * theme tokens — no literals.
 */
export declare function ContractClause({ number, title, body, status, risk, expanded, variant, onToggle, testID, style, }: ContractClauseProps): React.ReactElement;
//# sourceMappingURL=ContractClause.d.ts.map