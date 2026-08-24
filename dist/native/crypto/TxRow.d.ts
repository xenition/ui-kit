import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** On-chain lifecycle state of a transaction. */
export type TxStatus = 'pending' | 'confirmed' | 'failed';
/** Send (out) vs receive (in) — drives the amount sign/tone. */
export type TxDirection = 'send' | 'receive';
export interface TxRowProps {
    /** Transaction hash (truncated for display). */
    hash: string;
    /** Lifecycle state — rendered with a glyph AND label, never color alone. */
    status?: TxStatus;
    /** Send tints the amount `danger`, receive tints it `success`. */
    direction?: TxDirection;
    /** Amount in token units. */
    amount?: number;
    /** Token ticker for the amount. */
    symbol?: string;
    /** Fraction digits for the token amount (default `4`). */
    decimals?: number;
    /** Optional fiat value in integer **cents**. */
    valueCents?: number;
    /** ISO 4217 currency for the fiat value (default `USD`). */
    currency?: string;
    /** Right-aligned timestamp string (already localized by the caller). */
    timestamp?: string;
    /** Truncation lead/tail for the hash (default 6/4). */
    hashLead?: number;
    hashTail?: number;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * One transaction in a history feed: a status pill (glyph + label, so state is
 * never color-only), a truncated hash, an optional signed token amount +
 * fiat value, and a timestamp. Send reads `danger`, receive reads `success`.
 * Amounts are fixed-precision — no float drift. Becomes a button when
 * `onPress` is set.
 */
export declare function TxRow({ hash, status, direction, amount, symbol, decimals, valueCents, currency, timestamp, hashLead, hashTail, onPress, style, }: TxRowProps): React.ReactElement;
export interface TxListProps {
    /** Transactions to render, newest first. */
    items: TxRowProps[];
    /** Empty-state headline (default `No transactions`). */
    emptyTitle?: string;
    /** Empty-state supporting line. */
    emptyDescription?: string;
    /** Fires with the row (and index) on press. */
    onSelectItem?: (item: TxRowProps, index: number) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A token-divided list of {@link TxRow}s with an explicit empty state. Row
 * keys fall back to the index when a `hash` collides. Purely presentational.
 */
export declare function TxList({ items, emptyTitle, emptyDescription, onSelectItem, style, }: TxListProps): React.ReactElement;
//# sourceMappingURL=TxRow.d.ts.map