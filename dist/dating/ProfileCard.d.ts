import * as React from 'react';
import { type CarouselPhoto } from './PhotoCarousel';
import { type SwipeAction } from './LikePassButtons';
export interface ProfilePromptData {
    id: string;
    prompt: string;
    answer?: string;
}
export interface ProfileCardData {
    id: string;
    name: string;
    age?: number;
    /** Photos for the carousel; the first is the hero. */
    photos?: CarouselPhoto[];
    /** Free-text bio. */
    bio?: string;
    /** Distance in km. */
    distanceKm?: number;
    /** Compatibility score 0–100. */
    compatibility?: number;
    /** Interest tags shown as chips. */
    interests?: string[];
    /** Profile prompts. */
    prompts?: ProfilePromptData[];
    /** "Active now". */
    online?: boolean;
    /** Verified profile. */
    verified?: boolean;
    /** Job / school line. */
    headline?: string;
}
export type ProfileCardVariant = 'full' | 'compact';
export interface ProfileCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The profile to render. */
    profile?: ProfileCardData;
    /** `full` (default) shows photos, bio, prompts; `compact` is a summary row. */
    variant?: ProfileCardVariant;
    /** Show the built-in like/pass action row. */
    showActions?: boolean;
    /** Fires a swipe action from the built-in row. */
    onAction?: (action: SwipeAction) => void;
    /** Fires when an interest chip is clicked. */
    onClickInterest?: (interest: string) => void;
    /** Loading skeleton. */
    loading?: boolean;
    /** Empty-state copy when no profile is supplied. */
    emptyLabel?: string;
}
/**
 * A full profile summary — the web parity of the native profile card. Composes the
 * dating blocks (photo carousel, distance badge, compatibility meter, prompts,
 * interest chips, and an optional action row) into one card. `compact` collapses
 * to a headline row for lists. Token classes only — no literal colors. Explicit
 * loading and empty states; array access is guarded.
 */
export declare const ProfileCard: React.ForwardRefExoticComponent<ProfileCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ProfileCard.d.ts.map