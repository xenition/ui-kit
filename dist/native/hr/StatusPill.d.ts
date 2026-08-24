import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type StatusMeta } from './internal';
export type StatusPillVariant = 'soft' | 'inline' | 'solid';
export type StatusPillSize = 'sm' | 'md';
export interface StatusPillProps {
    /** The glyph + label + tone triple to render. */
    meta: StatusMeta;
    /** `soft` (default) tints the tone; `inline` is a bare glyph+word; `solid` fills. */
    variant?: StatusPillVariant;
    size?: StatusPillSize;
    style?: StyleProp<ViewStyle>;
}
/**
 * Reusable status indicator for the HR module — renders a {@link StatusMeta}
 * as a **glyph + word** pill so state is never conveyed by color alone. Color
 * always resolves from a compiled token via {@link toneColor} (or a token-tinted
 * `withAlpha`), never a literal. `inline` drops the pill chrome for use inside a
 * dense row. Not domain-specific; every HR block composes it.
 */
export declare function StatusPill({ meta, variant, size, style, }: StatusPillProps): React.ReactElement;
//# sourceMappingURL=StatusPill.d.ts.map