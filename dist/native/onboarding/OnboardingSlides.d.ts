import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { OnboardingSlide } from './types';
export type OnboardingSlidesVariant = 'default' | 'minimal';
export interface OnboardingSlidesProps {
    /** Ordered intro slides. An empty list renders the empty state. */
    slides: OnboardingSlide[];
    /** Controlled active index. Omit to let the component own its position. */
    index?: number;
    /** Fires with the next index whenever the slide changes. */
    onIndexChange?: (index: number) => void;
    /** Fires when the user taps "Skip". */
    onSkip?: () => void;
    /** Fires when the user advances past the final slide ("Done"). */
    onComplete?: () => void;
    /**
     * Artwork for the hero slot (onboarding spec §3). When omitted the slide's
     * own `icon` is promoted to a hero-sized medallion, so a slide with no art
     * still looks composed. Drive it per slide by running the carousel
     * controlled — swap `illustration` as `index` changes.
     */
    illustration?: React.ReactNode;
    /**
     * Back affordance in the header (spec §1). Defaults to stepping one slide
     * back; the chevron is hidden on the first slide, where there is nothing to
     * go back to.
     */
    onBack?: () => void;
    /** Show the "Skip" affordance. Default `true`. */
    showSkip?: boolean;
    /** Label for the final-slide primary action. Default `'Get started'`. */
    finishLabel?: string;
    /** `'minimal'` drops the hero panel for a text-only intro. */
    variant?: OnboardingSlidesVariant;
    style?: StyleProp<ViewStyle>;
}
/**
 * Paged intro carousel — the first-run "here's the value" sequence, rebuilt on
 * the shell from §1 of the onboarding spec.
 *
 * The version this replaces put a "Skip" link alone at the top, a medallion and
 * two lines of text in the middle, and dots above a button at the bottom. The
 * shell gives it structure instead: a **header** carrying back · segmented
 * progress · dismiss (§1–2), a **hero slot** that takes the caller's
 * `illustration` or falls back to the slide's glyph at hero size (§3), a
 * **centred headline block** on a readable measure (§4), and the **sticky
 * footer CTA** every other screen in the funnel ends on (§5). The numbered
 * position captions are gone: the bars say where you are without them.
 *
 * Works controlled (`index` + `onIndexChange`) or uncontrolled. All indexing is
 * clamped so an out-of-range `index` can't crash, and an empty `slides` list
 * renders the empty state rather than a blank screen. No literal colors.
 */
export declare function OnboardingSlides({ slides, index, onIndexChange, onSkip, onComplete, illustration, onBack, showSkip, finishLabel, variant, style, }: OnboardingSlidesProps): React.ReactElement;
//# sourceMappingURL=OnboardingSlides.d.ts.map