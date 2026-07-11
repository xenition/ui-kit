/**
 * `@xenition/ui/native/marketing` — composed content sections for React Native
 * templates, mirroring the web `@xenition/ui/marketing` prop contracts
 * (`href`→`onPress` is the idiomatic swap). Genuine RN components styled only
 * from the compiled theme tokens via `useXenitionTheme()` — no literal colors,
 * no DOM.
 */

export { EntityCard } from './EntityCard';
export type { EntityCardProps, EntityCardMedia } from './EntityCard';

// ── native marketing sections (parity with @xenition/ui/marketing) ────
export { GradientHero } from './GradientHero';
export type { GradientHeroProps } from './GradientHero';
export { SectionHeading } from './SectionHeading';
export type { SectionHeadingProps } from './SectionHeading';
export { CTABanner } from './CTABanner';
export type { CTABannerProps } from './CTABanner';
export { Footer } from './Footer';
export type { FooterProps, FooterColumn, FooterLink } from './Footer';
export { FeatureGrid } from './FeatureGrid';
export type { FeatureGridProps, FeatureItem } from './FeatureGrid';
export { Testimonials, initialsFromName } from './Testimonials';
export type { TestimonialsProps, TestimonialItem } from './Testimonials';
export { FAQ } from './FAQ';
export type { FAQProps, FAQItemData } from './FAQ';
export { PricingTable } from './PricingTable';
export type { PricingTableProps, PricingPlan, PricingPlanCta } from './PricingTable';
export { StatBar, Stat } from './StatBar';
export type { StatBarProps, StatItem } from './StatBar';
export { LogoCloud } from './LogoCloud';
export type { LogoCloudProps } from './LogoCloud';
