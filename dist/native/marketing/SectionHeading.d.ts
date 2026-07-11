import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface SectionHeadingProps {
    /** Small kicker line above the title. */
    eyebrow?: React.ReactNode;
    /** Section title. */
    title: React.ReactNode;
    /** Supporting paragraph under the title. */
    lede?: React.ReactNode;
    align?: 'left' | 'center';
    /**
     * Heading level — accepted for parity with the web `SectionHeading`; React
     * Native has no heading semantics, so it has no visual effect here.
     */
    as?: 'h1' | 'h2' | 'h3';
    style?: StyleProp<ViewStyle>;
}
/**
 * Eyebrow + title + lede — the native mirror of the web `SectionHeading`, the
 * standard section opener. Token-only. The web `as` heading-level prop is kept
 * for prop parity but is inert on native (no DOM heading elements).
 */
export declare function SectionHeading({ eyebrow, title, lede, align, as: _as, style, }: SectionHeadingProps): React.ReactElement;
//# sourceMappingURL=SectionHeading.d.ts.map