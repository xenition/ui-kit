import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Layout of a {@link SpeakerCard}. */
export type SpeakerCardVariant = 'row' | 'stacked';
export interface SpeakerCardProps {
    /** Speaker name. */
    name: string;
    /** Role / title, e.g. `Principal Engineer`. */
    role?: string;
    /** Company / organisation. */
    company?: string;
    /** Avatar image URL (initials fallback when absent). */
    avatarUrl?: string;
    /** Short bio (clamped to 3 lines in `stacked`, 2 in `row`). */
    bio?: string;
    /** Optional 0–5 rating shown as stars. */
    rating?: number;
    /** Topic / track tags. */
    tags?: string[];
    /** `row` (horizontal, list-friendly) or `stacked` (centered profile). */
    variant?: SpeakerCardVariant;
    /** Press handler for the whole card. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * Speaker profile card built on the `Avatar` and `Rating` primitives. `row`
 * lays the avatar beside the details for lists; `stacked` centers a larger
 * avatar for a profile header. Role and company collapse gracefully when
 * absent. Colors come from the compiled theme tokens; no literal colors.
 */
export declare function SpeakerCard({ name, role, company, avatarUrl, bio, rating, tags, variant, onPress, style, }: SpeakerCardProps): React.ReactElement;
//# sourceMappingURL=SpeakerCard.d.ts.map