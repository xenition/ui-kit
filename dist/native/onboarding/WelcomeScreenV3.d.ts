import * as React from 'react';
import type { WelcomeScreenProps } from './WelcomeScreen';
/** Drop-in for {@link WelcomeScreen} — identical props, different design. */
export type WelcomeScreenV3Props = WelcomeScreenProps;
/**
 * First-launch welcome — V3. A split composition: the top half is an art panel
 * (tinted stage + brand medallion), the bottom half is an elevated CTA card that
 * overlaps the seam and stacks the headline, value line and primary action. Same
 * props as {@link WelcomeScreen}. Token-pure.
 */
export declare function WelcomeScreenV3({ title, subtitle, logoGlyph, primaryLabel, onGetStarted, secondaryLabel, onSecondary, loading, style, }: WelcomeScreenV3Props): React.ReactElement;
//# sourceMappingURL=WelcomeScreenV3.d.ts.map