import * as React from 'react';
import type { WelcomeScreenProps } from './WelcomeScreen';
/** Drop-in for {@link WelcomeScreen} — identical props, different design. */
export type WelcomeScreenV2Props = WelcomeScreenProps;
/**
 * First-launch welcome — V2. A full-screen, immersive hero: a stack of
 * primary-tinted scrim layers stands in for a brand gradient (React Native has
 * no gradient primitive, so translucency is derived from a token via
 * {@link withAlpha}), a brand medallion floats center-high, and the headline,
 * value line and CTA sit anchored toward the bottom. Same props as
 * {@link WelcomeScreen}. Token-pure.
 */
export declare function WelcomeScreenV2({ title, subtitle, logoGlyph, primaryLabel, onGetStarted, secondaryLabel, onSecondary, loading, style, }: WelcomeScreenV2Props): React.ReactElement;
//# sourceMappingURL=WelcomeScreenV2.d.ts.map