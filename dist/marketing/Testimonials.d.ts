import * as React from 'react';
export interface TestimonialsProps extends React.HTMLAttributes<HTMLDivElement> {
    /** `grid` (default) or an infinite `marquee` loop. */
    mode?: 'grid' | 'marquee';
    /** Marquee speed in px/s (marquee mode only). */
    speed?: number;
}
/** Layout container for `Testimonial` cards. */
export declare const Testimonials: React.ForwardRefExoticComponent<TestimonialsProps & React.RefAttributes<HTMLDivElement>>;
export interface TestimonialProps extends Omit<React.HTMLAttributes<HTMLElement>, 'role'> {
    /** Author name — also the source for the avatar-initials fallback. */
    name: string;
    /** Author role/company line. */
    role?: React.ReactNode;
    /** Avatar slot; when omitted, initials derived from `name` are shown. */
    avatar?: React.ReactNode;
}
/** Derive up to two initials from a display name. */
export declare function initialsFromName(name: string): string;
/** One quote card. The quote itself is `children`. */
export declare const Testimonial: React.ForwardRefExoticComponent<TestimonialProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=Testimonials.d.ts.map