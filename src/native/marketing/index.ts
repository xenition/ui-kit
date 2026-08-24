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
export { RichText, parseRichText } from './RichText';
export type { RichTextProps } from './RichText';
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

// ── full parity with @xenition/ui/marketing (native ports) ────────────
export { BentoGrid, BentoCard } from './Bento';
export type { BentoGridProps, BentoCardProps, BentoCardData } from './Bento';
export { EditorialGrid, EditorialItem } from './EditorialGrid';
export type { EditorialGridProps, EditorialItemProps, EditorialItemData } from './EditorialGrid';
export { OrnamentRule } from './OrnamentRule';
export type { OrnamentRuleProps, OrnamentShape, OrnamentTone } from './OrnamentRule';
export { SectionDivider } from './SectionDivider';
export type { SectionDividerProps, SectionDividerVariant } from './SectionDivider';
export { AnnouncementBar } from './AnnouncementBar';
export type { AnnouncementBarProps, AnnouncementTone } from './AnnouncementBar';
export { PriceList } from './PriceList';
export type { PriceListProps, PriceRow } from './PriceList';
export { PricingToggle } from './PricingToggle';
export type { PricingToggleProps, PricingToggleOption } from './PricingToggle';
export { ComparisonTable } from './ComparisonTable';
export type { ComparisonTableProps, ComparisonColumn, ComparisonRow } from './ComparisonTable';
export { Navbar } from './Navbar';
export type { NavbarProps, NavbarLink } from './Navbar';
export { ProductMock } from './ProductMock';
export type {
  ProductMockProps,
  ProductMockVariant,
  ProductMockChart,
  ProductMockKpi,
} from './ProductMock';
export { ProcessSteps } from './ProcessSteps';
export type { ProcessStepsProps, ProcessStep } from './ProcessSteps';
export { TeamGrid } from './TeamGrid';
export type { TeamGridProps, TeamMember } from './TeamGrid';
export { FeatureSplit } from './FeatureSplit';
export type { FeatureSplitProps } from './FeatureSplit';
export { LocationBlock } from './LocationBlock';
export type { LocationBlockProps, LocationHour } from './LocationBlock';
export { Carousel } from './Carousel';
export type { CarouselProps } from './Carousel';
export { CoverGallery } from './CoverGallery';
export type { CoverGalleryProps, CoverGalleryItem } from './CoverGallery';
export { VideoEmbed } from './VideoEmbed';
export type { VideoEmbedProps } from './VideoEmbed';
export { Countdown } from './Countdown';
export type { CountdownProps } from './Countdown';
export { NewsletterSignup } from './NewsletterSignup';
export type { NewsletterSignupProps } from './NewsletterSignup';
export { AuroraBackground } from './AuroraBackground';
export type { AuroraBackgroundProps, AuroraVariant, AuroraPattern } from './AuroraBackground';
export { ParticleField } from './ParticleField';
export type { ParticleFieldProps, ParticleMood } from './ParticleField';
export { PointerHalo } from './PointerHalo';
export type { PointerHaloProps, PointerHaloMode } from './PointerHalo';
// GenerativeCover: re-export the existing native commerce implementation
// (mirrors how the web marketing index surfaces GenerativeCover).
export { GenerativeCover } from '../commerce/GenerativeCover';
export type { GenerativeCoverProps } from '../commerce/GenerativeCover';
