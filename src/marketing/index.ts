/**
 * `@xenition/ui/marketing` — composed marketing sections for template
 * websites. Styled exclusively via the `--xen-*` theme tokens and the
 * var-bound Tailwind preset classes, so every template restyles by seed
 * alone. Motion comes from `@xenition/ui/motion` and always honors
 * `prefers-reduced-motion`.
 */

export { AuroraBackground } from './AuroraBackground';
export type { AuroraBackgroundProps, AuroraVariant, AuroraPattern } from './AuroraBackground';
export { GradientHero } from './GradientHero';
export type { GradientHeroProps } from './GradientHero';
export { Navbar } from './Navbar';
export type { NavbarProps } from './Navbar';
export { SectionHeading } from './SectionHeading';
export type { SectionHeadingProps } from './SectionHeading';
export { FeatureGrid, FeatureCard } from './FeatureGrid';
export type { FeatureGridProps, FeatureCardProps } from './FeatureGrid';
export { StatBar, Stat } from './StatBar';
export type { StatBarProps, StatProps } from './StatBar';
export { Testimonials, Testimonial, initialsFromName } from './Testimonials';
export type { TestimonialsProps, TestimonialProps } from './Testimonials';
export { PricingTable, PricingTier } from './PricingTable';
export type { PricingTableProps, PricingTierProps } from './PricingTable';
export { FAQ, FAQItem } from './FAQ';
export type { FAQProps, FAQItemProps } from './FAQ';
export { CTABanner } from './CTABanner';
export type { CTABannerProps } from './CTABanner';
export { Footer, FooterColumn } from './Footer';
export type { FooterProps, FooterColumnProps } from './Footer';
export { LogoCloud } from './LogoCloud';
export type { LogoCloudProps } from './LogoCloud';
export { ProductMock } from './ProductMock';
export type {
  ProductMockProps,
  ProductMockVariant,
  ProductMockChart,
  ProductMockKpi,
} from './ProductMock';
export { BentoGrid, BentoCard } from './Bento';
export type { BentoGridProps, BentoCardProps } from './Bento';
export { ParticleField, computeParticles } from './ParticleField';
export type { ParticleFieldProps, ParticleMood, ParticleSpec } from './ParticleField';
export { OrnamentRule } from './OrnamentRule';
export type { OrnamentRuleProps, OrnamentShape, OrnamentTone } from './OrnamentRule';
export { PriceList, PriceRow } from './PriceList';
export type { PriceListProps, PriceRowProps } from './PriceList';
export { GenerativeCover, hashSeed, COVER_FORMS } from './GenerativeCover';
export type { GenerativeCoverProps, CoverForm, CoverColorRole } from './GenerativeCover';
export { PointerHalo } from './PointerHalo';
export type { PointerHaloProps, PointerHaloMode } from './PointerHalo';
export { EditorialGrid, EditorialItem } from './EditorialGrid';
export type { EditorialGridProps, EditorialItemProps } from './EditorialGrid';
export { SectionDivider } from './SectionDivider';
export type { SectionDividerProps, SectionDividerVariant } from './SectionDivider';
export { EntityCard } from './EntityCard';
export type { EntityCardProps, EntityCardMedia } from './EntityCard';

// ── new section/block components (site-building coverage) ─────────────
export { Carousel } from './Carousel';
export type { CarouselProps } from './Carousel';
export { ComparisonTable } from './ComparisonTable';
export type { ComparisonTableProps, ComparisonColumn, ComparisonRow } from './ComparisonTable';
export { PricingToggle } from './PricingToggle';
export type { PricingToggleProps, PricingToggleOption } from './PricingToggle';
export { NewsletterSignup } from './NewsletterSignup';
export type { NewsletterSignupProps } from './NewsletterSignup';
export { ProcessSteps } from './ProcessSteps';
export type { ProcessStepsProps, ProcessStep } from './ProcessSteps';
export { TeamGrid } from './TeamGrid';
export type { TeamGridProps, TeamMember } from './TeamGrid';
export { AnnouncementBar } from './AnnouncementBar';
export type { AnnouncementBarProps, AnnouncementTone } from './AnnouncementBar';
export { VideoEmbed } from './VideoEmbed';
export type { VideoEmbedProps } from './VideoEmbed';
export { Countdown } from './Countdown';
export type { CountdownProps } from './Countdown';
