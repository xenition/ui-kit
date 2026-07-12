import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type OrnamentShape } from './OrnamentRule';
export interface PriceRow {
    /** Item name (left side of the leader). */
    name: string;
    /** Price, already formatted (right side of the leader — the kit never guesses currency). */
    price: string;
    /** Supporting line under the row. */
    description?: string;
}
export interface PriceListProps {
    /** Group heading (e.g. a menu course, a service tier family). */
    heading?: string;
    /** The rows to render (mirrors the web `PriceRow` children). */
    rows: PriceRow[];
    /** Ornament drawn above the heading (default `diamond`; `none` hides the rule). */
    ornament?: OrnamentShape;
    style?: StyleProp<ViewStyle>;
}
/**
 * Editorial price group — the native mirror of the web `PriceList` + `PriceRow`.
 * The web version composes children; native takes a `rows` data array (idiomatic
 * for RN lists). Each row is `name ········ price`: the label sits left, the price
 * right, and the web dotted leader is approximated with a flex spacer carrying a
 * thin low-opacity accent bottom border (RN has no CSS dotted `color-mix` leader).
 * Reuses the native `OrnamentRule` + `Eyebrow`. Token-only.
 */
export declare function PriceList({ heading, rows, ornament, style, }: PriceListProps): React.ReactElement;
//# sourceMappingURL=PriceList.d.ts.map