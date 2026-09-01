import * as React from 'react';
import { type TestimonialsProps, type TestimonialProps } from './Testimonials';
/** Drop-in for {@link TestimonialsProps} — same props, the V4 "showcase" design. */
export type TestimonialsV4Props = TestimonialsProps;
/** Drop-in for {@link TestimonialProps} — same props, the V4 "showcase" design. */
export type TestimonialV4Props = TestimonialProps;
/**
 * Testimonials — **V4** "showcase" design (web parity of the native V4). A
 * content section, so NOT a gradient surface: the layout container for
 * `TestimonialV4` quote cards. Honors the base's `mode` (`grid` default, or an
 * infinite `marquee` loop) and `speed`. Same props/behavior as
 * {@link TestimonialsProps}; token-only colors, no literals.
 */
export declare const TestimonialsV4: React.ForwardRefExoticComponent<TestimonialsProps & React.RefAttributes<HTMLDivElement>>;
/**
 * Testimonial — **V4** "showcase" design (web parity of the native V4). A clean,
 * elevated quote card: the quote (`children`) over a caption of an avatar (or
 * initials derived from `name`), an extra-bold name, and a muted role line. Same
 * props/behavior as {@link TestimonialProps}; token-only colors, no literals.
 */
export declare const TestimonialV4: React.ForwardRefExoticComponent<TestimonialProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=TestimonialsV4.d.ts.map