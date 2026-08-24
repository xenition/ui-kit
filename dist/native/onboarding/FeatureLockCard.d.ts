import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type FeatureLockVariant = 'card' | 'inline';
export interface FeatureLockCardProps {
    /** Name of the gated capability (e.g. `'Unlimited exports'`). */
    title: string;
    /** One-line description of what unlocking delivers. */
    description?: string;
    /** Lock glyph. Default `'🔒'`. */
    icon?: string;
    /** Ribbon copy on the medallion. Default `'Pro'`. */
    planLabel?: string;
    /** Unlock CTA copy. Default `'Unlock'` — override with the outcome. */
    unlockLabel?: string;
    /** Fires on the unlock CTA. */
    onUnlock?: () => void;
    /** `'inline'` renders a compact borderless row. Default `'card'`. */
    variant?: FeatureLockVariant;
    style?: StyleProp<ViewStyle>;
}
/**
 * Locked-feature teaser — shown where a free user hits a gated capability. It
 * names the feature, says what unlocking gets them and offers the upgrade CTA,
 * turning a dead end into a value pitch (paywall-after-value, design.md §27-28).
 * The `inline` variant collapses to a compact row for list contexts. Colors are
 * token-bound via the {@link Card}/{@link Badge} primitives. No literal colors.
 */
export declare function FeatureLockCard({ title, description, icon, planLabel, unlockLabel, onUnlock, variant, style, }: FeatureLockCardProps): React.ReactElement;
//# sourceMappingURL=FeatureLockCard.d.ts.map