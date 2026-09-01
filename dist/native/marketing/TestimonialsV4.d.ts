import * as React from 'react';
import { type TestimonialsProps, type TestimonialItem } from './Testimonials';
/** Drop-in for {@link TestimonialsProps} — same props, the V4 "showcase" design. */
export type TestimonialsV4Props = TestimonialsProps;
/** Drop-in for the base `TestimonialItem` — same props, the V4 "showcase" design. */
export type TestimonialV4Props = TestimonialItem;
/**
 * Testimonial — **V4** "showcase" design (native mirror of the web V4). A clean,
 * elevated quote card: the `quote` over a caption of an avatar (or initials
 * derived from `author`), an extra-bold name, and a muted role line. NOT a
 * gradient surface. Same props as the base `TestimonialItem`. Token-only.
 */
export declare function TestimonialV4({ quote, author, role, avatar }: TestimonialV4Props): React.ReactElement;
/**
 * Testimonials — **V4** "showcase" design (native mirror of the web V4). A
 * content section: a stack of elevated `TestimonialV4` quote cards. Mirrors the
 * web V4; native takes the base's `items` data array (the web `marquee` mode is
 * dropped, as on the base). Same props/behavior as {@link TestimonialsProps}.
 * Token-only colors, no literals.
 */
export declare function TestimonialsV4({ items, style }: TestimonialsV4Props): React.ReactElement;
//# sourceMappingURL=TestimonialsV4.d.ts.map