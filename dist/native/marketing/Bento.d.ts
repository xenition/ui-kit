import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface BentoCardData {
    /** Icon slot rendered in a ramp-gradient-ish tinted tile (string is auto-colored). */
    icon?: React.ReactNode;
    /** Small stat chip in the top-right corner (e.g. "38ms p99"). */
    metric?: React.ReactNode;
    /** Card title. */
    title?: React.ReactNode;
    /** Body copy under the title. */
    body?: React.ReactNode;
    /** Micro-visual slot below the body (a mini chart, an image, …). */
    visual?: React.ReactNode;
    /** Small emphasized footer line pinned to the bottom. */
    detail?: React.ReactNode;
}
export interface BentoCardProps extends BentoCardData {
    style?: StyleProp<ViewStyle>;
}
export interface BentoGridProps {
    /**
     * The bento cells to render (mirrors the web `BentoCard` children). Provide
     * either this data array or `BentoCard` children — the array wins if both are
     * given.
     */
    cards?: BentoCardData[];
    /**
     * `BentoCard` children, for callers that prefer composition over the `cards`
     * array. Ignored when `cards` is provided.
     */
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}
/**
 * One bento cell — the native mirror of the web `BentoCard`: an icon tile +
 * metric chip header, a title, body copy, an optional micro-visual slot, and a
 * pinned detail line. The web hover glow + radial "energy wash" are hover-only
 * effects with no touch analogue and are dropped; the ramp-gradient icon tile
 * degrades to a flat token-tinted square. All slots optional. Token-only.
 */
export declare function BentoCard({ icon, metric, title, body, visual, detail, style, }: BentoCardProps): React.ReactElement;
/**
 * Bento feature grid — the native mirror of the web `BentoGrid` + `BentoCard`.
 *
 * The web version is an asymmetric 6-column CSS grid where cards declare their
 * own column/row spans and overlap into the classic bento rhythm. React Native
 * has no CSS grid and phones are single-column, so native **drops the spans and
 * overlap entirely** and renders the cards as a simple stacked (wrapping) list
 * — the same simplification `FeatureGrid` makes. The web hover glow/energy wash
 * are hover-only and are dropped. Cards fade + rise once on mount (skipped when
 * the OS "Reduce Motion" toggle is on). Token-only.
 */
export declare function BentoGrid({ cards, children, style }: BentoGridProps): React.ReactElement;
//# sourceMappingURL=Bento.d.ts.map