import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface TestimonialItem {
    /** The quote body. */
    quote: string;
    /** Author name — also the source for the avatar-initials fallback. */
    author: string;
    /** Author role/company line. */
    role?: string;
    /** Avatar slot; when omitted, initials derived from `author` are shown. */
    avatar?: React.ReactNode;
}
export interface TestimonialsProps {
    /** The quote cards to render (mirrors the web `Testimonial` children). */
    items: TestimonialItem[];
    style?: StyleProp<ViewStyle>;
}
/** Derive up to two initials from a display name. */
export declare function initialsFromName(name: string): string;
/**
 * Stacked quote cards — the native mirror of the web `Testimonials` +
 * `Testimonial`. The web version composes children and offers a `marquee` mode;
 * native takes an `items` data array and only renders the `grid`-equivalent
 * vertical stack (the infinite marquee is dropped — native motion is
 * Reveal/Stagger only). Token-only.
 */
export declare function Testimonials({ items, style }: TestimonialsProps): React.ReactElement;
//# sourceMappingURL=Testimonials.d.ts.map