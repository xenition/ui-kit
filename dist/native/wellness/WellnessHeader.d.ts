import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface WellnessHeaderProps {
    /** Time-of-day greeting, e.g. `'Good morning'`. */
    greeting?: string;
    /** The person's name. */
    name?: string;
    /** A subtitle line (e.g. a date or an encouraging note). */
    subtitle?: string;
    /** Current practice streak in days; shown as a frosted chip when set. */
    streakDays?: number;
    /** Minutes practiced today; shown as a frosted chip when set. */
    minutes?: number;
    /** Optional avatar glyph/emoji for the profile button. Default `'🧘'`. */
    avatarGlyph?: string;
    /** Fires when the profile avatar is tapped. */
    onProfile?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * WellnessHeader — the home-screen header: a soft gradient ground with a greeting
 * and name, an optional profile avatar, and frosted "glass" stat chips (streak,
 * minutes today). Near-white ink and the gradient both derive from the brand
 * ramp, and the chips are translucent brand-ink — no literal colors, restyles
 * from the seed, light + dark. The single vivid surface on the screen; the rest
 * of the screen stays calm around it.
 */
export declare function WellnessHeader({ greeting, name, subtitle, streakDays, minutes, avatarGlyph, onProfile, style, }: WellnessHeaderProps): React.ReactElement;
//# sourceMappingURL=WellnessHeader.d.ts.map